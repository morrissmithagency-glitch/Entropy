// Plans and what each one unlocks. Prices come from server/plans.json, the same file the
// payments server charges from, so the app can never show a price the server won't take.
import RAW from '../../server/plans.json'

export type PlanId = 'weekly' | 'standard' | 'pro' | 'superpro'

export interface Plan {
  id: PlanId
  name: string
  /** KSh, charged once per period. */
  price: number
  days: number
  children: number
  /** Every grade, or one grade chosen at checkout. */
  allGrades: boolean
  period: 'week' | 'month'
  pitch: string
  perks: { text: string; soon?: boolean }[]
  featured?: boolean
}

const DETAILS: Record<PlanId, Pick<Plan, 'pitch' | 'perks' | 'featured'>> = {
  weekly: {
    pitch: 'Try everything for a week',
    perks: [{ text: 'Every strand in one grade' }, { text: '1 child' }, { text: 'All five levels and Baobab Challenges' }],
  },
  standard: {
    pitch: 'One child, one grade',
    perks: [{ text: 'Every strand in one grade' }, { text: '1 child' }, { text: 'All five levels and Baobab Challenges' }],
  },
  pro: {
    pitch: 'For brothers and sisters',
    featured: true,
    perks: [{ text: 'Every strand in every grade' }, { text: 'Up to 3 children' }, { text: 'All five levels and Baobab Challenges' }],
  },
  superpro: {
    pitch: 'Everything, with reports',
    perks: [
      { text: 'Every strand in every grade' },
      { text: 'Up to 3 children' },
      { text: 'Weekly progress reports for parents', soon: true },
      { text: 'Printable papers for each strand', soon: true },
    ],
  },
}

export const PLANS: Plan[] = (RAW as Omit<Plan, 'period' | 'pitch' | 'perks'>[]).map((p) => ({
  ...p,
  period: p.days <= 7 ? 'week' : 'month',
  ...DETAILS[p.id],
}))

export const findPlan = (id: string) => PLANS.find((p) => p.id === id)

export const ksh = (n: number) => `KSh ${n.toLocaleString('en-KE')}`

/** Safaricom numbers in any common form → 2547XXXXXXXX / 2541XXXXXXXX, or null. Mirrors server/lib.mjs. */
export function normalisePhone(input: string): string | null {
  const s = input.replace(/[\s\-()]/g, '').replace(/^\+/, '')
  const m = s.match(/^(?:254|0)?([17]\d{8})$/)
  return m ? `254${m[1]}` : null
}

/** 254712345678 → 0712 345 678 */
export const prettyPhone = (p: string) => `0${p.slice(3, 6)} ${p.slice(6, 9)} ${p.slice(9)}`
