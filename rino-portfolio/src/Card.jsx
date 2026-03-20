import { FaGithub } from 'react-icons/fa'

function Card(props){
const tools = props.tools

const toolsList = tools.map(item => <span key={item} className="tech-chip">{item}</span>)

    const isCompleted = props.status === 'completed'
    const statusClass = isCompleted ? 'status-completed' : 'status-progress'
    const statusLabel = isCompleted ? 'COMPLETED' : 'IN PROGRESS'

    return(
        <>
            <div className='card' id='projects'>
                <div className="card-header">
                    <h2>{props.projectName}</h2>
                    <span className={`status-badge ${statusClass}`}>
                        {statusLabel}
                    </span>
                </div>
                <p>{props.projectDescription}</p>
                <div className="tech-stack">
                    {toolsList}
                </div>
                {props.github && (
                <a
                    className="card-github-link"
                    href={props.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FaGithub size={13} />
                    View on GitHub
                </a>
                )}
            </div>
        </>
    )
}
export default Card