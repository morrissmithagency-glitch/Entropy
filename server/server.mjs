// CBC Helper payments: M-Pesa STK Push through Safaricom Daraja. No dependencies.
//
//   POST /api/pay                     { plan, phone, grade? }  → { id }
//   GET  /api/pay/:id                 → { status: 'pending' | 'paid' | 'failed', ... }
//   POST /api/mpesa/callback/:secret  ← Safaricom posts the result here
//
// Affiliates (see AFFILIATES.md):
//   POST /api/affiliates/apply        { name, idNumber, dob, phone, agree } → { key, code, status }
//   GET  /api/affiliates/me           X-Affiliate-Key → dashboard
//   GET  /api/ref/:code               → { ok, name } for an approved code
//   GET  /admin, /api/admin/...       Authorization: Bearer ADMIN_TOKEN
//
// The price always comes from plans.json on the server; the app only names the plan.
// See README.md for the environment variables and how to deploy.
import { createServer } from 'node:http'
import { timingSafeEqual } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { ageOn, attribute, balances, cleanName, commissionFor, hashKey, makeCode, maskPhone, newKey, TERMS, validIdNumber } from './affiliate-lib.mjs'
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

// Affiliates, the parents they brought in (by M-Pesa number), commissions and payouts.
const load = (name, fallback) => {
  try {
    return JSON.parse(readFileSync(new URL(name, DATA_DIR), 'utf8'))
  } catch {
    return fallback
  }
}
const store = {
  affiliates: /** @type {any[]} */ (load('affiliates.json', [])),
  referrals: /** @type {Record<string, { affiliateId: string, firstPaymentId: string, firstPaidAt: number }>} */ (load('referrals.json', {})),
  commissions: /** @type {any[]} */ (load('commissions.json', [])),
  payouts: /** @type {any[]} */ (load('payouts.json', [])),
}
const saveStore = () => {
  for (const [k, v] of Object.entries(store)) writeFileSync(new URL(`${k}.json`, DATA_DIR), JSON.stringify(v, null, 1))
}

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
    credit(p)
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

// ── Affiliates ──────────────────────────────────────────────────────────────

