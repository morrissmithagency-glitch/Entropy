// Kobe the tortoise ("kobe" is Kiswahili for tortoise). Slow and steady wins: the
// mascot's whole personality is patient encouragement.
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { useEffect, useId, useRef, useState, type PointerEvent as RPointerEvent } from 'react'
import { haptic } from './motion'

export type Mood = 'idle' | 'happy' | 'cheer' | 'think' | 'oops'

const INK = '#1f2733'
const SKIN = '#a9bd8c'
const SKIN_SHADE = '#88a06e'

/** How Kobe answers a run of pokes: a giggle, then tickled, then grumpy, then hiding. */
type Reaction = 'giggle' | 'tickle' | 'grumpy' | 'hide' | 'peek'
const LINES: Record<Reaction, string[]> = {
  giggle: ['Hehe!', 'Hello!', 'Jambo!'],
  tickle: ['Tickly!', 'Hihi, stop!'],
  grumpy: ['Hmph!', 'Hey!'],
  hide: ['Need space!'],
  peek: ['Friends?'],
}

interface KobeProps {
  mood?: Mood
  size?: number
  className?: string
  interactive?: boolean
  /** Face left instead of right (the speech bubble never flips). */
  flip?: boolean
  /** Legs step while Kobe walks. */
  walking?: boolean
  /** Head dips to the grass. */
  nibbling?: boolean
  /** Told when a child pokes Kobe, so whatever moves Kobe can pause. */
  onPoke?: () => void
}

