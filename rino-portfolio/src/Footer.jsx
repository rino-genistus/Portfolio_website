import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'

function Footer() {
  return (
    <footer className="footer">
      <span className="footer-name">
        <span className="footer-prefix">&gt; </span>
        Rino Genistus Ruban
      </span>

      <div className="footer-stack">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--dim)' }}>built with</span>
        <span className="footer-stack-chip">React</span>
        <span className="footer-stack-chip">Vite</span>
        <span className="footer-stack-chip">JetBrains Mono</span>
      </div>

      <div className="footer-links">
        <a href="mailto:rino.genistus@gmail.com" className="footer-icon" title="Email">
          <MdOutlineEmail size={16} />
        </a>
        <a href="https://linkedin.com/in/rino-ruban-65347625a" target="_blank" rel="noreferrer" className="footer-icon" title="LinkedIn">
          <FaLinkedinIn size={14} />
        </a>
        <a href="https://github.com/rino-genistus" target="_blank" rel="noreferrer" className="footer-icon" title="GitHub">
          <FaGithub size={15} />
        </a>
      </div>
    </footer>
  )
}

export default Footer