'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ username: '', email: '', password: '', country: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    if (!form.email || !form.password) { setError('Email et mot de passe requis'); return }
    setLoading(true); setError('')
    try {
      const url = mode === 'login'
        ? 'http://localhost:5002/api/auth/login'
        : 'http://localhost:5002/api/auth/register'
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message); setLoading(false); return }
      localStorage.setItem('wf_token', data.token)
      localStorage.setItem('wf_user', JSON.stringify(data.user))
      router.push('/')
    } catch {
      setError('Erreur de connexion')
    }
    setLoading(false)
  }

  const COUNTRIES = ['🇲🇦 Maroc', '🇫🇷 France', '🇧🇷 Bresil', '🇦🇷 Argentine', '🇩🇪 Allemagne', '🇺🇸 USA', '🇵🇹 Portugal', '🇪🇸 Espagne']

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 32, letterSpacing: 3 }}>
            <span style={{ color: '#B22234' }}>CUP</span>{' '}
            <span style={{ color: '#f1f5f9' }}>OF</span>{' '}
            <span style={{ color: '#3C3B6E' }}>WORLD</span>{' '}
            <span style={{ color: '#B22234' }}>2026</span>{' '}
            &#127482;&#127480;
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
            {mode === 'login' ? 'Connectez-vous a votre compte' : 'Creez votre compte fan'}
          </div>
        </div>

        {/* Card */}
        <div style={{ background: '#111118', borderRadius: 16, border: '0.5px solid rgba(255,255,255,0.07)', padding: '2rem' }}>

          {/* Mode toggle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 24, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 4 }}>
            {(['login', 'register'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError('') }} style={{
                padding: '8px', borderRadius: 8, border: 'none',
                background: mode === m ? '#B22234' : 'transparent',
                color: mode === m ? '#fff' : 'rgba(255,255,255,0.5)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                transition: 'all .2s',
              }}>
                {m === 'login' ? 'Connexion' : 'Inscription'}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {mode === 'register' && (
              <input
                placeholder="Nom d utilisateur"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                style={{ padding: '11px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: 13, outline: 'none' }}
              />
            )}
            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              style={{ padding: '11px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: 13, outline: 'none' }}
            />
            <input
              placeholder="Mot de passe"
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              style={{ padding: '11px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: 13, outline: 'none' }}
            />
            {mode === 'register' && (
              <select
                value={form.country}
                onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                style={{ padding: '11px 14px', borderRadius: 8, background: '#111118', border: '0.5px solid rgba(255,255,255,0.1)', color: form.country ? '#f1f5f9' : 'rgba(255,255,255,0.4)', fontSize: 13, outline: 'none' }}
              >
                <option value="">Choisir votre pays</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, background: 'rgba(178,34,52,0.1)', border: '0.5px solid rgba(178,34,52,0.3)', fontSize: 12, color: '#B22234' }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button onClick={handleSubmit} disabled={loading} style={{
            width: '100%', marginTop: 20, padding: '12px',
            borderRadius: 10, background: loading ? 'rgba(178,34,52,0.5)' : '#B22234',
            border: 'none', color: '#fff', fontSize: 14, fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all .2s',
          }}>
            {loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : 'Creer mon compte'}
          </button>

          {/* Switch mode */}
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            {mode === 'login' ? "Pas de compte ? " : "Deja un compte ? "}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }} style={{ background: 'none', border: 'none', color: '#B22234', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
              {mode === 'login' ? "S'inscrire" : "Se connecter"}
            </button>
          </div>
        </div>

        {/* Demo */}
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
          Cup of World 2026 · Ecran Mondial Sportif &#127482;&#127480;
        </div>
      </div>
    </div>
  )
}