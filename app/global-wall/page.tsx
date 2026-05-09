'use client'
import { useState, useEffect } from 'react'
import VideoPlayer from '@/components/VideoPlayer'
import MatchLive from '@/components/MatchLive'

const FILTERS = ['Tout', 'Viral', 'IA', 'Live']

export default function GlobalWallPage() {
  const [filter, setFilter] = useState('Tout')
  const [posts, setPosts] = useState<any[]>([])
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5002/api/posts')
      .then(r => r.json())
      .then(data => { setPosts(data.posts || []); setLoading(false) })
      .catch(() => setLoading(false))

    fetch('http://localhost:5002/api/match/live')
      .then(r => r.json())
      .then(data => setMatches(data.matches || []))
      .catch(() => {})
  }, [])

  const filtered = posts.filter(v => {
    if (filter === 'Viral') return v.isViral
    if (filter === 'IA') return v.isAI
    return true
  })

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 64px' }}>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 2, color: '#f1f5f9', marginBottom: 8 }}>
        Feed <span style={{ color: '#C8102E' }}>Mondial</span>
      </h1>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>{posts.length} videos triees par IA</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 14px', borderRadius: 20, border: '0.5px solid', borderColor: filter === f ? '#C8102E' : 'rgba(255,255,255,0.1)', background: filter === f ? 'rgba(200,16,46,0.15)' : 'transparent', color: filter === f ? '#C8102E' : 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>{f}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
          {loading ? (
            Array(3).fill(0).map((_, i) => <div key={i} style={{ borderRadius: 12, aspectRatio: '16/9', background: '#111118' }} />)
          ) : filtered.map((v, i) => (
            <VideoPlayer key={i} title={v.title} views={String(v.views)} author={'@' + v.author} isAI={v.isAI} isViral={v.isViral} emotion={v.emotion} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 80 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Matchs en cours</div>
          {matches.map((m, i) => (
            <MatchLive key={i} home={{ name: m.home.name, flag: '', score: m.home.score }} away={{ name: m.away.name, flag: '', score: m.away.score }} minute={m.minute} />
          ))}
        </div>
      </div>
    </div>
  )
}