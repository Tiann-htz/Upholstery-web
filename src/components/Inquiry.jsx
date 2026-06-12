import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, Phone, MapPin, MessageCircle, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  'Sofa / Furniture Reupholstery',
  'Car Seat Upholstery',
  'Custom Cushion Making',
  'Repair & Restoration',
  'Headboard & Bedding',
  'Commercial Seating',
  'Other / Not sure yet',
]

export default function Inquiry() {
  const ref = useRef(null)
  const [form, setForm] = useState({ name:'', phone:'', barangay:'', service:'', message:'' })
  const [submitted, setSubmitted] = useState(false)

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = () => {
    if (!form.name || !form.phone || !form.service) {
      alert('Please fill in your Name, Phone Number, and Service needed.')
      return
    }
    setSubmitted(true)
    setForm({ name:'', phone:'', barangay:'', service:'', message:'' })
    setTimeout(() => setSubmitted(false), 6000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.inq-left > *',
        { opacity:0, x:-30 },
        { opacity:1, x:0, duration:0.65, stagger:0.1, ease:'power3.out',
          scrollTrigger:{ trigger:'.inq-left', start:'top 80%' } })
      gsap.fromTo('.inq-form',
        { opacity:0, y:36 },
        { opacity:1, y:0, duration:0.75, ease:'power3.out',
          scrollTrigger:{ trigger:'.inq-form', start:'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  const inp = {
    width:'100%', padding:'0.82rem 1rem',
    borderRadius:8,
    border:'1.5px solid var(--border)',
    background:'var(--bg)',
    fontSize:'0.92rem', color:'var(--text-dark)',
    fontFamily:'Nunito, sans-serif',
    outline:'none', transition:'border-color 0.2s',
  }

  const label = {
    fontSize:'0.8rem', fontWeight:700,
    color:'var(--text)', display:'block', marginBottom:'0.4rem',
  }

  return (
    <section id="contact" ref={ref} style={{ background:'var(--bg-alt)', padding:'90px 6vw' }}>
      <div style={{
        maxWidth:1180, margin:'0 auto',
        display:'grid', gridTemplateColumns:'1fr 1.5fr',
        gap:'5rem', alignItems:'start',
      }} className="inq-grid">

        {/* LEFT — contact info */}
        <div className="inq-left">
          <span className="eyebrow">Contact Us</span>
          <div className="divider" />
          <h2 className="section-title">Send Us an Inquiry</h2>
          <p style={{ color:'var(--text)', lineHeight:1.85, marginBottom:'2.2rem' }}>
            Interested in a job? Fill out the form and Rey will get back to you as soon as he can. We only accept clients within <strong style={{ color:'var(--green)' }}>Davao City.</strong>
          </p>

          {/* Contact details */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem', marginBottom:'2.2rem' }}>
            {[
              { icon:Phone,          label:'Phone / Viber',        value:'+63 900 000 0000' },
              { icon:MessageCircle,  label:'Facebook Messenger',   value:"Rey's Upholstery Shop" },
              { icon:MapPin,         label:'Location',             value:'Davao City, Philippines' },
              { icon:Clock,          label:'Shop Hours',           value:'Mon–Sat, 8am – 6pm' },
            ].map(({ icon:Icon, label:lbl, value }) => (
              <div key={lbl} style={{ display:'flex', alignItems:'center', gap:'0.9rem' }}>
                <div style={{
                  width:42, height:42, borderRadius:9,
                  background:'#EEF5EE',
                  border:'1px solid #C8DEC9',
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                }}>
                  <Icon size={18} color="var(--green)" strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontSize:'0.7rem', color:'var(--text-light)', fontWeight:700, letterSpacing:'0.05em', textTransform:'uppercase' }}>{lbl}</p>
                  <p style={{ fontSize:'0.92rem', fontWeight:700, color:'var(--text-dark)' }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Note box */}
          <div style={{
            background:'var(--white)',
            border:'1px solid #C8DEC9',
            borderLeft:'4px solid var(--green)',
            borderRadius:10, padding:'1.2rem 1.4rem',
          }}>
            <p style={{ fontWeight:800, fontSize:'0.88rem', color:'var(--text-dark)', marginBottom:'0.3rem' }}>
              📍 Davao City Clients Only
            </p>
            <p style={{ fontSize:'0.8rem', color:'var(--text)', lineHeight:1.75 }}>
              We currently only take jobs within Davao City. If you're unsure whether we can reach you, just message us first and we'll let you know.
            </p>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="inq-form" style={{
          opacity:0,
          background:'var(--white)',
          border:'1px solid var(--border)',
          borderRadius:14, padding:'2.5rem',
          boxShadow:'0 4px 24px rgba(0,0,0,0.05)',
        }}>
          {submitted ? (
            <div style={{ textAlign:'center', padding:'3rem 1rem' }}>
              <div style={{
                width:70, height:70, borderRadius:'50%',
                background:'#EEF5EE', border:'2px solid #C8DEC9',
                display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 1.2rem', fontSize:'2rem',
              }}>✅</div>
              <h3 style={{ fontFamily:'Lora,serif', fontSize:'1.5rem', color:'var(--text-dark)', marginBottom:'0.75rem' }}>
                Message Sent!
              </h3>
              <p style={{ color:'var(--text)', fontSize:'0.95rem', lineHeight:1.8 }}>
                Thank you for reaching out! Rey will contact you soon.
              </p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.15rem' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                <div>
                  <label style={label}>Your Name *</label>
                  <input name="name" value={form.name} onChange={handle}
                    placeholder="Juan Dela Cruz" style={inp}
                    onFocus={e => e.target.style.borderColor='var(--green)'}
                    onBlur={e => e.target.style.borderColor='var(--border)'} />
                </div>
                <div>
                  <label style={label}>Phone / Viber *</label>
                  <input name="phone" value={form.phone} onChange={handle}
                    placeholder="+63 9XX XXX XXXX" style={inp}
                    onFocus={e => e.target.style.borderColor='var(--green)'}
                    onBlur={e => e.target.style.borderColor='var(--border)'} />
                </div>
              </div>

              <div>
                <label style={label}>Your Barangay in Davao City</label>
                <input name="barangay" value={form.barangay} onChange={handle}
                  placeholder="e.g. Matina, Buhangin, Toril, Agdao..." style={inp}
                  onFocus={e => e.target.style.borderColor='var(--green)'}
                  onBlur={e => e.target.style.borderColor='var(--border)'} />
              </div>

              <div>
                <label style={label}>What Service Do You Need? *</label>
                <select name="service" value={form.service} onChange={handle}
                  style={{ ...inp, cursor:'pointer' }}
                  onFocus={e => e.target.style.borderColor='var(--green)'}
                  onBlur={e => e.target.style.borderColor='var(--border)'}>
                  <option value="">Choose a service...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={label}>Tell Us More (Optional)</label>
                <textarea name="message" value={form.message} onChange={handle}
                  placeholder="Describe your item — size, current condition, material you want, etc."
                  rows={4} style={{ ...inp, resize:'vertical' }}
                  onFocus={e => e.target.style.borderColor='var(--green)'}
                  onBlur={e => e.target.style.borderColor='var(--border)'} />
              </div>

              <button onClick={submit} className="btn-main" style={{
                width:'100%', justifyContent:'center',
                padding:'1rem', borderRadius:9, marginTop:'0.3rem', fontSize:'1rem',
              }}>
                <Send size={16} strokeWidth={2.2} />
                Send My Inquiry
              </button>

              <p style={{ textAlign:'center', fontSize:'0.75rem', color:'var(--text-light)', fontWeight:600 }}>
                We'll reply via call or Viber as soon as possible.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width:900px) { .inq-grid { grid-template-columns:1fr !important; gap:3rem !important; } }
      `}</style>
    </section>
  )
}