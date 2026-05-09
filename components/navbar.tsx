'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/',             label: 'Accueil'   },
  { href: '/global-wall',  label: 'Feed'      },
  { href: '/dashboard',    label: 'Dashboard' },
  { href: '/magazine',     label: 'Magazine'  },
  { href: '/tickets',      label: 'Billets'   },
  { href: '/shop',         label: 'Shop'      },
  { href: '/ai-chat',      label: '🤖 AI'     },
  { href: '/commentator',  label: '🎙️ Live'   },
  { href: '/upload',       label: 'Upload'    },
  { href: '/profile',      label: 'Profil'    },
  { href: '/fanzone', label: '🎮 Fan Zone' },
  { href: '/leaderboard', label: '🏆 Top' },
  { href: '/notifications', label: '🔔' },
  { href: '/highlights', label: '🎬 Highlights' },
  { href: '/auth', label: '🔑 Login' },
]

export default function Navbar() {
  const path = usePathname()
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 56,
      background: 'rgba(10,10,15,0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '0.5px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center',
      padding: '0 24px', gap: 4, overflowX: 'auto',
    }}>

      {/* Logo USA colors */}
      <Link href="/" style={{ textDecoration: 'none', marginRight: 16, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 18, letterSpacing: 2, color: '#B22234' }}>CUP</span>
        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 18, letterSpacing: 2, color: '#f1f5f9' }}>OF</span>
        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 18, letterSpacing: 2, color: '#3C3B6E' }}>WORLD</span>
        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 18, letterSpacing: 2, color: '#B22234' }}>2026</span>
        <span style={{ fontSize: 16 }}>🇺🇸</span>
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 2, flex: 1 }}>
        {LINKS.map(l => (
          <Link key={l.href} href={l.href} style={{
            padding: '5px 10px', borderRadius: 6,
            fontSize: 12, fontWeight: 500,
            textDecoration: 'none',
            color: path === l.href ? '#f1f5f9' : 'rgba(255,255,255,0.45)',
            background: path === l.href ? 'rgba(178,34,52,0.2)' : 'transparent',
            borderBottom: path === l.href ? '2px solid #B22234' : '2px solid transparent',
            whiteSpace: 'nowrap', flexShrink: 0,
            transition: 'all .15s',
          }}>
            {l.label}
          </Link>
        ))}
      </div>

      {/* Live badge USA colors */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 6,
        border: '0.5px solid rgba(178,34,52,0.4)',
        background: 'rgba(178,34,52,0.1)',
        fontSize: 11, fontWeight: 500, color: '#B22234',
        flexShrink: 0,
      }}>
        <span className="live-dot" style={{ background: '#B22234' }} /> LIVE 🇺🇸
      </div>
    </nav>
  )
}