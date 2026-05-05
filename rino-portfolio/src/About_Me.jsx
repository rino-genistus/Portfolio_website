import { MdOutlineEmail } from 'react-icons/md'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

/* ── Terminal line definitions ── */
const TERMINAL_LINES = [
  { type: 'cmd',  prompt: '❯', cmd: 'whoami',         str: '' },
  { type: 'out',  text: 'rino_genistus_ruban' },
  { type: 'gap' },
  { type: 'cmd',  prompt: '❯', cmd: 'cat',            str: 'profile.json' },
  { type: 'raw',  html: '<span class="t-muted">{</span>' },
  { type: 'raw',  html: '<span class="t-indent"><span class="t-key">"status"</span><span class="t-muted">:</span> <span class="t-string">"Sophomore @ Rutgers NB"</span><span class="t-muted">,</span></span>' },
  { type: 'raw',  html: '<span class="t-indent"><span class="t-key">"major"</span><span class="t-muted">:</span> <span class="t-string">"CS + Math minor"</span><span class="t-muted">,</span></span>' },
  { type: 'raw',  html: '<span class="t-indent"><span class="t-key">"focus"</span><span class="t-muted">:</span> <span class="t-string">"LLMs · Neural Networks"</span><span class="t-muted">,</span></span>' },
  { type: 'raw',  html: '<span class="t-indent"><span class="t-key">"goal"</span><span class="t-muted">:</span> <span class="t-string">"AI/ML Engineer"</span></span>' },
  { type: 'raw',  html: '<span class="t-muted">}</span>' },
  { type: 'gap' },
  { type: 'cmd',  prompt: '❯', cmd: 'ls',             str: 'currently/' },
  { type: 'out',  text: 'building-LLM-from-scratch',    color: 'var(--green)' },
  { type: 'out',  text: 'MedLLM-RAG-pipeline',          color: 'var(--green)' },
  { type: 'out',  text: 'Jarvis-AI-voice-assistant',     color: 'var(--green)' },
  { type: 'gap' },
  { type: 'blink' },
]

/* Speed settings — cmd lines type character-by-character, others appear instantly */
const CMD_CHAR_DELAY  = 38   // ms per character in command lines
const LINE_DELAY      = 90   // ms between non-cmd lines
const CMD_EXTRA_DELAY = 120  // extra pause after a command finishes before output

