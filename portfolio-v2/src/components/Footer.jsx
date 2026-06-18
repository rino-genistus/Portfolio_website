import { FiMail, FiLinkedin, FiGithub, FiArrowUpRight } from 'react-icons/fi'
import { PROFILE } from '../data'
import { RevealLines, Reveal, Magnetic } from './primitives'

export default function Footer({ onContact }) {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mx-auto max-w-7xl scroll-mt-24 px-5 pb-10 pt-24 sm:px-8 sm:pt-32">
      <div className="border-t border-line pt-16">
        <p className="mono mb-6 text-xs uppercase tracking-[0.3em] text-accent">Let’s talk</p>

        <RevealLines
          className="headline block text-5xl sm:text-8xl"
          lines={['Have an idea?', 'Let’s build it.']}
        />

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.3}>
              <button
                onClick={onContact}
                data-cursor="hover"
                className="group flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-accentInk"
              >
                Start a conversation
                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </Magnetic>
            <a
              href={`mailto:${PROFILE.email}`}
              data-cursor="hover"
              className="link-wipe text-sm text-muted transition-colors hover:text-ink"
            >
              {PROFILE.email}
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mt-24 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-muted">
          © {year} {PROFILE.name}
        </span>

        <div className="mono flex flex-wrap items-center gap-2 text-xs text-dim">
          <span>Built with</span>
          {['React', 'Vite', 'Tailwind', 'Motion'].map((t) => (
            <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-muted">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {[
            { Icon: FiMail, href: `mailto:${PROFILE.email}`, label: 'Email' },
            { Icon: FiLinkedin, href: PROFILE.linkedin, label: 'LinkedIn' },
            { Icon: FiGithub, href: PROFILE.github, label: 'GitHub' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              data-cursor="hover"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
