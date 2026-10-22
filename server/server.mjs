// CBC Helper payments: M-Pesa STK Push through Safaricom Daraja. No dependencies.
//
//   POST /api/pay                     { plan, phone, grade? }  → { id }
//   GET  /api/pay/:id                 → { status: 'pending' | 'paid' | 'failed', ... }
//   POST /api/mpesa/callback/:secret  ← Safaricom posts the result here
//
// The price always comes from plans.json on the server; the app only names the plan.
// See README.md for the environment variables and how to deploy.
import { createServer } from 'node:http'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { darajaBase, darajaTimestamp, expiryFrom, failureMessage, normalisePhone, parseCallback, planById, stkPassword } from './lib.mjs'

const env = process.env
const REQUIRED = ['MPESA_CONSUMER_KEY', 'MPESA_CONSUMER_SECRET', 'MPESA_SHORTCODE', 'MPESA_PASSKEY', 'PUBLIC_URL', 'CALLBACK_SECRET']
const missing = REQUIRED.filter((k) => !env[k])
if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(', ')}`)
  process.exit(1)
}

// MPESA_BASE_URL is only for pointing tests at a fake Daraja.
const BASE = env.MPESA_BASE_URL ?? darajaBase(env.MPESA_ENV)
const ORIGINS = (env.ALLOWED_ORIGIN ?? '*').split(',').map((s) => s.trim())
const DATA_DIR = new URL('./data/', import.meta.url)
const DATA_FILE = new URL('./payments.json', DATA_DIR)
const GIVE_UP_MS = 3 * 60_000

// ── Storage: a JSON file is enough for one small server. ────────────────────

mkdirSync(DATA_DIR, { recursive: true })
/** @type {Map<string, any>} */
const payments = new Map()
try {
  for (const p of JSON.parse(readFileSync(DATA_FILE, 'utf8'))) payments.set(p.id, p)
} catch {
  /* first run */
}
const save = () => writeFileSync(DATA_FILE, JSON.stringify([...payments.values()], null, 1))

// ── Daraja ──────────────────────────────────────────────────────────────────

let token = { value: '', until: 0 }
async function accessToken() {
  if (Date.now() < token.until) return token.value
  const basic = Buffer.from(`${env.MPESA_CONSUMER_KEY}:${env.MPESA_CONSUMER_SECRET}`).toString('base64')
  const res = await fetch(`${BASE}/oauth/v1/generate?grant_type=client_credentials`, { headers: { Authorization: `Basic ${basic}` } })
  if (!res.ok) throw new Error(`Daraja token failed: ${res.status}`)
  const json = await res.json()
  token = { value: json.access_token, until: Date.now() + (Number(json.expires_in) - 60) * 1000 }
  return token.value
}

async function daraja(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await res.json().catch(() => ({}))
  return { ok: res.ok, json }
}

function auth() {
  const ts = darajaTimestamp()
  return { BusinessShortCode: env.MPESA_SHORTCODE, Password: stkPassword(env.MPESA_SHORTCODE, env.MPESA_PASSKEY, ts), Timestamp: ts }
}

async function stkPush(amount, phone) {
  return daraja('/mpesa/stkpush/v1/processrequest', {
    ...auth(),
    // Till numbers (Buy Goods) use CustomerBuyGoodsOnline and PartyB = the till.
    TransactionType: env.MPESA_TRANSACTION_TYPE ?? 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: env.MPESA_PARTY_B ?? env.MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: `${env.PUBLIC_URL.replace(/\/$/, '')}/api/mpesa/callback/${env.CALLBACK_SECRET}`,
    AccountReference: 'CBC Helper',
    TransactionDesc: 'CBC Helper plan',
  })
}

/** Asks Safaricom directly, for when the callback is slow or lost. */
async function stkQuery(checkoutId) {
  return daraja('/mpesa/stkpushquery/v1/query', { ...auth(), CheckoutRequestID: checkoutId })
}

// ── Payments ────────────────────────────────────────────────────────────────

function settle(p, { ok, resultCode, message, receipt, amount }) {
  // A late callback can still fill in the receipt for a payment the status query settled.
  if (p.status === 'paid' && !p.receipt && receipt) {
    p.receipt = receipt
    save()
  }
  if (p.status !== 'pending') return
  if (ok && amount != null && amount < p.amount) {
    Object.assign(p, { status: 'failed', message: 'The amount paid was less than the plan price.' })
  } else if (ok) {
    const paidAt = Date.now()
    Object.assign(p, { status: 'paid', receipt: receipt ?? p.receipt ?? null, paidAt, expiresAt: expiryFrom(paidAt, planById(p.plan).days) })
  } else {
    Object.assign(p, { status: 'failed', message: failureMessage(resultCode, message) })
  }
  save()
}

function view(p) {
  const base = { id: p.id, status: p.status, plan: p.plan, grade: p.grade ?? null }
  if (p.status === 'paid') return { ...base, receipt: p.receipt, expiresAt: p.expiresAt }
  if (p.status === 'failed') return { ...base, message: p.message }
  return base
}

async function refresh(p) {
  if (p.status !== 'pending') return
  const age = Date.now() - p.createdAt
  if (age > GIVE_UP_MS) {
    Object.assign(p, { status: 'failed', message: failureMessage(1037) })
    save()
    return
  }
  // Give the callback 20 seconds, then ask Safaricom at most every 10 seconds.
  if (age < 20_000 || Date.now() - (p.queriedAt ?? 0) < 10_000) return
  p.queriedAt = Date.now()
  try {
    const { json } = await stkQuery(p.id)
    if (json.ResultCode == null) return // still being processed
    settle(p, { ok: Number(json.ResultCode) === 0, resultCode: json.ResultCode, message: json.ResultDesc, receipt: null, amount: null })
  } catch {
    /* try again on the next poll */
  }
}

// ── HTTP ────────────────────────────────────────────────────────────────────

const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 10
}

async function readJson(req) {
  let raw = ''
  for await (const chunk of req) {
    raw += chunk
    if (raw.length > 20_000) throw new Error('too large')
  }
  return JSON.parse(raw || '{}')
}

function send(res, status, body, origin) {
  const allow = ORIGINS.includes('*') ? '*' : ORIGINS.includes(origin) ? origin : ORIGINS[0]
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  })
  res.end(JSON.stringify(body))
}

const server = createServer(async (req, res) => {
  const origin = req.headers.origin ?? ''
  const url = new URL(req.url ?? '/', 'http://x')
  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? '').split(',')[0].trim()
  try {
    if (req.method === 'OPTIONS') return send(res, 204, {}, origin)

    if (req.method === 'GET' && url.pathname === '/health') return send(res, 200, { ok: true, env: env.MPESA_ENV ?? 'sandbox' }, origin)

    if (req.method === 'POST' && url.pathname === '/api/pay') {
      if (limited(ip)) return send(res, 429, { error: 'Too many tries. Please wait a few minutes.' }, origin)
      const body = await readJson(req)
      const plan = planById(body.plan)
      const phone = normalisePhone(body.phone)
      if (!plan) return send(res, 400, { error: 'Unknown plan.' }, origin)
      if (!phone) return send(res, 400, { error: 'Enter a Safaricom number like 0712 345 678.' }, origin)
      const grade = plan.allGrades ? null : typeof body.grade === 'string' ? body.grade.slice(0, 8) : null
      if (!plan.allGrades && !grade) return send(res, 400, { error: 'Choose a grade for this plan.' }, origin)

      const { ok, json } = await stkPush(plan.price, phone)
      if (!ok || json.ResponseCode !== '0') return send(res, 502, { error: json.errorMessage ?? json.ResponseDescription ?? 'M-Pesa could not start the payment.' }, origin)
      const p = { id: json.CheckoutRequestID, plan: plan.id, grade, amount: plan.price, phone, status: 'pending', createdAt: Date.now() }
      payments.set(p.id, p)
      save()
      return send(res, 200, { id: p.id }, origin)
    }

    const status = url.pathname.match(/^\/api\/pay\/([\w-]+)$/)
    if (req.method === 'GET' && status) {
      const p = payments.get(status[1])
      if (!p) return send(res, 404, { error: 'Payment not found.' }, origin)
      await refresh(p)
      return send(res, 200, view(p), origin)
    }

    const cb = url.pathname.match(/^\/api\/mpesa\/callback\/([\w-]+)$/)
    if (req.method === 'POST' && cb) {
      // Always answer Safaricom with success, or it keeps retrying.
      const ack = () => send(res, 200, { ResultCode: 0, ResultDesc: 'Accepted' }, origin)
      if (cb[1] !== env.CALLBACK_SECRET) return ack()
      const result = parseCallback(await readJson(req))
      const p = result && payments.get(result.checkoutId)
      if (p) settle(p, result)
      return ack()
    }

    send(res, 404, { error: 'Not found' }, origin)
  } catch (e) {
    console.error(e)
    send(res, 500, { error: 'Something went wrong. Please try again.' }, origin)
  }
})

server.listen(Number(env.PORT ?? 8787), () => console.log(`CBC Helper payments on :${env.PORT ?? 8787} (${env.MPESA_ENV ?? 'sandbox'})`))
