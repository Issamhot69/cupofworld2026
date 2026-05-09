'use client'
import { useState, useRef, useEffect } from 'react'

const MATCHES = [
  { id: '1', name: 'France vs Bresil', score: '2-1', minute: "67'" },
  { id: '2', name: 'Argentine vs Allemagne', score: '0-0', minute: "23'" },
  { id: '3', name: 'Maroc vs Portugal', score: '1-0', minute: "82'" },
]

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Bonjour ! Je suis votre expert football IA pour la Cup of World 2026. Selectionnez un match et posez vos questions !' }
  ])
  const [input, setInput] = useState('')
  const [matchId, setMatchId] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(m => [...m, { role: 'user', content: userMsg }])
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5002/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, matchId, userId: 'user1' })
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Erreur de connexion. Reessayez !' }])
    }
    setLoading(false)
  }

  const selectedMatch = MATCHES.find(m => m.id === matchId)

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 24px 64px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 2, color: '#f1f5f9' }}>
          AI <span style={{ color: '#C8102E' }}>Expert</span>
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Discutez les matchs avec votre expert football IA</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <button onClick={() => setMatchId('')} style={{ padding: '6px 14px', borderRadius: 20, border: '0.5px solid', borderColor: !matchId ? '#C8102E' : 'rgba(255,255,255,0.1)', background: !matchId ? 'rgba(200,16,46,0.15)' : 'transparent', color: !matchId ? '#C8102E' : 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>General</button>
        {MATCHES.map(m => (
          <button key={m.id} onClick={() => setMatchId(m.id)} style={{ padding: '6px 14px', borderRadius: 20, border: '0.5px solid', borderColor: matchId === m.id ? '#C8102E' : 'rgba(255,255,255,0.1)', background: matchId === m.id ? 'rgba(200,16,46,0.15)' : 'transparent', color: matchId === m.id ? '#C8102E' : 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
            {m.name} · {m.score}
          </button>
        ))}
      </div>

      {selectedMatch && (
        <div style={{ background: 'rgba(200,16,46,0.07)', border: '0.5px solid rgba(200,16,46,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#f1f5f9' }}>{selectedMatch.name}</span>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, color: '#C8102E', letterSpacing: 2 }}>{selectedMatch.score}</span>
            <span style={{ fontSize: 11, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className="live-dot" />{selectedMatch.minute}
            </span>
          </div>
        </div>
      )}

      <div style={{ background: '#111118', borderRadius: 14, border: '0.5px solid rgba(255,255,255,0.07)', padding: '1rem', height: 400, overflowY: 'auto', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: 12, background: m.role === 'user' ? '#C8102E' : 'rgba(255,255,255,0.05)', border: m.role === 'assistant' ? '0.5px solid rgba(255,255,255,0.07)' : 'none', fontSize: 13, color: '#f1f5f9', lineHeight: 1.5 }}>
              {m.role === 'assistant' && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4, fontWeight: 500 }}>🤖 Expert IA</div>}
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.07)', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              Expert IA en train d analyse...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Posez votre question sur le match..."
          style={{ flex: 1, padding: '12px 16px', borderRadius: 10, background: '#111118', border: '0.5px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: 13, outline: 'none' }} />
        <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ padding: '12px 20px', borderRadius: 10, background: loading ? 'rgba(200,16,46,0.3)' : '#C8102E', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
          Envoyer
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        {['Analyse tactique ?', 'Meilleur joueur ?', 'Prochain match ?', 'Stats du match ?'].map(q => (
          <button key={q} onClick={() => setInput(q)} style={{ padding: '4px 12px', borderRadius: 16, border: '0.5px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: 11, cursor: 'pointer' }}>{q}</button>
        ))}
      </div>
    </div>
  )
}