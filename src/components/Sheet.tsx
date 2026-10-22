import { motion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'
import { Icon } from './ui'
import './sheet.css'

/** A bottom sheet on phones, a centred card on wide screens. Styles are in sheet.css. */
export function Sheet({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        role="dialog"
        aria-modal
        className="sheet glass"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="btn icon sheet-close" aria-label="Close" onClick={onClose}>
          {Icon.close}
        </button>
        {children}
      </motion.div>
    </motion.div>
  )
}
