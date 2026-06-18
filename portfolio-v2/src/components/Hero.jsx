import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useLenis } from 'lenis/react'
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { PROFILE } from '../data'
import { Magnetic, Marquee, EASE } from './primitives'

/* Live New Jersey (Eastern) time — a small "this is a real person" detail */
function useEasternTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const time = useEasternTime()
  const lenis = useLenis()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const scroll = (id) => (e) => {
    e.preventDefault()
    lenis?.scrollTo(`#${id}`, { offset: -72, duration: 1.2 })
  }

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-5 pt-28 pb-10 sm:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="mb-8 flex flex-col gap-2 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <span className="mono flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available — Summer 2026
          </span>
          <span className="mono flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-dim">
            New Brunswick, NJ
            <span className="text-line2">/</span>
            <span className="tabular-nums text-muted">{time} ET</span>
          </span>
        </motion.div>

        {/* headline */}
        <motion.h1 style={{ y, opacity: fade }} className="headline text-[clamp(3rem,13vw,11rem)]">
          {['I just like', 'building'].map((line, i) => (
            <span key={i} className="line-mask">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={ready ? { y: '0%' } : {}}
                transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
          <span className="line-mask">
            <motion.span
              className="block italic"
              initial={{ y: '110%' }}
              animate={ready ? { y: '0%' } : {}}
              transition={{ duration: 1, delay: 0.44, ease: EASE }}
            >
              stuff<span className="text-accent">.</span>
            </motion.span>
          </span>
        </motion.h1>

        {/* lower row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-[1.2fr_1fr] sm:items-end"
        >
          <p className="max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
            <span className="text-ink">{PROFILE.firstName} {PROFILE.lastName}</span> — {PROFILE.intro}
          </p>

          <div className="flex flex-col items-start gap-5 sm:items-end">
            <div className="flex flex-wrap gap-3">
              <Magnetic strength={0.4}>
                <a
                  href="#projects"
                  onClick={scroll('projects')}
                  data-cursor="hover"
                  className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accentInk"
                >
                  Selected Work
                  <FiArrowDown className="transition-transform group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href="#about"
                  onClick={scroll('about')}
                  data-cursor="hover"
                  className="rounded-full border border-line2 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  About me
                </a>
              </Magnetic>
            </div>
            <div className="flex items-center gap-4 text-muted">
              {[
                { Icon: FiMail, href: `mailto:${PROFILE.email}`, label: 'Email' },
                { Icon: FiLinkedin, href: PROFILE.linkedin, label: 'LinkedIn' },
                { Icon: FiGithub, href: PROFILE.github, label: 'GitHub' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={label}
                  data-cursor="hover"
                  className="transition-colors hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* role marquee, full-bleed at base */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.95 }}
        className="serif mt-12 border-y border-line py-4 text-2xl italic text-ink/80 sm:mt-16 sm:text-3xl"
      >
        <Marquee items={PROFILE.roles} separator="✦" />
      </motion.div>

      {/* scroll cue — fades away as the hero scrolls past */}
      {ready && (
        <motion.div
          aria-hidden
          style={{ opacity: fade, x: '-50%' }}
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
          className="pointer-events-none absolute bottom-5 left-1/2 hidden flex-col items-center gap-2.5 sm:flex"
        >
          <span className="mono text-[10px] uppercase tracking-[0.3em] text-dim">Scroll</span>
          <span className="relative h-9 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 h-3 bg-accent"
              animate={{ y: ['-100%', '300%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.div>
      )}
    </section>
  )
}
