import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'motion/react'
import { FiArrowUp } from 'react-icons/fi'

/* Top scroll-progress bar */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-px origin-left bg-accent"
    />
  )
}

/* Back-to-top */
export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      data-cursor="hover"
      className="fixed bottom-6 right-6 z-[60] grid h-12 w-12 place-items-center rounded-full border border-line2 bg-ground text-ink transition-colors hover:border-accent hover:text-accent"
    >
      <FiArrowUp size={17} />
    </motion.button>
  )
}

/* Custom cursor: a dot + a lagging ring that grows over interactive targets.
   Skipped entirely on touch / coarse pointers. */
export function Cursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(dotX, { stiffness: 350, damping: 30, mass: 0.4 })
  const ringY = useSpring(dotY, { stiffness: 350, damping: 30, mass: 0.4 })
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const move = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      const t = e.target
      const interactive = t.closest('a, button, [role="link"], [data-cursor="hover"], input, textarea')
      setHovering(!!interactive)
    }
    const leave = () => setHidden(true)
    const enter = () => setHidden(false)

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [dotX, dotY])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden
        style={{ left: dotX, top: dotY, opacity: hidden ? 0 : 1 }}
        className="pointer-events-none fixed z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
      <motion.div
        aria-hidden
        style={{ left: ringX, top: ringY, opacity: hidden ? 0 : 1 }}
        animate={{ scale: hovering ? 2.4 : 1, opacity: hidden ? 0 : hovering ? 1 : 0.6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="pointer-events-none fixed z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent mix-blend-difference"
      />
    </>
  )
}
