'use client'
import { useState, useRef } from 'react'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async () => {
    if (!file || !title) return
    setUploading(true)
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(r => setTimeout(r, 80))
      setProgress(i)
    }
    setUploading(false)
    setFile(null)
    setTitle('')
    setProgress(0)
    alert('Video publiee avec succes !')
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 24px 64px' }}>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 34, letterSpacing: 2, color: '#f1f5f9', marginBottom: 8 }}>
        Uploader une <span style={{ color: '#C8102E' }}>video</span>
      </h1>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>
        L IA analyse automatiquement votre contenu
      </p>

      <div onClick={() => inputRef.current?.click()} style={{ border: `1.5px dashed ${file ? '#22c55e' : 'rgba(255,255,255,0.15)'}`, borderRadius: 14, padding: '3rem 2rem', textAlign: 'center', cursor: 'pointer', background: file ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.02)', marginBottom: 24 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>{file ? '✅' : '📹'}</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: file ? '#22c55e' : '#f1f5f9', marginBottom: 4 }}>
          {file ? file.name : 'Cliquer pour choisir une video'}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>MP4 · MOV · WEBM · max 2GB</div>
        <input ref={inputRef} type="file" accept="video/*" style={{ display: 'none' }}
          onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]) }} />
      </div>

      <input value={title} onChange={e => setTitle(e.target.value)}
        placeholder="Titre de la video..."
        style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#111118', border: '0.5px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: 13, outline: 'none', marginBottom: 20 }} />

      <div style={{ background: 'rgba(99,102,241,0.07)', border: '0.5px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '12px 14px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#818cf8', marginBottom: 6 }}>🤖 Analyse IA automatique</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
          Score viralite · Emotions detectees · Extraction highlights · Sous-titres FR EN AR ES PT
        </div>
      </div>

      {uploading && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: '#C8102E', transition: 'width .1s' }} />
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
            {progress}% · {progress < 100 ? 'Upload...' : 'Analyse IA...'}
          </div>
        </div>
      )}

      <button onClick={handleUpload} disabled={uploading || !file || !title} style={{ width: '100%', padding: 12, borderRadius: 10, background: !file || !title ? 'rgba(200,16,46,0.3)' : '#C8102E', border: 'none', color: '#fff', fontSize: 14, fontWeight: 500, cursor: !file || !title ? 'not-allowed' : 'pointer' }}>
        {uploading ? 'Publication...' : 'Publier sur Cup of World 2026'}
      </button>
    </div>
  )
}