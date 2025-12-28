import React, { useState, useEffect } from 'react'
import { loanAPI, customerAPI, loanTypeAPI } from '../services/api'
import { useStatus } from '../context/StatusContext'
import './TableComponent.css'

function Loans() {
  const [loans, setLoans] = useState([])
  const [customers, setCustomers] = useState([])
  const [loanTypes, setLoanTypes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showError, showSuccess, showInfo } = useStatus()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    loanAmount: '',
    interestRate: '',
    tenureMonths: '',
    status: '',
    customer: { customerId: '' },
    loanType: { loanTypeId: '' },
  })
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchLoans()
    fetchCustomers()
    fetchLoanTypes()
  }, [])

  const fetchLoans = async () => {
    try {
      setLoading(true)
      const response = await loanAPI.getAll()
      setLoans(response.data)
      setError(null)
      showSuccess(`Successfully loaded ${response.data.length} loans`, response.status)
    } catch (err) {
      const message = 'Failed to fetch loans. Make sure the backend is running.'
      setError(message)
      showError(message, err.statusCode || err.response?.status)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCustomers = async () => {
    try {
      const response = await customerAPI.getAll()
      setCustomers(response.data)
    } catch (err) {
      console.error('Failed to fetch customers:', err)
    }
  }

  const fetchLoanTypes = async () => {
    try {
      const response = await loanTypeAPI.getAll()
      setLoanTypes(response.data)
    } catch (err) {
      console.error('Failed to fetch loan types:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = {
        loanAmount: parseFloat(formData.loanAmount),
        interestRate: parseFloat(formData.interestRate) || null,
        tenureMonths: parseInt(formData.tenureMonths) || null,
        status: formData.status,
        customer: { customerId: parseInt(formData.customer.customerId) },
        loanType: { loanTypeId: parseInt(formData.loanType.loanTypeId) },
      }

      let response
      if (editingId) {
        response = await loanAPI.update(editingId, data)
        showSuccess('Loan updated successfully', response.status)
      } else {
        response = await loanAPI.create(data)
        showSuccess('Loan created successfully', response.status)
      }

      await fetchLoans()
      resetForm()
      setError(null)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to save loan'
      setError(message)
      showError(message, err.statusCode || err.response?.status)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (loan) => {
    setEditingId(loan.loanId)
    setFormData({
      loanAmount: loan.loanAmount || '',
      interestRate: loan.interestRate || '',
      tenureMonths: loan.tenureMonths || '',
      status: loan.status || '',
      customer: { customerId: loan.customer?.customerId || '' },
      loanType: { loanTypeId: loan.loanType?.loanTypeId || '' },
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this loan?')) return

    try {
      setLoading(true)
      const response = await loanAPI.delete(id)
      await fetchLoans()
      setError(null)
      showSuccess('Loan deleted successfully', response.status)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete loan'
      setError(message)
      showError(message, err.statusCode || err.response?.status)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      loanAmount: '',
      interestRate: '',
      tenureMonths: '',
      status: '',
      customer: { customerId: '' },
      loanType: { loanTypeId: '' },
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleFilterByStatus = async () => {
    if (!statusFilter) {
      fetchLoans()
      return
    }
    try {
      setLoading(true)
      const response = await loanAPI.getByStatus(statusFilter)
      setLoans(response.data)
      setError(null)
      showInfo(`Found ${response.data.length} loans with status: ${statusFilter}`, response.status)
    } catch (err) {
      const message = 'No loans found with this status'
      setError(message)
      setLoans([])
      showError(message, err.statusCode || err.response?.status)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return '#10b981'
      case 'REJECTED':
        return '#ef4444'
      case 'PENDING':
        return '#f59e0b'
      default:
        return '#6b7280'
    }
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Loan Management</h2>
        <div className="header-actions">
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Cancel' : 'Add Loan'}
          </button>
          <button onClick={fetchLoans} className="btn btn-secondary">
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <h3>{editingId ? 'Edit Loan' : 'Add New Loan'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Loan Amount *</label>
              <input
                type="number"
                min="1000"
                step="0.01"
                value={formData.loanAmount}
                onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                required
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
            <div className="form-group">
              <label>Tenure (Months)</label>
              <input
                type="number"
                min="1"
                value={formData.tenureMonths}
                onChange={(e) => setFormData({ ...formData, tenureMonths: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="">Select Status</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>
            <div className="form-group">
              <label>Customer *</label>
              <select
                value={formData.customer.customerId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customer: { customerId: e.target.value },
                  })
                }
                required
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.customerId} value={customer.customerId}>
                    {customer.customerName} ({customer.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Loan Type *</label>
              <select
                value={formData.loanType.loanTypeId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loanType: { loanTypeId: e.target.value },
                  })
                }
                required
              >
                <option value="">Select Loan Type</option>
                {loanTypes.map((type) => (
                  <option key={type.loanTypeId} value={type.loanTypeId}>
                    {type.typeName} ({type.interestRate}%)
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

      <div className="search-section">
        <div className="search-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="search-input"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
          <button onClick={handleFilterByStatus} className="btn btn-secondary">
            Filter
          </button>
        </div>
        <button onClick={fetchLoans} className="btn btn-secondary">
          Reset
        </button>
      </div>

      {loading && !showForm ? (
        <div className="loading">Loading loans...</div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Interest Rate</th>
                <th>Tenure</th>
                <th>Status</th>
                <th>Customer</th>
                <th>Loan Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    No loans found. Create one to get started!
                  </td>
                </tr>
              ) : (
                loans.map((loan) => (
                  <tr key={loan.loanId}>
                    <td>{loan.loanId}</td>
                    <td>${loan.loanAmount?.toLocaleString() || 'N/A'}</td>
                    <td>{loan.interestRate ? `${loan.interestRate}%` : 'N/A'}</td>
                    <td>{loan.tenureMonths ? `${loan.tenureMonths} months` : 'N/A'}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(loan.status) }}
                      >
                        {loan.status || 'N/A'}
                      </span>
                    </td>
                    <td>{loan.customer?.customerName || 'N/A'}</td>
                    <td>{loan.loanType?.typeName || 'N/A'}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(loan)}
                        className="btn-icon btn-edit"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(loan.loanId)}
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

export default Loans

