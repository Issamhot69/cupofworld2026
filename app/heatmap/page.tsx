'use client'
import { useState, useEffect } from 'react'

const COUNTRIES = [
  { code: 'MA', name: 'Maroc',       flag: '🇲🇦', engagement: 95, fans: '4.2M',  trending: true,  color: '#C8102E' },
  { code: 'FR', name: 'France',      flag: '🇫🇷', engagement: 88, fans: '6.1M',  trending: true,  color: '#002395' },
  { code: 'BR', name: 'Bresil',      flag: '🇧🇷', engagement: 83, fans: '8.4M',  trending: false, color: '#009C3B' },
  { code: 'AR', name: 'Argentine',   flag: '🇦🇷', engagement: 79, fans: '5.2M',  trending: true,  color: '#74ACDF' },
  { code: 'DE', name: 'Allemagne',   flag: '🇩🇪', engagement: 71, fans: '3.8M',  trending: false, color: '#000000' },
  { code: 'US', name: 'USA',         flag: '🇺🇸', engagement: 64, fans: '12.1M', trending: true,  color: '#B22234' },
  { code: 'PT', name: 'Portugal',    flag: '🇵🇹', engagement: 78, fans: '2.9M',  trending: false, color: '#006600' },
  { code: 'ES', name: 'Espagne',     flag: '🇪🇸', engagement: 72, fans: '4.7M',  trending: false, color: '#AA151B' },
  { code: 'MX', name: 'Mexique',     flag: '🇲🇽', engagement: 69, fans: '7.3M',  trending: true,  color: '#006847' },
  { code: 'NG', name: 'Nigeria',     flag: '🇳🇬', engagement: 61, fans: '3.1M',  trending: false, color: '#008751' },
  { code: 'JP', name: 'Japon',       flag: '🇯🇵', engagement: 58, fans: '2.4M',  trending: false, color: '#BC002D' },
  { code: 'SN', name: 'Senegal',     flag: '🇸🇳', engagement: 74, fans: '1.8M',  trending: true,  color: '#00853F' },
]

const REGIONS = [
  { name: 'Afrique du Nord', engagement: 92, delta: '+340%', icon: '🌍' },
  { name: 'Europe',          engagement: 81, delta: '+180%', icon: '🌍' },
  { name: 'Amerique du Sud', engagement: 79, delta: '+220%', icon: '🌎' },
  { name: 'Amerique du Nord', engagement: 65, delta: '+150%', icon: '🌎' },
  { name: 'Afrique de l Ouest', engagement: 68, delta: '+190%', icon: '🌍' },
  { name: 'Asie du Sud-Est', engagement: 45, delta: '+80%',  icon: '🌏' },
]

