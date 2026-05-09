'use client'

interface Team { name: string; flag: string; score: number }
interface Props { home: Team; away: Team; minute: number; status?: string }

const COLORS: Record<string, string> = {
  'France': '#002395', 'Bresil': '#009C3B', 'Argentine': '#74ACDF',
  'Allemagne': '#000000', 'Maroc': '#C8102E', 'Portugal': '#006600',
  'USA': '#B22234', 'Espagne': '#AA151B',
}

export default function MatchLive({ home, away, minute, status = 'live' }: Props) {
  const pct = Math.min((minute / 90) * 100, 100)
  return (
    <div style={{ background: '#111118', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '1rem 1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Cup of World 2026</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span className="live-dot" />{minute}'
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ width: 32, height: 22, borderRadius: 4, background: COLORS[home.name] || '#C8102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 700, marginBottom: 6 }}>
            {home.name.substring(0, 3).toUpperCase()}
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#f1f5f9' }}>{home.name}</div>
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 4, color: '#f1f5f9', lineHeight: 1 }}>
          {home.score} - {away.score}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ width: 32, height: 22, borderRadius: 4, background: COLORS[away.name] || '#006633', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 700, marginBottom: 6, marginLeft: 'auto' }}>
            {away.name.substring(0, 3).toUpperCase()}
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#f1f5f9' }}>{away.name}</div>
        </div>
      </div>
      <div style={{ marginTop: 14, height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg,#006633,#C8102E)', borderRadius: 2 }} />
      </div>
    </div>
  )
}