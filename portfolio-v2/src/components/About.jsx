import { useState } from 'react'
import { FiMail, FiLinkedin, FiGithub, FiArrowUpRight, FiCheck } from 'react-icons/fi'
import { PROFILE, ABOUT, ASPIRATION } from '../data'
import { Reveal, RevealLines, SectionHeader } from './primitives'
import { useCountUp } from '../hooks'
import Terminal from './Terminal'

function Stat({ target, suffix = '', label }) {
  const [value, ref] = useCountUp(target)
  return (
    <div ref={ref} className="flex flex-col">
      <span className="headline text-5xl text-ink sm:text-6xl">
        {value}
        <span className="text-accent">{suffix}</span>
      </span>
      <span className="mono mt-2 text-xs uppercase tracking-[0.2em] text-muted">{label}</span>
    </div>
  )
}

export default function About() {
  const [copied, setCopied] = useState(false)

  const copyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard?.writeText(PROFILE.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const contacts = [
    {
      Icon: copied ? FiCheck : FiMail,
      label: copied ? 'Copied to clipboard' : PROFILE.email,
      sub: 'Email',
      href: `mailto:${PROFILE.email}`,
      onClick: copyEmail,
    },
    { Icon: FiLinkedin, label: 'in/rino-ruban', sub: 'LinkedIn', href: PROFILE.linkedin },
    { Icon: FiGithub, label: 'rino-genistus', sub: 'GitHub', href: PROFILE.github },
  ]

  const block = ABOUT[0]

  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeader index="01" label="About" />

      {/* Big statement */}
      <RevealLines
        className="headline block max-w-4xl text-3xl leading-[1.15] sm:text-5xl"
        lineClass=""
        stagger={0.06}
        lines={[
          'I build neural networks, language',
          'models, and AI tools — driven by',
          'curiosity for how intelligence works.',
        ]}
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: prose + stats + contacts */}
        <Reveal>
          <p className="text-pretty text-lg leading-relaxed text-muted">
            {block.text}
            <span className="text-ink">{block.highlight}</span>
            {block.after}
          </p>

          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
            Aspiring to work as a{' '}
            {ASPIRATION.map((a, i) => (
              <span key={a}>
                <span className="text-ink underline decoration-accent decoration-2 underline-offset-4">
                  {a}
                </span>
                {i < ASPIRATION.length - 1 ? ' or ' : '.'}
              </span>
            ))}
          </p>

          <div className="mt-12 flex gap-12 border-y border-line py-8">
            <Stat target={6} label="Projects" />
            <Stat target={18} suffix="+" label="Technologies" />
            <Stat target={2} label="Yrs @ Rutgers" />
          </div>

          <div className="mt-10 flex flex-col">
            {contacts.map(({ Icon, label, sub, href, onClick }) => (
              <a
                key={sub}
                href={href}
                onClick={onClick}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                data-cursor="hover"
                className="group flex items-center gap-4 border-t border-line py-4 last:border-b"
              >
                <Icon className="text-muted transition-colors group-hover:text-accent" size={18} />
                <div className="min-w-0">
                  <span className="mono block text-[10px] uppercase tracking-[0.2em] text-dim">{sub}</span>
                  <span className="block truncate text-sm text-ink">{label}</span>
                </div>
                <FiArrowUpRight className="ml-auto text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            ))}
          </div>
        </Reveal>

        {/* Right: terminal */}
        <Reveal delay={0.12}>
          <div className="lg:sticky lg:top-28">
            <Terminal />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
