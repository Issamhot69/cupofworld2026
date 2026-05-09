'use client'
import { useState, useEffect } from 'react'

const HIGHLIGHTS = [
  { id: 1,  title: "But Mbappe 67' · FRA vs BRA",        match: 'France vs Bresil',      minute: 67, type: 'but',          isAI: true,  isViral: true,  views: 1200000, likes: 48000, emotion: 97, duration: '0:34', thumbnail: '⚽', generated: '12s apres le but' },
  { id: 2,  title: "Maroc qualifie en demi-finale !",     match: 'Maroc vs Portugal',     minute: 90, type: 'victoire',     isAI: false, isViral: true,  views: 980000,  likes: 41000, emotion: 99, duration: '1:12', thumbnail: '🇲🇦', generated: null },
  { id: 3,  title: "Arret incroyable Lloris 45'",         match: 'France vs Bresil',      minute: 45, type: 'arret',        isAI: true,  isViral: true,  views: 640000,  likes: 22000, emotion: 88, duration: '0:18', thumbnail: '🧤', generated: '8s apres l arret' },
  { id: 4,  title: "Carton rouge Pepe 71'",               match: 'Maroc vs Portugal',     minute: 71, type: 'carton',       isAI: true,  isViral: false, views: 420000,  likes: 15000, emotion: 72, duration: '0:22', thumbnail: '🟥', generated: '6s apres l incident' },
  { id: 5,  title: "But Ziyech 34' · MAR vs POR",        match: 'Maroc vs Portugal',     minute: 34, type: 'but',          isAI: true,  isViral: true,  views: 890000,  likes: 36000, emotion: 95, duration: '0:28', thumbnail: '⚽', generated: '15s apres le but' },
  { id: 6,  title: "Analyse tactique · FRA vs BRA",       match: 'France vs Bresil',      minute: 0,  type: 'analyse',      isAI: true,  isViral: false, views: 320000,  likes: 12000, emotion: 55, duration: '3:45', thumbnail: '📊', generated: 'Mi-temps' },
  { id: 7,  title: "Penalty rate Neymar 88'",             match: 'France vs Bresil',      minute: 88, type: 'penalty',      isAI: true,  isViral: true,  views: 760000,  likes: 28000, emotion: 91, duration: '0:45', thumbnail: '😱', generated: '9s apres le tir' },
  { id: 8,  title: "Ambiance stade · MAR vs POR",         match: 'Maroc vs Portugal',     minute: 0,  type: 'ambiance',     isAI: false, isViral: false, views: 180000,  likes: 8000,  emotion: 82, duration: '2:10', thumbnail: '🎉', generated: null },
  { id: 9,  title: "Resume 1ere mi-temps · ARG vs GER",   match: 'Argentine vs Allemagne', minute: 45, type: 'resume',      isAI: true,  isViral: false, views: 240000,  likes: 9000,  emotion: 60, duration: '4:20', thumbnail: '📽️', generated: 'Mi-temps auto' },
  { id: 10, title: "Top 5 buts · Journee 1",              match: 'Compilation',           minute: 0,  type: 'compilation',  isAI: true,  isViral: true,  views: 1500000, likes: 62000, emotion: 94, duration: '5:30', thumbnail: '🏆', generated: 'Auto quotidien' },
]

