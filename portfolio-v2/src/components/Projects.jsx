import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'motion/react'
import { useLenis } from 'lenis/react'
import { FiGithub, FiArrowUpRight, FiX, FiArrowRight } from 'react-icons/fi'
import { PROJECTS } from '../data'
import { SectionHeader, EASE } from './primitives'
import { useModalA11y } from '../hooks'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
]

function StatusDot({ status, className = '' }) {
  const done = status === 'completed'
  return (
    <span className={`mono inline-flex items-center gap-2 text-xs ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${done ? 'bg-current' : 'animate-pulse bg-current'}`} />
      {done ? 'Completed' : 'In Progress'}
    </span>
  )
}

/* ── Interactive index row ── */
function Row({ project, n, onOpen }) {
  const [hover, setHover] = useState(false)
  const cx = useMotionValue(0)
  const cy = useMotionValue(0)

  const track = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    cx.set(e.clientX - r.left)
    cy.set(e.clientY - r.top)
  }

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      onClick={onOpen}
      onMouseMove={track}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="hover"
      className="group relative block w-full overflow-hidden border-b border-line text-left"
    >
      {/* accent wipe fill */}
      <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-accent transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100" />

      {/* cursor-following View chip */}
      <motion.span
        aria-hidden
        style={{ left: cx, top: cy }}
        animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.5 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="mono pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-ground px-3 py-1.5 text-[11px] text-ink shadow-lg shadow-black/30 sm:flex"
      >
        View <FiArrowUpRight size={12} />
      </motion.span>

      <div className="relative z-10 flex items-center gap-4 px-2 py-6 transition-[padding] duration-500 group-hover:px-6 sm:gap-8 sm:py-8">
        <span className="mono w-8 shrink-0 text-xs text-dim transition-colors group-hover:text-accentInk/70">
          {String(n).padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="headline text-3xl text-ink transition-colors group-hover:text-accentInk sm:text-5xl">
            {project.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            <StatusDot
              status={project.status}
              className="text-muted transition-colors group-hover:text-accentInk/80"
            />
            <span className="mono hidden text-xs text-dim transition-colors group-hover:text-accentInk/70 sm:inline">
              {project.tools.join(' · ')}
            </span>
          </div>
        </div>

        <FiArrowRight className="shrink-0 -translate-x-2 text-2xl text-ink opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-accentInk group-hover:opacity-100" />
      </div>
    </motion.button>
  )
}

function DetailModal({ project, onClose }) {
  const lenis = useLenis()
  const panelRef = useRef(null)
  useModalA11y(panelRef)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [onClose, lenis])

  if (!project) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — project details`}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ground/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        data-lenis-prevent
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-line2 bg-surface p-7 outline-none sm:rounded-3xl sm:p-9"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className="mono text-xs text-accent">
              Project {String(project.index).padStart(2, '0')} — {project.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
            <h2 className="headline mt-2 text-4xl">{project.name}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            data-cursor="hover"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <FiX size={16} />
          </button>
        </div>

        <p className="leading-relaxed text-muted">{project.description}</p>

        {project.highlights && (
          <>
            <p className="mono mb-3 mt-8 text-xs uppercase tracking-[0.25em] text-dim">Highlights</p>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <span className="mono shrink-0 text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <p className="mono mb-3 mt-8 text-xs uppercase tracking-[0.25em] text-dim">Built with</p>
        <div className="flex flex-wrap gap-2">
          {project.tools.map((t) => (
            <span key={t} className="mono rounded-full border border-line px-3 py-1 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-medium text-accentInk"
        >
          <FiGithub size={15} /> View on GitHub
          <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const visible = PROJECTS.filter((p) => filter === 'all' || p.status === filter)

  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeader index="03" label="Selected Work" title={['Things I have', 'been building.']} note={`${PROJECTS.length} projects`} />

      {/* filters */}
      <div className="mb-2 flex flex-wrap items-center gap-5">
        {FILTERS.map((f) => {
          const n = f.key === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.status === f.key).length
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              data-cursor="hover"
              className={`group flex items-center gap-1.5 text-sm transition-colors ${
                filter === f.key ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              <span className={filter === f.key ? 'link-wipe [background-size:100%_1px]' : 'link-wipe'}>
                {f.label}
              </span>
              <span className="mono text-[10px] text-dim">{n}</span>
            </button>
          )
        })}
      </div>

      {/* index list */}
      <motion.div layout className="mt-6 border-t border-line">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <Row
              key={p.name}
              project={p}
              n={PROJECTS.indexOf(p) + 1}
              onOpen={() => setSelected({ ...p, index: PROJECTS.indexOf(p) + 1 })}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <DetailModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
