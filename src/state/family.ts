// The family pass: a username and password that open every grade and strand on a device,
// for good. Only a slow, salted hash of each login lives here, never the login itself.
// To add or change one: node scripts/family-hash.mjs <username> <password>, then paste the
// printed line into FAMILY_LOGINS.
import { setSubscription } from './subscription'

const SALT = 'cbc-helper-family-v1'
const ITERATIONS = 200_000
/** A plan date far enough away to mean "always". */
export const FOREVER = Date.UTC(2999, 0, 1)

export const FAMILY_LOGINS = [
  '9c8124b4e6d78af1e8afd8d5e6f0ee3e44b5e8079639e61ced17d60a9f90bf49',
]

/** PBKDF2-SHA256 of "username\npassword"; the username ignores case and spaces at the ends. */
export async function familyHash(username: string, password: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(`${username.trim().toLowerCase()}\n${password}`), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: enc.encode(SALT), iterations: ITERATIONS }, key, 256)
  return [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** Opens everything on this device if the login is a family one. */
export async function unlockFamily(username: string, password: string, logins = FAMILY_LOGINS): Promise<boolean> {
  if (!username.trim() || !password) return false
  const ok = logins.includes(await familyHash(username, password))
  if (ok) setSubscription({ plan: 'superpro', expiresAt: FOREVER, receipt: null, family: true })
  return ok
}
