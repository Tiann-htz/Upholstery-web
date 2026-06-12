import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Clock, ThumbsUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Clock,    label: '10+ Years',   sub: 'in the business' },
  { icon: MapPin,   label: 'Davao City',  sub: 'locally owned & operated' },
  { icon: ThumbsUp, label: 'Satisfied',   sub: 'hundreds of customers' },
]

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.abt-img',
        { opacity:0, x:-50 },
        { opacity:1, x:0, duration:0.95, ease:'power3.out',
          scrollTrigger:{ trigger:'.abt-img', start:'top 80%' } })

      gsap.fromTo('.abt-content > *',
        { opacity:0, y:28 },
        { opacity:1, y:0, duration:0.65, stagger:0.12, ease:'power3.out',
          scrollTrigger:{ trigger:'.abt-content', start:'top 78%' } })

      gsap.fromTo('.abt-stat',
        { opacity:0, y:24 },
        { opacity:1, y:0, duration:0.55, stagger:0.1, ease:'back.out(1.5)',
          scrollTrigger:{ trigger:'.abt-stats', start:'top 84%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={ref} style={{ background:'var(--bg-alt)', padding:'90px 6vw' }}>
      <div style={{
        maxWidth:1180, margin:'0 auto',
        display:'grid', gridTemplateColumns:'1fr 1fr',
        gap:'5rem', alignItems:'center',
      }} className="abt-grid">

        {/* Photo */}
        <div className="abt-img" style={{ opacity:0, position:'relative' }}>
          <div style={{
  width:'100%', aspectRatio:'3/4', borderRadius:14,
  overflow:'hidden',
  boxShadow:'0 16px 50px rgba(44,62,45,0.14)',
  border:'1px solid rgba(255,255,255,0.7)',
}}>
  <img
    src="/images/rey.jpeg"
    alt="Rey - Owner"
    style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
  />
</div>
          {/* Decorative */}
          <div style={{
            position:'absolute', bottom:'-14px', right:'-14px',
            width:100, height:100, borderRadius:12,
            border:'3px solid var(--gold)', opacity:0.45, zIndex:-1,
          }} />
        </div>

        {/* Text */}
        <div className="abt-content" style={{ display:'flex', flexDirection:'column', gap:'0' }}>
          <span className="eyebrow">About the Shop</span>
          <div className="divider" />
          <h2 className="section-title" style={{ marginBottom:'1.2rem' }}>
            A Shop You Can<br/>Count On in Davao
          </h2>
          <p style={{ color:'var(--text)', lineHeight:1.9, marginBottom:'1rem' }}>
            Rey's Upholstery Shop has been serving families and businesses in Davao City for over a decade. What started as a one-man repair shop has grown into a trusted local service — known for honest pricing, quality materials, and work that actually lasts.
          </p>
          <p style={{ color:'var(--text)', lineHeight:1.9, marginBottom:'2.5rem' }}>
            Whether you need a worn sofa restored, a car seat replaced, or a custom piece built from scratch — Rey handles every job personally and makes sure you leave satisfied.
          </p>

          <div className="abt-stats" style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            {stats.map(({ icon:Icon, label, sub }) => (
              <div key={label} className="abt-stat" style={{
                opacity:0, flex:'1 1 130px',
                background:'var(--white)',
                border:'1px solid var(--border)',
                borderRadius:10, padding:'1rem 1.1rem',
                display:'flex', alignItems:'center', gap:'0.75rem',
                boxShadow:'0 2px 10px rgba(0,0,0,0.04)',
                transition:'transform 0.2s ease, box-shadow 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 22px rgba(44,62,45,0.10)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 10px rgba(0,0,0,0.04)' }}
              >
                <div style={{
                  width:38, height:38, borderRadius:8,
                  background:'#EEF5EE',
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                }}>
                  <Icon size={18} color="var(--green)" strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontWeight:800, fontSize:'0.9rem', color:'var(--text-dark)', lineHeight:1.2 }}>{label}</p>
                  <p style={{ fontSize:'0.68rem', color:'var(--text-light)', fontWeight:600 }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width:768px) {
          .abt-grid { grid-template-columns:1fr !important; gap:2.5rem !important; }
        }
      `}</style>
    </section>
  )
}