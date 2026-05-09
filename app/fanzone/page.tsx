'use client'
import { useState, useEffect } from 'react'

const QUIZ_QUESTIONS = [
  {
    question: 'Combien de buts Mbappe a-t-il marques dans ce match ?',
    options: ['1', '2', '3', '0'],
    correct: 1,
    points: 100,
  },
  {
    question: 'Quelle equipe a le plus de possession dans FRA vs BRA ?',
    options: ['France', 'Bresil', 'Egalite', 'Je sais pas'],
    correct: 0,
    points: 150,
  },
  {
    question: 'A quelle minute Ziyech a-t-il marque pour le Maroc ?',
    options: ['23', '34', '45', '67'],
    correct: 1,
    points: 200,
  },
  {
    question: 'Qui a recu un carton rouge dans MAR vs POR ?',
    options: ['Ziyech', 'Ronaldo', 'Pepe', 'Hakimi'],
    correct: 2,
    points: 150,
  },
]

const PRONOSTICS = [
  { match: 'France vs Bresil',     home: 'France',   away: 'Bresil',    status: 'live'   },
  { match: 'Argentine vs Allem.',  home: 'Argentine', away: 'Allemagne', status: 'live'   },
  { match: 'Maroc vs Portugal',    home: 'Maroc',    away: 'Portugal',  status: 'live'   },
  { match: 'Espagne vs Mexique',   home: 'Espagne',  away: 'Mexique',   status: 'upcoming' },
]

const SONDAGES = [
  { question: 'Qui va gagner la Coupe du Monde 2026 ?', options: [{ label: 'France', votes: 3200 }, { label: 'Argentine', votes: 2800 }, { label: 'Maroc', votes: 4100 }, { label: 'Bresil', votes: 2400 }] },
  { question: 'Meilleur joueur du tournoi ?', options: [{ label: 'Mbappe', votes: 5200 }, { label: 'Messi', votes: 3100 }, { label: 'Ziyech', votes: 2900 }, { label: 'Vinicius', votes: 1800 }] },
]

