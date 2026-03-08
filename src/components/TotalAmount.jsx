function TotalAmount({ amount, recordCount }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes countUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .stat-tile { animation: countUp 0.5s cubic-bezier(.22,1,.36,1) both; }
      `}</style>

      {/* Total Amount tile */}
      <div className="stat-tile" style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)',
        borderRadius: 20,
        padding: '22px 20px',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(124,58,237,0.28)',
      }}>
        <div style={{ position:'absolute',top:-20,right:-20,width:90,height:90,borderRadius:'50%',background:'rgba(255,255,255,0.07)' }} />
        <div style={{ position:'absolute',bottom:-30,left:-10,width:80,height:80,borderRadius:'50%',background:'rgba(255,255,255,0.05)' }} />
        <div style={{
          fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.65)',
          letterSpacing:'0.8px', textTransform:'uppercase', marginBottom:8,
        }}>💰 Total Given</div>
        <div style={{
          fontFamily:"'Playfair Display', serif",
          fontSize:'clamp(22px,4vw,30px)',
          fontWeight:800, color:'#fff', lineHeight:1,
        }}>
          ₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </div>
        <div style={{ marginTop:8, fontSize:12, color:'rgba(255,255,255,0.5)' }}>
          Lifetime shagun total
        </div>
      </div>

      {/* Records tile */}
      <div className="stat-tile" style={{
        animationDelay: '80ms',
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        borderRadius: 20,
        padding: '22px 20px',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(14,165,233,0.25)',
      }}>
        <div style={{ position:'absolute',top:-20,right:-20,width:90,height:90,borderRadius:'50%',background:'rgba(255,255,255,0.07)' }} />
        <div style={{ position:'absolute',bottom:-30,left:-10,width:80,height:80,borderRadius:'50%',background:'rgba(255,255,255,0.05)' }} />
        <div style={{
          fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.65)',
          letterSpacing:'0.8px', textTransform:'uppercase', marginBottom:8,
        }}>📋 Records</div>
        <div style={{
          fontFamily:"'Playfair Display', serif",
          fontSize:'clamp(22px,4vw,30px)',
          fontWeight:800, color:'#fff', lineHeight:1,
        }}>{recordCount}</div>
        <div style={{ marginTop:8, fontSize:12, color:'rgba(255,255,255,0.5)' }}>
          Gifts recorded
        </div>
      </div>
    </div>
  )
}

export default TotalAmount
