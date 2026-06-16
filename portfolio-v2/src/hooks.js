import { useEffect, useRef, useState } from 'react'

/* Count up from 0 → target when element scrolls into view */
export function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(Math.round(eased * target))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return [value, ref]
}

/* Persisted dark/light theme toggle */
export function useTheme() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      setDark(false)
    }
  }, [])

  const toggle = () => {
    setDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('light', !next)
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  return [dark, toggle]
}

/* Track which section is in view for nav highlighting */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.3, rootMargin: '-64px 0px -40% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}
