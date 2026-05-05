import { useEffect, useState, useRef } from 'react'

const TITLES = [
  'ML Engineer',
  'CS Student',
  'AI Researcher',
  'Neural Net Builder',
]

/* Magnetic button wrapper */
function MagneticBtn({ children, className, href, onClick, strength = 0.35 }) {
  const zoneRef = useRef(null)
  const btnRef  = useRef(null)
  const rafRef  = useRef(null)

  useEffect(() => {
    const zone = zoneRef.current
    const btn  = btnRef.current
    if (!zone || !btn) return

    const onMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const r  = btn.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top  + r.height / 2
        const dx = (e.clientX - cx) * strength
        const dy = (e.clientY - cy) * strength
        btn.style.transform = `translate(${dx}px, ${dy}px)`
      })
    }

    const onLeave = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      btn.style.transform = 'translate(0, 0)'
    }

    zone.addEventListener('mousemove', onMove, { passive: true })
    zone.addEventListener('mouseleave', onLeave)
    return () => {
      zone.removeEventListener('mousemove', onMove)
      zone.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [strength])

  const Tag = href ? 'a' : 'button'

  return (
    <div ref={zoneRef} className="magnetic-zone">
      <Tag
        ref={btnRef}
        className={className}
        href={href}
        onClick={onClick}
        style={{ transition: 'transform 0.15s cubic-bezier(0.23,1,0.32,1), box-shadow 0.2s' }}
      >
        {children}
      </Tag>
    </div>
  )
}

function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayed, setDisplayed]   = useState('')
  const [deleting, setDeleting]     = useState(false)

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 10)
  }

  useEffect(() => {
    const current = TITLES[titleIndex]
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setTitleIndex((i) => (i + 1) % TITLES.length)
    }
  }, [displayed, deleting, titleIndex])

  return (
    <section className="hero">
      <p className="hero-eyebrow">// welcome to my portfolio</p>

      <h1 className="hero-title">
        I just like<br />
        <span className="hero-outline">building stuff.</span>
      </h1>

      <div className="hero-typing">
        <span className="hero-typing-prefix">~</span>
        <span className="hero-typing-text">{displayed}</span>
        <span className="hero-cursor">▋</span>
      </div>

      <p className="hero-sub">
        Sophomore at Rutgers University studying Computer Science.
        Focused on Neural Networks, LLMs, and making AI work for real problems.
      </p>

      <div className="hero-cta">
        <MagneticBtn
          href="#projects"
          className="hero-btn-primary"
          onClick={scrollTo('projects')}
          strength={0.4}
        >
          View Projects ↓
        </MagneticBtn>

        <MagneticBtn
          href="#about"
          className="hero-btn-ghost"
          onClick={scrollTo('about')}
          strength={0.3}
        >
          About Me
        </MagneticBtn>
      </div>
    </section>
  )
}

export default Hero