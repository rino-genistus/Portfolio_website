import {useEffect, useState} from 'react'

function ScrollFadeOverlay(){
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        const handleScroll = () => {
            const newOpacity = Math.max(0, 1-window.scrollY / 100)
            setOpacity(newOpacity)
        }

        window.addEventListener('scroll', handleScroll, {passive:true})
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (opacity === 0) return null

    return (
        <div className="scroll-fade-overlay" style={{opacity}}/>
    )
}
export default ScrollFadeOverlay