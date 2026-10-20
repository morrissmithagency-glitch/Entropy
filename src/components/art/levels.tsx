// The five levels grow like a tree: Seed → Sprout → Sapling → Acacia → Baobab.
import type { ArtId } from './objects'

const INK = '#2a1b12'
const S = { stroke: INK, strokeWidth: 2.6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

const LEVEL_ART = [
  // Seed
  <>
    <path {...S} fill="#8a5a33" d="M8 50c8-6 40-6 48 0v6H8z" />
    <ellipse {...S} cx="32" cy="42" rx="9" ry="12" fill="#c99560" transform="rotate(-24 32 42)" />
    <path d="M29 36c2-3 5-4 7-3" stroke="#fff" strokeOpacity=".6" strokeWidth="2" fill="none" />
  </>,
  // Sprout
  <>
    <path {...S} fill="#8a5a33" d="M8 50c8-6 40-6 48 0v6H8z" />
    <path {...S} fill="none" d="M32 50V30" />
    <path {...S} fill="#7da744" d="M32 34c-4-10-14-12-18-8 4 8 12 10 18 8zM32 30c4-10 14-12 18-8-4 8-12 10-18 8z" />
  </>,
  // Sapling
  <>
    <path {...S} fill="#8a5a33" d="M8 50c8-6 40-6 48 0v6H8z" />
    <path {...S} fill="none" stroke="#6e4b2a" strokeWidth="4" d="M32 50V18" />
    <path {...S} fill="#6b8f3a" d="M32 26c-8-6-16-4-18 0 6 6 14 4 18 0zM32 20c8-6 16-4 18 0-6 6-14 4-18 0zM32 36c-8-4-14-2-16 2 6 4 12 2 16-2zM32 34c8-4 14-2 16 2-6 4-12 2-16-2zM32 18c-2-6 0-10 0-10s4 4 0 10z" />
  </>,
  // Acacia
  <>
    <path {...S} fill="#8a5a33" d="M4 54c10-5 46-5 56 0v4H4z" />
    <path {...S} fill="#6e4b2a" d="M30 54l1-20c-5-3-11-5-14-5l1-3c5 0 10 2 14 5 3-4 8-7 12-8l1 3c-5 2-9 4-12 8l1 20z" />
    <path {...S} fill="#6b8f3a" d="M6 26c4-8 18-12 26-12s24 4 28 12c1 3-2 5-6 5H12c-5 0-8-2-6-5z" />
  </>,
  // Baobab
  <>
    <path {...S} fill="#8a5a33" d="M4 56c10-5 46-5 56 0v4H4z" />
    <path {...S} fill="#a07650" d="M22 56c2-8 2-20 0-30h20c-2 10-2 22 0 30z" />
    <path {...S} fill="none" d="M24 28l-8-10M24 28l-4-14M40 28l8-10M40 28l4-14M32 26V12" />
    <path {...S} fill="#6b8f3a" d="M10 18c0-4 4-6 8-4 2-4 8-4 10 0M38 14c2-4 8-4 10 0 4-2 8 0 8 4M26 12c0-4 4-6 6-6s6 2 6 6" />
    <path d="M27 36c0 6 0 12-1 16" stroke="#fff" strokeOpacity=".35" strokeWidth="2.4" fill="none" />
  </>,
]

export function LevelIcon({ level, size = 48, dim = false }: { level: number; size?: number; dim?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden style={{ filter: dim ? 'grayscale(1) opacity(.45)' : undefined }}>
      {LEVEL_ART[level - 1]}
    </svg>
  )
}

/** One picture per sub-strand for the map stops. */
export const SUB_ICON: Record<string, ArtId> = {
  'm-concept': 'flower',
  'm-whole': 'star',
  'm-add': 'mango',
  'm-sub': 'orange',
  'm-length': 'pencil',
  'm-mass': 'stone',
  'm-capacity': 'jug',
  'm-time': 'sun',
  'm-money': 'coin20',
  'm-lines': 'stick',
  'm-shapes': 'ball',
  'e-sounds': 'drum',
  'e-words': 'ear',
  'e-polite': 'child',
  'e-letters': 'book',
  'e-sight': 'star',
  'e-comprehension': 'teacher',
  'e-naming': 'goat',
  'e-grammar': 'egg',
  'e-position': 'cat',
  'e-spelling': 'pencil',
  'e-sentences': 'bird',
  'v-body': 'soap',
  'v-home': 'house',
  'v-needs': 'bread',
  'v-school': 'bell',
  'v-market': 'tomato',
  'v-weather': 'rain',
  'v-soil': 'loam',
  'v-sound': 'radio',
  'v-water': 'tap',
  'v-plants': 'flower',
  'v-animals': 'giraffe',
  'k-salamu': 'child',
  'k-msamiati': 'lion',
  'k-silabi': 'book',
  'k-ufahamu': 'teacher',
  'k-kuandika': 'pencil',
}
