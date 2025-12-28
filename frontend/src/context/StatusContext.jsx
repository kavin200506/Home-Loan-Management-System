import React, { createContext, useContext, useState } from 'react'

const StatusContext = createContext()

export const useStatus = () => {
  const context = useContext(StatusContext)
  if (!context) {
    throw new Error('useStatus must be used within StatusProvider')
  }
  return context
}

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState(null)

  const showStatus = (type, message, statusCode = null) => {
    setStatus({
      type,
      message,
      statusCode,
      timestamp: new Date().toLocaleTimeString(),
    })
  }

  const clearStatus = () => {
    setStatus(null)
  }

  const showError = (message, statusCode = null) => {
    showStatus('error', message, statusCode)
  }

  const showSuccess = (message, statusCode = null) => {
    showStatus('success', message, statusCode)
  }

  const showInfo = (message, statusCode = null) => {
    showStatus('info', message, statusCode)
  }

  return (
    <StatusContext.Provider
      value={{
        status,
        showStatus,
        showError,
        showSuccess,
        showInfo,
        clearStatus,
      }}
    >
      {children}
    </StatusContext.Provider>
  )
}

