import { describe, expect, it } from 'vitest'
import * as lib from '../../../server/affiliate-lib.mjs'
import { captureRef, cleanCode, earnings, storedRef, TERMS } from '../affiliate'
import { PLANS } from '../plans'

const DAY = 86400_000
const t0 = Date.UTC(2026, 0, 10)

describe('affiliate terms', () => {
  it('are the agreed rates', () => {
    expect(TERMS).toEqual({ firstRate: 0.1, renewalRate: { week: 0.14, month: 0.16 }, renewalDays: 365, holdDays: 7, minPayout: 500, minAge: 18 })
    expect(lib.TERMS).toEqual(TERMS)
  })

  it('show the app the same shillings the server pays', () => {
    for (const p of PLANS) {
      const e = earnings(p)
      expect(lib.commissionFor({ amount: p.price, planDays: p.days, first: true, firstPaidAt: t0, paidAt: t0 })?.commission).toBe(e.first)
      expect(lib.commissionFor({ amount: p.price, planDays: p.days, first: false, firstPaidAt: t0, paidAt: t0 + 30 * DAY })?.commission).toBe(e.renewal)
    }
    expect(PLANS.map((p) => [p.id, earnings(p).first, earnings(p).renewal])).toEqual([
      ['weekly', 30, 42],
      ['standard', 95, 152],
      ['pro', 125, 200],
      ['superpro', 345, 552],
    ])
  })
})

describe('commissions', () => {
  const c = (o: Partial<Parameters<typeof lib.commissionFor>[0]>) => lib.commissionFor({ amount: 300, planDays: 7, first: false, firstPaidAt: t0, paidAt: t0, ...o })
  it('pay 10% on the first payment whatever the plan', () => {
    expect(c({ first: true })).toEqual({ kind: 'first', rate: 0.1, commission: 30 })
    expect(c({ first: true, amount: 950, planDays: 30 })).toEqual({ kind: 'first', rate: 0.1, commission: 95 })
  })
  it('pay 14% on weekly and 16% on monthly renewals', () => {
    expect(c({ paidAt: t0 + 7 * DAY })?.rate).toBe(0.14)
    expect(c({ amount: 1250, planDays: 30, paidAt: t0 + 30 * DAY })).toEqual({ kind: 'renewal', rate: 0.16, commission: 200 })
  })
  it('stop renewals a year after the first payment', () => {
    expect(c({ paidAt: t0 + 365 * DAY })).not.toBeNull()
    expect(c({ paidAt: t0 + 366 * DAY })).toBeNull()
  })
  it('round down to whole shillings', () => {
    expect(c({ amount: 299, first: true })?.commission).toBe(29)
  })
})

describe('who gets the parent', () => {
  const affiliates = [
    { id: 'a1', code: 'AMIN482', status: 'approved', phone: '254722111222' },
    { id: 'a2', code: 'OTIE101', status: 'pending', phone: '254733000000' },
  ]
  const at = (o: Partial<Parameters<typeof lib.attribute>[0]>) => lib.attribute({ payerPhone: '254700100100', refCode: 'AMIN482', existing: null, paidBefore: false, affiliates, ...o })
  it('a new parent with an approved code', () => expect(at({ refCode: ' amin482 ' })).toBe('a1'))
  it('not with a pending or unknown code', () => {
    expect(at({ refCode: 'OTIE101' })).toBeNull()
    expect(at({ refCode: 'NOPE123' })).toBeNull()
    expect(at({ refCode: '' })).toBeNull()
  })
  it('not a parent who already paid before', () => expect(at({ paidBefore: true })).toBeNull())
  it('not the affiliate paying for themselves', () => expect(at({ payerPhone: '254722111222' })).toBeNull())
  it('keeps a parent with the first affiliate', () => expect(at({ existing: { affiliateId: 'a9' }, refCode: 'AMIN482' })).toBe('a9'))
})

describe('balances', () => {
  it('hold for a week, then become payable', () => {
    const list = [
      { status: 'open', at: t0, commission: 30 },
      { status: 'open', at: t0 + 5 * DAY, commission: 42 },
      { status: 'paid', at: t0 - 40 * DAY, commission: 500 },
      { status: 'void', at: t0, commission: 999 },
    ]
    expect(lib.balances(list, t0 + 8 * DAY)).toEqual({ held: 42, payable: 30, paid: 500 })
  })
})

describe('applicants', () => {
  const now = Date.UTC(2026, 9, 24, 12)
  it('must be 18 by the Kenyan calendar', () => {
    expect(lib.ageOn('2008-10-24', now)).toBe(18)
    expect(lib.ageOn('2008-10-25', now)).toBe(17)
    expect(lib.ageOn('2008-02-30', now)).toBeNull()
    expect(lib.ageOn('24/10/2008', now)).toBeNull()
  })
  it('need a real ID number and full name', () => {
    expect(lib.validIdNumber('23456789')).toBe(true)
    expect(lib.validIdNumber('2345')).toBe(false)
    expect(lib.cleanName('  Amina   Wanjiru ')).toBe('Amina Wanjiru')
    expect(lib.cleanName('Amina')).toBeNull()
    expect(lib.cleanName("Akinyi O'Neill-Otieno")).toBe("Akinyi O'Neill-Otieno")
  })
  it('get a short unique code', () => {
    const taken = new Set(['AMIN460'])
    let i = 0
    const seq = [0.4, 0.4, 0.9]
    expect(lib.makeCode('Amina Wanjiru', taken, () => seq[i++])).toBe('AMIN910')
    expect(lib.makeCode('Li', new Set(), () => 0)).toBe('LIKO100')
  })
  it('see parents only as masked numbers', () => expect(lib.maskPhone('254712345678')).toBe('0712 ••• 678'))
  it('have keys stored only as hashes', () => {
    const k = lib.newKey()
    expect(k.length).toBeGreaterThan(30)
    expect(lib.hashKey(k)).not.toContain(k)
  })
})

describe('referral links', () => {
  it('keep the code for 30 days', () => {
    const mem = new Map<string, string>()
    globalThis.localStorage = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v), removeItem: (k: string) => void mem.delete(k) } as Storage
    captureRef('?ref=amin-482')
    expect(storedRef()).toBe('AMIN482')
    expect(storedRef(Date.now() + 31 * DAY)).toBe('')
    expect(cleanCode(' ab c-12 ')).toBe('ABC12')
  })
})
