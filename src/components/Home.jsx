import { useState, useEffect, useRef } from 'react'

const floatingOrbs = [
  { size: 320, top: '-80px', left: '-60px', color: 'radial-gradient(circle, rgba(167,139,250,0.25) 0%, transparent 70%)' },
  { size: 260, top: '20%', right: '-80px', color: 'radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 70%)' },
  { size: 200, bottom: '10%', left: '15%', color: 'radial-gradient(circle, rgba(244,114,182,0.18) 0%, transparent 70%)' },
  { size: 180, top: '55%', right: '20%', color: 'radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)' },
]

const features = [
  {
    icon: '💸',
    title: 'Track Every Rupee',
    desc: 'Record exactly how much you gave, to whom, and for which occasion — weddings, engagements, birthdays, and more.',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
  },
  {
    icon: '🔁',
    title: 'Return Gift Reminders',
    desc: 'Know when someone who received your shagun is celebrating. Never miss a chance to reciprocate with grace.',
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
  },
  {
    icon: '📊',
    title: 'Beautiful Analytics',
    desc: 'Visual breakdowns by event type, family branch, or time period. See your generosity patterns at a glance.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
  },
  {
    icon: '🔒',
    title: 'Private & Secure',
    desc: 'Your family data stays yours. Everything is stored locally on your device — no accounts, no cloud leaks.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Profiles',
    desc: 'Organise records by family, branch, or relationship. Easily find every transaction with a particular person.',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.08)',
  },
  {
    icon: '📤',
    title: 'Export & Share',
    desc: 'Export your records as a beautiful PDF or spreadsheet to share with family members before a big event.',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
  },
]

const stats = [
  { value: '10,000+', label: 'Families Using', icon: '👪' },
  { value: '₹2Cr+', label: 'Shagun Tracked', icon: '💰' },
  { value: '50K+', label: 'Events Recorded', icon: '🎊' },
  { value: '100%', label: 'Free Forever', icon: '🎁' },
]

