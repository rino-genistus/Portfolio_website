import useCountUp from './useCountUp'

function SectionCounter({ count, label, suffix = '' }) {
  const { ref, count: displayed } = useCountUp(count, 900)
  return (
    <span ref={ref} className="section-counter">
      <span className="section-counter-num">{displayed}{suffix}</span>
      <span className="section-counter-label">{label}</span>
    </span>
  )
}

export default SectionCounter