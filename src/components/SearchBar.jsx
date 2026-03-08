import { useState } from 'react'

function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      <div style={{ position:'relative' }}>
        {/* Search icon */}
        <span style={{
          position:'absolute', left:14, top:'50%', transform:'translateY(-50%)',
          fontSize:15, pointerEvents:'none', opacity: focused ? 1 : 0.45,
          transition:'opacity 0.2s',
        }}>🔍</span>

        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search by name, event…"
          style={{
            width:'100%', boxSizing:'border-box',
            padding:'10px 36px 10px 40px',
            borderRadius:12,
            border:`1.5px solid ${focused ? '#7c3aed' : 'rgba(124,58,237,0.18)'}`,
            background: focused ? '#fdfbff' : '#f5f3ff',
            outline:'none', fontSize:14,
            fontFamily:"'DM Sans', system-ui, sans-serif",
            color:'#1e1b4b',
            boxShadow: focused ? '0 0 0 3px rgba(124,58,237,0.1)' : 'none',
            transition:'all 0.2s ease',
          }}
        />

        {/* Clear button */}
        {value && (
          <button
            onClick={() => onChange('')}
            style={{
              position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
              background:'rgba(124,58,237,0.1)', border:'none', borderRadius:6,
              width:22, height:22, cursor:'pointer', fontSize:11,
              color:'#7c3aed', fontWeight:700,
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'background 0.15s',
            }}
          >✕</button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
