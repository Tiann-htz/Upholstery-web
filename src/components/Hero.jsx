import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown, MapPin, CheckCircle } from 'lucide-react'
const heroPic = '/images/Sofa Reupholstery1.jfif'

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })
      tl
        .fromTo('.h-badge',   { opacity:0, y:14 }, { opacity:1, y:0, duration:0.55, ease:'power2.out' })
        .fromTo('.h-line',    { opacity:0, y:36 }, { opacity:1, y:0, duration:0.7, stagger:0.12, ease:'power3.out' }, '-=0.2')
        .fromTo('.h-sub',     { opacity:0, y:18 }, { opacity:1, y:0, duration:0.6, ease:'power2.out' }, '-=0.3')
        .fromTo('.h-btns',    { opacity:0, y:14 }, { opacity:1, y:0, duration:0.5, ease:'power2.out' }, '-=0.35')
        .fromTo('.h-trust',   { opacity:0, y:12 }, { opacity:1, y:0, duration:0.5, stagger:0.08, ease:'power2.out' }, '-=0.3')
        .fromTo('.h-imgcard', { opacity:0, x:40, scale:0.96 }, { opacity:1, x:0, scale:1, duration:1, ease:'power3.out' }, '-=0.85')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={ref} style={{
      minHeight: '100vh',
      background: 'linear-gradient(150deg, #F3F1EC 0%, #FAFAF7 55%, #EEF2EE 100%)',
      display: 'flex', alignItems: 'center',
      padding: '0 6vw', paddingTop: '5rem',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Subtle stitch-line top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: 'linear-gradient(90deg, var(--green), var(--gold), var(--green))',
      }} />

      {/* Soft background circle */}
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,175,126,0.10) 0%, transparent 70%)',
        top: '-100px', right: '-50px', pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1180, margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '4rem', alignItems: 'center',
      }} className="hero-grid">

        {/* LEFT */}
        <div>
          {/* Location badge */}
          <div className="h-badge" style={{
            opacity: 0,
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 50, padding: '0.38rem 1rem',
            fontSize: '0.78rem', fontWeight: 700,
            color: 'var(--green)', marginBottom: '1.4rem',
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
          }}>
            <MapPin size={13} strokeWidth={2.5} />
            Davao City, Philippines
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'Lora, serif', fontWeight: 700,
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            lineHeight: 1.18, marginBottom: '1.3rem',
          }}>
            {[
              { text: 'Quality Upholstery', color: 'var(--text-dark)' },
              { text: 'You Can Trust', color: 'var(--text-dark)' },
              { text: 'Right Here in Davao.', color: 'var(--green)' },
            ].map((l, i) => (
              <span key={i} className="h-line" style={{
                display: 'block', opacity: 0, color: l.color,
              }}>{l.text}</span>
            ))}
          </h1>

          <p className="h-sub" style={{
            opacity: 0, color: 'var(--text)',
            fontSize: '1.05rem', maxWidth: 430,
            marginBottom: '2rem', lineHeight: 1.85,
          }}>
            Sofas, chairs, and car seats — repaired, restored, and built to last. Rey's shop has been the go-to upholstery service in Davao City for over 10 years.
          </p>

          <div className="h-btns" style={{ opacity:0, display:'flex', gap:'0.9rem', flexWrap:'wrap', marginBottom:'2.5rem' }}>
            <a href="#gallery" className="btn-main">See Our Work</a>
            <a href="#contact" className="btn-ghost">Send an Inquiry</a>
          </div>

          {/* Trust signals */}
          <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
            {['Free estimate available','10+ years in business','Serving all of Davao'].map(t => (
              <div key={t} className="h-trust" style={{
                opacity:0, display:'flex', alignItems:'center', gap:'0.4rem',
                fontSize:'0.82rem', fontWeight:600, color:'var(--text)',
              }}>
                <CheckCircle size={15} color="var(--green-mid)" strokeWidth={2.5} />
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="h-imgcard" style={{ opacity:0, position:'relative' }}>
          {/* Main photo */}
          <div style={{
            width: '100%', aspectRatio: '4/3.2',
            borderRadius: 16,
            overflow: 'hidden', position: 'relative',
            boxShadow: '0 20px 60px rgba(44,62,45,0.18), 0 4px 16px rgba(0,0,0,0.08)',
            border: '1px solid rgba(255,255,255,0.6)',
          }}>
            <img
              src={heroPic}
              alt="Rey's Upholstery Shop"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
              }}
            />
          </div>

          {/* Years badge */}
          <div style={{
            position:'absolute', bottom:'-1.2rem', left:'-1.2rem',
            background:'var(--white)',
            border: '1px solid var(--border)',
            borderRadius:12,
            padding:'0.9rem 1.2rem',
            boxShadow:'0 8px 28px rgba(0,0,0,0.10)',
            display:'flex', gap:'0.7rem', alignItems:'center',
          }}>
            <div style={{
              width:42, height:42, borderRadius:8,
              background:'var(--green)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.3rem',
            }}>🏆</div>
            <div>
              <p style={{ fontFamily:'Lora,serif', fontWeight:700, fontSize:'1rem', color:'var(--text-dark)', lineHeight:1.1 }}>10+ Years</p>
              <p style={{ fontSize:'0.7rem', color:'var(--text-light)', fontWeight:600 }}>of trusted work</p>
            </div>
          </div>

          {/* Gold accent box behind image */}
          <div style={{
            position:'absolute', top:'-10px', right:'-10px',
            width:90, height:90,
            border:'3px solid var(--gold)',
            borderRadius:12, zIndex:-1, opacity:0.5,
          }} />
        </div>
      </div>

      {/* Scroll arrow */}
      <a href="#about" style={{
        position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:'0.3rem',
        textDecoration:'none', color:'var(--text-light)', fontSize:'0.7rem',
        letterSpacing:'0.1em', textTransform:'uppercase',
        animation:'bob 2.2s ease-in-out infinite',
      }}>
        <ArrowDown size={16} />
        scroll
      </a>

      <style>{`
        @keyframes bob {
          0%,100% { transform: translateX(-50%) translateY(0); opacity:0.6; }
          50% { transform: translateX(-50%) translateY(7px); opacity:1; }
        }
        @media (max-width:768px) {
          .hero-grid { grid-template-columns:1fr !important; text-align:center; gap:2.5rem !important; }
          .hero-grid > div:last-child { order:-1; }
          .h-btns { justify-content:center; }
          .h-trust { justify-content:center; }
        }
      `}</style>
    </section>
  )
}