import { describe, expect, it } from 'vitest'
import * as server from '../../../server/lib.mjs'
import { ALL_AREAS } from '../../curriculum'
import { canOpenStrand, isFreeStrand, type Subscription } from '../../state/subscription'
import { normalisePhone, PLANS } from '../plans'

describe('plans', () => {
  it('match the prices agreed for launch', () => {
    expect(PLANS.map((p) => [p.id, p.price, p.period])).toEqual([
      ['weekly', 300, 'week'],
      ['standard', 950, 'month'],
      ['pro', 1250, 'month'],
      ['superpro', 3450, 'month'],
    ])
  })

  it('are the same plans the server charges for', () => {
    for (const p of PLANS) expect(server.planById(p.id)?.price).toBe(p.price)
    expect(server.PLANS).toHaveLength(PLANS.length)
  })
})

describe('phone numbers', () => {
  const cases: [string, string | null][] = [
    ['0712345678', '254712345678'],
    ['0712 345 678', '254712345678'],
    ['+254 712 345 678', '254712345678'],
    ['254712345678', '254712345678'],
    ['712345678', '254712345678'],
    ['0110 123 456', '254110123456'],
    ['0812345678', null],
    ['071234567', null],
    ['hello', null],
  ]
  it.each(cases)('%s → %s in the app and on the server', (input, out) => {
    expect(normalisePhone(input)).toBe(out)
    expect(server.normalisePhone(input)).toBe(out)
  })
})

describe('what a plan opens', () => {
  const day = 86400_000
  const now = Date.UTC(2026, 9, 22)
  const sub = (plan: Subscription['plan'], grade?: 'g1' | 'g2' | 'g3', expiresAt = now + day): Subscription => ({ plan, grade, expiresAt, receipt: 'X' })

  it('keeps the first strand of every world free', () => {
    for (const area of ALL_AREAS) {
      expect(isFreeStrand(area.strands[0].id)).toBe(true)
      for (const st of area.strands.slice(1)) {
        expect(isFreeStrand(st.id)).toBe(false)
        expect(canOpenStrand(null, st.id, now)).toBe(false)
      }
    }
  })

  it('opens one grade on Weekly and Standard, every grade on Pro and Super Pro', () => {
    const g1 = 'math-measurement'
    const g3 = 'g3-math-measurement'
    for (const plan of ['weekly', 'standard'] as const) {
      expect(canOpenStrand(sub(plan, 'g1'), g1, now)).toBe(true)
      expect(canOpenStrand(sub(plan, 'g1'), g3, now)).toBe(false)
    }
    for (const plan of ['pro', 'superpro'] as const) {
      expect(canOpenStrand(sub(plan), g1, now)).toBe(true)
      expect(canOpenStrand(sub(plan), g3, now)).toBe(true)
    }
  })

  it('closes again when the plan runs out', () => {
    expect(canOpenStrand(sub('pro', undefined, now - 1), 'g3-math-measurement', now)).toBe(false)
  })
})

describe('server helpers', () => {
  it('writes Daraja timestamps in Kenyan time', () => {
    expect(server.darajaTimestamp(new Date(Date.UTC(2026, 0, 31, 22, 5, 9)))).toBe('20260201010509')
  })

  it('builds the STK password from shortcode, passkey and timestamp', () => {
    expect(atob(server.stkPassword('174379', 'key', '20260101000000'))).toBe('174379key20260101000000')
  })

  it('reads a successful callback', () => {
    const body = {
      Body: {
        stkCallback: {
          CheckoutRequestID: 'ws_CO_1',
          ResultCode: 0,
          ResultDesc: 'The service request is processed successfully.',
          CallbackMetadata: { Item: [{ Name: 'Amount', Value: 950 }, { Name: 'MpesaReceiptNumber', Value: 'TJK1ABC2DE' }, { Name: 'PhoneNumber', Value: 254712345678 }] },
        },
      },
    }
    expect(server.parseCallback(body)).toMatchObject({ checkoutId: 'ws_CO_1', ok: true, receipt: 'TJK1ABC2DE', amount: 950 })
  })

  it('reads a cancelled callback and explains it', () => {
    const r = server.parseCallback({ Body: { stkCallback: { CheckoutRequestID: 'ws_CO_2', ResultCode: 1032, ResultDesc: 'Request cancelled by user' } } })
    expect(r).toMatchObject({ ok: false, resultCode: 1032, receipt: null })
    expect(server.failureMessage(1032)).toMatch(/cancelled/)
  })

  it('ignores bodies that are not STK callbacks', () => {
    expect(server.parseCallback({})).toBeNull()
  })
})
