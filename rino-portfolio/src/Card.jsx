import { FaGithub } from 'react-icons/fa'

function Card({ tools, projectName, projectDescription, status, github, size = 'side', index, onClick }) {
  const toolsList = tools.map(item => (
    <span key={item} className="tech-chip">{item}</span>
  ))

  const isCompleted = status === 'completed'
  const statusClass = isCompleted ? 'status-completed' : 'status-progress'
  const statusLabel = isCompleted ? 'COMPLETED' : 'IN PROGRESS'

  const sizeClass = {
    featured: 'card-featured',
    wide:     'card-wide',
    side:     'card-side',
  }[size] || 'card-side'

  return (
    <div className={sizeClass}>
      <div className="card" onClick={onClick} style={{ cursor: 'pointer' }}>
        {index !== undefined && (
          <div className="card-index">_{String(index).padStart(2, '0')}</div>
        )}

        <div className="card-header">
          <h2>{projectName}</h2>
          <span className={`status-badge ${statusClass}`}>
            {statusLabel}
          </span>
        </div>

        <p>{projectDescription}</p>

        <div className="tech-stack">
          {toolsList}
        </div>

        {github && (
          <div
            className="card-github-link"
            onClick={(e) => {
              e.stopPropagation()
              window.open(github, '_blank', 'noreferrer')
            }}
          >
            <FaGithub size={13} />
            View on GitHub
          </div>
        )}

        <div className="card-open-hint">
          <span>↗ open details</span>
        </div>
      </div>
    </div>
  )
}

export default Card