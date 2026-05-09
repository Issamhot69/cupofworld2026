'use client'
import { useState, useEffect } from 'react'

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [category, setCategory] = useState('Tout')
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState('')

  const CATEGORIES = ['Tout', 'Maillot', 'Ballon', 'Accessoire', 'Pack']

  useEffect(() => {
    const url = category === 'Tout'
      ? 'http://localhost:5002/api/shop'
      : `http://localhost:5002/api/shop?category=${category}`
    fetch(url)
      .then(r => r.json())
      .then(data => { setProducts(data.products || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [category])

  const handleBuy = async (product: any) => {
    const res = await fetch('http://localhost:5002/api/shop/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id, quantity: 1, userId: 'user1' })
    })
    const data = await res.json()
    if (data.success) {
      setCart(c => [...c, product])
      setSuccess(`${product.name} ajoute au panier !`)
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 2, color: '#f1f5f9' }}>
            Shop <span style={{ color: '#C8102E' }}>Cup of World</span>
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Maillots · Ballons · Accessoires officiels 2026</p>
        </div>
        <div style={{ background: '#111118', borderRadius: 10, padding: '8px 16px', border: '0.5px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>🛒</span>
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, color: '#f1f5f9' }}>{cart.length}</span>
        </div>
      </div>

      {success && (
        <div style={{ background: 'rgba(34,197,94,0.1)', border: '0.5px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#22c55e' }}>
          ✅ {success}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ padding: '6px 14px', borderRadius: 20, border: '0.5px solid', borderColor: category === c ? '#C8102E' : 'rgba(255,255,255,0.1)', background: category === c ? 'rgba(200,16,46,0.15)' : 'transparent', color: category === c ? '#C8102E' : 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
        {loading ? (
          Array(6).fill(0).map((_, i) => <div key={i} style={{ height: 240, borderRadius: 12, background: '#111118' }} />)
        ) : products.map((p, i) => (
          <div key={i} style={{ background: '#111118', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <div style={{ height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, background: 'linear-gradient(135deg,#0d0d14,#1a1a2e)', position: 'relative' }}>
              {p.image || '📦'}
              {p.badge && (
                <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 9, padding: '2px 7px', borderRadius: 4, background: p.badge === 'VIP' ? 'rgba(255,215,0,0.2)' : 'rgba(200,16,46,0.2)', color: p.badge === 'VIP' ? '#FFD700' : '#C8102E', fontWeight: 600 }}>{p.badge}</span>
              )}
            </div>
            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#f1f5f9', marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 10 }}>{p.stock} en stock</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, color: '#C8102E' }}>${p.price}</span>
                <button onClick={() => handleBuy(p)} style={{ padding: '5px 12px', borderRadius: 6, background: '#C8102E', border: 'none', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Acheter</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}