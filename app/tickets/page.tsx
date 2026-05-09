'use client'
import { useState, useEffect } from 'react'

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetch('http://localhost:5002/api/tickets')
      .then(r => r.json())
      .then(data => { setTickets(data.tickets || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleBuy = async () => {
    if (!selected || !category) return
    const res = await fetch('http://localhost:5002/api/tickets/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchId: selected.matchId, category, quantity, userId: 'user1' })
    })
    const data = await res.json()
    if (data.success) {
      setSuccess(`Billet confirme ! Ref: ${data.order.id} · $${data.order.price}`)
      setSelected(null)
      setCategory('')
    }
  }

  const COLORS: any = {
    'France vs Bresil': '#002395',
    'Argentine vs Allemagne': '#74ACDF',
    'Maroc vs Portugal': '#C8102E',
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 64px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 2, color: '#f1f5f9' }}>
          Billets <span style={{ color: '#C8102E' }}>Matchs</span>
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Cup of World 2026 · USA · Places officielles</p>
      </div>

      {success && (
        <div style={{ background: 'rgba(34,197,94,0.1)', border: '0.5px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#22c55e' }}>
          ✅ {success}
        </div>
      )}

      {loading ? <div style={{ color: 'rgba(255,255,255,0.4)' }}>Chargement...</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {tickets.map((t, i) => (
            <div key={i} style={{ background: '#111118', borderRadius: 14, border: '0.5px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              <div style={{ height: 6, background: COLORS[t.match] || '#C8102E' }} />
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 22, color: '#f1f5f9', letterSpacing: 1 }}>{t.match}</h2>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>📅 {t.date} · 🏟️ {t.stadium}</div>
                  </div>
                  <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 6, background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontWeight: 600 }}>DISPONIBLE</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 16 }}>
                  {t.categories.map((c: any, j: number) => (
                    <div key={j} onClick={() => { setSelected(t); setCategory(c.name) }} style={{ padding: '12px', borderRadius: 10, cursor: 'pointer', border: '0.5px solid', borderColor: selected?.matchId === t.matchId && category === c.name ? '#C8102E' : 'rgba(255,255,255,0.1)', background: selected?.matchId === t.matchId && category === c.name ? 'rgba(200,16,46,0.1)' : 'rgba(255,255,255,0.02)', transition: 'all .15s' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9', marginBottom: 4 }}>{c.name}</div>
                      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 22, color: '#C8102E' }}>${c.price}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{c.available} places</div>
                    </div>
                  ))}
                </div>
                {selected?.matchId === t.matchId && (
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <select value={quantity} onChange={e => setQuantity(Number(e.target.value))} style={{ padding: '8px 12px', borderRadius: 8, background: '#0a0a0f', border: '0.5px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: 13 }}>
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} billet{n>1?'s':''}</option>)}
                    </select>
                    <button onClick={handleBuy} style={{ flex: 1, padding: '10px', borderRadius: 8, background: '#C8102E', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                      Acheter · {category} · ${t.categories.find((c:any) => c.name === category)?.price * quantity}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}