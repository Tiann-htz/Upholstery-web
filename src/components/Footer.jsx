import { Scissors, Phone, MapPin, MessageCircle } from 'lucide-react'

const links = ['About', 'Services', 'Gallery', 'Testimonials', 'Contact']

export default function Footer() {
  return (
    <footer style={{
      background:'var(--bg-dark)',
      color:'rgba(255,255,255,0.65)',
      padding:'3.5rem 6vw 2rem',
    }}>
      <div style={{
        maxWidth:1180, margin:'0 auto',
        display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr',
        gap:'3rem', paddingBottom:'2.5rem',
        borderBottom:'1px solid rgba(255,255,255,0.1)',
      }} className="footer-grid">

        {/* Brand */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.1rem' }}>
            <div style={{
              width:38, height:38, borderRadius:'50%',
              background:'rgba(255,255,255,0.12)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <Scissors size={18} color="#fff" strokeWidth={2} />
            </div>
            <div>
              <p style={{ fontFamily:'Lora,serif', fontWeight:700, fontSize:'1.05rem', color:'#fff', lineHeight:1.1 }}>
                Rey's Upholstery
              </p>
              <p style={{ fontSize:'0.62rem', color:'rgba(255,255,255,0.45)', letterSpacing:'0.06em', fontWeight:600 }}>
                DAVAO CITY
              </p>
            </div>
          </div>
          <p style={{ fontSize:'0.87rem', lineHeight:1.85, maxWidth:260 }}>
            Quality upholstery for furniture, car seats, and custom pieces. Trusted by Davao families and businesses for over 10 years.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <p style={{ color:'#fff', fontWeight:800, fontSize:'0.82rem', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'1.1rem' }}>
            Quick Links
          </p>
          <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.65rem' }}>
            {links.map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} style={{
                  color:'rgba(255,255,255,0.55)', textDecoration:'none',
                  fontSize:'0.88rem', fontWeight:600, transition:'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color='var(--gold-light)'}
                  onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.55)'}
                >{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p style={{ color:'#fff', fontWeight:800, fontSize:'0.82rem', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'1.1rem' }}>
            Get in Touch
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.8rem' }}>
            {[
              { icon:Phone,         text:'+63 900 000 0000' },
              { icon:MessageCircle, text:"Facebook: Rey's Upholstery" },
              { icon:MapPin,        text:'Davao City, Philippines' },
            ].map(({ icon:Icon, text }) => (
              <div key={text} style={{ display:'flex', alignItems:'center', gap:'0.6rem', fontSize:'0.86rem' }}>
                <Icon size={15} color="var(--gold-light)" strokeWidth={2} style={{ flexShrink:0 }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        maxWidth:1180, margin:'1.5rem auto 0',
        display:'flex', justifyContent:'space-between', alignItems:'center',
        flexWrap:'wrap', gap:'0.5rem', fontSize:'0.78rem',
      }}>
        <p>© {new Date().getFullYear()} Rey's Upholstery Shop. All rights reserved.</p>
        <p style={{ color:'rgba(255,255,255,0.3)' }}>Serving Davao City, Philippines</p>
      </div>

      <style>{`
        @media (max-width:700px) { .footer-grid { grid-template-columns:1fr !important; gap:2rem !important; } }
      `}</style>
    </footer>
  )
}