/** Records the commission a paid payment earns, if the parent came through an affiliate. */
function credit(p) {
  if (store.commissions.some((c) => c.paymentId === p.id)) return
  const paidBefore = [...payments.values()].some((q) => q !== p && q.phone === p.phone && q.status === 'paid' && q.paidAt <= p.paidAt)
  let ref = store.referrals[p.phone]
  if (!ref) {
    const affiliateId = attribute({ payerPhone: p.phone, refCode: p.ref, existing: null, paidBefore, affiliates: store.affiliates })
    if (!affiliateId) return
    ref = store.referrals[p.phone] = { affiliateId, firstPaymentId: p.id, firstPaidAt: p.paidAt }
  }
  const a = store.affiliates.find((x) => x.id === ref.affiliateId)
  if (!a || a.status !== 'approved') return saveStore()
  const plan = planById(p.plan)
  const c = commissionFor({ amount: p.amount, planDays: plan.days, first: ref.firstPaymentId === p.id, firstPaidAt: ref.firstPaidAt, paidAt: p.paidAt })
  if (c) store.commissions.push({ id: `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, affiliateId: a.id, paymentId: p.id, phone: p.phone, plan: p.plan, amount: p.amount, ...c, at: p.paidAt, status: 'open' })
  saveStore()
}

const byKey = (key) => (key ? store.affiliates.find((a) => a.keyHash === hashKey(key)) : null)

function dashboard(a) {
  const mine = store.commissions.filter((c) => c.affiliateId === a.id)
  const parents = Object.values(store.referrals).filter((r) => r.affiliateId === a.id).length
  return {
    name: a.name,
    code: a.code,
    status: a.status,
    parents,
    balance: balances(mine),
    terms: TERMS,
    commissions: mine
      .slice(-50)
      .reverse()
      .map((c) => ({ at: c.at, parent: maskPhone(c.phone), plan: c.plan, amount: c.amount, kind: c.kind, rate: c.rate, commission: c.commission, status: c.status === 'open' ? (Date.now() - c.at < TERMS.holdDays * 86400_000 ? 'held' : 'payable') : c.status })),
    payouts: store.payouts.filter((x) => x.affiliateId === a.id).slice(-12).reverse().map(({ at, total, receipt }) => ({ at, total, receipt })),
  }
}

function apply(body) {
  const name = cleanName(body.name)
  const idNumber = String(body.idNumber ?? '').trim()
  const phone = normalisePhone(body.phone)
  const age = ageOn(body.dob)
  if (!name) return { error: 'Enter your full name as it is on your ID.' }
  if (!validIdNumber(idNumber)) return { error: 'Enter your national ID number (7 or 8 digits).' }
  if (age == null) return { error: 'Enter your date of birth.' }
  if (age < TERMS.minAge) return { error: `You need to be ${TERMS.minAge} or older to join.` }
  if (!phone) return { error: 'Enter your Safaricom number like 0712 345 678.' }
  if (body.agree !== true) return { error: 'Please agree to the programme rules.' }
  if (store.affiliates.some((a) => a.phone === phone || a.idNumber === idNumber))
    return { error: 'This number or ID has already applied. If you lost your key, contact CBC Helper.' }
  const key = newKey()
  const a = {
    id: `a${Date.now().toString(36)}`,
    code: makeCode(name, new Set(store.affiliates.map((x) => x.code))),
    name,
    idNumber,
    dob: body.dob,
    phone,
    status: 'pending',
    keyHash: hashKey(key),
    createdAt: Date.now(),
  }
  store.affiliates.push(a)
  saveStore()
  return { key, code: a.code, status: a.status }
}

function isAdmin(req) {
  if (!env.ADMIN_TOKEN) return false
  const got = Buffer.from(hashKey(String(req.headers.authorization ?? '').replace(/^Bearer /, '')))
  return timingSafeEqual(got, Buffer.from(hashKey(env.ADMIN_TOKEN)))
}

function adminView() {
  return store.affiliates.map(({ keyHash, ...a }) => {
    const mine = store.commissions.filter((c) => c.affiliateId === a.id)
    return { ...a, parents: Object.values(store.referrals).filter((r) => r.affiliateId === a.id).length, balance: balances(mine) }
  })
}

function payout(affiliateId, receipt) {
  const a = store.affiliates.find((x) => x.id === affiliateId)
  if (!a) return { error: 'No such affiliate.' }
  if (!/^[A-Z0-9]{8,12}$/.test(String(receipt ?? ''))) return { error: 'Enter the M-Pesa receipt of the payout.' }
  const now = Date.now()
  const due = store.commissions.filter((c) => c.affiliateId === a.id && c.status === 'open' && now - c.at >= TERMS.holdDays * 86400_000)
  const total = due.reduce((s, c) => s + c.commission, 0)
  if (total < TERMS.minPayout) return { error: `Payable balance is KSh ${total}; the minimum payout is KSh ${TERMS.minPayout}.` }
  const id = `p${now.toString(36)}`
  for (const c of due) Object.assign(c, { status: 'paid', payoutId: id })
  store.payouts.push({ id, affiliateId: a.id, at: now, total, receipt, phone: a.phone })
  saveStore()
  return { ok: true, total }
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
    'Access-Control-Allow-Headers': 'Content-Type, X-Affiliate-Key, Authorization',
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
      const ref = typeof body.ref === 'string' ? body.ref.trim().toUpperCase().slice(0, 12) || null : null
      const p = { id: json.CheckoutRequestID, plan: plan.id, grade, amount: plan.price, phone, ref, status: 'pending', createdAt: Date.now() }
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

    if (req.method === 'POST' && url.pathname === '/api/affiliates/apply') {
      if (limited(ip)) return send(res, 429, { error: 'Too many tries. Please wait a few minutes.' }, origin)
      const out = apply(await readJson(req))
      return send(res, out.error ? 400 : 200, out, origin)
    }

    if (req.method === 'GET' && url.pathname === '/api/affiliates/me') {
      const a = byKey(req.headers['x-affiliate-key'])
      if (!a) return send(res, 401, { error: 'That key was not recognised.' }, origin)
      return send(res, 200, dashboard(a), origin)
    }

    const refCheck = url.pathname.match(/^\/api\/ref\/([A-Za-z0-9]{4,12})$/)
    if (req.method === 'GET' && refCheck) {
      const a = store.affiliates.find((x) => x.code === refCheck[1].toUpperCase() && x.status === 'approved')
      return send(res, 200, a ? { ok: true, name: a.name.split(' ')[0] } : { ok: false }, origin)
    }

    if (req.method === 'GET' && url.pathname === '/admin') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      return res.end(readFileSync(new URL('./admin.html', import.meta.url)))
    }

    if (url.pathname.startsWith('/api/admin/')) {
      if (!isAdmin(req)) return send(res, 401, { error: 'Not allowed.' }, origin)
      if (req.method === 'GET' && url.pathname === '/api/admin/affiliates') return send(res, 200, { affiliates: adminView(), terms: TERMS }, origin)
      const list = url.pathname.match(/^\/api\/admin\/affiliates\/([\w]+)\/commissions$/)
      if (req.method === 'GET' && list) return send(res, 200, { commissions: store.commissions.filter((c) => c.affiliateId === list[1]).reverse() }, origin)
      const one = url.pathname.match(/^\/api\/admin\/affiliates\/([\w]+)(\/key)?$/)
      if (req.method === 'POST' && one) {
        const a = store.affiliates.find((x) => x.id === one[1])
        if (!a) return send(res, 404, { error: 'No such affiliate.' }, origin)
        if (one[2]) {
          const key = newKey()
          a.keyHash = hashKey(key)
          saveStore()
          return send(res, 200, { key }, origin)
        }
        const { status } = await readJson(req)
        if (!['approved', 'rejected', 'suspended'].includes(status)) return send(res, 400, { error: 'Unknown status.' }, origin)
        Object.assign(a, { status, [`${status}At`]: Date.now() })
        saveStore()
        return send(res, 200, { ok: true }, origin)
      }
      if (req.method === 'POST' && url.pathname === '/api/admin/payouts') {
        const { affiliateId, receipt } = await readJson(req)
        const out = payout(affiliateId, String(receipt ?? '').trim().toUpperCase())
        return send(res, out.error ? 400 : 200, out, origin)
      }
      const voidIt = url.pathname.match(/^\/api\/admin\/commissions\/([\w]+)\/void$/)
      if (req.method === 'POST' && voidIt) {
        const c = store.commissions.find((x) => x.id === voidIt[1])
        if (!c || c.status === 'paid') return send(res, 400, { error: 'Only an unpaid commission can be voided.' }, origin)
        c.status = 'void'
        saveStore()
        return send(res, 200, { ok: true }, origin)
      }
      return send(res, 404, { error: 'Not found' }, origin)
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
