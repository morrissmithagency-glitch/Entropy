import { describe, expect, it } from 'vitest'
import { FAMILY_LOGINS, FOREVER, familyHash, unlockFamily } from '../family'
import { canOpenStrand, getSubscription, setSubscription } from '../subscription'
import { ALL_AREAS } from '../../curriculum'

// A throwaway login, so the real one never appears in the code.
const login = async () => [await familyHash('test-family', 'a long test password')]

describe('family pass', () => {
  it('opens every strand in every grade with a family login, ignoring case in the username', async () => {
    setSubscription(null)
    expect(await unlockFamily('  Test-Family ', 'a long test password', await login())).toBe(true)
    const sub = getSubscription()
    expect(sub?.family).toBe(true)
    expect(sub?.expiresAt).toBe(FOREVER)
    for (const a of ALL_AREAS) for (const s of a.strands) expect(canOpenStrand(sub, s.id)).toBe(true)
  })
  it('refuses anything else', async () => {
    setSubscription(null)
    const logins = await login()
    expect(await unlockFamily('test-family', 'A long test password', logins)).toBe(false)
    expect(await unlockFamily('test-family', '', logins)).toBe(false)
    expect(await unlockFamily('someone', 'a long test password', logins)).toBe(false)
    expect(getSubscription()).toBeNull()
  })
  it('keeps only hashes in the code', () => {
    for (const h of FAMILY_LOGINS) expect(h).toMatch(/^[0-9a-f]{64}$/)
  })
})
