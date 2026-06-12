import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Scissors, Menu, X, Phone } from 'lucide-react'

const links = ['About', 'Services', 'Gallery', 'Testimonials', 'Contact']

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(250,250,247,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #E2DED8' : 'none',
      transition: 'all 0.35s ease',
      padding: '1rem 6vw',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>

      {/* Logo */}
      <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'var(--green)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Scissors size={18} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <p style={{ fontFamily: 'Lora, serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-dark)', lineHeight: 1.1 }}>Rey's Upholstery</p>
          <p style={{ fontSize: '0.62rem', color: 'var(--text-light)', letterSpacing: '0.06em', fontWeight: 600 }}>DAVAO CITY</p>
        </div>
      </a>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }} className="nav-d">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600,
              color: 'var(--text)', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--green)'}
              onMouseLeave={e => e.target.style.color = 'var(--text)'}
            >{l}</a>
          </li>
        ))}
        <li>
          <a href="#contact" className="btn-main" style={{ padding: '0.55rem 1.3rem', fontSize: '0.87rem' }}>
            <Phone size={14} />
            Get a Quote
          </a>
        </li>
      </ul>

      {/* Mobile burger */}
      <button onClick={() => setOpen(!open)} className="nav-burger"
        style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)' }}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--white)', borderBottom: '1px solid var(--border)',
          padding: '1.5rem 6vw 2rem',
          display: 'flex', flexDirection: 'column', gap: '1.2rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{ textDecoration: 'none', fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)' }}>
              {l}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-d { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}