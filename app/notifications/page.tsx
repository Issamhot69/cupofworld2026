'use client'
import { useState, useEffect } from 'react'

const NOTIFS = [
  { id: 1,  type: 'goal',     icon: '⚽', title: 'BUT ! France 2-1 Bresil',          body: 'Mbappe marque a la 67eme minute !',           time: '2 min',  read: false, priority: 'high',   match: 'FRA vs BRA' },
  { id: 2,  type: 'viral',    icon: '🔥', title: 'Votre video est virale !',          body: 'Maroc qualifie depasse 1M de vues',            time: '8 min',  read: false, priority: 'high',   match: null },
  { id: 3,  type: 'ai',       icon: '🤖', title: 'IA · Highlight genere',             body: 'But Mbappe 67 disponible sur le feed',         time: '12 min', read: false, priority: 'medium', match: 'FRA vs BRA' },
  { id: 4,  type: 'ticket',   icon: '🎟️', title: 'Billet VIP confirme',              body: 'FRA vs BRA · MetLife Stadium · Tribune VIP',  time: '1h',     read: true,  priority: 'medium', match: null },
  { id: 5,  type: 'goal',     icon: '⚽', title: 'BUT ! Maroc 1-0 Portugal',          body: 'Ziyech marque a la 34eme minute !',            time: '2h',     read: true,  priority: 'high',   match: 'MAR vs POR' },
  { id: 6,  type: 'social',   icon: '👥', title: 'Nouveau follower',                  body: '@leo_santos vous suit maintenant',             time: '3h',     read: true,  priority: 'low',    match: null },
  { id: 7,  type: 'shop',     icon: '🛒', title: 'Commande expediee',                 body: 'Maillot Maroc 2026 · Livraison 3-5 jours',    time: '5h',     read: true,  priority: 'low',    match: null },
  { id: 8,  type: 'ai',       icon: '🤖', title: 'Rapport IA hebdo pret',             body: '94% fiabilite · +18% vues · 12 highlights',  time: '1j',     read: true,  priority: 'low',    match: null },
  { id: 9,  type: 'goal',     icon: '⚽', title: 'Carton rouge · MAR vs POR',         body: 'Pepe expulse a la 71eme minute',               time: '2j',     read: true,  priority: 'medium', match: 'MAR vs POR' },
  { id: 10, type: 'comment',  icon: '💬', title: 'Nouveau commentaire',               body: '@casafan a commente votre video',             time: '2j',     read: true,  priority: 'low',    match: null },
]

