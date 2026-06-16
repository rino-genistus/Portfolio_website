import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { FiSun, FiMoon, FiArrowUpRight } from 'react-icons/fi'
import { PROFILE } from '../data'
import { useActiveSection, useTheme } from '../hooks'
import { EASE } from './primitives'

const LINKS = [
  { id: 'about', label: 'About', n: '01' },
  { id: 'skills', label: 'Skills', n: '02' },
  { id: 'projects', label: 'Work', n: '03' },
]

export default function Nav({ onContact, ready }) {
  const [dark, toggleTheme] = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(['about', 'skills', 'projects'])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-line bg-ground/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Wordmark */}
        <a href="#top" onClick={go('top')} data-cursor="hover" className="group flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-accentInk">
            <span className="serif text-sm font-semibold leading-none">R</span>
          </span>
          <span className="text-sm font-medium tracking-tight">
            Rino<span className="text-muted"> Ruban</span>
          </span>
        </a>

        {/* Center index */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={go(l.id)}
              data-cursor="hover"
              className={`group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                active === l.id ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              <span className={`mono text-[10px] ${active === l.id ? 'text-accent' : 'text-dim'}`}>
                {l.n}
              </span>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-cursor="hover"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line2 hover:text-ink"
          >
            {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>
          <a
            href={PROFILE.resume}
            download="Rino_Genistus_Ruban_Resume.pdf"
            data-cursor="hover"
            className="link-wipe hidden text-sm text-muted transition-colors hover:text-ink sm:inline"
          >
            Résumé
          </a>
          <button
            onClick={onContact}
            data-cursor="hover"
            className="group flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-ground transition-colors"
          >
            Get in touch
            <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.header>
  )
}
