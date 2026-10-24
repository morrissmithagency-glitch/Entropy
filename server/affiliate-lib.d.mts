export interface Terms {
  firstRate: number
  renewalRate: { week: number; month: number }
  renewalDays: number
  holdDays: number
  minPayout: number
  minAge: number
}
export const TERMS: Terms
export function ageOn(dob: unknown, now?: number): number | null
export function validIdNumber(s: unknown): boolean
export function cleanName(s: unknown): string | null
export function makeCode(name: string, taken: Set<string>, rand?: () => number): string
export function newKey(): string
export function hashKey(key: string): string
export function periodOf(days: number): 'week' | 'month'
export function commissionFor(
  p: { amount: number; planDays: number; first: boolean; firstPaidAt: number; paidAt: number },
  terms?: Terms,
): { kind: 'first' | 'renewal'; rate: number; commission: number } | null
export function attribute(p: {
  payerPhone: string
  refCode?: string | null
  existing?: { affiliateId: string } | null
  paidBefore: boolean
  affiliates: { id: string; code: string; status: string; phone: string }[]
}): string | null
export function balances(commissions: { status: string; at: number; commission: number }[], now?: number, terms?: Terms): { held: number; payable: number; paid: number }
export function maskPhone(p: string): string