const TYPE_COLORS: Record<string, { color: string; bg: string }> = {
  goal:    { color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  viral:   { color: '#B22234', bg: 'rgba(178,34,52,0.1)' },
  ai:      { color: '#818cf8', bg: 'rgba(129,140,248,0.1)' },
  ticket:  { color: '#FFD700', bg: 'rgba(255,215,0,0.1)' },
  social:  { color: '#38bdf8', bg: 'rgba(56,189,248,0.1)' },
  shop:    { color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
  comment: { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
}

const PRIORITY_COLORS: Record<string, string> = {
  high:   '#B22234',
  medium: '#FFD700',
  low:    '#22c55e',
}

const FILTERS = ['Tout', 'Non lu', 'Buts', 'IA', 'Social', 'Shop']

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFS)
  const [filter, setFilter] = useState('Tout')
  const [liveAlert, setLiveAlert] = useState<any>(null)

  const unread = notifs.filter(n => !n.read).length

  useEffect(() => {
    const LIVE_ALERTS = [
      { icon: '⚽', title: 'BUT ! Argentine vs Allemagne', body: 'Messi marque a la 45eme minute !' },
      { icon: '🔴', title: 'Carton rouge !', body: 'Expulsion dans FRA vs BRA !' },
      { icon: '🎯', title: 'Penalty !', body: 'Penalty accorde pour le Maroc !' },
    ]
    const id = setInterval(() => {
      const alert = LIVE_ALERTS[Math.floor(Math.random() * LIVE_ALERTS.length)]
      setLiveAlert(alert)
      setNotifs(prev => [{
        id: Date.now(),
        type: 'goal', icon: alert.icon,
        title: alert.title, body: alert.body,
        time: 'maintenant', read: false,
        priority: 'high', match: 'LIVE',
      }, ...prev])
      setTimeout(() => setLiveAlert(null), 4000)
    }, 15000)
    return () => clearInterval(id)
  }, [])

  const markAll = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  const markOne = (id: number) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const deleteOne = (id: number) => setNotifs(prev => prev.filter(n => n.id !== id))

  const filtered = notifs.filter(n => {
    if (filter === 'Non lu') return !n.read
    if (filter === 'Buts')   return n.type === 'goal'
    if (filter === 'IA')     return n.type === 'ai'
    if (filter === 'Social') return n.type === 'social' || n.type === 'comment'
    if (filter === 'Shop')   return n.type === 'shop' || n.type === 'ticket'
    return true
  })

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 24px 64px' }}>

      {/* Live alert */}
      {liveAlert && (
        <div style={{
          position: 'fixed', top: 72, right: 24, zIndex: 999,
          background: '#111118', border: '0.5px solid rgba(178,34,52,0.4)',
          borderRadius: 12, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          animation: 'slideIn .3s ease-out',
          maxWidth: 300,
        }}>
          <span style={{ fontSize: 22, flexShrink: 0 }}>{liveAlert.icon}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9' }}>{liveAlert.title}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{liveAlert.body}</div>
          </div>
          <span className="live-dot" style={{ background: '#B22234', flexShrink: 0 }} />
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 2, color: '#f1f5f9' }}>
            🔔 Notifi<span style={{ color: '#B22234' }}>cations</span>
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
            {unread} non lues · Cup of World 2026 &#127482;&#127480;
          </p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} style={{ padding: '7px 14px', borderRadius: 8, border: '0.5px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
            Tout marquer lu
          </button>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 20 }}>
        {[
          { label: 'Non lues',  value: unread,                                    color: '#B22234' },
          { label: 'Buts live', value: notifs.filter(n => n.type === 'goal').length, color: '#22c55e' },
          { label: 'IA alerts', value: notifs.filter(n => n.type === 'ai').length,   color: '#818cf8' },
          { label: 'Total',     value: notifs.length,                              color: '#FFD700' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#111118', borderRadius: 8, padding: '.75rem', border: '0.5px solid rgba(255,255,255,0.07)', borderLeft: `2px solid ${s.color}` }}>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 22, color: '#f1f5f9' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '.4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '5px 12px', borderRadius: 16, border: '0.5px solid',
            borderColor: filter === f ? '#B22234' : 'rgba(255,255,255,0.1)',
            background: filter === f ? 'rgba(178,34,52,0.15)' : 'transparent',
            color: filter === f ? '#B22234' : 'rgba(255,255,255,0.5)',
            fontSize: 11, fontWeight: 500, cursor: 'pointer',
          }}>{f}</button>
        ))}
      </div>

      {/* Notif list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.map((n, i) => {
          const tc = TYPE_COLORS[n.type] || TYPE_COLORS.comment
          return (
            <div key={n.id} onClick={() => markOne(n.id)} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '12px 14px', borderRadius: 12,
              background: n.read ? '#111118' : 'rgba(178,34,52,0.05)',
              border: '0.5px solid',
              borderColor: n.read ? 'rgba(255,255,255,0.06)' : 'rgba(178,34,52,0.2)',
              cursor: 'pointer', transition: 'all .15s',
            }}>
              {/* Icon */}
              <div style={{ width: 38, height: 38, borderRadius: 10, background: tc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                {n.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: n.read ? 400 : 600, color: n.read ? 'rgba(255,255,255,0.7)' : '#f1f5f9', lineHeight: 1.3 }}>
                    {n.title}
                  </div>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>{n.time}</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 3, lineHeight: 1.4 }}>{n.body}</div>
                {n.match && (
                  <span style={{ display: 'inline-block', marginTop: 5, fontSize: 9, padding: '1px 7px', borderRadius: 3, background: tc.bg, color: tc.color, fontWeight: 600 }}>
                    {n.match}
                  </span>
                )}
              </div>

              {/* Priority dot */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: n.read ? 'transparent' : PRIORITY_COLORS[n.priority] }} />
                <button onClick={e => { e.stopPropagation(); deleteOne(n.id) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.2)', fontSize: 12, padding: 2 }}>
                  ✕
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.3)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔔</div>
          <div style={{ fontSize: 14 }}>Aucune notification dans cette categorie</div>
        </div>
      )}
    </div>
  )
}