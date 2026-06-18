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

/* Persisted dark/light theme toggle.
   When supported, the swap rides the View Transitions API as a circular
   reveal expanding from the toggle button — otherwise it just flips. */
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

  const apply = (next) => {
    document.documentElement.classList.toggle('light', !next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setDark(next)
  }

  const toggle = (e) => {
    const next = !dark
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || reduce) {
      apply(next)
      return
    }

    // anchor the reveal at the click point, radius reaching the far corner
    const x = e?.clientX ?? window.innerWidth / 2
    const y = e?.clientY ?? 0
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const root = document.documentElement
    root.style.setProperty('--vt-x', `${x}px`)
    root.style.setProperty('--vt-y', `${y}px`)
    root.style.setProperty('--vt-r', `${r}px`)

    document.startViewTransition(() => apply(next))
  }

  return [dark, toggle]
}

/* Modal accessibility: focus the panel on open, trap Tab inside,
   and restore focus to the trigger on close. Pair with Escape handling. */
export function useModalA11y(ref) {
  useEffect(() => {
    const prev = document.activeElement
    const el = ref.current
    const list = () =>
      el
        ? [
            ...el.querySelectorAll(
              'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select,[tabindex]:not([tabindex="-1"])',
            ),
          ].filter((n) => n.offsetParent !== null)
        : []

    const items = list()
    ;(items[0] || el)?.focus()

    const onKey = (e) => {
      if (e.key !== 'Tab') return
      const f = list()
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    el?.addEventListener('keydown', onKey)
    return () => {
      el?.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [ref])
}

/* Track which section is in view for nav highlighting */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join(',')
  useEffect(() => {
    const list = key.split(',')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.3, rootMargin: '-64px 0px -40% 0px' },
    )
    list.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [key])
  return active
}
