'use client'
import { useState, useEffect } from 'react'

const PLAYERS = [
  { rank: 1,  username: '@youssef_m',   country: '🇲🇦', points: 48200, level: 'Legend', badges: ['🏆','⚽','🔥','🌟'], videos: 34, followers: '48K', trend: '+12%' },
  { rank: 2,  username: '@leo_santos',  country: '🇧🇷', points: 32100, level: 'Expert', badges: ['⚽','🌟','🎯'],      videos: 21, followers: '32K', trend: '+8%'  },
  { rank: 3,  username: '@pierre_d',    country: '🇫🇷', points: 28400, level: 'Expert', badges: ['⚽','🎯'],           videos: 18, followers: '28K', trend: '+5%'  },
  { rank: 4,  username: '@worldfeed_ai',country: '🤖',  points: 24000, level: 'Expert', badges: ['🤖','⚡','🌟'],      videos: 120, followers: '24K', trend: '+25%' },
  { rank: 5,  username: '@hans_k',      country: '🇩🇪', points: 18900, level: 'Pro',    badges: ['⚽','🎯'],           videos: 12, followers: '18K', trend: '+3%'  },
  { rank: 6,  username: '@casafan',     country: '🇲🇦', points: 15200, level: 'Pro',    badges: ['🔥','⚽'],           videos: 9,  followers: '15K', trend: '+18%' },
  { rank: 7,  username: '@foot_passion',country: '🇫🇷', points: 12800, level: 'Pro',    badges: ['⚽'],                videos: 7,  followers: '12K', trend: '+4%'  },
  { rank: 8,  username: '@argfan99',    country: '🇦🇷', points: 9400,  level: 'Fan',    badges: ['🎯'],               videos: 5,  followers: '9K',  trend: '+7%'  },
  { rank: 9,  username: '@usasoccer',   country: '🇺🇸', points: 7200,  level: 'Fan',    badges: [],                   videos: 4,  followers: '7K',  trend: '+2%'  },
  { rank: 10, username: '@ptfan',       country: '🇵🇹', points: 5100,  level: 'Fan',    badges: [],                   videos: 3,  followers: '5K',  trend: '+1%'  },
]

const LEVELS: Record<string, { color: string; bg: string }> = {
  Legend: { color: '#FFD700', bg: 'rgba(255,215,0,0.1)' },
  Expert: { color: '#B22234', bg: 'rgba(178,34,52,0.1)' },
  Pro:    { color: '#818cf8', bg: 'rgba(129,140,248,0.1)' },
  Fan:    { color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
}

const RANK_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32']
const RANK_ICONS  = ['🥇', '🥈', '🥉']

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<'global' | 'creators' | 'fans'>('global')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 5000)
    return () => clearInterval(id)
  }, [])

  const filtered = filter === 'creators'
    ? PLAYERS.filter(p => p.videos >= 10)
    : filter === 'fans'
    ? PLAYERS.filter(p => p.videos < 10)
    : PLAYERS

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 64px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 2, color: '#f1f5f9' }}>
          🏆 Leader<span style={{ color: '#B22234' }}>board</span>
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
          Top fans & creators · Cup of World 2026 &#127482;&#127480;
        </p>
      </div>

      {/* Top 3 podium */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
        {[PLAYERS[1], PLAYERS[0], PLAYERS[2]].map((p, i) => {
          const realRank = i === 0 ? 2 : i === 1 ? 1 : 3
          const level = LEVELS[p.level]
          return (
            <div key={i} style={{
              background: '#111118', borderRadius: 14,
              border: `0.5px solid ${realRank === 1 ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.07)'}`,
              padding: '1.25rem',
              marginTop: realRank === 1 ? 0 : 20,
              textAlign: 'center',
              boxShadow: realRank === 1 ? '0 0 30px rgba(255,215,0,0.08)' : 'none',
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{RANK_ICONS[realRank - 1]}</div>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{p.country}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9', marginBottom: 4 }}>{p.username}</div>
              <div style={{ fontSize: 9, padding: '2px 8px', borderRadius: 4, display: 'inline-block', background: level.bg, color: level.color, fontWeight: 600, marginBottom: 8 }}>
                {p.level.toUpperCase()}
              </div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 22, color: RANK_COLORS[realRank - 1] }}>
                {(p.points / 1000).toFixed(1)}K
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>points</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 8, flexWrap: 'wrap' }}>
                {p.badges.map((b, bi) => <span key={bi} style={{ fontSize: 14 }}>{b}</span>)}
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          { id: 'global',   label: '🌍 Global'   },
          { id: 'creators', label: '🎬 Creators'  },
          { id: 'fans',     label: '⚽ Fans'       },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id as any)} style={{
            padding: '6px 14px', borderRadius: 8, border: '0.5px solid',
            borderColor: filter === f.id ? '#B22234' : 'rgba(255,255,255,0.1)',
            background: filter === f.id ? 'rgba(178,34,52,0.15)' : 'transparent',
            color: filter === f.id ? '#B22234' : 'rgba(255,255,255,0.5)',
            fontSize: 12, fontWeight: 500, cursor: 'pointer',
          }}>{f.label}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#111118', borderRadius: 14, border: '0.5px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <div style={{ padding: '10px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.07)', display: 'grid', gridTemplateColumns: '40px 1fr 80px 80px 60px', gap: 10 }}>
          {['#', 'Utilisateur', 'Points', 'Videos', 'Trend'].map(h => (
            <div key={h} style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{h}</div>
          ))}
        </div>
        {filtered.map((p, i) => {
          const level = LEVELS[p.level]
          return (
            <div key={i} style={{
              padding: '12px 16px',
              borderBottom: '0.5px solid rgba(255,255,255,0.04)',
              display: 'grid', gridTemplateColumns: '40px 1fr 80px 80px 60px',
              gap: 10, alignItems: 'center',
              background: p.rank <= 3 ? `rgba(${p.rank === 1 ? '255,215,0' : p.rank === 2 ? '192,192,192' : '205,127,50'},0.03)` : 'transparent',
              transition: 'background .2s',
            }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 18, color: p.rank <= 3 ? RANK_COLORS[p.rank - 1] : 'rgba(255,255,255,0.25)' }}>
                {p.rank <= 3 ? RANK_ICONS[p.rank - 1] : p.rank}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: level.bg, border: `1.5px solid ${level.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                  {p.country}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.username}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 3, background: level.bg, color: level.color, fontWeight: 600 }}>{p.level}</span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{p.followers}</span>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 18, color: '#f1f5f9', lineHeight: 1 }}>
                  {(p.points / 1000).toFixed(1)}K
                </div>
                <div style={{ display: 'flex', gap: 1, marginTop: 3 }}>
                  {p.badges.slice(0, 3).map((b, bi) => <span key={bi} style={{ fontSize: 10 }}>{b}</span>)}
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{p.videos} vidéos</div>
              <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 600 }}>{p.trend}</div>
            </div>
          )
        })}
      </div>

      {/* Your rank */}
      <div style={{ marginTop: 16, background: 'rgba(178,34,52,0.07)', border: '0.5px solid rgba(178,34,52,0.2)', borderRadius: 12, padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 20 }}>👤</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9' }}>Votre position</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Continuez a uploader pour monter !</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: '#B22234' }}>#247</div>
          <div style={{ fontSize: 11, color: '#22c55e' }}>+15 cette semaine</div>
        </div>
      </div>

    </div>
  )
}