export default function HeatmapPage() {
  const [view, setView] = useState<'pays' | 'regions'>('pays')
  const [selected, setSelected] = useState<any>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000)
    return () => clearInterval(id)
  }, [])

  const getColor = (engagement: number) => {
    if (engagement >= 85) return '#B22234'
    if (engagement >= 70) return '#ff6b35'
    if (engagement >= 55) return '#FFD700'
    return '#3C3B6E'
  }

  const getSize = (engagement: number) => {
    if (engagement >= 85) return 56
    if (engagement >= 70) return 48
    if (engagement >= 55) return 40
    return 32
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 64px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 2, color: '#f1f5f9' }}>
          🗺️ Heatmap <span style={{ color: '#B22234' }}>Mondiale</span>
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
          Engagement fans en temps reel · Cup of World 2026 &#127482;&#127480;
        </p>
      </div>

      {/* Global stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10, marginBottom: 24 }}>
        {[
          { label: 'Pays actifs',     value: '48',   color: '#B22234' },
          { label: 'Fans connectes',  value: '2.4M', color: '#3C3B6E' },
          { label: 'Zone la + chaude', value: 'Afrique N.', color: '#FFD700' },
          { label: 'Pic mondial',     value: '92%',  color: '#22c55e' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#111118', borderRadius: 10, padding: '1rem', border: '0.5px solid rgba(255,255,255,0.07)', borderLeft: `3px solid ${s.color}` }}>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: '#f1f5f9' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '.5px', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* View toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button onClick={() => setView('pays')} style={{ padding: '6px 16px', borderRadius: 8, border: '0.5px solid', borderColor: view === 'pays' ? '#B22234' : 'rgba(255,255,255,0.1)', background: view === 'pays' ? 'rgba(178,34,52,0.15)' : 'transparent', color: view === 'pays' ? '#B22234' : 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
          Par pays
        </button>
        <button onClick={() => setView('regions')} style={{ padding: '6px 16px', borderRadius: 8, border: '0.5px solid', borderColor: view === 'regions' ? '#B22234' : 'rgba(255,255,255,0.1)', background: view === 'regions' ? 'rgba(178,34,52,0.15)' : 'transparent', color: view === 'regions' ? '#B22234' : 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
          Par region
        </button>
      </div>

      {view === 'pays' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>

          {/* Bubble map */}
          <div style={{ background: '#111118', borderRadius: 14, border: '0.5px solid rgba(255,255,255,0.07)', padding: '1.5rem', minHeight: 400, position: 'relative' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Carte d engagement · taille = intensite
            </div>

            {/* Bubble grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
              {COUNTRIES.sort((a, b) => b.engagement - a.engagement).map((c, i) => (
                <div key={i} onClick={() => setSelected(c)} style={{
  width: getSize(c.engagement),
  height: getSize(c.engagement),
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.05)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
  fontSize: getSize(c.engagement) > 44 ? 28 : getSize(c.engagement) > 36 ? 22 : 16,
  textAlign: 'center',
  border: selected?.code === c.code ? `3px solid ${c.color}` : `1.5px solid ${c.color}40`,
  transition: 'all .3s',
  opacity: tick % 2 === 0 && c.trending ? 0.85 : 1,
  boxShadow: c.trending ? `0 0 ${c.engagement/5}px ${c.color}` : 'none',
}}>
  {c.flag}
</div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
              {[
                { color: '#B22234', label: 'Tres eleve 85%+' },
                { color: '#ff6b35', label: 'Eleve 70-84%' },
                { color: '#FFD700', label: 'Moyen 55-69%' },
                { color: '#3C3B6E', label: 'Faible -55%' },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {selected ? (
              <div style={{ background: '#111118', borderRadius: 12, border: `0.5px solid ${selected.color}40`, padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, color: '#f1f5f9', letterSpacing: 1 }}>{selected.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{selected.code} · {selected.fans} fans</div>
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: selected.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>
                    {selected.code}
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                    <span>Engagement</span>
                    <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{selected.engagement}%</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${selected.engagement}%`, height: '100%', background: selected.color, borderRadius: 3, transition: 'width .5s' }} />
                  </div>
                </div>
                {selected.trending && (
                  <div style={{ fontSize: 11, color: '#B22234', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5 }}>
                    🔥 Trending maintenant
                  </div>
                )}
              </div>
            ) : (
              <div style={{ background: '#111118', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.07)', padding: '1.25rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
                Cliquez sur un pays pour voir ses details
              </div>
            )}

            {/* Top 5 */}
            <div style={{ background: '#111118', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.07)', padding: '1rem' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Top 5 pays</div>
              {COUNTRIES.sort((a, b) => b.engagement - a.engagement).slice(0, 5).map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 18, color: 'rgba(255,255,255,0.25)', minWidth: 20 }}>{i + 1}</span>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#f1f5f9', flex: 1 }}>{c.name}</span>
                  <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${c.engagement}%`, height: '100%', background: c.color }} />
                  </div>
                  <span style={{ fontSize: 11, color: '#f1f5f9', fontWeight: 500, minWidth: 30 }}>{c.engagement}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'regions' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
          {REGIONS.map((r, i) => (
            <div key={i} style={{ background: '#111118', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.07)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{r.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>{r.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, color: getColor(r.engagement) }}>{r.engagement}%</div>
                  <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 500 }}>{r.delta}</div>
                </div>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${r.engagement}%`, height: '100%', background: getColor(r.engagement), borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}