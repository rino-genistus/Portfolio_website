import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useScroll,
  useVelocity,
  useTransform,
  useAnimationFrame,
  wrap,
} from 'motion/react'

export const EASE = [0.16, 1, 0.3, 1]

/* ── Quiet background: warm vignette + soft accent wash + grain + cursor light ── */
export function Background() {
  const mx = useMotionValue(-500)
  const my = useMotionValue(-500)
  const sx = useSpring(mx, { stiffness: 80, damping: 22, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 80, damping: 22, mass: 0.6 })
  const glow = useMotionTemplate`radial-gradient(28rem 28rem at ${sx}px ${sy}px, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 70%)`

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const move = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  return (
    <>
      <div className="grain" />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* faint baseline grid */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)',
            backgroundSize: '88px 88px',
            maskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, #000 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, #000 40%, transparent 100%)',
          }}
        />
        {/* single soft accent wash, top-right — no rainbow */}
        <div
          className="absolute -top-48 -right-40 h-[44rem] w-[44rem] rounded-full blur-[140px]"
          style={{ background: 'color-mix(in srgb, var(--color-accent) 14%, transparent)' }}
        />
        {/* cursor-following light */}
        <motion.div className="absolute inset-0" style={{ background: glow }} />
        {/* deep vignette bottom for grounding */}
        <div
          className="absolute inset-x-0 bottom-0 h-[40vh]"
          style={{ background: 'linear-gradient(to top, var(--color-ground), transparent)' }}
        />
      </div>
    </>
  )
}

/* ── Magnetic hover wrapper ── */
export function Magnetic({ children, strength = 0.4, className = '' }) {
  const zone = useRef(null)
  const target = useRef(null)
  const raf = useRef(null)

  useEffect(() => {
    const z = zone.current
    const t = target.current
    if (!z || !t) return
    const move = (e) => {
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        const r = t.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2)) * strength
        const dy = (e.clientY - (r.top + r.height / 2)) * strength
        t.style.transform = `translate(${dx}px, ${dy}px)`
      })
    }
    const leave = () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      t.style.transform = 'translate(0,0)'
    }
    z.addEventListener('mousemove', move, { passive: true })
    z.addEventListener('mouseleave', leave)
    return () => {
      z.removeEventListener('mousemove', move)
      z.removeEventListener('mouseleave', leave)
    }
  }, [strength])

  return (
    <span ref={zone} className={`inline-flex ${className}`}>
      <span
        ref={target}
        className="inline-flex"
        style={{ transition: 'transform 0.3s var(--ease-out-expo)' }}
      >
        {children}
      </span>
    </span>
  )
}

/* ── Scroll reveal wrapper ── */
export function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Line-by-line masked text reveal ──
   Pass an array of strings (each = one line). Each line slides up
   from behind a clip mask, staggered. Great for editorial headlines. */
export function RevealLines({ lines, className = '', lineClass = '', delay = 0, stagger = 0.09 }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <motion.span
            className={`block ${lineClass}`}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ── Infinite marquee strip ──
   JS-driven so it can react to scroll: the band drifts at a base speed,
   then speeds up + leans (skew) with scroll velocity and settles via a
   spring. Falls back to a static row under reduced-motion. */
export function Marquee({ items, separator = '✦', className = '', reverse = false, baseVelocity = 1.4 }) {
  const row = [...items, ...items]
  const [reduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const paused = useRef(false)
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 380 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 6], { clamp: false })
  const skew = useTransform(smoothVelocity, [-1500, 0, 1500], [-7, 0, 7], { clamp: true })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return
    const dt = delta / 1000
    const base = (reverse ? -1 : 1) * baseVelocity * dt
    const boost = velocityFactor.get() * dt
    baseX.set(baseX.get() + base + boost)
  })

  return (
    <div
      className="relative flex overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <motion.div
        style={reduce ? undefined : { x, skewX: skew }}
        className={`flex shrink-0 items-center will-change-transform ${className}`}
      >
        {row.map((it, i) => (
          <span key={i} className="flex items-center">
            <span className="whitespace-nowrap">{it}</span>
            <span className="mx-6 text-accent sm:mx-9" aria-hidden>
              {separator}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Numbered section header: big index + label + rule ── */
export function SectionHeader({ index, label, title, note }) {
  return (
    <div className="mb-12 sm:mb-16">
      <div className="mb-6 flex items-baseline gap-4 border-b border-line pb-4">
        <span className="mono text-xs text-accent">({index})</span>
        <span className="mono text-xs uppercase tracking-[0.3em] text-muted">{label}</span>
        {note && <span className="mono ml-auto hidden text-xs text-dim sm:block">{note}</span>}
      </div>
      {title && (
        <RevealLines
          lines={Array.isArray(title) ? title : [title]}
          className="headline text-4xl sm:text-6xl"
        />
      )}
    </div>
  )
}
