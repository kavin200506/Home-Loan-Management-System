import React, { useState, useEffect } from 'react'
import { customerAPI } from '../services/api'
import './TableComponent.css'

function Customers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    address: '',
    creditScore: '',
  })
  const [searchEmail, setSearchEmail] = useState('')
  const [searchCredit, setSearchCredit] = useState('')

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const response = await customerAPI.getAll()
      setCustomers(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch customers. Make sure the backend is running.')
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

      if (editingId) {
        await customerAPI.update(editingId, data)
      } else {
        await customerAPI.create(data)
      }

      await fetchCustomers()
      resetForm()
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save customer')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (customer) => {
    setEditingId(customer.customerId)
    setFormData({
      customerName: customer.customerName || '',
      email: customer.email || '',
      phoneNumber: customer.phoneNumber || '',
      address: customer.address || '',
      creditScore: customer.creditScore || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return

    try {
      setLoading(true)
      await customerAPI.delete(id)
      await fetchCustomers()
      setError(null)
    } catch (err) {
      setError('Failed to delete customer')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      customerName: '',
      email: '',
      phoneNumber: '',
      address: '',
      creditScore: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSearchByEmail = async () => {
    if (!searchEmail) return
    try {
      setLoading(true)
      const response = await customerAPI.getByEmail(searchEmail)
      const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
      setCustomers([data])
      setError(null)
    } catch (err) {
      setError('Customer not found with this email')
      setCustomers([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearchByCredit = async () => {
    if (!searchCredit) return
    try {
      setLoading(true)
      const response = await customerAPI.getByCreditScore(searchCredit)
      setCustomers(response.data)
      setError(null)
    } catch (err) {
      setError('No customers found with this credit score')
      setCustomers([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Customer Management</h2>
        <div className="header-actions">
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Cancel' : 'Add Customer'}
          </button>
          <button onClick={fetchCustomers} className="btn btn-secondary">
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <h3>{editingId ? 'Edit Customer' : 'Add New Customer'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Customer Name *</label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
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

      <div className="search-section">
        <div className="search-group">
          <input
            type="email"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearchByEmail} className="btn btn-secondary">
            Search
          </button>
        </div>
        <div className="search-group">
          <input
            type="number"
            placeholder="Min credit score..."
            value={searchCredit}
            onChange={(e) => setSearchCredit(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearchByCredit} className="btn btn-secondary">
            Filter
          </button>
        </div>
        <button onClick={fetchCustomers} className="btn btn-secondary">
          Reset
        </button>
      </div>

      {loading && !showForm ? (
        <div className="loading">Loading customers...</div>
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
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No customers found. Create one to get started!
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.customerId}>
                    <td>{customer.customerId}</td>
                    <td>{customer.customerName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneNumber || 'N/A'}</td>
                    <td>{customer.address || 'N/A'}</td>
                    <td>{customer.creditScore || 'N/A'}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(customer)}
                        className="btn-icon btn-edit"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(customer.customerId)}
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

export default Customers

