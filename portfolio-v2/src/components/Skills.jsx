import { motion } from 'motion/react'
import { SKILL_GROUPS } from '../data'
import { SectionHeader, Marquee, EASE } from './primitives'

const total = SKILL_GROUPS.reduce((a, g) => a + g.skills.length, 0)

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader index="02" label="Capabilities" title={['The tools I', 'reach for.']} note={`${total}+ technologies`} />
      </div>

      {/* full-bleed marquee band */}
      <div className="serif border-y border-line py-5 text-2xl italic text-ink/70 sm:text-3xl">
        <Marquee
          items={SKILL_GROUPS.flatMap((g) => g.skills)}
          separator="·"
          reverse
        />
      </div>

      {/* grouped index */}
      <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: gi * 0.08, ease: EASE }}
              className="bg-ground p-7 transition-colors hover:bg-ground2 sm:p-9"
            >
              <div className="mb-5 flex items-baseline justify-between">
                <h3 className="headline text-2xl sm:text-3xl">{group.label}</h3>
                <span className="mono text-xs text-dim">{String(group.skills.length).padStart(2, '0')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.08 + i * 0.04, duration: 0.3 }}
                    data-cursor="hover"
                    className="mono rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-ink"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
