// Pure rules for the affiliate programme, shared with the app's tests so the terms the
// app shows are the ones the server pays. Terms live in affiliate.json.
import { createHash, randomBytes } from 'node:crypto'
import { readFileSync } from 'node:fs'

/** @type {{ firstRate: number, renewalRate: { week: number, month: number }, renewalDays: number, holdDays: number, minPayout: number, minAge: number }} */
export const TERMS = JSON.parse(readFileSync(new URL('./affiliate.json', import.meta.url), 'utf8'))

const DAY = 86400_000

/** Whole years old on `now`, from a YYYY-MM-DD date of birth, by the calendar in Kenya (UTC+3). */
export function ageOn(dob, now = Date.now()) {
  const m = String(dob ?? '').match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return null
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])]
  const born = new Date(Date.UTC(y, mo - 1, d))
  if (born.getUTCMonth() !== mo - 1 || born.getUTCDate() !== d) return null
  const today = new Date(now + 3 * 3600_000)
  let age = today.getUTCFullYear() - y
  if (today.getUTCMonth() + 1 < mo || (today.getUTCMonth() + 1 === mo && today.getUTCDate() < d)) age--
  return age >= 0 && age < 120 ? age : null
}

/** Kenyan national ID numbers are 7 or 8 digits. */
export const validIdNumber = (s) => /^\d{7,8}$/.test(String(s ?? '').trim())

/** A full name as on the ID: two or more words of letters. */
export function cleanName(s) {
  const name = String(s ?? '').trim().replace(/\s+/g, ' ')
  return /^[\p{L}'’-]{2,}( [\p{L}'’-]{2,})+$/u.test(name) && name.length <= 60 ? name : null
}

/** A short code parents can type: four letters of the first name and three digits, e.g. AMIN482. */
export function makeCode(name, taken, rand = Math.random) {
  const stem = (name.normalize('NFD').replace(/[^A-Za-z]/g, '').toUpperCase() + 'KOBE').slice(0, 4)
  for (;;) {
    const code = stem + String(100 + Math.floor(rand() * 900))
    if (!taken.has(code)) return code
  }
}

export const newKey = () => randomBytes(24).toString('base64url')
export const hashKey = (key) => createHash('sha256').update(String(key)).digest('hex')

export const periodOf = (days) => (days <= 7 ? 'week' : 'month')

/**
 * What an affiliate earns on one payment from a parent they brought in. The parent's first
 * payment earns the first rate; later payments earn the renewal rate for that plan's period,
 * for `renewalDays` after the first payment. Commissions are whole shillings, rounded down.
 */
export function commissionFor({ amount, planDays, first, firstPaidAt, paidAt }, terms = TERMS) {
  if (!first && paidAt - firstPaidAt > terms.renewalDays * DAY) return null
  const rate = first ? terms.firstRate : terms.renewalRate[periodOf(planDays)]
  return { kind: first ? 'first' : 'renewal', rate, commission: Math.floor(amount * rate) }
}

/**
 * Which affiliate a payment belongs to. A parent stays with the affiliate who brought them.
 * A code only claims a number that has never paid before, and never the affiliate's own number.
 */
export function attribute({ payerPhone, refCode, existing, paidBefore, affiliates }) {
  if (existing) return existing.affiliateId
  if (paidBefore || !refCode) return null
  const code = String(refCode).trim().toUpperCase()
  const a = affiliates.find((x) => x.code === code)
  if (!a || a.status !== 'approved' || a.phone === payerPhone) return null
  return a.id
}

/** Held for `holdDays` after the payment, then payable until paid out. Voided ones don't count. */
export function balances(commissions, now = Date.now(), terms = TERMS) {
  const out = { held: 0, payable: 0, paid: 0 }
  for (const c of commissions) {
    if (c.status === 'void') continue
    if (c.status === 'paid') out.paid += c.commission
    else if (now - c.at < terms.holdDays * DAY) out.held += c.commission
    else out.payable += c.commission
  }
  return out
}

/** 254712345678 → 0712 ••• 678: enough for an affiliate to recognise a parent, not to call them. */
export const maskPhone = (p) => `0${String(p).slice(3, 6)} ••• ${String(p).slice(-3)}`
