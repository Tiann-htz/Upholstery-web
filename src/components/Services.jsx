import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sofa, Car, Scissors, Hammer, BedDouble, Armchair } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { icon:Sofa,      title:'Sofa & Furniture',    desc:'Old or worn-out sofa? We replace the fabric, foam, and padding — making it look and feel brand new again.' },
  { icon:Car,       title:'Car Seat Upholstery', desc:'Torn car seats, cracked dashboards, and worn interiors restored with your choice of fabric or leather.' },
  { icon:Scissors,  title:'Custom Cushions',     desc:'We make cushions in any size and shape — for sala sets, outdoor chairs, benches, and more.' },
  { icon:Hammer,    title:'Repair & Restoration',desc:'Broken frames, sagging seats, loose springs? We fix and restore furniture most shops won\'t touch.' },
  { icon:BedDouble, title:'Headboards & Beds',   desc:'Upholstered headboards and bed frames made to order — fitted to your bedroom size and style.' },
  { icon:Armchair,  title:'Commercial Seating',  desc:'Restaurants, offices, clinics, waiting areas — we handle bulk orders and commercial upholstery jobs.' },
]

export default function Services() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-head > *',
        { opacity:0, y:24 },
        { opacity:1, y:0, duration:0.65, stagger:0.1, ease:'power3.out',
          scrollTrigger:{ trigger:'.svc-head', start:'top 82%' } })
      gsap.fromTo('.svc-card',
        { opacity:0, y:36 },
        { opacity:1, y:0, duration:0.6, stagger:0.08, ease:'power3.out',
          scrollTrigger:{ trigger:'.svc-grid', start:'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={ref} style={{ background:'var(--bg)', padding:'90px 6vw' }}>
      <div style={{ maxWidth:1180, margin:'0 auto' }}>

        <div className="svc-head" style={{ marginBottom:'3rem', maxWidth:520 }}>
          <span className="eyebrow">What We Offer</span>
          <div className="divider" />
          <h2 className="section-title">Services We Provide</h2>
          <p className="section-sub">
            We do upholstery the right way — good materials, clean work, fair price. All done right here in Davao City.
          </p>
        </div>

        <div className="svc-grid" style={{
          display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.3rem',
        }}>
          {services.map(({ icon:Icon, title, desc }) => (
            <div key={title} className="svc-card" style={{
              opacity:0,
              background:'var(--white)',
              border:'1px solid var(--border)',
              borderRadius:12, padding:'1.8rem',
              transition:'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
              cursor:'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform='translateY(-4px)'
                e.currentTarget.style.boxShadow='0 12px 32px rgba(44,62,45,0.10)'
                e.currentTarget.style.borderColor='var(--green-light)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform='translateY(0)'
                e.currentTarget.style.boxShadow='none'
                e.currentTarget.style.borderColor='var(--border)'
              }}
            >
              <div style={{
                width:50, height:50, borderRadius:10,
                background:'#EEF5EE',
                display:'flex', alignItems:'center', justifyContent:'center',
                marginBottom:'1.1rem',
              }}>
                <Icon size={24} color="var(--green)" strokeWidth={1.9} />
              </div>
              <h3 style={{
                fontFamily:'Lora,serif', fontSize:'1.08rem', fontWeight:700,
                color:'var(--text-dark)', marginBottom:'0.55rem',
              }}>{title}</h3>
              <p style={{ fontSize:'0.88rem', color:'var(--text)', lineHeight:1.78 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width:900px) { .svc-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width:560px) { .svc-grid { grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  )
}