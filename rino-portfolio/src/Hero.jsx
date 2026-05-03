import {useEffect, useState} from 'react'

const TITLES = [
    'ML Engineer',
    'CS Student',
    'AI Researcher',
    'Neural Net Builder',
]

function Hero(){
    const [titleIndex, setTitleIndex] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [deleting, setDeleting] = useState(false)

    const scrollTo = (id) => (e) => {
        e.preventDefault()
        setTimeout(() => {
            const el = document.getElementById(id)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 10)
    }

    useEffect(() => {
            const current = TITLES[titleIndex]
            if (!deleting && displayed.length < current.length) {
                const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
                return () => clearTimeout(t)
            }
            if (!deleting && displayed.length === current.length) {
                const t = setTimeout(() => setDeleting(true), 2000)
                return () => clearTimeout(t)
            }
            if (deleting && displayed.length > 0){
                const t = setTimeout(() => setDisplayed(displayed.slice(0,-1)), 45)
                return () => clearTimeout(t)
            }
            if (deleting && displayed.length === 0){
                setDeleting(false)
                setTitleIndex((i) => (i+1) % TITLES.length)
            }
        }, [displayed, deleting, titleIndex]
    )

    return (
        <section className="hero">
            <p className="hero-eyebrow">// welcome to my portfolio</p>
        
            <h1 className="hero-title">
                I just like building stuff.
            </h1>
        
            <div className="hero-typing">
                <span className="hero-typing-prefix">~ </span>
                <span className="hero-typing-text">{displayed}</span>
                <span className="hero-cursor">▋</span>
            </div>
        
            <p className="hero-sub">
                Sophomore at Rutgers University studying Computer Science.
                Focused on Neural Networks, LLMs, and making AI work for real problems.
            </p>
        
            <div className="hero-cta">
                <a href="#projects" className="hero-btn-primary" onClick={scrollTo('projects')}>View Projects ↓</a>
                <a href="#about"    className="hero-btn-ghost" onClick={scrollTo('about')}>About Me</a>
            </div>
        </section>
    )
}
export default Hero