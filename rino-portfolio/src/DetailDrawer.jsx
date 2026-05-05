import { useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'

function DetailDrawer({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null

  const isCompleted = project.status === 'completed'
  const statusClass = isCompleted ? 'status-completed' : 'status-progress'
  const statusLabel = isCompleted ? 'COMPLETED' : 'IN PROGRESS'

  return (
    <div className="drawer-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="drawer-panel">

        <div className="drawer-top-bar">
          <span className="drawer-tag">// project _{String(project.index).padStart(2, '0')}</span>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          <h2 className="drawer-title">{project.name}</h2>
          <span className={`status-badge ${statusClass}`}>{statusLabel}</span>

          <div className="drawer-divider" />

          <div className="drawer-section">
            <div className="drawer-section-label">// overview</div>
            <p className="drawer-desc">{project.description}</p>
          </div>

          <div className="drawer-section">
            <div className="drawer-section-label">// tech stack</div>
            <div className="tech-stack">
              {project.tools.map(t => (
                <span key={t} className="tech-chip">{t}</span>
              ))}
            </div>
          </div>

          {project.highlights && (
            <div className="drawer-section">
              <div className="drawer-section-label">// highlights</div>
              <ul className="drawer-highlights">
                {project.highlights.map((h, i) => (
                  <li key={i} className="drawer-highlight-item">
                    <span className="drawer-bullet">›</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="drawer-divider" />

          {project.github && (
            <a
              className="drawer-gh-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={14} />
              View on GitHub
              <span className="drawer-gh-arrow">↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailDrawer