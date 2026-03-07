import { useState, useEffect } from 'react'

function AddRecord({ onAdd, editingId, records, onCancelEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    event: '',
    date: new Date().toISOString().split('T')[0]
  })

  // Populate form when editing
  useEffect(() => {
    if (editingId) {
      const recordToEdit = records.find(r => r.id === editingId)
      if (recordToEdit) {
        setFormData({
          name: recordToEdit.name,
          amount: recordToEdit.amount,
          event: recordToEdit.event,
          date: recordToEdit.date
        })
      }
    }
  }, [editingId, records])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.amount || !formData.event.trim() || !formData.date) {
      alert('Please fill all fields')
      return
    }

    onAdd(formData)
    setFormData({
      name: '',
      amount: '',
      event: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          step="0.01"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Event</label>
        <select
          name="event"
          value={formData.event}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Select event</option>
          <option value="Wedding">Wedding</option>
          <option value="Engagement">Engagement</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Baby Shower">Baby Shower</option>
          <option value="Housewarming">Housewarming</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          {editingId ? 'Update' : 'Add Record'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: '',
                amount: '',
                event: '',
                date: new Date().toISOString().split('T')[0]
              })
              onCancelEdit()
            }}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default AddRecord
