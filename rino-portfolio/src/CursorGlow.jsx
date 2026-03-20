import {useEffect, useState} from 'react'

function CursorGlow(){
    const [pos, setPos] = useState({x:-200, y:-200})

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPos({x:e.clientX, y:e.clientY})
        }
        window.addEventListener('mousemove', handleMouseMove, {passive:true})
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className='cursor-glow' style={{left:pos.x, top: pos.y}} />
    )
}
export default CursorGlow