// Pure helpers for the payments server. Shared with the app's tests so the prices and
// phone rules the server enforces are the ones the app shows.
import { readFileSync } from 'node:fs'

/** @type {{ id: string, name: string, price: number, days: number, children: number, allGrades: boolean }[]} */
export const PLANS = JSON.parse(readFileSync(new URL('./plans.json', import.meta.url), 'utf8'))

export const planById = (id) => PLANS.find((p) => p.id === id) ?? null

/** Safaricom numbers in any common form → 2547XXXXXXXX / 2541XXXXXXXX, or null. */
export function normalisePhone(input) {
  const s = String(input ?? '').replace(/[\s\-()]/g, '').replace(/^\+/, '')
  const m = s.match(/^(?:254|0)?([17]\d{8})$/)
  return m ? `254${m[1]}` : null
}

/** Daraja wants Kenyan local time (EAT, UTC+3) as YYYYMMDDHHmmss. */
export function darajaTimestamp(date = new Date()) {
  const eat = new Date(date.getTime() + 3 * 3600_000)
  const pad = (n) => String(n).padStart(2, '0')
  return `${eat.getUTCFullYear()}${pad(eat.getUTCMonth() + 1)}${pad(eat.getUTCDate())}${pad(eat.getUTCHours())}${pad(eat.getUTCMinutes())}${pad(eat.getUTCSeconds())}`
}

export const stkPassword = (shortcode, passkey, timestamp) => Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')

export const darajaBase = (env) => (env === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke')

/** Reads Safaricom's STK callback body. */
export function parseCallback(body) {
  const cb = body?.Body?.stkCallback
  if (!cb?.CheckoutRequestID) return null
  const items = Object.fromEntries((cb.CallbackMetadata?.Item ?? []).map((i) => [i.Name, i.Value]))
  return {
    checkoutId: cb.CheckoutRequestID,
    ok: Number(cb.ResultCode) === 0,
    resultCode: Number(cb.ResultCode),
    message: cb.ResultDesc ?? '',
    receipt: items.MpesaReceiptNumber ?? null,
    amount: items.Amount != null ? Number(items.Amount) : null,
  }
}

/** Words a parent can act on, for the result codes people actually hit. */
export function failureMessage(code, fallback = '') {
  switch (Number(code)) {
    case 1032:
      return 'The payment was cancelled on the phone.'
    case 1:
      return 'There is not enough money in M-Pesa for this plan.'
    case 2001:
      return 'The M-Pesa PIN was wrong. Please try again.'
    case 1037:
    case 1019:
      return 'The phone did not answer in time. Check it is on and try again.'
    default:
      return fallback || 'The payment did not go through. Please try again.'
  }
}

export const expiryFrom = (paidAt, days) => paidAt + days * 86400_000