export function Kobe({ mood = 'idle', size = 220, className, interactive = true, flip = false, walking = false, nibbling = false, onPoke }: KobeProps) {
  const ref = useRef<SVGSVGElement>(null)
  const [reaction, setReaction] = useState<Reaction | null>(null)
  const [line, setLine] = useState<string | null>(null)
  const [tucked, setTucked] = useState(false)
  const place = useAnimationControls()
  const pokes = useRef({ count: 0, last: 0, busy: false })
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const later = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const [look, setLook] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(false)
  const body = useAnimationControls()
  const arm = useAnimationControls()
  const pid = useId().replace(/:/g, '')
  const flipRef = useRef(flip)
  flipRef.current = flip

  // Eyes follow the pointer anywhere on the page.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      const cx = r.left + r.width * (flipRef.current ? 0.22 : 0.78)
      const cy = r.top + r.height * 0.5
      const dx = (e.clientX - cx) * (flipRef.current ? -1 : 1)
      const dy = e.clientY - cy
      const d = Math.hypot(dx, dy) || 1
      const k = Math.min(1, d / 260)
      setLook({ x: (dx / d) * k, y: (dy / d) * k })
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    let alive = true
    const loop = () => {
      if (!alive) return
      setBlink(true)
      setTimeout(() => setBlink(false), 130)
      setTimeout(loop, 2600 + Math.random() * 3000)
    }
    const t = setTimeout(loop, 1800)
    return () => {
      alive = false
      clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    if (mood === 'cheer') {
      void body.start({ y: [0, -26, 0, -12, 0], rotate: [0, -3, 2, 0], transition: { duration: 0.9, ease: 'easeOut' } })
      void arm.start({ rotate: [0, -70, -40, -70, -40, 0], transition: { duration: 1.1 } })
    } else if (mood === 'happy') {
      void body.start({ y: [0, -10, 0], transition: { duration: 0.45 } })
    } else if (mood === 'oops') {
      void body.start({ rotate: [0, -4, 3, -2, 0], transition: { duration: 0.6 } })
    } else {
      void body.start({ y: 0, rotate: 0 })
    }
  }, [mood, body, arm])

  const say = (r: Reaction, ms: number) => {
    const options = LINES[r]
    setReaction(r)
    setLine(options[Math.floor(Math.random() * options.length)])
    timers.current.forEach(clearTimeout)
    timers.current = []
    later(ms, () => {
      setReaction(null)
      setLine(null)
    })
  }

  const poke = (e: RPointerEvent) => {
    const p = pokes.current
    if (!interactive || p.busy) return
    const now = Date.now()
    p.count = now - p.last > 2600 ? 1 : p.count + 1
    p.last = now
    haptic('tap')
    onPoke?.()
    if (p.count <= 2) {
      say('giggle', 1100)
      void body.start({ scaleY: [1, 0.86, 1.06, 1], scaleX: [1, 1.08, 0.97, 1], transition: { duration: 0.5 } })
    } else if (p.count <= 4) {
      say('tickle', 1300)
      void body.start({ rotate: [0, -6, 6, -4, 4, 0], y: [0, -6, 0], transition: { duration: 0.6 } })
    } else if (p.count <= 6) {
      say('grumpy', 1400)
      void body.start({ rotate: [0, -3, 3, -3, 0], transition: { duration: 0.45 } })
    } else {
      // Enough: tuck into the shell and shuffle away from the finger, then make up.
      p.busy = true
      say('hide', 2600)
      setTucked(true)
      const r = ref.current?.getBoundingClientRect()
      const centre = r ? r.left + r.width / 2 : 0
      let dir = centre >= e.clientX ? 1 : -1
      if (r && (r.right + 80 > window.innerWidth ? dir > 0 : r.left - 80 < 0 ? dir < 0 : false)) dir = -dir
      void place.start({ x: dir * 70, transition: { duration: 0.9, ease: [0.3, 0.7, 0.3, 1] } })
      later(2700, () => {
        setTucked(false)
        say('peek', 1800)
        later(1900, () => {
          void place.start({ x: 0, transition: { duration: 1.6, ease: 'easeInOut' } })
          p.count = 0
          p.busy = false
        })
      })
    }
  }

  const shownMood: Mood = reaction === 'giggle' || reaction === 'tickle' ? 'happy' : reaction === 'grumpy' ? 'oops' : reaction === 'peek' ? 'think' : mood
  const look2 = shownMood === 'think' ? { x: 0.3, y: -0.9 } : look
  const happyEyes = shownMood === 'happy' || shownMood === 'cheer'
  const px = look2.x * 3.6
  const py = look2.y * 3.2

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 230 180"
      width={size}
      height={(size * 180) / 230}
      className={className}
      role="img"
      aria-label="Kobe the tortoise"
      animate={place}
      onPointerDown={poke}
      style={{ overflow: 'visible', cursor: interactive ? 'pointer' : undefined, touchAction: 'manipulation', pointerEvents: interactive ? 'auto' : undefined }}
    >
      <defs>
        <pattern id={`${pid}-plates`} width="34" height="30" patternUnits="userSpaceOnUse" patternTransform="translate(6 4)">
          <path d="M8.5 0h17L34 15l-8.5 15h-17L0 15z" fill="#e6c07e" stroke={INK} strokeWidth="2.2" />
          <circle cx="17" cy="15" r="3.2" fill="#3f6a7a" />
        </pattern>
        <clipPath id={`${pid}-shell`}>
          <path d="M26 118C26 64 62 34 108 34s80 30 80 84z" />
        </clipPath>
      </defs>
      {/* breathing wrapper */}
      <g transform={flip ? 'translate(230 0) scale(-1 1)' : undefined}>
      <motion.g animate={{ scaleY: [1, 1.018, 1] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} style={{ originY: 1 }}>
        <ellipse cx="112" cy="166" rx="88" ry="10" fill={INK} opacity="0.16" />
        <motion.g animate={body}>
          {/* back legs */}
          <motion.g animate={{ y: tucked ? -22 : walking ? [0, -6, 0, 0] : 0 }} transition={tucked || !walking ? { duration: 0.25 } : { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M42 120c-6 18-2 34 10 38h16c4-10 4-24 0-38z" fill={SKIN_SHADE} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <path d="M142 122c-4 16-2 30 6 36h16c6-10 6-24 2-36z" fill={SKIN_SHADE} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          </motion.g>
          {/* shell */}
          <path d="M26 118C26 64 62 34 108 34s80 30 80 84z" fill="#b97a66" stroke={INK} strokeWidth="3.2" strokeLinejoin="round" />
          <g clipPath={`url(#${pid}-shell)`}>
            <rect x="20" y="30" width="180" height="90" fill={`url(#${pid}-plates)`} opacity="0.95" />
            <path d="M40 60c30-24 106-26 140 0" stroke="#fff" strokeOpacity="0.45" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>
          {/* kanga rim */}
          <path d="M22 116h170c4 0 6 3 6 6s-2 6-6 6H22c-4 0-6-3-6-6s2-6 6-6z" fill="#2f4a63" stroke={INK} strokeWidth="3" />
          {Array.from({ length: 15 }, (_, i) => (
            <circle key={i} cx={30 + i * 11.4} cy={122} r={2.3} fill="#e6c07e" />
          ))}
          {/* front legs */}
          <motion.g animate={{ y: tucked ? -26 : walking ? [0, 0, -6, 0] : 0 }} transition={tucked || !walking ? { duration: 0.25 } : { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M60 126c-4 14-2 26 6 32h20c4-10 4-22 0-32z" fill={SKIN} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <motion.g animate={arm} style={{ originX: 0.5, originY: 0.05 }}>
              <path d="M160 126c-4 14-2 26 6 32h20c4-10 4-22 0-32z" fill={SKIN} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            </motion.g>
          </motion.g>
          {/* neck + head (pulled into the shell when Kobe hides) */}
          <motion.g
            animate={tucked ? { x: -34, y: 18, scale: 0.4, opacity: 0, rotate: 0 } : nibbling ? { x: [0, 4, 4, 0], y: [0, 16, 14, 0], scale: 1, opacity: 1, rotate: [0, 14, 12, 0] } : { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
            transition={tucked ? { duration: 0.22, ease: 'easeOut' } : nibbling ? { duration: 1.4, repeat: Infinity, repeatDelay: 0.3, ease: 'easeInOut' } : { duration: 0.5, ease: 'easeOut' }}
            style={{ originX: 0, originY: 1 }}
          >
          <path d="M172 104c4-14 12-22 20-24l10 26c-8 8-20 10-30-2z" fill={SKIN} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <g>
            <ellipse cx="192" cy="78" rx="32" ry="29" fill={SKIN} stroke={INK} strokeWidth="3.2" />
            <ellipse cx="184" cy="64" rx="14" ry="6" fill="#fff" opacity="0.28" />
            {/* scarf */}
            <path d="M166 98c12 8 34 8 46-2l4 8c-14 12-40 12-54 2z" fill="#d08a7a" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
            <path d="M200 104l6 18 8-4-4-16z" fill="#d08a7a" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
            <circle cx="176" cy="102" r="1.8" fill="#f2b33d" />
            <circle cx="188" cy="104" r="1.8" fill="#f2b33d" />
            <circle cx="200" cy="102" r="1.8" fill="#f2b33d" />
            {/* eyes */}
            {[178, 204].map((cx, i) => (
              <g key={cx}>
                {happyEyes ? (
                  <path d={`M${cx - 8} ${76}q8 -9 16 0`} fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
                ) : (
                  <>
                    <ellipse cx={cx} cy={74} rx="9" ry={blink ? 1.2 : 10.5} fill="#fff" stroke={INK} strokeWidth="2.6" />
                    {!blink && (
                      <>
                        <circle cx={cx + px} cy={75 + py} r="5" fill={INK} />
                        <circle cx={cx + px + 1.8} cy={73 + py} r="1.7" fill="#fff" />
                      </>
                    )}
                  </>
                )}
                {(shownMood === 'oops' || shownMood === 'think') && (
                  // Worried brows lift at the inner ends; thinking raises one brow.
                  <path
                    d={shownMood === 'oops' ? (i === 0 ? `M${cx - 8} 61l13 -5` : `M${cx + 8} 61l-13 -5`) : i === 0 ? `M${cx - 8} 59l14 -1` : `M${cx + 8} 55l-14 1`}
                    stroke={INK}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}
              </g>
            ))}
            {/* cheeks */}
            <ellipse cx="172" cy="88" rx="5" ry="3" fill="#e86a8a" opacity="0.55" />
            <ellipse cx="212" cy="88" rx="5" ry="3" fill="#e86a8a" opacity="0.55" />
            {/* mouth */}
            {shownMood === 'think' ? (
              <circle cx="192" cy="91" r="3.4" fill={INK} />
            ) : shownMood === 'oops' ? (
              <path d="M184 92q8 4 16 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            ) : happyEyes ? (
              <path d="M180 88q12 14 24 0z" fill="#9c3b27" stroke={INK} strokeWidth="2.8" strokeLinejoin="round" />
            ) : (
              <path d="M182 89q10 9 20 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            )}
          </g>
          </motion.g>
        </motion.g>
      </motion.g>
      </g>
      <AnimatePresence>
        {line && (
          <motion.g
            key={line}
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            style={{ originX: 0.5, originY: 1 }}
            pointerEvents="none"
          >
            <rect x={118 - line.length * 6.2 - 16} y={-44} width={line.length * 12.4 + 32} height={46} rx={23} fill="#fffaf0" stroke={INK} strokeWidth="3" />
            <path d="M124 1l14 12 2-12z" fill="#fffaf0" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <path d="M121 0h22" stroke="#fffaf0" strokeWidth="4" />
            <text x={118} y={-14} textAnchor="middle" fontSize="23" fontWeight="700" fill={INK} fontFamily="inherit">
              {line}
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </motion.svg>
  )
}
