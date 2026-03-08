import { useState, useEffect } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import AddRecord from './components/AddRecord'
import RecordsTable from './components/RecordsTable'
import SearchBar from './components/SearchBar'
import TotalAmount from './components/TotalAmount'
import historyData from '../data/history.json'

function App() {
  const [records, setRecords] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [activeSection, setActiveSection] = useState('home')

  // Load records from history.json and localStorage
  useEffect(() => {
    const savedRecords = localStorage.getItem('shagunRecords')
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords))
    } else {
      // Load initial data from history.json
      setRecords(historyData)
    }
  }, [])

  // Save records to localStorage
  useEffect(() => {
    localStorage.setItem('shagunRecords', JSON.stringify(records))
  }, [records])

  const addRecord = (record) => {
    if (editingId) {
      setRecords(records.map(r => r.id === editingId ? { ...record, id: editingId } : r))
      setEditingId(null)
    } else {
      setRecords([...records, { ...record, id: Date.now() }])
    }
  }

  const deleteRecord = (id) => {
    setRecords(records.filter(r => r.id !== id))
  }

  const startEdit = (record) => {
    setEditingId(record.id)
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const downloadHistory = () => {
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

  const filteredRecords = records.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalAmount = filteredRecords.reduce((sum, record) => sum + parseFloat(record.amount || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {activeSection === 'home' ? (
        <>
          <Header activeSection={activeSection} onSectionChange={setActiveSection} />
          <Home />
        </>
      ) : (
        <>
          <Header activeSection={activeSection} onSectionChange={setActiveSection} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            {activeSection === 'add' ? (
              /* Add Records Section */
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                {/* Left Sidebar - Add Record Form */}
                <div className="xl:col-span-1 order-2 xl:order-1">
                  <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 sticky top-20">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                      {editingId ? 'Edit Record' : 'Add Record'}
                    </h2>
                    <AddRecord
                      onAdd={addRecord}
                      editingId={editingId}
                      records={records}
                      onCancelEdit={cancelEdit}
                    />
                  </div>
                </div>

                {/* Right Content - Records Display */}
                <div className="xl:col-span-2 order-1 xl:order-2 space-y-4 sm:space-y-6">
                  {/* Total Amount Card */}
                  <TotalAmount amount={totalAmount} recordCount={filteredRecords.length} />

                  {/* Search Bar */}
                  <SearchBar value={searchTerm} onChange={setSearchTerm} />

                  {/* Records Table */}
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <RecordsTable
                      records={filteredRecords}
                      onDelete={deleteRecord}
                      onEdit={startEdit}
                      editingId={editingId}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* History Section */
              <div className="space-y-4 sm:space-y-6">
                {/* Download Button */}
                <div className="flex justify-start sm:justify-end">
                  <button
                    onClick={downloadHistory}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
                  >
                    💾 Download History
                  </button>
                </div>

                {/* Total Amount Card */}
                <TotalAmount amount={totalAmount} recordCount={filteredRecords.length} />

                {/* Search Bar */}
                <SearchBar value={searchTerm} onChange={setSearchTerm} />

                {/* Records Table */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <RecordsTable
                    records={filteredRecords}
                    onDelete={deleteRecord}
                    onEdit={startEdit}
                    editingId={editingId}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App
