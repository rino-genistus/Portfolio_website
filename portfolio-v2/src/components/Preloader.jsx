import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { EASE } from './primitives'
import { PROFILE } from '../data'

/* ── Intro sequence ──
   A counter races 0 → 100 while the name reveals, then the whole
   curtain lifts away to hand off into the hero. Coordinates with
   Hero/Nav entrances via App's `ready` flag. */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const DURATION = 1500
    const start = performance.now()
    let raf

    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1)
      // ease-out so it decelerates into 100
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 280)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-ground px-5 py-6 sm:px-8 sm:py-8"
      initial={{ y: 0 }}
      exit={{ y: '-101%' }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {/* top label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mono flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted"
      >
        <span className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Portfolio
        </span>
        <span className="text-dim">© {new Date().getFullYear()}</span>
      </motion.div>

      {/* center name reveal */}
      <div className="flex flex-1 items-center">
        <h1 className="headline text-[clamp(2.5rem,11vw,9rem)] leading-[0.9]">
          {['Rino', 'Genistus'].map((word, i) => (
            <span key={word} className="line-mask">
              <motion.span
                className={`block ${i === 1 ? 'italic text-muted' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: EASE }}
              >
                {word}
                {i === 1 && <span className="text-accent">.</span>}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      {/* bottom: progress line + counter */}
      <div className="flex items-end justify-between gap-6">
        <span className="mono hidden max-w-xs text-xs leading-relaxed text-dim sm:block">
          {PROFILE.roles.join(' / ')}
        </span>
        <div className="flex flex-1 items-end gap-6 sm:flex-none">
          <div className="relative h-px flex-1 overflow-hidden bg-line sm:w-48 sm:flex-none">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              style={{ width: `${count}%` }}
            />
          </div>
          <span className="headline w-[2.5ch] text-right text-3xl tabular-nums sm:text-5xl">
            {count}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
