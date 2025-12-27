import React, { useState, useEffect } from 'react'
import { loanTypeAPI } from '../services/api'
import './TableComponent.css'

function LoanTypes() {
  const [loanTypes, setLoanTypes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    typeName: '',
    description: '',
    interestRate: '',
  })

  useEffect(() => {
    fetchLoanTypes()
  }, [])

  const fetchLoanTypes = async () => {
    try {
      setLoading(true)
      const response = await loanTypeAPI.getAll()
      setLoanTypes(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch loan types. Make sure the backend is running.')
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
        interestRate: parseFloat(formData.interestRate) || null,
      }

      if (editingId) {
        await loanTypeAPI.update(editingId, data)
      } else {
        await loanTypeAPI.create(data)
      }

      await fetchLoanTypes()
      resetForm()
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save loan type')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (loanType) => {
    setEditingId(loanType.loanTypeId)
    setFormData({
      typeName: loanType.typeName || '',
      description: loanType.description || '',
      interestRate: loanType.interestRate || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this loan type?')) return

    try {
      setLoading(true)
      await loanTypeAPI.delete(id)
      await fetchLoanTypes()
      setError(null)
    } catch (err) {
      setError('Failed to delete loan type')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      typeName: '',
      description: '',
      interestRate: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Loan Type Management</h2>
        <div className="header-actions">
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Cancel' : 'Add Loan Type'}
          </button>
          <button onClick={fetchLoanTypes} className="btn btn-secondary">
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <h3>{editingId ? 'Edit Loan Type' : 'Add New Loan Type'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Type Name *</label>
              <input
                type="text"
                value={formData.typeName}
                onChange={(e) => setFormData({ ...formData, typeName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Interest Rate (%)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={formData.interestRate}
                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
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
        <div className="loading">Loading loan types...</div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type Name</th>
                <th>Description</th>
                <th>Interest Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loanTypes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No loan types found. Create one to get started!
                  </td>
                </tr>
              ) : (
                loanTypes.map((loanType) => (
                  <tr key={loanType.loanTypeId}>
                    <td>{loanType.loanTypeId}</td>
                    <td>{loanType.typeName}</td>
                    <td>{loanType.description || 'N/A'}</td>
                    <td>{loanType.interestRate ? `${loanType.interestRate}%` : 'N/A'}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(loanType)}
                        className="btn-icon btn-edit"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(loanType.loanTypeId)}
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

export default LoanTypes

