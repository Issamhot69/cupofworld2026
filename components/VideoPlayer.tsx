'use client'
import { useRef, useState } from 'react'

interface Props {
  src?: string; title?: string; views?: string
  author?: string; isAI?: boolean; isViral?: boolean; emotion?: number
}

export default function VideoPlayer({ src, title = 'Highlight Cup of World 2026', views = '0', author = '@user', isAI = false, isViral = false, emotion = 70 }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(Math.floor(Math.random() * 9000 + 1000))
  const toggle = () => { if (!videoRef.current) return; playing ? videoRef.current.pause() : videoRef.current.play(); setPlaying(p => !p) }

  const formatViews = (v: string) => {
    const n = Number(v)
    if (n >= 1000000) return (n/1000000).toFixed(1) + 'M'
    if (n >= 1000) return (n/1000).toFixed(0) + 'K'
    return v
  }

  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', background: '#0d0d14', border: '0.5px solid rgba(255,255,255,0.07)' }}>
      <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0a0a0f', cursor: 'pointer' }} onClick={toggle}>
        {src
          ? <video ref={videoRef} src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} playsInline loop />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>⚽</div>
        }
        <div className="video-overlay" />
        {!playing && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(200,16,46,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20 }}>▶</div>
          </div>
        )}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          {isAI    && <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, background: 'rgba(99,102,241,0.85)', color: '#fff', fontWeight: 600 }}>IA</span>}
          {isViral && <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, background: 'rgba(200,16,46,0.85)', color: '#fff', fontWeight: 600 }}>VIRAL</span>}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.1)' }}>
          <div style={{ width: `${emotion}%`, height: '100%', background: emotion > 75 ? '#C8102E' : '#FFD700' }} />
        </div>
      </div>
      <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(200,16,46,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#C8102E', flexShrink: 0 }}>
          {author.charAt(1)?.toUpperCase() || 'U'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>{author} · {formatViews(views)} vues</div>
        </div>
        <button onClick={() => { setLiked(l => !l); setLikes(n => liked ? n - 1 : n + 1) }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          <span style={{ fontSize: 16 }}>{liked ? '❤️' : '🤍'}</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{likes.toLocaleString()}</span>
        </button>
      </div>
    </div>
  )
}