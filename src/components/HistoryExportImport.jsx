import React, { useRef } from 'react'

function HistoryExportImport({ records, onImport }) {
  const fileInputRef = useRef(null)

  const exportToJSON = () => {
    const dataStr = JSON.stringify(records, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `shagun-history-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleFileInput = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result)
        if (Array.isArray(importedData)) {
          onImport(importedData)
          alert('✅ History imported successfully!')
        } else {
          alert('❌ Invalid file format. Please use a valid history JSON file.')
        }
      } catch (error) {
        alert('❌ Error reading file. Please ensure it is a valid JSON file.')
      }
    }
    reader.readAsText(file)
    // Reset input
    fileInputRef.current.value = ''
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={exportToJSON}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        📥 Export History
      </button>
      <button
        onClick={handleImportClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        📤 Import History
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  )
}

export default HistoryExportImport
