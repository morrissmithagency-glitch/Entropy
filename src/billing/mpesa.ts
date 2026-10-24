// Talks to the payments server (server/). Without VITE_PAYMENTS_API the app runs in test
// mode: the M-Pesa prompt is acted out on screen and no money moves.
import type { GradeId } from '../curriculum'
import type { PlanId } from './plans'

export const API = (import.meta.env.VITE_PAYMENTS_API as string | undefined)?.replace(/\/$/, '')

export const TEST_MODE = !API

export type PayStatus =
  | { status: 'pending' }
  | { status: 'paid'; receipt: string | null; expiresAt: number }
  | { status: 'failed'; message: string }

export async function call<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } })
  } catch {
    throw new Error('No internet connection. Please check your data or Wi-Fi.')
  }
  const json = (await res.json().catch(() => ({}))) as T & { error?: string }
  if (!res.ok) throw new Error(json.error ?? 'Something went wrong. Please try again.')
  return json
}

// Test mode keeps its pretend payments here. A number ending in 000 is "cancelled",
// so the failure screen can be checked too.
const fake = new Map<string, { at: number; fail: boolean; days: number }>()

/** Sends the M-Pesa prompt to the phone. Returns the payment id to poll. */
export async function requestPayment(input: { plan: PlanId; phone: string; grade?: GradeId; days: number; ref?: string }): Promise<string> {
  if (TEST_MODE) {
    const id = `test-${Date.now()}`
    fake.set(id, { at: Date.now(), fail: input.phone.endsWith('000'), days: input.days })
    await new Promise((r) => setTimeout(r, 900))
    return id
  }
  const { id } = await call<{ id: string }>('/api/pay', { method: 'POST', body: JSON.stringify({ plan: input.plan, phone: input.phone, grade: input.grade, ref: input.ref }) })
  return id
}

export async function paymentStatus(id: string): Promise<PayStatus> {
  if (TEST_MODE) {
    const f = fake.get(id)
    if (!f) return { status: 'failed', message: 'Payment not found.' }
    if (Date.now() - f.at < 5000) return { status: 'pending' }
    if (f.fail) return { status: 'failed', message: 'The payment was cancelled on the phone.' }
    return { status: 'paid', receipt: `TEST${String(f.at).slice(-6)}`, expiresAt: Date.now() + f.days * 86400_000 }
  }
  return call<PayStatus>(`/api/pay/${encodeURIComponent(id)}`)
}
