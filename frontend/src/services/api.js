import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Customer APIs
export const customerAPI = {
  getAll: () => api.get('/customers'),
  getById: (id) => api.get(`/customers/${id}`),
  create: (data) => api.post('/customers', data),
  update: (id, data) => api.put(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
  getByEmail: (email) => api.get(`/customers/email/${email}`),
  getByCreditScore: (score) => api.get(`/customers/creditScore/${score}`),
  getPaginated: (page, size) => api.get(`/customers/page/${page}/${size}`),
}

// Loan APIs
export const loanAPI = {
  getAll: () => api.get('/loans'),
  getById: (id) => api.get(`/loans/${id}`),
  create: (data) => api.post('/loans', data),
  update: (id, data) => api.put(`/loans/${id}`, data),
  delete: (id) => api.delete(`/loans/${id}`),
  getByStatus: (status) => api.get(`/loans/status/${status}`),
}

// Loan Type APIs
export const loanTypeAPI = {
  getAll: () => api.get('/loantypes'),
  getById: (id) => api.get(`/loantypes/${id}`),
  create: (data) => api.post('/loantypes', data),
  update: (id, data) => api.put(`/loantypes/${id}`, data),
  delete: (id) => api.delete(`/loantypes/${id}`),
}

// Guarantor APIs
export const guarantorAPI = {
  getAll: () => api.get('/guarantors'),
  getById: (id) => api.get(`/guarantors/${id}`),
  create: (data) => api.post('/guarantors', data),
  update: (id, data) => api.put(`/guarantors/${id}`, data),
  delete: (id) => api.delete(`/guarantors/${id}`),
}

// Payment APIs
export const paymentAPI = {
  getAll: () => api.get('/payments'),
  getById: (id) => api.get(`/payments/${id}`),
  create: (data) => api.post('/payments', data),
  update: (id, data) => api.put(`/payments/${id}`, data),
  delete: (id) => api.delete(`/payments/${id}`),
}

export default api

