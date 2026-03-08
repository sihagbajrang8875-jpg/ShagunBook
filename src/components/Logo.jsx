function Logo() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#8B5CF6", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#3B82F6", stopOpacity:1}} />
        </linearGradient>
      </defs>

      {/* Outer circle */}
      <circle cx="25" cy="25" r="23" fill="url(#logoGradient)" stroke="#ffffff" strokeWidth="2"/>

      {/* Gift box */}
      <rect x="15" y="18" width="20" height="14" rx="2" fill="#ffffff" opacity="0.9"/>
      <rect x="17" y="20" width="16" height="10" rx="1" fill="#ffffff"/>

      {/* Ribbon */}
      <rect x="24" y="15" width="2" height="20" fill="#FFD700"/>
      <rect x="15" y="24" width="20" height="2" fill="#FFD700"/>

      {/* Bow */}
      <circle cx="25" cy="15" r="3" fill="#FFD700"/>
      <circle cx="25" cy="35" r="3" fill="#FFD700"/>
      <circle cx="15" cy="25" r="3" fill="#FFD700"/>
      <circle cx="35" cy="25" r="3" fill="#FFD700"/>

      {/* Sparkles */}
      <circle cx="10" cy="10" r="1.5" fill="#FFD700"/>
      <circle cx="40" cy="10" r="1.5" fill="#FFD700"/>
      <circle cx="10" cy="40" r="1.5" fill="#FFD700"/>
      <circle cx="40" cy="40" r="1.5" fill="#FFD700"/>
    </svg>
  )
}

export default Logo