const TYPE_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  but:         { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',    label: '⚽ But' },
  arret:       { color: '#38bdf8', bg: 'rgba(56,189,248,0.1)',   label: '🧤 Arret' },
  carton:      { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',    label: '🟥 Carton' },
  penalty:     { color: '#f97316', bg: 'rgba(249,115,22,0.1)',   label: '🎯 Penalty' },
  victoire:    { color: '#FFD700', bg: 'rgba(255,215,0,0.1)',    label: '🏆 Victoire' },
  analyse:     { color: '#818cf8', bg: 'rgba(129,140,248,0.1)', label: '📊 Analyse' },
  ambiance:    { color: '#f472b6', bg: 'rgba(244,114,182,0.1)', label: '🎉 Ambiance' },
  resume:      { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', label: '📽️ Resume' },
  compilation: { color: '#B22234', bg: 'rgba(178,34,52,0.1)',   label: '🏆 Top' },
}

const FILTERS = ['Tout', 'Buts', 'IA Auto', 'Viral', 'Analyses']

export default function HighlightsPage() {
  const [filter, setFilter] = useState('Tout')
  const [selected, setSelected] = useState<any>(null)
  const [generating, setGenerating] = useState(false)
  const [newHighlight, setNewHighlight] = useState<any>(null)

  const filtered = HIGHLIGHTS.filter(h => {
    if (filter === 'Buts')     return h.type === 'but' || h.type === 'penalty'
    if (filter === 'IA Auto')  return h.isAI
    if (filter === 'Viral')    return h.isViral
    if (filter === 'Analyses') return h.type === 'analyse' || h.type === 'resume' || h.type === 'compilation'
    return true
  })

  const formatViews = (n: number) =>
    n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000).toFixed(0)+'K' : String(n)

  const simulateGenerate = async () => {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 2500))
    setNewHighlight({
      id: Date.now(),
      title: "Nouveau but · Argentine 1-0 Allemagne",
      match: 'Argentine vs Allemagne',
      minute: 54, type: 'but',
      isAI: true, isViral: false,
      views: 0, likes: 0, emotion: 88,
      duration: '0:31', thumbnail: '⚽',
      generated: '11s apres le but'
    })
    setGenerating(false)
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 64px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 2, color: '#f1f5f9' }}>
            🎬 High<span style={{ color: '#B22234' }}>lights</span>
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
            {HIGHLIGHTS.length} highlights · generés par IA · Cup of World 2026 &#127482;&#127480;
          </p>
        </div>
        <button onClick={simulateGenerate} disabled={generating} style={{
          padding: '10px 20px', borderRadius: 10,
          background: generating ? 'rgba(129,140,248,0.3)' : 'rgba(129,140,248,0.15)',
          border: '0.5px solid rgba(129,140,248,0.4)',
          color: '#818cf8', fontSize: 13, fontWeight: 600,
          cursor: generating ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {generating ? (
            <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚙️</span> Generation IA...</>
          ) : (
            <>🤖 Generer highlight</>
          )}
        </button>
      </div>

      {/* New highlight alert */}
      {newHighlight && (
        <div style={{ background: 'rgba(129,140,248,0.08)', border: '0.5px solid rgba(129,140,248,0.3)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>✨</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Nouveau highlight genere ! {newHighlight.title}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>IA · {newHighlight.duration} · genere en {newHighlight.generated}</div>
          </div>
          <button onClick={() => setNewHighlight(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 16 }}>✕</button>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Total highlights', value: HIGHLIGHTS.length,                               color: '#B22234' },
          { label: 'Generes par IA',   value: HIGHLIGHTS.filter(h => h.isAI).length,           color: '#818cf8' },
          { label: 'Viraux',           value: HIGHLIGHTS.filter(h => h.isViral).length,         color: '#22c55e' },
          { label: 'Vues totales',     value: formatViews(HIGHLIGHTS.reduce((s,h) => s+h.views, 0)), color: '#FFD700' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#111118', borderRadius: 10, padding: '1rem', border: '0.5px solid rgba(255,255,255,0.07)', borderLeft: `3px solid ${s.color}` }}>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: '#f1f5f9' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '.4px', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '6px 14px', borderRadius: 20, border: '0.5px solid',
            borderColor: filter === f ? '#B22234' : 'rgba(255,255,255,0.1)',
            background: filter === f ? 'rgba(178,34,52,0.15)' : 'transparent',
            color: filter === f ? '#B22234' : 'rgba(255,255,255,0.5)',
            fontSize: 12, fontWeight: 500, cursor: 'pointer',
          }}>{f}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
        {filtered.map((h, i) => {
          const tc = TYPE_CONFIG[h.type] || TYPE_CONFIG.but
          return (
            <div key={h.id} onClick={() => setSelected(h)} style={{
              background: '#111118', borderRadius: 12,
              border: '0.5px solid rgba(255,255,255,0.07)',
              overflow: 'hidden', cursor: 'pointer',
              transition: 'border-color .2s',
            }}>
              {/* Thumbnail */}
              <div style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg,#0d0d14,#1a1a2e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, position: 'relative' }}>
                {h.thumbnail}

                {/* Play button */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(178,34,52,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18 }}>▶</div>
                </div>

                {/* Duration */}
                <div style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 10, padding: '2px 7px', borderRadius: 4, background: 'rgba(0,0,0,0.8)', color: '#fff', fontWeight: 600 }}>
                  {h.duration}
                </div>

                {/* Badges */}
                <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 4 }}>
                  {h.isAI && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, background: 'rgba(129,140,248,0.9)', color: '#fff', fontWeight: 600 }}>IA</span>}
                  {h.isViral && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, background: 'rgba(178,34,52,0.9)', color: '#fff', fontWeight: 600 }}>VIRAL</span>}
                </div>

                {/* Emotion bar */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.1)' }}>
                  <div style={{ width: `${h.emotion}%`, height: '100%', background: h.emotion > 80 ? '#B22234' : '#FFD700' }} />
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '10px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9', lineHeight: 1.3, flex: 1 }}>{h.title}</div>
                  <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 3, background: tc.bg, color: tc.color, fontWeight: 600, flexShrink: 0 }}>{tc.label}</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{h.match}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{formatViews(h.views)} vues</span>
                  {h.generated && (
                    <span style={{ fontSize: 9, color: '#818cf8', fontWeight: 500 }}>🤖 {h.generated}</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#111118', borderRadius: 16, border: '0.5px solid rgba(255,255,255,0.1)', padding: '1.5rem', maxWidth: 480, width: '100%' }}>
            <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 16 }}>{selected.thumbnail}</div>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: '#f1f5f9', letterSpacing: 1, marginBottom: 8 }}>{selected.title}</h2>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>{selected.match} · {selected.minute ? `${selected.minute}'` : 'Compilation'}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                ['Vues', formatViews(selected.views)],
                ['Likes', formatViews(selected.likes)],
                ['Emotion', `${selected.emotion}%`],
              ].map(([l, v]) => (
                <div key={String(l)} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, color: '#f1f5f9' }}>{v}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{l}</div>
                </div>
              ))}
            </div>
            {selected.generated && (
              <div style={{ fontSize: 11, color: '#818cf8', marginBottom: 16 }}>🤖 Genere automatiquement : {selected.generated}</div>
            )}
            <button onClick={() => setSelected(null)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#B22234', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Fermer
            </button>
          </div>
        </div>
      )}

    </div>
  )
}