import React, { useState, useEffect } from 'react'
import './StatusBar.css'

function StatusBar({ status, clearStatus }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (status) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (clearStatus) clearStatus()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [status, clearStatus])

  if (!status || !isVisible) return null

  const getStatusClass = () => {
    if (status.type === 'error') return 'status-error'
    if (status.type === 'success') return 'status-success'
    if (status.type === 'info') return 'status-info'
    return 'status-default'
  }

  const getStatusIcon = () => {
    if (status.type === 'error') return '✕'
    if (status.type === 'success') return '✓'
    if (status.type === 'info') return 'ℹ'
    return '•'
  }

  return (
    <div className={`status-bar ${getStatusClass()}`}>
      <div className="status-content">
        <span className="status-icon">{getStatusIcon()}</span>
        <div className="status-details">
          <div className="status-message">{status.message}</div>
          {status.statusCode && (
            <div className="status-code">HTTP {status.statusCode}</div>
          )}
          {status.timestamp && (
            <div className="status-time">{status.timestamp}</div>
          )}
        </div>
        <button className="status-close" onClick={() => {
          setIsVisible(false)
          if (clearStatus) clearStatus()
        }}>×</button>
      </div>
    </div>
  )
}

export default StatusBar

