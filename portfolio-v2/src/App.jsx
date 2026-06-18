import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { ReactLenis } from 'lenis/react'
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

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const [intro, setIntro] = useState(!prefersReduced)
  const lenisRef = useRef(null)

  // pause/resume momentum scroll while the intro plays
  useEffect(() => {
    const lenis = lenisRef.current?.lenis
    if (!lenis) return
    if (intro) lenis.stop()
    else lenis.start()
  }, [intro])

  const ready = !intro

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        ref={lenisRef}
        options={{
          duration: 1.1,
          lerp: 0.09,
          smoothWheel: !prefersReduced,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
        }}
      >
        <a href="#main" className="skip-link">Skip to content</a>
        <Background />
      <Cursor />
      <ScrollProgress />
      <BackToTop />

      <Nav onContact={() => setContactOpen(true)} ready={ready} />

      <main id="main" className="relative z-10">
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
      </ReactLenis>
    </MotionConfig>
  )
}
