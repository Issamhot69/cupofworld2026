'use client'
import { useState, useEffect } from 'react'

const CATEGORIES = ['Tout', 'Analyse', 'Report', 'Highlights', 'Interview', 'Stats']

export default function MagazinePage() {
  const [articles, setArticles] = useState<any[]>([])
  const [category, setCategory] = useState('Tout')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = category === 'Tout'
      ? 'http://localhost:5002/api/magazine'
      : `http://localhost:5002/api/magazine?category=${category}`
    fetch(url)
      .then(r => r.json())
      .then(data => { setArticles(data.articles || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [category])

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 64px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 2, color: '#f1f5f9' }}>
          Magazine <span style={{ color: '#C8102E' }}>Sport</span>
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Analyses · Interviews · Reports · Cup of World 2026</p>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ padding: '6px 14px', borderRadius: 20, border: '0.5px solid', borderColor: category === c ? '#C8102E' : 'rgba(255,255,255,0.1)', background: category === c ? 'rgba(200,16,46,0.15)' : 'transparent', color: category === c ? '#C8102E' : 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>{c}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
        {loading ? (
          Array(4).fill(0).map((_, i) => <div key={i} style={{ height: 180, borderRadius: 12, background: '#111118' }} />)
        ) : articles.map((a, i) => (
          <div key={i} style={{ background: '#111118', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.07)', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ height: 120, background: 'linear-gradient(135deg,#0d0d14,#1a1a2e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, position: 'relative' }}>
              {a.image}
              {a.premium && (
                <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 9, padding: '2px 8px', borderRadius: 4, background: 'rgba(255,215,0,0.2)', color: '#FFD700', fontWeight: 600 }}>PREMIUM</span>
              )}
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, display: 'inline-block', background: 'rgba(200,16,46,0.15)', color: '#C8102E', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>{a.category}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#f1f5f9', lineHeight: 1.4, marginBottom: 8 }}>{a.title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{a.author}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{a.views >= 1000 ? (a.views/1000).toFixed(0)+'K' : a.views} vues</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}