export default function FanZonePage() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'pronostic' | 'sondage'>('quiz')
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [pronostics, setPronostics] = useState<Record<string, string>>({})
  const [votes, setVotes] = useState<Record<string, number>>({})
  const [answered, setAnswered] = useState(false)

  const currentQ = QUIZ_QUESTIONS[quizIndex]

  const handleAnswer = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    setAnswered(true)
    if (idx === currentQ.correct) {
      setScore(s => s + currentQ.points)
    }
    setTimeout(() => {
      if (quizIndex < QUIZ_QUESTIONS.length - 1) {
        setQuizIndex(q => q + 1)
        setSelected(null)
        setAnswered(false)
      } else {
        setQuizDone(true)
      }
    }, 1500)
  }

  const handleVote = (sondageIdx: number, optionIdx: number) => {
    const key = `s${sondageIdx}`
    if (votes[key] !== undefined) return
    setVotes(v => ({ ...v, [key]: optionIdx }))
  }

  const totalVotes = (options: { votes: number }[]) =>
    options.reduce((s, o) => s + o.votes, 0)

  const TABS = [
    { id: 'quiz',      label: '🧠 Quiz',       desc: 'Testez vos connaissances' },
    { id: 'pronostic', label: '🎯 Pronostics',  desc: 'Predisez les resultats' },
    { id: 'sondage',   label: '📊 Sondages',    desc: 'Votez avec les fans' },
  ]

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 64px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 2, color: '#f1f5f9' }}>
          🎮 Fan <span style={{ color: '#B22234' }}>Zone</span>
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
          Quiz · Pronostics · Sondages · Cup of World 2026 &#127482;&#127480;
        </p>
      </div>

      {/* Score badge */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ background: 'rgba(178,34,52,0.1)', border: '0.5px solid rgba(178,34,52,0.3)', borderRadius: 10, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>🏆</span>
          <div>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, color: '#B22234', lineHeight: 1 }}>{score} pts</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Votre score</div>
          </div>
        </div>
        <div style={{ background: 'rgba(60,59,110,0.1)', border: '0.5px solid rgba(60,59,110,0.3)', borderRadius: 10, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>⚡</span>
          <div>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, color: '#818cf8', lineHeight: 1 }}>Fan</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Niveau</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 24 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id as any)} style={{
            padding: '10px 14px', borderRadius: 10, border: '0.5px solid',
            borderColor: activeTab === t.id ? '#B22234' : 'rgba(255,255,255,0.1)',
            background: activeTab === t.id ? 'rgba(178,34,52,0.15)' : '#111118',
            color: activeTab === t.id ? '#f1f5f9' : 'rgba(255,255,255,0.5)',
            cursor: 'pointer', textAlign: 'left',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{t.label}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{t.desc}</div>
          </button>
        ))}
      </div>

      {/* QUIZ */}
      {activeTab === 'quiz' && (
        <div style={{ background: '#111118', borderRadius: 14, border: '0.5px solid rgba(255,255,255,0.07)', padding: '1.5rem' }}>
          {quizDone ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🏆</div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 48, color: '#B22234', letterSpacing: 2 }}>{score} pts</div>
              <div style={{ fontSize: 16, color: '#f1f5f9', marginBottom: 8 }}>Quiz termine !</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>
                {score >= 400 ? '🔥 Expert football !' : score >= 200 ? '⚽ Bon fan !' : '📚 Continuez a apprendre !'}
              </div>
              <button onClick={() => { setQuizIndex(0); setSelected(null); setScore(0); setQuizDone(false); setAnswered(false) }} style={{ padding: '10px 24px', borderRadius: 8, background: '#B22234', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Recommencer
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Question {quizIndex + 1}/{QUIZ_QUESTIONS.length}
                </span>
                <span style={{ fontSize: 11, color: '#B22234', fontWeight: 600 }}>+{currentQ.points} pts</span>
              </div>

              {/* Progress */}
              <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 2, marginBottom: 20, overflow: 'hidden' }}>
                <div style={{ width: `${((quizIndex) / QUIZ_QUESTIONS.length) * 100}%`, height: '100%', background: '#B22234', transition: 'width .3s' }} />
              </div>

              <div style={{ fontSize: 16, fontWeight: 600, color: '#f1f5f9', marginBottom: 20, lineHeight: 1.5 }}>
                {currentQ.question}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {currentQ.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} style={{
                    padding: '12px 16px', borderRadius: 10, border: '0.5px solid',
                    borderColor: selected === null ? 'rgba(255,255,255,0.1)'
                      : i === currentQ.correct ? '#22c55e'
                      : selected === i ? '#B22234'
                      : 'rgba(255,255,255,0.07)',
                    background: selected === null ? 'rgba(255,255,255,0.03)'
                      : i === currentQ.correct ? 'rgba(34,197,94,0.1)'
                      : selected === i ? 'rgba(178,34,52,0.1)'
                      : 'transparent',
                    color: selected === null ? '#f1f5f9'
                      : i === currentQ.correct ? '#22c55e'
                      : selected === i ? '#B22234'
                      : 'rgba(255,255,255,0.3)',
                    fontSize: 13, fontWeight: 500, cursor: selected !== null ? 'default' : 'pointer',
                    textAlign: 'left', transition: 'all .2s',
                  }}>
                    <span style={{ marginRight: 8, opacity: 0.5 }}>{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PRONOSTICS */}
      {activeTab === 'pronostic' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PRONOSTICS.map((p, i) => (
            <div key={i} style={{ background: '#111118', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.07)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>{p.match}</span>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: p.status === 'live' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)', color: p.status === 'live' ? '#22c55e' : 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                  {p.status === 'live' ? '● LIVE' : 'A VENIR'}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 10, alignItems: 'center' }}>
                <button onClick={() => setPronostics(prev => ({ ...prev, [p.match]: p.home }))} style={{
                  padding: '10px', borderRadius: 8, border: '0.5px solid',
                  borderColor: pronostics[p.match] === p.home ? '#B22234' : 'rgba(255,255,255,0.1)',
                  background: pronostics[p.match] === p.home ? 'rgba(178,34,52,0.15)' : 'transparent',
                  color: pronostics[p.match] === p.home ? '#f1f5f9' : 'rgba(255,255,255,0.5)',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>
                  {p.home}
                </button>
                <button onClick={() => setPronostics(prev => ({ ...prev, [p.match]: 'nul' }))} style={{
                  padding: '8px 12px', borderRadius: 8, border: '0.5px solid',
                  borderColor: pronostics[p.match] === 'nul' ? '#FFD700' : 'rgba(255,255,255,0.1)',
                  background: pronostics[p.match] === 'nul' ? 'rgba(255,215,0,0.1)' : 'transparent',
                  color: pronostics[p.match] === 'nul' ? '#FFD700' : 'rgba(255,255,255,0.4)',
                  fontSize: 11, fontWeight: 600, cursor: 'pointer',
                }}>
                  NUL
                </button>
                <button onClick={() => setPronostics(prev => ({ ...prev, [p.match]: p.away }))} style={{
                  padding: '10px', borderRadius: 8, border: '0.5px solid',
                  borderColor: pronostics[p.match] === p.away ? '#3C3B6E' : 'rgba(255,255,255,0.1)',
                  background: pronostics[p.match] === p.away ? 'rgba(60,59,110,0.15)' : 'transparent',
                  color: pronostics[p.match] === p.away ? '#f1f5f9' : 'rgba(255,255,255,0.5)',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>
                  {p.away}
                </button>
              </div>
              {pronostics[p.match] && (
                <div style={{ marginTop: 10, fontSize: 11, color: '#22c55e', fontWeight: 500 }}>
                  ✅ Pronostic enregistre : {pronostics[p.match]}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SONDAGES */}
      {activeTab === 'sondage' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {SONDAGES.map((s, si) => {
            const key = `s${si}`
            const total = totalVotes(s.options)
            const voted = votes[key] !== undefined
            return (
              <div key={si} style={{ background: '#111118', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.07)', padding: '1.25rem' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 16 }}>{s.question}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {s.options.map((opt, oi) => {
                    const pct = Math.round((opt.votes / total) * 100)
                    const isVoted = votes[key] === oi
                    return (
                      <button key={oi} onClick={() => handleVote(si, oi)} style={{
                        padding: '10px 14px', borderRadius: 8, border: '0.5px solid',
                        borderColor: isVoted ? '#B22234' : 'rgba(255,255,255,0.1)',
                        background: 'transparent', cursor: voted ? 'default' : 'pointer',
                        position: 'relative', overflow: 'hidden', textAlign: 'left',
                      }}>
                        {voted && (
                          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, background: isVoted ? 'rgba(178,34,52,0.15)' : 'rgba(255,255,255,0.04)', transition: 'width .5s' }} />
                        )}
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 13, fontWeight: 500, color: isVoted ? '#f1f5f9' : 'rgba(255,255,255,0.6)' }}>
                            {isVoted ? '✓ ' : ''}{opt.label}
                          </span>
                          {voted && (
                            <span style={{ fontSize: 12, fontWeight: 600, color: isVoted ? '#B22234' : 'rgba(255,255,255,0.4)' }}>
                              {pct}%
                            </span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
                {voted && (
                  <div style={{ marginTop: 10, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                    {total.toLocaleString()} votes au total
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}