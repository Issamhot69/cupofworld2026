'use client'
import { useState } from 'react'

const USER = { name: 'Youssef M.', username: '@youssef_m', role: 'Creator', views: '1.2M', followers: '48K' }
const MY_VIDEOS = [
  { id: 1, title: 'Maroc qualifie en demi-finale', views: '980K', emotion: 97 },
  { id: 2, title: 'Ambiance Casablanca nuit match', views: '310K', emotion: 78 },
  { id: 3, title: 'Analyse MAR vs POR', views: '120K', emotion: 60 },
]

export default function ProfilePage() {
  const [tab, setTab] = useState('videos')

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 64px' }}>
      <div style={{ background: '#111118', borderRadius: 16, border: '0.5px solid rgba(255,255,255,0.07)', padding: '2rem', marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(200,16,46,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#C8102E' }}>
            Y
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 26, color: '#f1f5f9' }}>{USER.name}</h1>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{USER.username} · {USER.role}</div>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: '#f1f5f9' }}>{USER.views}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>Vues</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: '#f1f5f9' }}>{USER.followers}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>Followers</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {['videos', 'stats'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '6px 16px', borderRadius: 8, border: '0.5px solid', borderColor: tab === t ? '#C8102E' : 'rgba(255,255,255,0.1)', background: tab === t ? 'rgba(200,16,46,0.15)' : 'transparent', color: tab === t ? '#C8102E' : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            {t === 'videos' ? 'Mes videos' : 'Mes stats'}
          </button>
        ))}
      </div>

      {tab === 'videos' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
          {MY_VIDEOS.map(v => (
            <div key={v.id} style={{ background: '#111118', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              <div style={{ aspectRatio: '16/9', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, position: 'relative' }}>
                ⚽
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.1)' }}>
                  <div style={{ width: `${v.emotion}%`, height: '100%', background: '#C8102E' }} />
                </div>
              </div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#f1f5f9' }}>{v.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{USER.username} · {v.views} vues</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'stats' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          {[
            ['Vues totales', '1.2M', '+18%', '#C8102E'],
            ['Engagement', '8.4%', '+1.2%', '#006633'],
            ['Score IA', '87/100', '+5pts', '#FFD700'],
            ['Abonnes', '+2.4K', 'record', '#1d4ed8'],
          ].map(([l, v, d, c]) => (
            <div key={String(l)} style={{ background: '#111118', borderRadius: 10, padding: '1.1rem', border: '0.5px solid rgba(255,255,255,0.07)', borderLeft: `3px solid ${c}` }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, color: '#f1f5f9' }}>{v}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{l}</div>
              <div style={{ fontSize: 11, color: '#22c55e', marginTop: 4 }}>{d}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}