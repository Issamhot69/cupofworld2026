'use client'

interface Seg { label: string; value: number; color: string }
const DEFAULT: Seg[] = [
  { label: 'Joie',    value: 42, color: '#C8102E' },
  { label: 'Tension', value: 24, color: '#FFD700' },
  { label: 'Espoir',  value: 20, color: '#006633' },
  { label: 'Neutre',  value: 14, color: '#334155' },
]

export default function EmotionBar({ segments = DEFAULT, title = '' }: { segments?: Seg[]; title?: string }) {
  const total = segments.reduce((s, g) => s + g.value, 0)
  return (
    <div>
      {title && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase' }}>{title}</div>}
      <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
        {segments.map((s, i) => (
          <div key={i} style={{ width: `${(s.value/total)*100}%`, background: s.color }} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {segments.map((s, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
            {s.label} {s.value}%
          </span>
        ))}
      </div>
    </div>
  )
}