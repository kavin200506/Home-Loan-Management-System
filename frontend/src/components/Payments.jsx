import React, { useState, useEffect } from 'react'
import { paymentAPI, loanAPI } from '../services/api'
import './TableComponent.css'

function Payments() {
  const [payments, setPayments] = useState([])
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    loan: { loanId: '' },
  })

  useEffect(() => {
    fetchPayments()
    fetchLoans()
  }, [])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const response = await paymentAPI.getAll()
      setPayments(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch payments. Make sure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchLoans = async () => {
    try {
      const response = await loanAPI.getAll()
      setLoans(response.data)
    } catch (err) {
      console.error('Failed to fetch loans:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = {
        amount: parseFloat(formData.amount),
        paymentDate: formData.paymentDate,
        loan: { loanId: parseInt(formData.loan.loanId) },
      }

      if (editingId) {
        await paymentAPI.update(editingId, data)
      } else {
        await paymentAPI.create(data)
      }

      await fetchPayments()
      resetForm()
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save payment')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (payment) => {
    setEditingId(payment.paymentId)
    const date = payment.paymentDate
      ? new Date(payment.paymentDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
    setFormData({
      amount: payment.amount || '',
      paymentDate: date,
      loan: { loanId: payment.loan?.loanId || '' },
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this payment?')) return

    try {
      setLoading(true)
      await paymentAPI.delete(id)
      await fetchPayments()
      setError(null)
    } catch (err) {
      setError('Failed to delete payment')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      amount: '',
      paymentDate: new Date().toISOString().split('T')[0],
      loan: { loanId: '' },
    })
    setEditingId(null)
    setShowForm(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Payment Management</h2>
        <div className="header-actions">
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Cancel' : 'Add Payment'}
          </button>
          <button onClick={fetchPayments} className="btn btn-secondary">
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <h3>{editingId ? 'Edit Payment' : 'Add New Payment'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Payment Amount *</label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Payment Date *</label>
              <input
                type="date"
                value={formData.paymentDate}
                onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Loan *</label>
              <select
                value={formData.loan.loanId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loan: { loanId: e.target.value },
                  })
                }
                required
              >
                <option value="">Select Loan</option>
                {loans.map((loan) => (
                  <option key={loan.loanId} value={loan.loanId}>
                    Loan #{loan.loanId} - ${loan.loanAmount?.toLocaleString()} - {loan.customer?.customerName}
                  </option>
                ))}
              </select>
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
        <div className="loading">Loading payments...</div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Loan ID</th>
                <th>Customer</th>
                <th>Loan Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No payments found. Create one to get started!
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.paymentId}>
                    <td>{payment.paymentId}</td>
                    <td>${payment.amount?.toLocaleString() || 'N/A'}</td>
                    <td>{formatDate(payment.paymentDate)}</td>
                    <td>{payment.loan?.loanId || 'N/A'}</td>
                    <td>{payment.loan?.customer?.customerName || 'N/A'}</td>
                    <td>${payment.loan?.loanAmount?.toLocaleString() || 'N/A'}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(payment)}
                        className="btn-icon btn-edit"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(payment.paymentId)}
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

export default Payments

