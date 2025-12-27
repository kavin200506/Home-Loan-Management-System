import React, { useState, useEffect } from 'react'
import { customerAPI, loanAPI, loanTypeAPI, guarantorAPI, paymentAPI } from '../services/api'
import './Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState({
    customers: 0,
    loans: 0,
    loanTypes: 0,
    guarantors: 0,
    payments: 0,
    totalLoanAmount: 0,
    totalPayments: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const [customersRes, loansRes, loanTypesRes, guarantorsRes, paymentsRes] = await Promise.all([
        customerAPI.getAll(),
        loanAPI.getAll(),
        loanTypeAPI.getAll(),
        guarantorAPI.getAll(),
        paymentAPI.getAll(),
      ])

      const customers = customersRes.data
      const loans = loansRes.data
      const payments = paymentsRes.data

      const totalLoanAmount = loans.reduce((sum, loan) => sum + (loan.loanAmount || 0), 0)
      const totalPayments = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0)

      setStats({
        customers: customers.length,
        loans: loans.length,
        loanTypes: loanTypesRes.data.length,
        guarantors: guarantorsRes.data.length,
        payments: payments.length,
        totalLoanAmount,
        totalPayments,
      })
      setError(null)
    } catch (err) {
      setError('Failed to fetch statistics. Make sure the backend is running on http://localhost:8080')
      console.error('Error fetching stats:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-spinner">Loading statistics...</div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <button onClick={fetchStats} className="refresh-btn">
          Refresh
        </button>
      </div>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <h3>Total Customers</h3>
            <p className="stat-value">{stats.customers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3>Total Loans</h3>
            <p className="stat-value">{stats.loans}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3>Loan Types</h3>
            <p className="stat-value">{stats.loanTypes}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3>Guarantors</h3>
            <p className="stat-value">{stats.guarantors}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3>Total Payments</h3>
            <p className="stat-value">{stats.payments}</p>
          </div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-content">
            <h3>Total Loan Amount</h3>
            <p className="stat-value">${stats.totalLoanAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-content">
            <h3>Total Payments Received</h3>
            <p className="stat-value">${stats.totalPayments.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-info">
        <h3>System Information</h3>
        <p>Use the navigation tabs above to manage customers, loans, loan types, guarantors, and payments.</p>
        <p>All data is synchronized with the Spring Boot backend running on port 8080.</p>
      </div>
    </div>
  )
}

export default Dashboard

