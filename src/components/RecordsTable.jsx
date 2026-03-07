const eventMeta = {
  'Wedding':     { icon:'💍', color:'#7c3aed', bg:'rgba(124,58,237,0.1)'  },
  'Engagement':  { icon:'💑', color:'#ec4899', bg:'rgba(236,72,153,0.1)'  },
  'Birthday':    { icon:'🎂', color:'#f59e0b', bg:'rgba(245,158,11,0.1)'  },
  'Anniversary': { icon:'🥂', color:'#0ea5e9', bg:'rgba(14,165,233,0.1)'  },
  'Baby Shower': { icon:'👶', color:'#10b981', bg:'rgba(16,185,129,0.1)'  },
  'Housewarming':{ icon:'🏠', color:'#f97316', bg:'rgba(249,115,22,0.1)'  },
  'Other':       { icon:'🌟', color:'#6366f1', bg:'rgba(99,102,241,0.1)'  },
}

function RecordsTable({ records, onDelete, onEdit, editingId }) {
  if (records.length === 0) {
    return (
      <div style={{
        padding:'60px 24px', textAlign:'center',
        fontFamily:"'DM Sans', system-ui, sans-serif",
      }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🎁</div>
        <div style={{ fontSize:18, fontWeight:700, color:'#1e1b4b', marginBottom:6 }}>
          No records yet
        </div>
        <div style={{ fontSize:14, color:'#94a3b8' }}>
          Add your first shagun record to get started!
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily:"'DM Sans', system-ui, sans-serif", overflowX:'auto' }}>
      <style>{`
        @keyframes rowIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .rec-row { animation: rowIn 0.3s ease both; transition: background 0.15s; }
        .rec-row:hover { background: #faf8ff !important; }
        .edit-btn:hover   { background: linear-gradient(135deg,#3b82f6,#1d4ed8) !important; transform:translateY(-1px); box-shadow:0 4px 12px rgba(59,130,246,0.35) !important; }
        .delete-btn:hover { background: linear-gradient(135deg,#ef4444,#dc2626) !important; transform:translateY(-1px); box-shadow:0 4px 12px rgba(239,68,68,0.35) !important; }
      `}</style>

      <table style={{ width:'100%', borderCollapse:'separate', borderSpacing:0 }}>
        <thead>
          <tr>
            {['👤 Name','🎊 Occasion','💰 Amount','📅 Date','⚙️ Actions'].map((col, i) => (
              <th key={i} style={{
                padding:'13px 16px',
                background: i === 0 ? 'linear-gradient(135deg,#7c3aed,#6d28d9)'
                           : i === 4 ? 'linear-gradient(135deg,#4338ca,#3730a3)'
                           : 'linear-gradient(135deg,#6d28d9,#4338ca)',
                color:'#fff', fontSize:12, fontWeight:700,
                letterSpacing:'0.4px', textAlign: i === 4 ? 'center' : 'left',
                borderRadius: i === 0 ? '12px 0 0 0' : i === 4 ? '0 12px 0 0' : 0,
                whiteSpace:'nowrap',
              }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => {
            const meta = eventMeta[record.event] || eventMeta['Other']
            const isEditing = editingId === record.id
            return (
              <tr
                key={record.id}
                className="rec-row"
                style={{
                  animationDelay:`${index * 40}ms`,
                  background: isEditing
                    ? 'linear-gradient(135deg,rgba(245,158,11,0.06),rgba(251,191,36,0.06))'
                    : index % 2 === 0 ? '#ffffff' : '#faf8ff',
                  borderLeft: isEditing ? '3px solid #f59e0b' : '3px solid transparent',
                }}
              >
                {/* Name */}
                <td style={{ padding:'14px 16px', borderBottom:'1px solid rgba(124,58,237,0.07)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{
                      width:34, height:34, borderRadius:10,
                      background:`${meta.color}15`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:15, flexShrink:0,
                    }}>{meta.icon}</div>
                    <span style={{ fontSize:14, fontWeight:600, color:'#1e1b4b' }}>{record.name}</span>
                  </div>
                </td>

                {/* Event */}
                <td style={{ padding:'14px 16px', borderBottom:'1px solid rgba(124,58,237,0.07)' }}>
                  <span style={{
                    display:'inline-flex', alignItems:'center', gap:5,
                    background: meta.bg, color: meta.color,
                    fontSize:12, fontWeight:600, padding:'4px 11px',
                    borderRadius:100, whiteSpace:'nowrap',
                  }}>
                    {meta.icon} {record.event}
                  </span>
                </td>

                {/* Amount */}
                <td style={{ padding:'14px 16px', borderBottom:'1px solid rgba(124,58,237,0.07)' }}>
                  <span style={{
                    fontSize:15, fontWeight:800, color:'#059669',
                    background:'rgba(5,150,105,0.08)',
                    padding:'3px 10px', borderRadius:8,
                    fontFamily:"'Playfair Display', serif",
                  }}>
                    ₹{parseFloat(record.amount).toLocaleString('en-IN')}
                  </span>
                </td>

                {/* Date */}
                <td style={{ padding:'14px 16px', borderBottom:'1px solid rgba(124,58,237,0.07)' }}>
                  <span style={{ fontSize:13, color:'#64748b', fontWeight:500 }}>
                    {new Date(record.date).toLocaleDateString('en-IN', {
                      year:'numeric', month:'short', day:'numeric',
                    })}
                  </span>
                </td>

                {/* Actions */}
                <td style={{ padding:'14px 16px', borderBottom:'1px solid rgba(124,58,237,0.07)' }}>
                  <div style={{ display:'flex', justifyContent:'center', gap:7 }}>
                    <button
                      className="edit-btn"
                      onClick={() => onEdit(record)}
                      style={{
                        cursor:'pointer', padding:'6px 14px', borderRadius:9,
                        border:'none',
                        background:'linear-gradient(135deg,#60a5fa,#3b82f6)',
                        color:'#fff', fontSize:12, fontWeight:700,
                        boxShadow:'0 2px 8px rgba(59,130,246,0.2)',
                        transition:'all 0.18s ease', fontFamily:'inherit',
                        display:'flex', alignItems:'center', gap:4,
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        if (confirm('Delete this record?')) onDelete(record.id)
                      }}
                      style={{
                        cursor:'pointer', padding:'6px 14px', borderRadius:9,
                        border:'none',
                        background:'linear-gradient(135deg,#f87171,#ef4444)',
                        color:'#fff', fontSize:12, fontWeight:700,
                        boxShadow:'0 2px 8px rgba(239,68,68,0.2)',
                        transition:'all 0.18s ease', fontFamily:'inherit',
                        display:'flex', alignItems:'center', gap:4,
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Footer summary */}
      <div style={{
        padding:'12px 16px',
        background:'linear-gradient(135deg,rgba(124,58,237,0.04),rgba(67,56,202,0.04))',
        borderTop:'1px solid rgba(124,58,237,0.08)',
        borderRadius:'0 0 12px 12px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        flexWrap:'wrap', gap:8,
      }}>
        <span style={{ fontSize:12, color:'#94a3b8', fontWeight:500 }}>
          Showing <strong style={{ color:'#7c3aed' }}>{records.length}</strong> record{records.length !== 1 ? 's' : ''}
        </span>
        <span style={{ fontSize:12, color:'#94a3b8', fontWeight:500 }}>
          Total: <strong style={{ color:'#059669' }}>
            ₹{records.reduce((s,r) => s + parseFloat(r.amount||0), 0).toLocaleString('en-IN')}
          </strong>
        </span>
      </div>
    </div>
  )
}

export default RecordsTable
