import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Background } from './components/primitives'
import { ScrollProgress, BackToTop, Cursor } from './components/Chrome'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const [intro, setIntro] = useState(true)

  // lock scroll while the intro plays
  useEffect(() => {
    document.body.style.overflow = intro ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [intro])

  const ready = !intro

  return (
    <>
      <Background />
      <Cursor />
      <ScrollProgress />
      <BackToTop />

      <Nav onContact={() => setContactOpen(true)} ready={ready} />

      <main className="relative z-10">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
      </main>

      <Footer onContact={() => setContactOpen(true)} />

      <AnimatePresence>
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {intro && <Preloader key="preloader" onDone={() => setIntro(false)} />}
      </AnimatePresence>
    </>
  )
}
