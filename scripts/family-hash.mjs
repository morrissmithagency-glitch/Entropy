// Prints the line to add to FAMILY_LOGINS in src/state/family.ts for a new family login.
// Usage: node scripts/family-hash.mjs <username> <password>
import { pbkdf2Sync } from 'node:crypto'

const [user, pass] = process.argv.slice(2)
if (!user || !pass) {
  console.error('Usage: node scripts/family-hash.mjs <username> <password>')
  process.exit(1)
}
const hash = pbkdf2Sync(`${user.trim().toLowerCase()}\n${pass}`, 'cbc-helper-family-v1', 200_000, 32, 'sha256').toString('hex')
console.log(`  '${hash}',`)
