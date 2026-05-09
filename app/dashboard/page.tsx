'use client'
import { useState, useEffect } from 'react'

const TABS = ['Stats globales', 'Utilisateurs', 'Contenu']
const USERS = [
  { name: '@youssef_m', country: 'MA', role: 'Creator', status: 'online', views: '1.2M' },
  { name: '@leo_santos', country: 'BR', role: 'VIP', status: 'online', views: '840K' },
  { name: '@pierre_d', country: 'FR', role: 'Creator', status: 'offline', views: '620K' },
  { name: '@spam_bot', country: '--', role: '--', status: 'banned', views: '0' },
]
const MOD = [
  { title: 'But Mbappe 67', flag: 'ok', icon: '⚽', isAI: true },
  { title: 'Commentaire haineux', flag: 'hate', icon: '🚨', isAI: false },
  { title: 'Highlight ARG 0-0 GER', flag: 'ok', icon: '📹', isAI: true },
  { title: 'Spam detecte', flag: 'spam', icon: '🤖', isAI: false },
]

export default function DashboardPage() {
  const [tab, setTab] = useState(0)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetch('http://localhost:5002/api/posts/stats/global')
      .then(r => r.json())
      .then(data => setStats(data.stats))
      .catch(() => {})
  }, [])

  const metrics = [
    { label: 'Vues 24h', value: stats ? (stats.totalViews/1000000).toFixed(1)+'M' : '...', delta: '+18%', color: '#C8102E' },
    { label: 'Utilisateurs', value: stats ? (stats.activeUsers/1000).toFixed(0)+'K' : '...', delta: '+6%', color: '#006633' },
    { label: 'Score IA', value: stats ? stats.aiScore+'%' : '...', delta: '+2pts', color: '#FFD700' },
    { label: 'Videos IA', value: stats ? String(stats.aiPosts) : '...', delta: '+340', color: '#1d4ed8' },
  ]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 34, letterSpacing: 2, color: '#f1f5f9' }}>
          Dashboard <span style={{ color: '#C8102E' }}>Admin</span>
        </h1>
        <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="live-dot" />LIVE
        </span>
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{ padding: '6px 16px', borderRadius: 8, border: '0.5px solid', borderColor: tab === i ? '#C8102E' : 'rgba(255,255,255,0.1)', background: tab === i ? 'rgba(200,16,46,0.15)' : 'rgba(255,255,255,0.03)', color: tab === i ? '#C8102E' : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10, marginBottom: 20 }}>
            {metrics.map((m, i) => (
              <div key={i} style={{ background: '#111118', borderRadius: 10, padding: '1rem', border: '0.5px solid rgba(255,255,255,0.07)', borderLeft: `3px solid ${m.color}` }}>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, color: '#f1f5f9' }}>{m.value}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '.5px' }}>{m.label}</div>
                <div style={{ fontSize: 11, color: '#22c55e', marginTop: 4, fontWeight: 500 }}>{m.delta}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#111118', borderRadius: 12, padding: '1rem', border: '0.5px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginBottom: 12, textTransform: 'uppercase' }}>Engagement par pays</div>
            {[['Maroc',95],['France',88],['Bresil',83],['Argentine',79],['USA',64]].map(([n,p]) => (
              <div key={String(n)} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', minWidth: 72 }}>{n}</span>
                <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${p}%`, height: '100%', background: '#C8102E' }} />
                </div>
                <span style={{ fontSize: 11, color: '#f1f5f9', fontWeight: 500 }}>{p}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 1 && (
        <div style={{ background: '#111118', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead><tr style={{ borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
              {['Utilisateur','Pays','Role','Statut','Vues'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 500, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {USERS.map((u, i) => (
                <tr key={i} style={{ borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 14px', color: '#f1f5f9', fontWeight: 500 }}>{u.name}</td>
                  <td style={{ padding: '10px 14px', color: 'rgba(255,255,255,0.5)' }}>{u.country}</td>
                  <td style={{ padding: '10px 14px', color: 'rgba(255,255,255,0.5)' }}>{u.role}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: u.status === 'online' ? '#22c55e' : u.status === 'banned' ? '#C8102E' : 'rgba(255,255,255,0.3)' }} />
                      <span style={{ fontSize: 11, color: u.status === 'online' ? '#22c55e' : u.status === 'banned' ? '#C8102E' : 'rgba(255,255,255,0.4)' }}>{u.status}</span>
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#f1f5f9', fontWeight: 500 }}>{u.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {MOD.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#111118', borderRadius: 10, padding: '.75rem 1rem', border: '0.5px solid rgba(255,255,255,0.07)' }}>
              <div style={{ width: 44, height: 32, borderRadius: 6, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#f1f5f9' }}>
                  {c.title}
                  {c.isAI && <span style={{ marginLeft: 6, fontSize: 9, padding: '2px 6px', borderRadius: 3, background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>IA</span>}
                </div>
                <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 3, fontWeight: 500, background: c.flag === 'ok' ? 'rgba(34,197,94,0.1)' : c.flag === 'hate' ? 'rgba(200,16,46,0.1)' : 'rgba(234,179,8,0.1)', color: c.flag === 'ok' ? '#22c55e' : c.flag === 'hate' ? '#C8102E' : '#a16207' }}>{c.flag}</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '0.5px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.07)', color: '#22c55e', cursor: 'pointer' }}>Garder</button>
                <button style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '0.5px solid rgba(200,16,46,0.3)', background: 'rgba(200,16,46,0.07)', color: '#C8102E', cursor: 'pointer' }}>Retirer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}