import {useEffect, useState} from 'react'

function ScrollProgressBar(){
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = document.documentElement.clientHeight

            const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100
            setProgress(percentage)
        }

        window.addEventListener('scroll', handleScroll, {passive:true})
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return(
        <div className='scroll-progress-track'>
            <div className='scroll-progress-bar' style={{width: `${progress}%`}}/>
        </div>
    )
}
export default ScrollProgressBar