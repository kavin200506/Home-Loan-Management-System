import React, { useState, useEffect } from 'react'
import { guarantorAPI } from '../services/api'
import { useStatus } from '../context/StatusContext'
import './TableComponent.css'

function Guarantors() {
  const [guarantors, setGuarantors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showError, showSuccess } = useStatus()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    guarantorName: '',
    email: '',
    phoneNumber: '',
    address: '',
    creditScore: '',
  })

  useEffect(() => {
    fetchGuarantors()
  }, [])

  const fetchGuarantors = async () => {
    try {
      setLoading(true)
      const response = await guarantorAPI.getAll()
      setGuarantors(response.data)
      setError(null)
      showSuccess(`Successfully loaded ${response.data.length} guarantors`, response.status)
    } catch (err) {
      const message = 'Failed to fetch guarantors. Make sure the backend is running.'
      setError(message)
      showError(message, err.statusCode || err.response?.status)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = {
        ...formData,
        creditScore: formData.creditScore ? parseFloat(formData.creditScore) : null,
      }

      let response
      if (editingId) {
        response = await guarantorAPI.update(editingId, data)
        showSuccess('Guarantor updated successfully', response.status)
      } else {
        response = await guarantorAPI.create(data)
        showSuccess('Guarantor created successfully', response.status)
      }

      await fetchGuarantors()
      resetForm()
      setError(null)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to save guarantor'
      setError(message)
      showError(message, err.statusCode || err.response?.status)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (guarantor) => {
    setEditingId(guarantor.guarantorId)
    setFormData({
      guarantorName: guarantor.guarantorName || '',
      email: guarantor.email || '',
      phoneNumber: guarantor.phoneNumber || '',
      address: guarantor.address || '',
      creditScore: guarantor.creditScore || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this guarantor?')) return

    try {
      setLoading(true)
      const response = await guarantorAPI.delete(id)
      await fetchGuarantors()
      setError(null)
      showSuccess('Guarantor deleted successfully', response.status)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete guarantor'
      setError(message)
      showError(message, err.statusCode || err.response?.status)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      guarantorName: '',
      email: '',
      phoneNumber: '',
      address: '',
      creditScore: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Guarantor Management</h2>
        <div className="header-actions">
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Cancel' : 'Add Guarantor'}
          </button>
          <button onClick={fetchGuarantors} className="btn btn-secondary">
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <h3>{editingId ? 'Edit Guarantor' : 'Add New Guarantor'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Guarantor Name *</label>
              <input
                type="text"
                value={formData.guarantorName}
                onChange={(e) => setFormData({ ...formData, guarantorName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Credit Score</label>
              <input
                type="number"
                min="300"
                max="850"
                value={formData.creditScore}
                onChange={(e) => setFormData({ ...formData, creditScore: e.target.value })}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={resetForm} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && !showForm ? (
        <div className="loading">Loading guarantors...</div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Credit Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {guarantors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No guarantors found. Create one to get started!
                  </td>
                </tr>
              ) : (
                guarantors.map((guarantor) => (
                  <tr key={guarantor.guarantorId}>
                    <td>{guarantor.guarantorId}</td>
                    <td>{guarantor.guarantorName}</td>
                    <td>{guarantor.email || 'N/A'}</td>
                    <td>{guarantor.phoneNumber || 'N/A'}</td>
                    <td>{guarantor.address || 'N/A'}</td>
                    <td>{guarantor.creditScore || 'N/A'}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(guarantor)}
                        className="btn-icon btn-edit"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(guarantor.guarantorId)}
                        className="btn-icon btn-delete"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Guarantors

