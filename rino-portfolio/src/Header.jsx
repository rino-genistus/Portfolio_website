
function Header(props){
    return(
        <>
            <header className='header'>
                <h1>Rino Genistus Ruban</h1>
                <button onClick={props.onContactClick}>Contact Me</button>
            </header>
            
        </>
    )
}
export default Header