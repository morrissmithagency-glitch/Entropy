// A pane of frosted glass that tilts toward the pointer and catches a moving highlight.
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type CSSProperties, type ReactNode } from 'react'

export function GlassPane({
  children,
  onClick,
  disabled,
  className = '',
  style,
  tilt = 10,
  label,
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  style?: CSSProperties
  tilt?: number
  label?: string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    ry.set((x - 0.5) * tilt)
    rx.set((0.5 - y) * tilt)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={label}
      aria-disabled={disabled}
      className={`glass ${className}`}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 700 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? undefined : { scale: 0.96 }}
    >
      {children}
    </motion.button>
  )
}
