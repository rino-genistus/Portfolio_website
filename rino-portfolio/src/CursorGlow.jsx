import {useEffect, useRef} from 'react'

function CursorGlow(){
    const glowRef = useRef(null)
    const rafRef = useRef(null) 
    const debug = ''

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
                rafRef.current = requestAnimationFrame(() => {
            glowRef.current.style.left = `${e.clientX}px`
            glowRef.current.style.top  = `${e.clientY}px`
      })
    }
    window.addEventListener('mousemove', handleMouseMove, {passive:true})
    return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    }, [])

    return (
        <div ref={glowRef} className='cursor-glow' />
    )
}
export default CursorGlow