# Home Loan Management System

A full-stack application for managing home loans, customers, guarantors, and payments.

## Project Structure

```
Home Loan Management/
├── springapp/          # Spring Boot Backend
│   └── src/
│       └── main/
│           ├── java/   # Java source code
│           └── resources/
│               └── application.properties
└── frontend/           # React Frontend
    └── src/
        ├── components/ # React components
        └── services/   # API services
```

## Features

### Backend (Spring Boot)
- RESTful API endpoints for all entities
- MySQL database integration
- JPA/Hibernate for ORM
- Security configuration
- Global exception handling
- AOP logging

### Frontend (React)
- 🎨 Modern, attractive UI with gradient design
- 📊 Real-time dashboard with statistics
- 👤 Customer Management (CRUD + Search)
- 💰 Loan Management with status tracking
- 📋 Loan Type Management
- 🤝 Guarantor Management
- 💳 Payment Management
- 🔍 Advanced filtering and search
- 📱 Fully responsive design

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 16+ and npm
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## Backend Setup

1. **Database Configuration**
   - Create a MySQL database named `loandb`
   - Update database credentials in `springapp/src/main/resources/application.properties` if needed:
     ```properties
     spring.datasource.username=root
     spring.datasource.password=Root@1234
     ```

2. **Run the Backend**
   ```bash
   cd springapp
   ./mvnw spring-boot:run
   ```
   
   Or use your IDE to run `SpringappApplication.java`

3. **Backend will run on:** `http://localhost:8080`

## Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Frontend will run on:** `http://localhost:3000`

## Running the Complete Application

1. **Start MySQL database**

2. **Start the Spring Boot backend:**
   ```bash
   cd springapp
   ./mvnw spring-boot:run
   ```
   Wait for the message: "Started SpringappApplication"

3. **Start the React frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install  # First time only
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## API Endpoints

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `POST /api/customers` - Create customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer
- `GET /api/customers/email/{email}` - Get customer by email
- `GET /api/customers/creditScore/{score}` - Get customers by credit score
- `GET /api/customers/page/{page}/{size}` - Paginated customers

### Loans
- `GET /api/loans` - Get all loans
- `GET /api/loans/{id}` - Get loan by ID
- `POST /api/loans` - Create loan
- `PUT /api/loans/{id}` - Update loan
- `DELETE /api/loans/{id}` - Delete loan
- `GET /api/loans/status/{status}` - Get loans by status

### Loan Types
- `GET /api/loantypes` - Get all loan types
- `GET /api/loantypes/{id}` - Get loan type by ID
- `POST /api/loantypes` - Create loan type
- `PUT /api/loantypes/{id}` - Update loan type
- `DELETE /api/loantypes/{id}` - Delete loan type

### Guarantors
- `GET /api/guarantors` - Get all guarantors
- `GET /api/guarantors/{id}` - Get guarantor by ID
- `POST /api/guarantors` - Create guarantor
- `PUT /api/guarantors/{id}` - Update guarantor
- `DELETE /api/guarantors/{id}` - Delete guarantor

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/{id}` - Get payment by ID
- `POST /api/payments` - Create payment
- `PUT /api/payments/{id}` - Update payment
- `DELETE /api/payments/{id}` - Delete payment

## Database Schema

The application uses the following main entities:
- **Customer** - Customer information with credit scores
- **Loan** - Loan details linked to customers and loan types
- **LoanType** - Different types of loans with interest rates
- **Guarantor** - Guarantor information
- **Payment** - Payment records linked to loans

## Technology Stack

### Backend
- Spring Boot 3.x
- Spring Data JPA
- MySQL
- Spring Security
- Maven

### Frontend
- React 18
- Vite
- Axios
- Modern CSS3

## Troubleshooting

### Backend Issues
- **Database connection error**: Check MySQL is running and credentials are correct
- **Port 8080 already in use**: Change `server.port` in `application.properties`

### Frontend Issues
- **Cannot connect to backend**: 
  - Ensure backend is running on port 8080
  - Check browser console for CORS errors
  - Verify API base URL in `frontend/src/services/api.js`

### CORS Issues
If you encounter CORS errors, the backend SecurityConfig should allow all requests. If issues persist, you may need to add CORS configuration to the backend (but this requires modifying backend code).

## Development Notes

- The frontend uses Vite's proxy during development to avoid CORS issues
- For production, configure CORS properly in the backend
- Database schema is auto-generated by Hibernate (`ddl-auto=update`)

## License

This project is for educational purposes.
