import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown, MapPin, CheckCircle } from 'lucide-react'
const heroPic = '/images/Sofa Reupholstery1.jfif'

export default function Hero() {
  const ref = useRef(null)
 

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Initial reveal timeline ── */
      const tl = gsap.timeline({ delay: 0.3 })

      // Badge drops in with a spring bounce
      tl.fromTo('.h-badge',
        { opacity: 0, y: -20, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(2)' }
      )

      // Each headline word slides up from a clip mask feel
      tl.fromTo('.h-line',
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.85, stagger: 0.13, ease: 'power4.out' },
        '-=0.3'
      )

      // Subtext fades + rises
      tl.fromTo('.h-sub',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        '-=0.45'
      )

      // Buttons pop in with a scale spring
      tl.fromTo('.h-btn-item',
        { opacity: 0, y: 16, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.8)' },
        '-=0.4'
      )

      // Trust signals slide in from left with stagger
      tl.fromTo('.h-trust',
        { opacity: 0, x: -18 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.35'
      )

      // Image card sweeps in from right with depth
      tl.fromTo('.h-imgcard',
        { opacity: 0, x: 70, scale: 0.93, rotateY: 8 },
        { opacity: 1, x: 0, scale: 1, rotateY: 0, duration: 1.1, ease: 'power3.out' },
        '-=0.9'
      )

      // Years badge slides up after card lands
      tl.fromTo('.h-years-badge',
        { opacity: 0, y: 20, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(2)' },
        '-=0.3'
      )

      // Gold accent corner draws in
      tl.fromTo('.h-gold-corner',
        { opacity: 0, scale: 0.5, rotate: 15 },
        { opacity: 0.5, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.5)' },
        '-=0.4'
      )

      /* ── 2. Idle floating animation on the image card ── */
      gsap.to('.h-imgcard', {
        y: -10,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      })

      /* ── 3. Breathing pulse on the background circle ── */
      gsap.to('.h-bg-circle', {
        scale: 1.18,
        opacity: 0.7,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      /* ── 4. Subtle shimmer on the top bar ── */
      gsap.fromTo('.h-topbar',
        { backgroundPosition: '-200% center' },
        { backgroundPosition: '200% center', duration: 3.5, ease: 'none', repeat: -1, delay: 1 }
      )

      /* ── 5. Scroll-linked parallax on the image card ── */
      gsap.to('.h-imgcard', {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: -50,
        ease: 'none',
      })

      /* ── 6. Left content fades out slightly on scroll ── */
      gsap.to('.h-left-content', {
        scrollTrigger: {
          trigger: '#hero',
          start: 'center top',
          end: 'bottom top',
          scrub: 1,
        },
        opacity: 0.3,
        y: -30,
        ease: 'none',
      })

    }, ref)

    /* ── 7. Magnetic hover effect on buttons ── */
    const buttons = document.querySelectorAll('.h-btn-magnetic')
    const cleanups = []

    buttons.forEach(btn => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) * 0.28
        const dy = (e.clientY - cy) * 0.28
        gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
      }
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      }
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        btn.removeEventListener('mousemove', onMove)
        btn.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => {
      ctx.revert()
      cleanups.forEach(fn => fn())
    }
  }, [])

  return (
    <section id="hero" ref={ref} style={{
      minHeight: '100vh',
      background: 'linear-gradient(150deg, #F3F1EC 0%, #FAFAF7 55%, #EEF2EE 100%)',
      display: 'flex', alignItems: 'center',
      padding: '0 6vw', paddingTop: '5rem',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Top bar — shimmer animated */}
      <div className="h-topbar" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: 'linear-gradient(90deg, var(--green), var(--gold), var(--green), var(--gold), var(--green))',
        backgroundSize: '300% auto',
      }} />

      {/* Breathing background circle */}
      <div className="h-bg-circle" style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,175,126,0.10) 0%, transparent 70%)',
        top: '-100px', right: '-50px', pointerEvents: 'none',
        transformOrigin: 'center center',
      }} />

      {/* Second softer orb bottom-left */}
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,150,62,0.06) 0%, transparent 70%)',
        bottom: '-80px', left: '-60px', pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1180, margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '4rem', alignItems: 'center',
      }} className="hero-grid">

        {/* LEFT */}
        <div className="h-left-content">
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
            overflow: 'hidden',
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

          {/* Buttons with magnetic wrapper */}
          <div className="h-btns" style={{
            opacity: 0,
            display: 'flex', gap: '0.9rem', flexWrap: 'wrap', marginBottom: '2.5rem',
          }}>
            <div className="h-btn-item" style={{ opacity: 0 }}>
              <a href="#gallery" className="btn-main h-btn-magnetic">See Our Work</a>
            </div>
            <div className="h-btn-item" style={{ opacity: 0 }}>
              <a href="#contact" className="btn-ghost h-btn-magnetic">Send an Inquiry</a>
            </div>
          </div>

          {/* Trust signals */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Free estimate available', '10+ years in business', 'Serving all of Davao'].map(t => (
              <div key={t} className="h-trust" style={{
                opacity: 0, display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)',
              }}>
                <CheckCircle size={15} color="var(--green-mid)" strokeWidth={2.5} />
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="h-imgcard" style={{ opacity: 0, position: 'relative' }}>

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
                transition: 'transform 0.6s ease',
              }}
              onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.04, duration: 0.6, ease: 'power2.out' })}
              onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.6, ease: 'power2.out' })}
            />
          </div>

          {/* Years badge */}
          <div className="h-years-badge" style={{
            opacity: 0,
            position: 'absolute', bottom: '-1.2rem', left: '-1.2rem',
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '0.9rem 1.2rem',
            boxShadow: '0 8px 28px rgba(0,0,0,0.10)',
            display: 'flex', gap: '0.7rem', alignItems: 'center',
          }}
            onMouseEnter={e => gsap.to(e.currentTarget, { y: -4, boxShadow: '0 14px 36px rgba(0,0,0,0.14)', duration: 0.3, ease: 'power2.out' })}
            onMouseLeave={e => gsap.to(e.currentTarget, { y: 0, boxShadow: '0 8px 28px rgba(0,0,0,0.10)', duration: 0.4, ease: 'power2.out' })}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 8,
              background: 'var(--green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem',
            }}>🏆</div>
            <div>
              <p style={{ fontFamily: 'Lora,serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)', lineHeight: 1.1 }}>10+ Years</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: 600 }}>of trusted work</p>
            </div>
          </div>

          {/* Gold accent corner */}
          <div className="h-gold-corner" style={{
            opacity: 0,
            position: 'absolute', top: '-10px', right: '-10px',
            width: 90, height: 90,
            border: '3px solid var(--gold)',
            borderRadius: 12, zIndex: -1,
          }} />
        </div>
      </div>

      {/* Scroll arrow */}
      <a href="#about" style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
        textDecoration: 'none', color: 'var(--text-light)', fontSize: '0.7rem',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        animation: 'bob 2.2s ease-in-out infinite',
      }}>
        <ArrowDown size={16} />
        scroll
      </a>

      <style>{`
        @keyframes bob {
          0%,100% { transform: translateX(-50%) translateY(0); opacity:0.6; }
          50%      { transform: translateX(-50%) translateY(7px); opacity:1; }
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