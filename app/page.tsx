'use client'
import Link from 'next/link'

const MATCHES = [
  { home: 'France', away: 'Bresil', score: '2 - 1', minute: '67', hot: true },
  { home: 'Argentine', away: 'Allemagne', score: '0 - 0', minute: '23', hot: false },
  { home: 'Maroc', away: 'Portugal', score: '1 - 0', minute: '82', hot: true },
]

const STATS = [
  { label: 'Vues 24h',            value: '2.4M', delta: '+18%', color: '#B22234' },
  { label: 'Utilisateurs actifs', value: '387K', delta: '+6%',  color: '#3C3B6E' },
  { label: 'Score IA',            value: '94%',  delta: '+2pts', color: '#FFD700' },
  { label: 'Videos IA generees',  value: '1.2K', delta: '+340', color: '#22c55e' },
]

export default function HomePage() {
  return (
    <div style={{ background: 'var(--wf-dark)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '80px 24px 48px', position: 'relative', overflow: 'hidden' }}>

        {/* BG glow USA colors */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 300, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(178,34,52,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '20%',
          width: 300, height: 200, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(60,59,110,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* LIVE badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '5px 16px', borderRadius: 20,
          border: '0.5px solid rgba(178,34,52,0.4)',
          background: 'rgba(178,34,52,0.08)',
          fontSize: 11, fontWeight: 600, color: '#B22234',
          marginBottom: 28, letterSpacing: '0.5px',
        }}>
          <span className="live-dot" style={{ background: '#B22234' }} />
          LIVE · COUPE DU MONDE 2026 · USA &#127482;&#127480;
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(52px, 10vw, 100px)',
          letterSpacing: 3, lineHeight: 0.9,
          marginBottom: 24,
        }}>
          <span style={{ color: '#B22234' }}>CUP</span>{' '}
          <span style={{ color: '#f1f5f9' }}>OF</span>{' '}
          <span style={{ color: '#3C3B6E' }}>WORLD</span>
          <br />
          <span style={{ color: '#B22234' }}>2026</span>{' '}
          <span style={{ color: '#FFD700' }}>USA</span>{' '}
          <span style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>&#127482;&#127480;</span>
        </h1>

        <p style={{
          maxWidth: 520, margin: '0 auto 36px',
          color: 'rgba(255,255,255,0.5)',
          fontSize: 15, lineHeight: 1.7,
        }}>
          L ecran mondial sportif nouvelle generation —
          videos temps reel, IA predictive, commentateur live 5 langues.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/global-wall" style={{
            padding: '12px 28px', borderRadius: 8,
            background: '#B22234', color: '#fff',
            fontWeight: 600, fontSize: 14, textDecoration: 'none',
            letterSpacing: '0.3px',
          }}>
            Voir le feed mondial
          </Link>
          <Link href="/commentator" style={{
            padding: '12px 28px', borderRadius: 8,
            background: 'rgba(60,59,110,0.3)',
            border: '0.5px solid rgba(60,59,110,0.6)',
            color: '#f1f5f9',
            fontWeight: 600, fontSize: 14, textDecoration: 'none',
          }}>
            🎙️ Commentateur Live
          </Link>
          <Link href="/dashboard" style={{
            padding: '12px 28px', borderRadius: 8,
            border: '0.5px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)',
            fontWeight: 500, fontSize: 14, textDecoration: 'none',
          }}>
            Dashboard Admin
          </Link>
        </div>
      </section>

      {/* LIVE MATCHES */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: '#f1f5f9', letterSpacing: 1 }}>
            Matchs en direct
          </h2>
          <span style={{ fontSize: 11, color: '#B22234', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className="live-dot" style={{ background: '#B22234' }} />
            {MATCHES.length} matchs
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {MATCHES.map((m, i) => (
            <div key={i} className="glass" style={{
              borderRadius: 12, padding: '1rem 1.25rem',
              borderColor: m.hot ? 'rgba(178,34,52,0.25)' : 'rgba(255,255,255,0.07)',
            }}>
              <div style={{ fontSize: 10, color: m.hot ? '#B22234' : 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 10, letterSpacing: '0.5px' }}>
                {m.hot ? '🔥 HOT' : '●'} {m.minute}'
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#f1f5f9' }}>{m.home}</span>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 26, color: '#f1f5f9', letterSpacing: 3 }}>{m.score}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#f1f5f9', textAlign: 'right' }}>{m.away}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 48px' }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: '#f1f5f9', letterSpacing: 1, marginBottom: 16 }}>
          Stats temps reel
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10 }}>
          {STATS.map((s, i) => (
            <div key={i} className="glass" style={{
              borderRadius: 10, padding: '1rem 1.1rem',
              borderLeft: `3px solid ${s.color}`,
            }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 32, color: '#f1f5f9', lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: '#22c55e', marginTop: 4, fontWeight: 500 }}>{s.delta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 64px' }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: '#f1f5f9', letterSpacing: 1, marginBottom: 16 }}>
          Technologies exclusives
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 10 }}>
          {[
            { icon: '🎙️', title: 'AI Commentateur', desc: '5 langues · 3 styles · temps reel', href: '/commentator' },
            { icon: '🤖', title: 'AI Expert Match', desc: 'Analyse tactique · predictions', href: '/ai-chat' },
            { icon: '📰', title: 'Magazine Sport', desc: 'Articles · interviews · stats', href: '/magazine' },
            { icon: '🎟️', title: 'Billets Officiels', desc: 'Tribune · VIP · Loge', href: '/tickets' },
            { icon: '🛒', title: 'Shop Officiel', desc: 'Maillots · ballons · accessoires', href: '/shop' },
            { icon: '📊', title: 'Dashboard IA', desc: 'Stats · moderation · heatmap', href: '/dashboard' },
          ].map((f, i) => (
            <Link key={i} href={f.href} style={{ textDecoration: 'none' }}>
              <div className="glass" style={{
                borderRadius: 12, padding: '1.1rem',
                cursor: 'pointer', transition: 'all .2s',
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}