export interface Plan {
  id: string
  name: string
  price: number
  days: number
  children: number
  allGrades: boolean
}
export const PLANS: Plan[]
export function planById(id: string): Plan | null
export function normalisePhone(input: unknown): string | null
export function darajaTimestamp(date?: Date): string
export function stkPassword(shortcode: string, passkey: string, timestamp: string): string
export function darajaBase(env: string | undefined): string
export function parseCallback(body: unknown): { checkoutId: string; ok: boolean; resultCode: number; message: string; receipt: string | null; amount: number | null } | null
export function failureMessage(code: number | string, fallback?: string): string
export function expiryFrom(paidAt: number, days: number): number
