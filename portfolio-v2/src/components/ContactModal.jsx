import { useEffect } from 'react'
import { motion } from 'motion/react'
import { FiX, FiMail, FiLinkedin, FiGithub } from 'react-icons/fi'
import { PROFILE } from '../data'

export default function ContactModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-3xl border border-line2 bg-surface p-7"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="headline text-3xl">
            Contact <span className="italic text-accent">me</span>
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            data-cursor="hover"
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <FiX size={16} />
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            const subject = encodeURIComponent(`Portfolio message from ${data.get('name') || 'someone'}`)
            const body = encodeURIComponent(`${data.get('message') || ''}\n\n— ${data.get('name') || ''} (${data.get('email') || ''})`)
            window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
          }}
        >
          {[
            { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'email@example.com' },
          ].map((f) => (
            <div key={f.name}>
              <label className="mono mb-1.5 block text-xs text-muted">{f.label}</label>
              <input
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                required
                className="w-full rounded-xl border border-line bg-ground px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-dim focus:border-accent"
              />
            </div>
          ))}
          <div>
            <label className="mono mb-1.5 block text-xs text-muted">Message</label>
            <textarea
              name="message"
              rows="4"
              placeholder="..."
              required
              className="w-full resize-none rounded-xl border border-line bg-ground px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-dim focus:border-accent"
            />
          </div>
          <button
            type="submit"
            data-cursor="hover"
            className="w-full rounded-full bg-accent py-3.5 text-sm font-medium text-accentInk transition-transform hover:scale-[1.01] active:scale-95"
          >
            Send Message
          </button>
        </form>

        <div className="mt-5 flex items-center justify-center gap-4 border-t border-line pt-5 text-muted">
          {[
            { Icon: FiMail, href: `mailto:${PROFILE.email}` },
            { Icon: FiLinkedin, href: PROFILE.linkedin },
            { Icon: FiGithub, href: PROFILE.github },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              data-cursor="hover"
              className="grid h-9 w-9 place-items-center rounded-full border border-line transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
