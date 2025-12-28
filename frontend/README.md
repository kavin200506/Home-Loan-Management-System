# Home Loan Management System - Frontend

A modern, responsive React frontend for the Home Loan Management System.

## Features

- 🎨 Modern and attractive UI with gradient design
- 📊 Dashboard with real-time statistics
- 👤 Complete Customer Management (CRUD operations)
- 💰 Loan Management with status tracking
- 📋 Loan Type Management
- 🤝 Guarantor Management
- 💳 Payment Management
- 🔍 Advanced search and filtering capabilities
- 📱 Fully responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend Spring Boot application running on `http://localhost:8080`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Make sure your Spring Boot backend is running on port 8080

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Dashboard with statistics
│   │   ├── Customers.jsx       # Customer management
│   │   ├── Loans.jsx           # Loan management
│   │   ├── LoanTypes.jsx       # Loan type management
│   │   ├── Guarantors.jsx      # Guarantor management
│   │   ├── Payments.jsx        # Payment management
│   │   └── *.css               # Component styles
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## API Configuration

The frontend is configured to connect to the backend at `http://localhost:8080/api`. This is set in:
- `src/services/api.js` - API base URL
- `vite.config.js` - Proxy configuration for development

If your backend runs on a different port, update the `API_BASE_URL` in `src/services/api.js`.

## Features Overview

### Dashboard
- Real-time statistics for all entities
- Total loan amounts and payments
- Quick refresh functionality

### Customer Management
- Create, read, update, delete customers
- Search by email
- Filter by credit score
- Pagination support

### Loan Management
- Full CRUD operations
- Link loans to customers and loan types
- Filter by status (PENDING, APPROVED, REJECTED)
- Visual status indicators

### Loan Types
- Manage different loan types
- Set interest rates
- Add descriptions

### Guarantors
- Manage guarantor information
- Track credit scores
- Contact information management

### Payments
- Record payments for loans
- Link payments to specific loans
- Date tracking
- Amount management

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Backend Connection Issues
If you see connection errors:
1. Ensure the Spring Boot backend is running on port 8080
2. Check CORS configuration in the backend
3. Verify the API base URL in `src/services/api.js`

### Port Already in Use
If port 3000 is already in use, Vite will automatically use the next available port.

## License

This project is part of the Home Loan Management System.


