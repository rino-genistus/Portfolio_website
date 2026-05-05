import { useEffect, useState } from 'react'

/* ── Light mode CSS vars injected as a class on <html> ── */
const LIGHT_VARS = `
  html.light {
    --bg:          #f4f7fb;
    --bg2:         #eaf0f8;
    --card:        #ffffff;
    --card-hi:     #f0f5fc;
    --border:      #d0dced;
    --border-hi:   #b0c4de;
    --text:        #0f1f35;
    --muted:       #5a7a9a;
    --dim:         #9ab0c8;
    --primary:     #0284c7;
    --primary-dim: rgba(2, 132, 199, 0.08);
    --primary-glow:rgba(2, 132, 199, 0.14);
    --green:       #059669;
    --amber:       #d97706;
    --accent2:     #6366f1;
  }
  html.light body {
    background-image:
      linear-gradient(rgba(2, 132, 199, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(2, 132, 199, 0.06) 1px, transparent 1px);
  }
  html.light .header {
    background: rgba(244, 247, 251, 0.92);
  }
  html.light .scroll-fade-overlay {
    background: linear-gradient(to bottom, transparent, var(--bg) 90%);
  }
`

function injectLightStyles() {
  if (document.getElementById('light-mode-styles')) return
  const style = document.createElement('style')
  style.id = 'light-mode-styles'
  style.textContent = LIGHT_VARS
  document.head.appendChild(style)
}

function Header({ onContactClick }) {
  const [activeSection, setActiveSection] = useState('')
  const [isDark, setIsDark]               = useState(true)

  /* Persist preference */
  useEffect(() => {
    injectLightStyles()
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      document.documentElement.classList.add('light')
      setIsDark(false)
    }
  }, [])

  const toggleTheme = () => {
    const goingLight = isDark
    document.documentElement.classList.toggle('light', goingLight)
    localStorage.setItem('theme', goingLight ? 'light' : 'dark')
    setIsDark(!isDark)
  }

  /* Active section tracking */
  useEffect(() => {
    const sections = ['about', 'skills', 'projects']

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.25, rootMargin: '-56px 0px 0px 0px' }
    )

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="header">
      <h1>Rino Genistus Ruban</h1>

      <nav className="header-nav">
        <a
          href="#about"
          className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
          onClick={scrollTo('about')}
        >
          About
        </a>
        <a
          href="#skills"
          className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
          onClick={scrollTo('skills')}
        >
          Skills
        </a>
        <a
          href="#projects"
          className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
          onClick={scrollTo('projects')}
        >
          Projects
        </a>

        {/* Theme toggle */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? '☀︎' : '☾'}
        </button>

        {/* Resume download */}
        <a
          className="nav-resume-btn"
          href="/resume.pdf"
          download="Rino_Genistus_Ruban_Resume.pdf"
          title="Download resume"
        >
          ↓ Resume
        </a>

        <button className="nav-contact-btn" onClick={onContactClick}>
          Contact
        </button>
      </nav>
    </header>
  )
}

export default Header