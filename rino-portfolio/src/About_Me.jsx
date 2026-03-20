import { MdOutlineEmail } from 'react-icons/md'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { useState } from 'react'

function About_Me() {

    const [copied, setCopied] = useState(false)
 
    const handleEmailClick = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText('rino.genistus@gmail.com')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
      <section className="about-section" id='about'>
   
        {/* Section label */}
        <div className="section-label">about.me</div>
   
        <div className="about-grid">
   
          {/* Main bio block */}
          <div className="about-bio">
            <p className="about-eyebrow">// introducing</p>
            <h2 className="about-name">
              Rino Genistus<br />
              <span>Ruban</span>
            </h2>
            <p className="about-text">
              Sophomore at <span className="about-highlight">Rutgers University - New Brunswick</span>,
              studying Computer Science with a minor in Mathematics.
              Currently diving deep into Neural Networks and LLMs —
              specifically how to localize and specialize large language models for targeted tasks.
            </p>
            <p className="about-text">
              Aspiring to work as a <span className="about-highlight">Data Science Engineer</span> or{' '}
              <span className="about-highlight">AI/ML Engineer</span>.
            </p>
          </div>

        <div className="contact-methods">
            <a
              className="contact-btn contact-gmail"
              href="mailto:rino.genistus@gmail.com"
              onClick={handleEmailClick}
            >
              <MdOutlineEmail size={16} />
              <span className="contact-label">
                {copied ? '// Copied!' : '// Gmail'}
              </span>
              <span className="contact-arrow">↗</span>
            </a>
 
            <a
              className="contact-btn contact-linkedin"
              href="https://linkedin.com/in/rino-ruban-65347625a"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn size={14} />
              <span className="contact-label">// LinkedIn</span>
              <span className="contact-arrow">↗</span>
            </a>
 
            <a
              className="contact-btn contact-github"
              href="https://github.com/rino-genistus"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={15} />
              <span className="contact-label">// GitHub</span>
              <span className="contact-arrow">↗</span>
            </a>
          </div>
        </div>
   
          {/* Stats / info cards */}
          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-label">// status</span>
              <span className="stat-value">Sophomore</span>
              <span className="stat-sub">Rutgers University - NB</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">// major</span>
              <span className="stat-value">Computer Science</span>
              <span className="stat-sub">Minor: Mathematics</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">// focus</span>
              <span className="stat-value">Neural Networks</span>
              <span className="stat-sub">LLMs · Localization</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">// goal</span>
              <span className="stat-value">AI/ML Engineer</span>
              <span className="stat-sub">Data Science Engineer</span>
            </div>
          </div>
      </section>
    );
  }
   
  export default About_Me;