const events = [
  { icon: '💍', name: 'Weddings' },
  { icon: '💑', name: 'Engagements' },
  { icon: '🎂', name: 'Birthdays' },
  { icon: '👶', name: 'Naming Ceremony' },
  { icon: '🎓', name: 'Graduations' },
  { icon: '🏠', name: 'Griha Pravesh' },
  { icon: '🧿', name: 'Mundan' },
  { icon: '🌟', name: 'Festivals' },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState('0')
  const [ref, inView] = useInView()
  useEffect(() => {
    if (!inView) return
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''))
    const prefix = value.match(/^[^0-9]*/)[0]
    const suffix = value.replace(/^[^0-9]*[0-9.,]+/, '')
    let start = 0
    const step = numeric / 40
    const timer = setInterval(() => {
      start = Math.min(start + step, numeric)
      setDisplay(prefix + (Number.isInteger(numeric) ? Math.floor(start).toLocaleString() : start.toFixed(1)) + suffix)
      if (start >= numeric) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [inView, value])
  return <span ref={ref}>{display || value}</span>
}

export default function Home({ onSectionChange }) {
  const [heroRef, heroIn] = useInView(0.1)
  const [featRef, featIn] = useInView(0.1)
  const [statsRef, statsIn] = useInView(0.1)
  const [eventsRef, eventsIn] = useInView(0.1)
  const [ctaRef, ctaIn] = useInView(0.1)

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: '#faf8ff',
      overflowX: 'hidden',
      position: 'relative',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(124,58,237,0.4); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 16px rgba(124,58,237,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(124,58,237,0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .fade-up { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }
        .fade-in { animation: fadeIn 0.6s ease both; }
        .float   { animation: floatY 4s ease-in-out infinite; }
        .feature-card:hover { transform: translateY(-6px) scale(1.02); }
        .event-pill:hover   { transform: scale(1.07); background: linear-gradient(135deg,#7c3aed,#4f46e5) !important; color:#fff !important; }
        .cta-btn:hover      { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(124,58,237,0.45) !important; }
        .stat-card:hover    { transform: translateY(-4px); }
      `}</style>

      {/* Floating background orbs - hidden on mobile for performance */}
      {floatingOrbs.map((orb, i) => (
        <div key={i} className="hidden sm:block" style={{
          position: 'fixed',
          width: orb.size,
          height: orb.size,
          top: orb.top,
          left: orb.left,
          right: orb.right,
          bottom: orb.bottom,
          background: orb.color,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(2px)',
        }} />
      ))}

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 900,
        margin: '0 auto',
        padding: '80px 24px 60px',
        textAlign: 'center',
      }}>
        {/* Badge */}
        <div className={heroIn ? 'fade-up' : ''} style={{ animationDelay: '0ms', marginBottom: 28 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg,rgba(124,58,237,0.12),rgba(79,70,229,0.12))',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 100, padding: '6px 18px',
            fontSize: 13, fontWeight: 600, color: '#7c3aed', letterSpacing: '0.3px',
          }}>
            <span style={{ animation: 'pulse-ring 2s infinite', display:'inline-block', width:8, height:8, borderRadius:'50%', background:'#7c3aed' }} />
            India's Favourite Shagun Tracker
          </span>
        </div>

        {/* Headline */}
        <div className={heroIn ? 'fade-up' : ''} style={{ animationDelay: '80ms' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(38px, 7vw, 68px)',
            fontWeight: 900,
            lineHeight: 1.08,
            color: '#1e1b4b',
            marginBottom: 24,
            letterSpacing: '-1px',
          }}>
            Never Forget a{' '}
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Shagun
            </span>
            <br />You Ever Gave
          </h1>
        </div>

        {/* Subheading */}
        <div className={heroIn ? 'fade-up' : ''} style={{ animationDelay: '160ms' }}>
          <p style={{
            fontSize: 19, color: '#64748b', lineHeight: 1.75,
            maxWidth: 620, margin: '0 auto 40px',
            fontWeight: 400,
          }}>
            Track gifts given at weddings, engagements, birthdays & every family celebration.
            Build stronger relationships by always knowing when and how much to reciprocate.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={heroIn ? 'fade-up' : ''} style={{ animationDelay: '240ms', display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          <button
            className="cta-btn"
            onClick={() => onSectionChange?.('add')}
            style={{
              cursor: 'pointer',
              padding: '14px 36px', borderRadius: 14, border: 'none',
              background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
              color: '#fff', fontSize: 16, fontWeight: 600,
              boxShadow: '0 6px 28px rgba(124,58,237,0.35)',
              transition: 'all 0.25s ease',
              fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            📝 Add Your First Record
          </button>
          <button
            className="cta-btn"
            onClick={() => onSectionChange?.('history')}
            style={{
              cursor: 'pointer',
              padding: '14px 32px', borderRadius: 14,
              border: '1.5px solid rgba(124,58,237,0.25)',
              background: 'rgba(255,255,255,0.8)',
              color: '#7c3aed', fontSize: 16, fontWeight: 600,
              boxShadow: '0 2px 12px rgba(124,58,237,0.08)',
              transition: 'all 0.25s ease',
              fontFamily: 'inherit',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            📊 View History
          </button>
        </div>

        {/* Floating hero visual */}
        <div className={`float ${heroIn ? 'fade-in' : ''}`} style={{ animationDelay: '300ms', marginTop: 56 }}>
          <div style={{
            margin: '0 auto',
            width: '100%', maxWidth: 520,
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px)',
            borderRadius: 24,
            border: '1.5px solid rgba(124,58,237,0.12)',
            boxShadow: '0 20px 60px rgba(124,58,237,0.12), 0 4px 16px rgba(0,0,0,0.06)',
            padding: '20px 24px',
          }}>
            {/* Mock record entries */}
            {[
              { name: 'Sharma Ji Ka Beta', event: '💍 Wedding', amount: '₹5,100', date: 'Jan 2025', color: '#7c3aed' },
              { name: 'Priya Bua', event: '🎂 Birthday', amount: '₹1,100', date: 'Mar 2025', color: '#ec4899' },
              { name: 'Rahul Chacha', event: '🏠 Griha Pravesh', amount: '₹2,500', date: 'Nov 2024', color: '#0ea5e9' },
            ].map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.05)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: `${r.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18,
                  }}>{r.event.split(' ')[0]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1e1b4b' }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{r.event.slice(2)} · {r.date}</div>
                  </div>
                </div>
                <div style={{
                  fontSize: 15, fontWeight: 700, color: r.color,
                  background: `${r.color}12`,
                  padding: '4px 12px', borderRadius: 8,
                }}>{r.amount}</div>
              </div>
            ))}
            <div style={{
              marginTop: 14, textAlign: 'center',
              fontSize: 12, color: '#94a3b8', fontWeight: 500,
            }}>
              ✨ Total given this year: <strong style={{ color: '#7c3aed' }}>₹8,700</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{
        position: 'relative', zIndex: 1,
        maxWidth: 860, margin: '0 auto', padding: '0 24px 70px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className={`stat-card ${statsIn ? 'fade-up' : ''}`}
              style={{
                animationDelay: `${i * 80}ms`,
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(12px)',
                borderRadius: 18,
                padding: '22px 16px',
                textAlign: 'center',
                border: '1.5px solid rgba(124,58,237,0.08)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{
                fontSize: 26, fontWeight: 800, color: '#1e1b4b',
                fontFamily: "'Playfair Display', serif",
              }}>
                <AnimatedNumber value={s.value} />
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section ref={featRef} style={{
        position: 'relative', zIndex: 1,
        maxWidth: 980, margin: '0 auto', padding: '0 24px 80px',
      }}>
        <div className={featIn ? 'fade-up' : ''} style={{ textAlign: 'center', marginBottom: 44 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 800, color: '#1e1b4b', marginBottom: 12,
          }}>
            Everything You Need to Stay Organised
          </h2>
          <p style={{ color: '#64748b', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
            Built specifically for Indian families who value relationships and reciprocity.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {features.map((f, i) => (
            <div
              key={i}
              className={`feature-card ${featIn ? 'fade-up' : ''}`}
              style={{
                animationDelay: `${i * 80}ms`,
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(16px)',
                borderRadius: 20,
                padding: '28px 24px',
                border: `1.5px solid ${f.color}20`,
                boxShadow: `0 4px 24px ${f.color}0d`,
                transition: 'all 0.3s cubic-bezier(.22,1,.36,1)',
                cursor: 'default',
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: f.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, marginBottom: 16,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1e1b4b', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EVENT TYPES ── */}
      <section ref={eventsRef} style={{
        position: 'relative', zIndex: 1,
        maxWidth: 860, margin: '0 auto', padding: '0 24px 80px',
        textAlign: 'center',
      }}>
        <div className={eventsIn ? 'fade-up' : ''} style={{ marginBottom: 32 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 800, color: '#1e1b4b', marginBottom: 10,
          }}>
            Track Every Occasion
          </h2>
          <p style={{ color: '#64748b', fontSize: 15 }}>
            From grand weddings to intimate family milestones — record them all.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {events.map((e, i) => (
            <div
              key={i}
              className={`event-pill ${eventsIn ? 'fade-up' : ''}`}
              style={{
                animationDelay: `${i * 60}ms`,
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 100,
                background: 'rgba(255,255,255,0.9)',
                border: '1.5px solid rgba(124,58,237,0.15)',
                fontSize: 14, fontWeight: 600, color: '#4c1d95',
                cursor: 'default',
                transition: 'all 0.22s ease',
                boxShadow: '0 2px 10px rgba(124,58,237,0.07)',
              }}
            >
              <span style={{ fontSize: 18 }}>{e.icon}</span>
              {e.name}
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        position: 'relative', zIndex: 1,
        maxWidth: 860, margin: '0 auto', padding: '0 24px 80px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 800, color: '#1e1b4b', marginBottom: 10,
          }}>
            Simple as Three Steps
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, position: 'relative' }}>
          {[
            { step: '01', icon: '📝', title: 'Add a Record', desc: 'Enter the person\'s name, occasion, date, and amount gifted.' },
            { step: '02', icon: '📂', title: 'Organise by Family', desc: 'Group by relation, event type, or year for easy retrieval.' },
            { step: '03', icon: '🔔', title: 'Get Reminded', desc: 'When it\'s their turn to celebrate, you\'ll know exactly what to give back.' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
              borderRadius: 20,
              padding: '32px 24px',
              border: '1.5px solid rgba(124,58,237,0.08)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              textAlign: 'center',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                color: '#fff', fontSize: 11, fontWeight: 800,
                padding: '3px 12px', borderRadius: 100, letterSpacing: '1px',
              }}>{s.step}</div>
              <div style={{ fontSize: 36, marginBottom: 14, marginTop: 8 }}>{s.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1e1b4b', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section ref={ctaRef} style={{
        position: 'relative', zIndex: 1,
        maxWidth: 860, margin: '0 auto', padding: '0 24px 100px',
      }}>
        <div
          className={ctaIn ? 'fade-up' : ''}
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #4338ca 60%, #1d4ed8 100%)',
            borderRadius: 28,
            padding: '52px 36px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(124,58,237,0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative circles */}
          <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />
          <div style={{ position:'absolute', bottom:-60, left:-20, width:240, height:240, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />

          <div style={{ fontSize: 44, marginBottom: 16 }}>🎊</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 800, color: '#fff', marginBottom: 14,
          }}>
            Start Tracking Today — It's Free
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
            Join thousands of Indian families who never miss a shagun moment.
          </p>
          <button
            className="cta-btn"
            onClick={() => onSectionChange?.('add')}
            style={{
              cursor: 'pointer',
              padding: '15px 40px', borderRadius: 14, border: 'none',
              background: '#fff',
              color: '#7c3aed', fontSize: 16, fontWeight: 700,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              transition: 'all 0.25s ease',
              fontFamily: 'inherit',
            }}
          >
            📝 Add My First Record →
          </button>
        </div>
      </section>
    </div>
  )
}