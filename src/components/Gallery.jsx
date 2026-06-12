import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ImageOff } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const cats = ['All', 'Furniture', 'Car Seats', 'Custom']

const items = [
  { id:1, category:'Furniture', label:'Sofa Reupholstery',    sub:'3-seater, fabric replacement', img:'/images/Sofa Reupholstery1.png' },
  { id:2, category:'Car Seats', label:'Car Seat Restoration', sub:'Full interior, leather',        img:'/images/Car Seat Restoration1.png' },
  { id:3, category:'Custom',    label:'Custom Headboard',     sub:'Queen size, foam padded',       img:'/images/Custom Headboard1.webp' },
  { id:4, category:'Furniture', label:'Accent Chair',         sub:'Wooden frame, new cushion',     img:'/images/Accent Chair1.png' },
  { id:5, category:'Car Seats', label:'Leather Interior',     sub:'SUV full seat cover',           img:'/images/Leather Interior1.png' },
  { id:6, category:'Furniture', label:'Ottoman Restoration',  sub:'Foam and fabric replaced',      img:'/images/Ottoman Restoration1.png' },
  { id:7, category:'Custom',    label:'Office Chair Set',     sub:'6 units, commercial job',       img:'/images/Office Chair Set1.jfif' },
  { id:8, category:'Custom',    label:'Restaurant Booth',     sub:'Vinyl, easy to clean',          img:'/images/Restaurant Booth1.png' },
]

export default function Gallery() {
  const [active, setActive] = useState('All')
  const ref = useRef(null)
  const gridRef = useRef(null)
  const filtered = active === 'All' ? items : items.filter(i => i.category === active)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gal-head > *',
        { opacity:0, y:24 },
        { opacity:1, y:0, duration:0.65, stagger:0.1, ease:'power3.out',
          scrollTrigger:{ trigger:'.gal-head', start:'top 82%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    gsap.fromTo(gridRef.current.children,
      { opacity:0, scale:0.93, y:16 },
      { opacity:1, scale:1, y:0, duration:0.45, stagger:0.07, ease:'power3.out' }
    )
  }, [filtered])

  return (
    <section id="gallery" ref={ref} style={{ background:'var(--bg-alt)', padding:'90px 6vw' }}>
      <div style={{ maxWidth:1180, margin:'0 auto' }}>

        <div className="gal-head" style={{ marginBottom:'2.8rem', maxWidth:520 }}>
          <span className="eyebrow">Our Work</span>
          <div className="divider" />
          <h2 className="section-title">Browse Our Projects</h2>
          <p className="section-sub">
            Here's a look at some of the jobs we've completed for clients all around Davao City. Every photo is a real project from the shop.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display:'flex', gap:'0.55rem', flexWrap:'wrap', marginBottom:'2.2rem' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} style={{
              padding:'0.48rem 1.2rem',
              borderRadius:6,
              fontSize:'0.85rem',
              fontWeight:700,
              fontFamily:'Nunito, sans-serif',
              cursor:'pointer',
              border:'2px solid',
              transition:'all 0.2s ease',
              background: active===c ? 'var(--green)' : 'var(--white)',
              borderColor: active===c ? 'var(--green)' : 'var(--border)',
              color: active===c ? '#fff' : 'var(--text)',
              boxShadow: active===c ? '0 2px 10px rgba(58,90,60,0.2)' : 'none',
            }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="gal-grid" style={{
          display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.1rem',
        }}>
          {filtered.map(item => (
            <div key={item.id} style={{
              borderRadius:12,
              overflow:'hidden',
              border:'1px solid var(--border)',
              background:'var(--white)',
              cursor:'pointer',
              boxShadow:'0 2px 10px rgba(0,0,0,0.04)',
              transition:'transform 0.22s ease, box-shadow 0.22s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform='translateY(-4px)'
                e.currentTarget.style.boxShadow='0 12px 28px rgba(44,62,45,0.12)'
                e.currentTarget.querySelector('.gal-overlay').style.opacity='1'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform='translateY(0)'
                e.currentTarget.style.boxShadow='0 2px 10px rgba(0,0,0,0.04)'
                e.currentTarget.querySelector('.gal-overlay').style.opacity='0'
              }}
            >
              {/* Thumbnail */}
              <div style={{
                aspectRatio:'1/1', position:'relative',
                background:'linear-gradient(145deg, #D4E6D5, #B8CEB9)',
                overflow:'hidden',
              }}>
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.label}
                    style={{
                      width:'100%', height:'100%',
                      objectFit:'cover', display:'block',
                    }}
                  />
                ) : (
                  <div style={{
                    width:'100%', height:'100%',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexDirection:'column', gap:'0.35rem',
                  }}>
                    <span style={{ fontSize:'2.4rem' }}>{item.emoji}</span>
                    <div style={{
                      display:'flex', alignItems:'center', gap:'0.3rem',
                      color:'rgba(44,62,45,0.4)', fontSize:'0.6rem',
                      fontWeight:600, letterSpacing:'0.07em', textTransform:'uppercase',
                    }}>
                      <ImageOff size={9} />
                      <span>Add photo</span>
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="gal-overlay" style={{
                  position:'absolute', inset:0,
                  background:'rgba(44,62,45,0.82)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  opacity:0, transition:'opacity 0.28s ease',
                }}>
                  <p style={{
                    color:'#fff', fontSize:'0.8rem', fontWeight:700,
                    letterSpacing:'0.06em', textTransform:'uppercase',
                  }}>View Project</p>
                </div>
              </div>

              {/* Caption */}
              <div style={{ padding:'0.9rem 1rem' }}>
                <p style={{
                  fontFamily:'Lora,serif', fontWeight:700,
                  fontSize:'0.92rem', color:'var(--text-dark)',
                  marginBottom:'0.2rem',
                }}>{item.label}</p>
                <p style={{ fontSize:'0.72rem', color:'var(--text-light)', fontWeight:600 }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width:900px) { .gal-grid { grid-template-columns:repeat(3,1fr) !important; } }
        @media (max-width:560px) { .gal-grid { grid-template-columns:repeat(2,1fr) !important; } }
      `}</style>
    </section>
  )
}