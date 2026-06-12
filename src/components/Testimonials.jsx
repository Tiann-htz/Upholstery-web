import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const reviews = [
  {
    name:'Maria Santos',
    location:'Buhangin, Davao City',
    job:'Sofa Reupholstery',
    text:'My sala set looks brand new! Rey finished everything faster than I expected and the fabric looks amazing. Very affordable too. Highly recommended!',
    rating:5,
  },
  {
    name:'Joel Reyes',
    location:'Toril, Davao City',
    job:'Car Seat Restoration',
    text:'I had my car seats done here and I am very happy with the result. The leather is clean and the stitching is perfect. Great value for money.',
    rating:5,
  },
  {
    name:'Cynthia Lim',
    location:'Matina, Davao City',
    job:'Custom Headboard',
    text:'I showed Rey a picture of what I wanted and he made it exactly as I imagined. The headboard turned out beautiful. Very skilled and very patient.',
    rating:5,
  },
  {
    name:'Ramon dela Cruz',
    location:'Agdao, Davao City',
    job:'Office Chair Repair',
    text:'He fixed all three of my office chairs in just two days at a very reasonable price. No hassle, clean work. I will definitely go back.',
    rating:5,
  },
]

export default function Testimonials() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tst-head > *',
        { opacity:0, y:24 },
        { opacity:1, y:0, duration:0.65, stagger:0.1, ease:'power3.out',
          scrollTrigger:{ trigger:'.tst-head', start:'top 82%' } })
      gsap.fromTo('.tst-card',
        { opacity:0, y:36 },
        { opacity:1, y:0, duration:0.6, stagger:0.1, ease:'power3.out',
          scrollTrigger:{ trigger:'.tst-grid', start:'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="testimonials" ref={ref} style={{ background:'var(--bg)', padding:'90px 6vw' }}>
      <div style={{ maxWidth:1180, margin:'0 auto' }}>

        <div className="tst-head" style={{ marginBottom:'3rem', textAlign:'center' }}>
          <span className="eyebrow" style={{ justifyContent:'center', display:'flex' }}>Happy Clients</span>
          <div className="divider" style={{ margin:'0 auto 1.2rem' }} />
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-sub" style={{ margin:'0 auto' }}>
            Real feedback from real people in Davao City who've trusted us with their furniture and cars.
          </p>
        </div>

        <div className="tst-grid" style={{
          display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.3rem',
        }}>
          {reviews.map((r, i) => (
            <div key={i} className="tst-card" style={{
              opacity:0,
              background:'var(--white)',
              border:'1px solid var(--border)',
              borderRadius:14, padding:'2rem',
              transition:'transform 0.22s ease, box-shadow 0.22s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform='translateY(-3px)'
                e.currentTarget.style.boxShadow='0 10px 28px rgba(44,62,45,0.09)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform='translateY(0)'
                e.currentTarget.style.boxShadow='none'
              }}
            >
              {/* Stars */}
              <div style={{ display:'flex', gap:'3px', marginBottom:'1rem' }}>
                {Array.from({ length:r.rating }).map((_,j) => (
                  <Star key={j} size={15} fill="var(--gold)" color="var(--gold)" />
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontSize:'0.95rem', color:'var(--text)',
                lineHeight:1.85, marginBottom:'1.5rem',
                fontStyle:'italic',
              }}>
                "{r.text}"
              </p>

              {/* Divider */}
              <div style={{ height:1, background:'var(--border)', marginBottom:'1.2rem' }} />

              {/* Client */}
              <div style={{ display:'flex', alignItems:'center', gap:'0.85rem' }}>
                <div style={{
                  width:42, height:42, borderRadius:'50%',
                  background:'var(--green)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#fff', fontWeight:800, fontSize:'1rem',
                  fontFamily:'Lora,serif', flexShrink:0,
                }}>
                  {r.name.charAt(0)}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontWeight:800, fontSize:'0.9rem', color:'var(--text-dark)' }}>{r.name}</p>
                  <p style={{ fontSize:'0.72rem', color:'var(--text-light)', fontWeight:600 }}>{r.location}</p>
                </div>
                <div style={{
                  background:'#EEF5EE',
                  border:'1px solid #C8DEC9',
                  padding:'0.3rem 0.75rem',
                  borderRadius:6,
                  fontSize:'0.68rem', fontWeight:700,
                  color:'var(--green)', whiteSpace:'nowrap',
                }}>
                  {r.job}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width:700px) { .tst-grid { grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  )
}