function TerminalBlock() {
  const [rendered, setRendered] = useState([])   // { id, html }[]
  const [typingLine, setTypingLine] = useState(null) // { lineIdx, charIdx }
  const bodyRef  = useRef(null)
  const timerRef = useRef(null)
  const hasRun   = useRef(false)

  const clear = () => {
    clearTimeout(timerRef.current)
    setRendered([])
    setTypingLine(null)
    hasRun.current = false
  }

  const run = () => {
    clear()
    hasRun.current = true
    let lineIdx = 0

    const processLine = () => {
      if (lineIdx >= TERMINAL_LINES.length) return
      const line = TERMINAL_LINES[lineIdx]

      if (line.type === 'cmd') {
        // type command character by character
        const fullText = `${line.cmd}${line.str ? ' ' + line.str : ''}`
        let charIdx = 0

        const typeChar = () => {
          charIdx++
          setTypingLine({ lineIdx, charIdx, full: fullText, prompt: line.prompt })
          if (charIdx < fullText.length) {
            timerRef.current = setTimeout(typeChar, CMD_CHAR_DELAY)
          } else {
            // command done — commit to rendered, move on
            const html = `<span class="t-prompt">${line.prompt}</span><span class="t-cmd"> ${line.cmd}</span>${line.str ? `<span class="t-string"> ${line.str}</span>` : ''}`
            setTypingLine(null)
            setRendered(prev => [...prev, { id: lineIdx, html, cls: 't-line' }])
            lineIdx++
            timerRef.current = setTimeout(processLine, CMD_EXTRA_DELAY)
          }
        }
        timerRef.current = setTimeout(typeChar, CMD_CHAR_DELAY)

      } else if (line.type === 'gap') {
        setRendered(prev => [...prev, { id: lineIdx, html: '', cls: 't-gap' }])
        lineIdx++
        timerRef.current = setTimeout(processLine, LINE_DELAY * 0.5)

      } else if (line.type === 'blink') {
        setRendered(prev => [...prev, {
          id: lineIdx,
          html: '<span class="t-prompt">❯</span><span class="t-blink"></span>',
          cls: 't-line'
        }])
        lineIdx++

      } else if (line.type === 'out') {
        const color = line.color ? `style="color:${line.color}"` : ''
        setRendered(prev => [...prev, {
          id: lineIdx,
          html: `<span class="t-out" ${color}>${line.text}</span>`,
          cls: 't-line'
        }])
        lineIdx++
        timerRef.current = setTimeout(processLine, LINE_DELAY)

      } else if (line.type === 'raw') {
        setRendered(prev => [...prev, { id: lineIdx, html: line.html, cls: 't-line' }])
        lineIdx++
        timerRef.current = setTimeout(processLine, LINE_DELAY)
      }
    }

    timerRef.current = setTimeout(processLine, 200)
  }

  /* scroll observer — triggers once */
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasRun.current) run() },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => { observer.disconnect(); clearTimeout(timerRef.current) }
  }, [])

  /* auto-scroll terminal body */
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [rendered, typingLine])

  /* build typing-in-progress html */
  const typingHtml = typingLine
    ? `<span class="t-prompt">${typingLine.prompt}</span><span class="t-cmd"> ${typingLine.full.slice(0, typingLine.charIdx)}</span><span class="t-blink"></span>`
    : null

  return (
    <div className="terminal-block">
      <div className="terminal-bar">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">rino@portfolio ~ zsh</span>
        <button className="terminal-replay-btn" onClick={run} title="Replay">↺</button>
      </div>

      <div className="terminal-body" ref={bodyRef}>
        {rendered.map(line => (
          <div
            key={line.id}
            className={line.cls}
            dangerouslySetInnerHTML={{ __html: line.html }}
          />
        ))}
        {typingHtml && (
          <div className="t-line" dangerouslySetInnerHTML={{ __html: typingHtml }} />
        )}
      </div>
    </div>
  )
}

function About_Me() {
  const [copied, setCopied] = useState(false)

  const handleEmailClick = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('rino.genistus@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="about-section" id="about">
      <div className="section-label">about.me</div>

      <div className="about-grid">

        {/* ── Left: Bio + contact ── */}
        <div className="about-left">
          <p className="about-eyebrow">// introducing</p>

          <h2 className="about-name">
            Rino Genistus
            <span className="name-outline">Ruban</span>
          </h2>

          <p className="about-text">
            Sophomore at{' '}
            <span className="about-highlight">Rutgers University – New Brunswick</span>,
            studying Computer Science with a minor in Mathematics.
            Currently diving deep into Neural Networks and LLMs —
            specifically how to localize and specialize large language
            models for targeted tasks.
          </p>
          <p className="about-text">
            Aspiring to work as a{' '}
            <span className="about-highlight">Data Science Engineer</span> or{' '}
            <span className="about-highlight">AI/ML Engineer</span>.
          </p>

          <div className="contact-methods">
            <a
              className="contact-btn"
              href="mailto:rino.genistus@gmail.com"
              onClick={handleEmailClick}
            >
              <MdOutlineEmail size={16} />
              <span className="contact-label">
                {copied ? '// Copied to clipboard!' : '// Gmail'}
              </span>
              <span className="contact-arrow">↗</span>
            </a>

            <a
              className="contact-btn"
              href="https://linkedin.com/in/rino-ruban-65347625a"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn size={14} />
              <span className="contact-label">// LinkedIn</span>
              <span className="contact-arrow">↗</span>
            </a>

            <a
              className="contact-btn"
              href="https://github.com/rino-genistus"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={15} />
              <span className="contact-label">// GitHub</span>
              <span className="contact-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* ── Right: Terminal ── */}
        <TerminalBlock />

      </div>
    </section>
  )
}

export default About_Me