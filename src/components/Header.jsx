import { useState, useEffect } from 'react'
import Logo from './Logo'

function Header({ activeSection, onSectionChange }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'add', label: 'Add Records', icon: '📝' },
    { key: 'history', label: 'History', icon: '📊' },
  ]

  return (
    <>
      {/* Spacer so page content doesn't hide under fixed header */}
      <div style={{ height: 88 }} />

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 860,
            pointerEvents: 'all',
            borderRadius: 22,
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            background: scrolled
              ? 'rgba(255,255,255,0.82)'
              : 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(109,40,217,0.13), 0 2px 8px rgba(0,0,0,0.06)'
              : '0 4px 24px rgba(109,40,217,0.10), 0 1px 4px rgba(0,0,0,0.04)',
            border: '1.5px solid rgba(124,58,237,0.10)',
            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Logo + Brand — clicking takes you home */}
          <div
            onClick={() => onSectionChange('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            {/* Wrap Logo so it inherits pointer cursor */}
            <div style={{ cursor: 'pointer' }}>
              <Logo />
            </div>

            <div style={{ lineHeight: 1.2 }}>
              <div style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontSize: 22,
                fontWeight: 700,
                background: 'linear-gradient(90deg, #7c3aed 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.3px',
              }}>
                ShagunBook
              </div>
              <div style={{
                fontSize: 11,
                color: '#9ca3af',
                fontWeight: 500,
                letterSpacing: '0.4px',
                fontFamily: 'system-ui, sans-serif',
              }}>
                Digital Gift Tracker
              </div>
            </div>
          </div>

          {/* Navigation pill */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(243,244,246,0.7)',
            borderRadius: 14,
            padding: '4px 5px',
          }}>
            {navItems.map(({ key, label, icon }) => {
              const isActive = activeSection === key
              return (
                <button
                  key={key}
                  onClick={() => onSectionChange(key)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 10,
                    border: 'none',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: 13.5,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#ffffff' : '#6b7280',
                    background: isActive
                      ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)'
                      : 'transparent',
                    boxShadow: isActive
                      ? '0 2px 12px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
                      : 'none',
                    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                    letterSpacing: '0.1px',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(124,58,237,0.08)'
                      e.currentTarget.style.color = '#7c3aed'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#6b7280'
                    }
                  }}
                >
                  <span style={{ fontSize: 15 }}>{icon}</span>
                  {label}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
      `}</style>
    </>
  )
}

export default Header