import UseFadeIn from './UseFadeIn'
import SectionCounter from './SectionCounter'

const SKILL_GROUPS = [
  {
    label: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C', 'SQL'],
  },
  {
    label: 'ML / AI',
    skills: ['PyTorch', 'NumPy', 'Pandas', 'Scikit-learn', 'Hugging Face', 'LangChain'],
  },
  {
    label: 'Infra & Tools',
    skills: ['Pinecone', 'FastAPI', 'Git',],
  },
  {
    label: 'Frontend',
    skills: ['React', 'Vite', 'HTML', 'CSS'],
  },
]

const totalSkills = SKILL_GROUPS.reduce((acc, g) => acc + g.skills.length, 0)

function Skills() {
  const ref = UseFadeIn(0.15)

  return (
    <section className="skills-section fade-section" ref={ref} id="skills">
      <div className="section-label" style={{ padding: 0, marginBottom: '8px' }}>
        skills
        <SectionCounter count={totalSkills} label="technologies" suffix="+" />
      </div>

      <div className="skills-grid">
        {SKILL_GROUPS.map(group => (
          <div className="skill-group" key={group.label}>
            <div className="skill-group-label">{group.label}</div>
            <div className="skill-tags">
              {group.skills.map(s => (
                <span className="skill-tag" key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills