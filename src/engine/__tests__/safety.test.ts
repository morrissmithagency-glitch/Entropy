// Content is for young children: no cruelty, violence or frightening wording, even among
// the wrong answers. This scans every question and lesson source for phrases parents
// would not want a child to read.
import { describe, expect, it } from 'vitest'

const SOURCES = import.meta.glob(['../banks/**/*.ts', '../generators/**/*.ts', '../../lessons/**/*.ts', '!**/__tests__/**'], { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const BANNED = [
  /\bkill(s|ed|ing)?\b(?! (germs|all germs|weeds))/i,
  /for fun/i,
  /\bbeat(s|ing)? (them|the (goat|cow|dog|cat|donkey|animal)|animals)/i,
  /\bpoison(ing)? (the|them|animals)/i,
  /\bcruel/i,
  /\bmurder|\bstab(bed|bing)?\b|\bgun\b|\bblood(y)? (shed|bath)|\bslaughter/i,
]

describe('child-safe content', () => {
  it('finds the content files', () => expect(Object.keys(SOURCES).length).toBeGreaterThan(20))
  for (const [file, text] of Object.entries(SOURCES)) {
    it(`${file} has no frightening or cruel wording`, () => {
      const lines = text.split('\n')
      lines.forEach((line, i) => {
        for (const re of BANNED) expect(re.test(line), `${file}:${i + 1}: ${line.trim()}`).toBe(false)
      })
    })
  }
})
