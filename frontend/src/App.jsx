import React, { useState } from 'react'
import './App.css'
import { StatusProvider, useStatus } from './context/StatusContext'
import StatusBar from './components/StatusBar'
import Dashboard from './components/Dashboard'
import Customers from './components/Customers'
import Loans from './components/Loans'
import LoanTypes from './components/LoanTypes'
import Guarantors from './components/Guarantors'
import Payments from './components/Payments'

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { status, clearStatus } = useStatus()

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'customers', label: 'Customers' },
    { id: 'loans', label: 'Loans' },
    { id: 'loantypes', label: 'Loan Types' },
    { id: 'guarantors', label: 'Guarantors' },
    { id: 'payments', label: 'Payments' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'customers':
        return <Customers />
      case 'loans':
        return <Loans />
      case 'loantypes':
        return <LoanTypes />
      case 'guarantors':
        return <Guarantors />
      case 'payments':
        return <Payments />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Home Loan Management System</h1>
          <p>Loan Management Platform</p>
        </div>
      </header>

      <nav className="app-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="app-main">
        {renderContent()}
      </main>

      <StatusBar status={status} clearStatus={clearStatus} />
    </div>
  )
}

function App() {
  return (
    <StatusProvider>
      <AppContent />
    </StatusProvider>
  )
}

export default App

