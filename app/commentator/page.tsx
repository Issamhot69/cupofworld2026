'use client'
import { useState, useEffect, useRef } from 'react'

const MATCHES = [
  { id: '1', name: 'France vs Bresil', score: '2-1', minute: 67 },
  { id: '2', name: 'Argentine vs Allemagne', score: '0-0', minute: 23 },
  { id: '3', name: 'Maroc vs Portugal', score: '1-0', minute: 82 },
]

const LANGUAGES = [
  { code: 'fr', label: '🇫🇷 Français' },
  { code: 'ar', label: '🇲🇦 Arabe' },
  { code: 'es', label: '🇪🇸 Español' },
  { code: 'en', label: '🇬🇧 English' },
  { code: 'pt', label: '🇧🇷 Português' },
]

const STYLES = [
  { code: 'excited', label: '🔥 Passionné' },
  { code: 'neutral', label: '📊 Neutre' },
  { code: 'expert',  label: '🧠 Expert' },
]

interface Commentary {
  text: string
  match: string
  score: string
  minute: number
  language: string
  timestamp: Date
}

export default function CommentatorPage() {
  const [matchId, setMatchId] = useState('1')
  const [language, setLanguage] = useState('fr')
  const [style, setStyle] = useState('excited')
  const [commentaries, setCommentaries] = useState<Commentary[]>([])
  const [loading, setLoading] = useState(false)
  const [autoMode, setAutoMode] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const autoRef = useRef<any>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [commentaries])

  useEffect(() => {
    if (autoMode) {
      autoRef.current = setInterval(() => {
        generateCommentary()
      }, 8000)
    } else {
      clearInterval(autoRef.current)
    }
    return () => clearInterval(autoRef.current)
  }, [autoMode, matchId, language, style])

  const generateCommentary = async () => {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5002/api/commentator/commentary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, language, style })
      })
      const data = await res.json()
      if (data.success) {
        setCommentaries(prev => [...prev, {
          text: data.commentary,
          match: data.match,
          score: data.score,
          minute: data.minute,
          language: data.language,
          timestamp: new Date()
        }])
      }
    } catch {
      setCommentaries(prev => [...prev, {
        text: 'Connexion perdue avec le commentateur IA...',
        match: '', score: '', minute: 0,
        language: '', timestamp: new Date()
      }])
    }
    setLoading(false)
  }

  const selectedMatch = MATCHES.find(m => m.id === matchId)

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 64px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 2, color: '#f1f5f9' }}>
          🎙️ AI <span style={{ color: '#C8102E' }}>Commentateur</span>
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
          Commentaire live IA · 5 langues · 3 styles
        </p>
      </div>

      {/* Match selector */}
      <div style={{ background: '#111118', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.07)', padding: '1rem', marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Match</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {MATCHES.map(m => (
            <button key={m.id} onClick={() => setMatchId(m.id)} style={{ padding: '8px 14px', borderRadius: 8, border: '0.5px solid', borderColor: matchId === m.id ? '#C8102E' : 'rgba(255,255,255,0.1)', background: matchId === m.id ? 'rgba(200,16,46,0.15)' : 'transparent', color: matchId === m.id ? '#f1f5f9' : 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
              <div style={{ fontWeight: 600 }}>{m.name}</div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 16, color: '#C8102E', letterSpacing: 1 }}>{m.score} · {m.minute}'</div>
            </button>
          ))}
        </div>
      </div>

      {/* Language & Style */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{ background: '#111118', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.07)', padding: '1rem' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Langue</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => setLanguage(l.code)} style={{ padding: '5px 10px', borderRadius: 6, border: '0.5px solid', borderColor: language === l.code ? '#C8102E' : 'rgba(255,255,255,0.1)', background: language === l.code ? 'rgba(200,16,46,0.15)' : 'transparent', color: language === l.code ? '#f1f5f9' : 'rgba(255,255,255,0.5)', fontSize: 11, cursor: 'pointer' }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111118', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.07)', padding: '1rem' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Style</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {STYLES.map(s => (
              <button key={s.code} onClick={() => setStyle(s.code)} style={{ padding: '5px 10px', borderRadius: 6, border: '0.5px solid', borderColor: style === s.code ? '#C8102E' : 'rgba(255,255,255,0.1)', background: style === s.code ? 'rgba(200,16,46,0.15)' : 'transparent', color: style === s.code ? '#f1f5f9' : 'rgba(255,255,255,0.5)', fontSize: 11, cursor: 'pointer' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live score banner */}
      {selectedMatch && (
        <div style={{ background: 'rgba(200,16,46,0.07)', border: '0.5px solid rgba(200,16,46,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#f1f5f9' }}>{selectedMatch.name}</span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: '#C8102E', letterSpacing: 3 }}>{selectedMatch.score}</span>
            <span style={{ fontSize: 11, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className="live-dot" />{selectedMatch.minute}'
            </span>
          </div>
        </div>
      )}

      {/* Commentary feed */}
      <div style={{ background: '#111118', borderRadius: 14, border: '0.5px solid rgba(255,255,255,0.07)', padding: '1rem', minHeight: 300, maxHeight: 400, overflowY: 'auto', marginBottom: 16 }}>
        {commentaries.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 280, gap: 12 }}>
            <div style={{ fontSize: 48 }}>🎙️</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>Le commentateur IA attend votre signal...</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>Selectionnez un match et lancez le commentaire</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {commentaries.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px', borderRadius: 10, background: i === commentaries.length - 1 ? 'rgba(200,16,46,0.07)' : 'transparent', border: i === commentaries.length - 1 ? '0.5px solid rgba(200,16,46,0.15)' : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(200,16,46,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🎙️</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: '#C8102E', fontWeight: 600 }}>
                      {c.match} · {c.score} · {c.minute}'
                    </span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
                      {new Date(c.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, color: '#f1f5f9', lineHeight: 1.6 }}>{c.text}</div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={generateCommentary} disabled={loading} style={{ flex: 1, padding: '12px', borderRadius: 10, background: loading ? 'rgba(200,16,46,0.3)' : '#C8102E', border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? '🎙️ En cours...' : '🎙️ Générer commentaire'}
        </button>
        <button onClick={() => setAutoMode(a => !a)} style={{ padding: '12px 20px', borderRadius: 10, border: '0.5px solid', borderColor: autoMode ? '#22c55e' : 'rgba(255,255,255,0.1)', background: autoMode ? 'rgba(34,197,94,0.1)' : 'transparent', color: autoMode ? '#22c55e' : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          {autoMode ? '⏹ Stop Auto' : '▶ Auto Live'}
        </button>
        <button onClick={() => setCommentaries([])} style={{ padding: '12px 16px', borderRadius: 10, border: '0.5px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer' }}>
          🗑️
        </button>
      </div>
    </div>
  )
}