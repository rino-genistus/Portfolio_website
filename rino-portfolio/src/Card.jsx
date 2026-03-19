
function Card(props){
const tools = props.tools

const toolsList = tools.map(item => <li className="tags"><b>{item}</b></li>)

    const isCompleted = props.status === 'completed'
    const statusClass = isCompleted ? 'status-completed' : 'status-progress'
    const statusLabel = isCompleted ? 'COMPLETED' : 'IN PROGRESS'

    return(
        <>
            <div className='card'>
                <div className="card-header">
                    <h2>{props.projectName}</h2>
                    <span className={`status-badge ${statusClass}`}>
                        {statusLabel}
                    </span>
                </div>
                <p>{props.projectDescription}</p>
                <ul>Tools Used: {toolsList}</ul>
            </div>
        </>
    )
}
export default Card