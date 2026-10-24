// The affiliate programme in the app: the terms (from server/affiliate.json, the same file the
// server pays from), the referral code a parent arrives with, and the affiliate's own key.
// Without VITE_PAYMENTS_API it runs in test mode and keeps everything on this device.
import RAW from '../../server/affiliate.json'
import { call, TEST_MODE } from './mpesa'
import { PLANS, type Plan } from './plans'

export interface Terms {
  firstRate: number
  renewalRate: { week: number; month: number }
  renewalDays: number
  holdDays: number
  minPayout: number
  minAge: number
}
export const TERMS = RAW as Terms

/** Whole shillings an affiliate earns on a plan, mirroring server/affiliate-lib.mjs. */
export const earnings = (plan: Plan) => ({
  first: Math.floor(plan.price * TERMS.firstRate),
  renewal: Math.floor(plan.price * TERMS.renewalRate[plan.period]),
})

export const pct = (r: number) => `${Math.round(r * 100)}%`

// ── The code a parent arrives with (?ref=CODE), kept for 30 days ────────────

const REF_KEY = 'cbc:ref'
const REF_DAYS = 30

export const cleanCode = (s: string) => s.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12)

export function captureRef(search = typeof location === 'undefined' ? '' : location.search) {
  const code = cleanCode(new URLSearchParams(search).get('ref') ?? '')
  if (code.length < 4) return
  try {
    localStorage.setItem(REF_KEY, JSON.stringify({ code, at: Date.now() }))
  } catch {
    /* storage can be unavailable */
  }
}

export function storedRef(now = Date.now()): string {
  try {
    const v = JSON.parse(localStorage.getItem(REF_KEY) ?? 'null') as { code: string; at: number } | null
    return v && now - v.at < REF_DAYS * 86400_000 ? v.code : ''
  } catch {
    return ''
  }
}

// ── The affiliate's own key, which opens their dashboard on this device ─────

const KEY = 'cbc:affiliate-key'
const TEST_KEY = 'cbc:affiliate-test'

export function savedKey(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveKey(key: string | null) {
  try {
    if (key) localStorage.setItem(KEY, key)
    else localStorage.removeItem(KEY)
  } catch {
    /* the key still works for this visit */
  }
}

export interface Application {
  name: string
  idNumber: string
  dob: string
  phone: string
  agree: boolean
}

export interface Dashboard {
  name: string
  code: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  parents: number
  balance: { held: number; payable: number; paid: number }
  commissions: { at: number; parent: string; plan: string; amount: number; kind: 'first' | 'renewal'; rate: number; commission: number; status: string }[]
  payouts: { at: number; total: number; receipt: string }[]
}

export async function applyAsAffiliate(a: Application): Promise<{ key: string; code: string }> {
  if (TEST_MODE) {
    await new Promise((r) => setTimeout(r, 700))
    const code = (a.name.replace(/[^A-Za-z]/g, '').toUpperCase() + 'KOBE').slice(0, 4) + String(100 + Math.floor(Math.random() * 900))
    try {
      localStorage.setItem(TEST_KEY, JSON.stringify({ name: a.name, code }))
    } catch {
      /* ignore */
    }
    return { key: `test-${code}`, code }
  }
  return call('/api/affiliates/apply', { method: 'POST', body: JSON.stringify(a) })
}

export async function loadDashboard(key: string): Promise<Dashboard> {
  if (TEST_MODE) {
    let saved: { name: string; code: string } | null = null
    try {
      saved = JSON.parse(localStorage.getItem(TEST_KEY) ?? 'null')
    } catch {
      /* ignore */
    }
    if (!saved || key !== `test-${saved.code}`) throw new Error('That key was not recognised.')
    return { ...saved, status: 'pending', parents: 0, balance: { held: 0, payable: 0, paid: 0 }, commissions: [], payouts: [] }
  }
  return call('/api/affiliates/me', { headers: { 'X-Affiliate-Key': key } })
}

/** The first name behind an approved code, or null. */
export async function checkCode(code: string): Promise<string | null> {
  if (TEST_MODE || code.length < 4) return null
  try {
    const r = await call<{ ok: boolean; name?: string }>(`/api/ref/${encodeURIComponent(code)}`)
    return r.ok ? (r.name ?? '') : null
  } catch {
    return null
  }
}

/** The link an affiliate shares: this app's address with their code on it. */
export function shareLink(code: string) {
  const base = (import.meta.env.VITE_APP_URL as string | undefined) ?? (typeof location === 'undefined' ? '' : location.origin + location.pathname)
  return `${base.replace(/\/$/, '')}${base.includes('?') ? '&' : '?'}ref=${code}`
}

export const planName = (id: string) => PLANS.find((p) => p.id === id)?.name ?? id
