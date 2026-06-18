import { useEffect, useRef, useState } from 'react'
import { TERMINAL } from '../data'

/* Build the full sequence of terminal lines from data */
function buildLines() {
  const p = TERMINAL.profile
  return [
    { type: 'cmd', text: 'whoami' },
    { type: 'out', text: TERMINAL.whoami },
    { type: 'gap' },
    { type: 'cmd', text: 'cat profile.json' },
    { type: 'raw', html: '<span class="text-dim">{</span>' },
    { type: 'raw', html: `<span class="pl-4"><span class="text-accent">"status"</span><span class="text-dim">: </span><span class="text-ink">"${p.status}"</span><span class="text-dim">,</span></span>` },
    { type: 'raw', html: `<span class="pl-4"><span class="text-accent">"major"</span><span class="text-dim">: </span><span class="text-ink">"${p.major}"</span><span class="text-dim">,</span></span>` },
    { type: 'raw', html: `<span class="pl-4"><span class="text-accent">"focus"</span><span class="text-dim">: </span><span class="text-ink">"${p.focus}"</span><span class="text-dim">,</span></span>` },
    { type: 'raw', html: `<span class="pl-4"><span class="text-accent">"goal"</span><span class="text-dim">: </span><span class="text-ink">"${p.goal}"</span></span>` },
    { type: 'raw', html: '<span class="text-dim">}</span>' },
    { type: 'gap' },
    { type: 'cmd', text: 'ls currently/' },
    ...TERMINAL.currently.map((c) => ({ type: 'dir', text: c })),
    { type: 'gap' },
    { type: 'end' },
  ]
}

export default function Terminal() {
  const LINES = useRef(buildLines()).current
  const [rendered, setRendered] = useState([])
  const [typing, setTyping] = useState(null) // { text, full }
  const bodyRef = useRef(null)
  const timer = useRef(null)
  const started = useRef(false)

  const run = () => {
    clearTimeout(timer.current)
    started.current = true
    setRendered([])
    setTyping(null)
    let idx = 0

    const next = () => {
      if (idx >= LINES.length) return
      const line = LINES[idx]

      if (line.type === 'cmd') {
        let c = 0
        const typeChar = () => {
          c++
          setTyping({ shown: line.text.slice(0, c) })
          if (c < line.text.length) timer.current = setTimeout(typeChar, 40)
          else {
            setTyping(null)
            setRendered((r) => [...r, line])
            idx++
            timer.current = setTimeout(next, 140)
          }
        }
        timer.current = setTimeout(typeChar, 40)
      } else {
        setRendered((r) => [...r, line])
        idx++
        timer.current = setTimeout(next, line.type === 'gap' ? 50 : 90)
      }
    }
    timer.current = setTimeout(next, 250)
  }

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) run()
      },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      clearTimeout(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [rendered, typing])

  const renderLine = (line, key) => {
    if (line.type === 'gap') return <div key={key} className="h-3" />
    if (line.type === 'end')
      return (
        <div key={key} className="flex items-center">
          <span className="text-accent">❯</span>
          <span className="blink-cursor ml-2" />
        </div>
      )
    if (line.type === 'cmd')
      return (
        <div key={key}>
          <span className="text-accent">❯</span> <span className="text-ink">{line.text}</span>
        </div>
      )
    if (line.type === 'out')
      return (
        <div key={key} className="text-muted">
          {line.text}
        </div>
      )
    if (line.type === 'dir')
      return (
        <div key={key} className="text-accent">
          {line.text}/
        </div>
      )
    return <div key={key} dangerouslySetInnerHTML={{ __html: line.html }} />
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ground2 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mono ml-3 text-xs text-muted">rino@portfolio — zsh</span>
        <button
          onClick={run}
          title="Replay"
          data-cursor="hover"
          className="mono ml-auto text-sm text-dim transition-colors hover:text-accent"
        >
          ↺
        </button>
      </div>
      <div
        ref={bodyRef}
        data-lenis-prevent
        className="mono h-[340px] overflow-y-auto px-5 py-4 text-[13px] leading-relaxed"
      >
        {rendered.map((l, i) => renderLine(l, i))}
        {typing && (
          <div>
            <span className="text-accent">❯</span>{' '}
            <span className="text-ink">{typing.shown}</span>
            <span className="blink-cursor" />
          </div>
        )}
      </div>
    </div>
  )
}
