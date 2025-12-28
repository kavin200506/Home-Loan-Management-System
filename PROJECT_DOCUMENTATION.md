# Home Loan Management System - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Database Entities & Fields](#database-entities--fields)
4. [Entity Relationships](#entity-relationships)
5. [Request/Response Flow](#requestresponse-flow)
6. [Frontend Workflow](#frontend-workflow)
7. [Backend Workflow](#backend-workflow)
8. [Complete System Flow](#complete-system-flow)

---

## 🎯 Project Overview

**Home Loan Management System** is a full-stack web application for managing home loans, customers, guarantors, loan types, and payments. It provides a complete solution for financial institutions to track and manage loan applications and transactions.

### Technology Stack
- **Frontend**: React 18 + Vite + Axios
- **Backend**: Spring Boot 3.x + Spring Data JPA
- **Database**: MySQL 8.0
- **Architecture**: RESTful API

---

## 🏗️ System Architecture

```
┌─────────────────┐
│   React UI      │  (Frontend - Port 3000)
│   Components    │
└────────┬────────┘
         │ HTTP Requests (JSON)
         │
         ▼
┌─────────────────┐
│  Spring Boot    │  (Backend - Port 8080)
│  REST API       │
│  Controllers    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Services      │  (Business Logic)
│   Repositories  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   MySQL DB      │  (Database - Port 3306)
│   loandb        │
└─────────────────┘
```

---

## 📊 Database Entities & Fields

### 1. **Customer** Entity
**Purpose**: Stores information about loan applicants/customers

**Fields** (6 total):
- `customerId` (Long) - Primary Key, Auto-generated
- `customerName` (String) - **Required**, Customer's full name
- `email` (String) - **Required**, Customer's email address
- `phoneNumber` (String) - Optional, Contact number
- `address` (String) - Optional, Physical address
- `creditScore` (Double) - Optional, Credit score (300-850)

**Use Case**: 
- Register new loan applicants
- Track customer information
- Assess creditworthiness
- Search customers by email or credit score

---

### 2. **LoanType** Entity
**Purpose**: Defines different types of loans available (e.g., Home Loan, Personal Loan)

**Fields** (4 total):
- `loanTypeId` (Long) - Primary Key, Auto-generated
- `typeName` (String) - Name of loan type (e.g., "Home Loan", "Personal Loan")
- `description` (String) - Optional, Description of the loan type
- `interestRate` (Double) - Interest rate for this loan type (e.g., 5.5%)

**Use Case**:
- Define available loan products
- Set interest rates for different loan types
- Categorize loans

---

### 3. **Loan** Entity
**Purpose**: Represents a loan application/loan granted to a customer

**Fields** (7 total):
- `loanId` (Long) - Primary Key, Auto-generated
- `loanAmount` (Double) - Amount of the loan
- `interestRate` (Double) - Interest rate for this specific loan
- `tenureMonths` (Integer) - Loan duration in months (e.g., 240 months = 20 years)
- `status` (String) - Loan status: "PENDING", "APPROVED", or "REJECTED"
- `customer` (Customer) - **Relationship**: Many-to-One with Customer
- `loanType` (LoanType) - **Relationship**: Many-to-One with LoanType

**Use Case**:
- Create new loan applications
- Track loan status (pending/approved/rejected)
- Link loans to customers and loan types
- Filter loans by status

---

### 4. **Guarantor** Entity
**Purpose**: Stores information about guarantors who guarantee loan repayment

**Fields** (6 total):
- `guarantorId` (Long) - Primary Key, Auto-generated
- `guarantorName` (String) - Name of the guarantor
- `email` (String) - Optional, Guarantor's email
- `phoneNumber` (String) - Optional, Contact number
- `address` (String) - Optional, Physical address
- `creditScore` (Double) - Optional, Guarantor's credit score

**Use Case**:
- Register guarantors for loans
- Assess guarantor creditworthiness
- Contact guarantors if needed

---

### 5. **Payment** Entity
**Purpose**: Records payments made towards loans

**Fields** (4 total):
- `paymentId` (Long) - Primary Key, Auto-generated
- `amount` (Double) - Payment amount
- `paymentDate` (Date) - Date when payment was made
- `loan` (Loan) - **Relationship**: Many-to-One with Loan

**Use Case**:
- Record loan payments
- Track payment history
- Calculate total payments received
- Link payments to specific loans

---

## 🔗 Entity Relationships

```
Customer (1) ────────< (Many) Loan
   │
   └─── Has credit score, contact info

LoanType (1) ────────< (Many) Loan
   │
   └─── Defines loan product type

Loan (1) ────────< (Many) Payment
   │
   └─── Has status, amount, tenure

Guarantor (Standalone)
   │
   └─── Independent entity (can be linked manually)
```

**Key Relationships**:
- **One Customer** can have **Many Loans**
- **One LoanType** can be used for **Many Loans**
- **One Loan** can have **Many Payments**
- **Guarantors** are standalone (not directly linked in database, but used in business logic)

---

## 🔄 Request/Response Flow

### Frontend to Backend Communication

#### Step 1: User Action in Frontend
```javascript
// User clicks "Add Customer" button
// Frontend component (Customers.jsx) calls:
const response = await customerAPI.create(customerData)
```

#### Step 2: API Service Layer
```javascript
// api.js intercepts and sends HTTP request
POST http://localhost:8080/api/customers
Headers: { 'Content-Type': 'application/json' }
Body: { customerName: "...", email: "...", ... }
```

#### Step 3: Backend Controller Receives Request
```java
// CustomerController.java
@PostMapping
public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
    Customer savedCustomer = customerService.addCustomer(customer);
    return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
}
```

#### Step 4: Service Layer Processes
```java
// CustomerService.java
public Customer addCustomer(Customer customer) {
    return customerRepository.save(customer);
}
```

#### Step 5: Repository Saves to Database
```java
// CustomerRepo.java (extends JpaRepository)
// Automatically saves to MySQL database
```

#### Step 6: Response Flows Back
```
Database → Repository → Service → Controller → HTTP Response (JSON)
```

#### Step 7: Frontend Receives Response
```javascript
// Response interceptor captures status code
response.status = 201
response.data = { customerId: 1, customerName: "...", ... }

// Status bar shows: "✓ Customer created successfully | HTTP 201"
```

---

## 🎨 Frontend Workflow

### Component Structure

```
App.jsx (Main Container)
├── StatusProvider (Global Status Context)
├── StatusBar (Bottom Status Display)
└── Navigation Tabs
    ├── Dashboard.jsx
    ├── Customers.jsx
    ├── Form (Create/Edit)
    ├── Search Functions
    └── Table Display
    ├── Loans.jsx
    ├── LoanTypes.jsx
    ├── Guarantors.jsx
    └── Payments.jsx
```

### Request Handling Process

#### 1. **User Interaction**
```javascript
// User fills form and clicks "Create"
handleSubmit(event) {
    event.preventDefault()
    // Validate data
    // Call API
}
```

#### 2. **API Call with Error Handling**
```javascript
try {
    setLoading(true)
    const response = await customerAPI.create(data)
    
    // Success: Show success message
    showSuccess('Customer created successfully', response.status)
    
    // Refresh data
    await fetchCustomers()
    
} catch (error) {
    // Error: Show error message with status code
    showError(error.message, error.statusCode)
}
```

#### 3. **Status Display**
```javascript
// StatusContext manages global status
// StatusBar component displays at bottom:
// - Status code (200, 404, 500, etc.)
// - Error/Success message
// - Timestamp
```

### Response Handling

**Success Response (200/201)**:
```json
{
  "customerId": 1,
  "customerName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "address": "123 Main St",
  "creditScore": 750.0
}
```
→ Frontend shows: "✓ Customer created successfully | HTTP 201"

**Error Response (400/404/500)**:
```json
{
  "message": "Email already exists"
}
```
→ Frontend shows: "✕ Email already exists | HTTP 400"

**Network Error**:
→ Frontend shows: "✕ Network Error | NETWORK_ERROR"

---

## ⚙️ Backend Workflow

### Request Processing Pipeline

```
HTTP Request
    ↓
SecurityConfig (CORS Check)
    ↓
Controller (CustomerController)
    ↓
Service Layer (CustomerService)
    ↓
Repository (CustomerRepo - JPA)
    ↓
Database (MySQL)
    ↓
Response (JSON)
```

### Controller Methods

**CustomerController** provides:
- `POST /api/customers` - Create customer
- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer
- `GET /api/customers/email/{email}` - Search by email
- `GET /api/customers/creditScore/{score}` - Filter by credit score
- `GET /api/customers/page/{page}/{size}` - Paginated results

**LoanController** provides:
- `POST /api/loans` - Create loan
- `GET /api/loans` - Get all loans
- `GET /api/loans/{id}` - Get loan by ID
- `PUT /api/loans/{id}` - Update loan
- `DELETE /api/loans/{id}` - Delete loan
- `GET /api/loans/status/{status}` - Filter by status

Similar patterns for LoanType, Guarantor, and Payment controllers.

---

## 🔄 Complete System Flow Example

### Scenario: Creating a Loan Application

#### Step 1: User Creates Customer
```
Frontend: User fills customer form
    ↓
POST /api/customers
    ↓
Backend: Saves to database
    ↓
Response: { customerId: 1, ... }
    ↓
Frontend: Shows "Customer created | HTTP 201"
```

#### Step 2: User Creates Loan Type
```
Frontend: User creates "Home Loan" type
    ↓
POST /api/loantypes
Body: { typeName: "Home Loan", interestRate: 5.5 }
    ↓
Backend: Saves loan type
    ↓
Response: { loanTypeId: 1, ... }
```

#### Step 3: User Creates Loan
```
Frontend: User creates loan application
    ↓
POST /api/loans
Body: {
    loanAmount: 500000,
    interestRate: 5.5,
    tenureMonths: 240,
    status: "PENDING",
    customer: { customerId: 1 },
    loanType: { loanTypeId: 1 }
}
    ↓
Backend: 
    1. Validates customer exists
    2. Validates loan type exists
    3. Saves loan to database
    ↓
Response: { loanId: 1, ... }
    ↓
Frontend: Shows "Loan created | HTTP 201"
```

#### Step 4: User Records Payment
```
Frontend: User records payment
    ↓
POST /api/payments
Body: {
    amount: 2500,
    paymentDate: "2024-01-15",
    loan: { loanId: 1 }
}
    ↓
Backend: Saves payment linked to loan
    ↓
Response: { paymentId: 1, ... }
    ↓
Frontend: Shows "Payment created | HTTP 201"
```

---

## 📈 Data Flow Summary

### Create Operation Flow
```
User Input → React Component → API Service → Axios HTTP Request
    ↓
Spring Boot Controller → Service Layer → Repository → MySQL Database
    ↓
Database Response → Repository → Service → Controller → JSON Response
    ↓
Axios Response → React Component → Update UI → Show Status Bar
```

### Read Operation Flow
```
User Clicks "Refresh" → Component calls API → GET Request
    ↓
Backend fetches from database → Returns JSON array
    ↓
Frontend receives data → Updates state → Renders table
```

### Update Operation Flow
```
User clicks "Edit" → Form pre-filled → User modifies → "Update" clicked
    ↓
PUT Request with ID → Backend updates record → Returns updated data
    ↓
Frontend refreshes list → Shows success message
```

### Delete Operation Flow
```
User clicks "Delete" → Confirmation dialog → User confirms
    ↓
DELETE Request with ID → Backend deletes record → Returns success
    ↓
Frontend removes from list → Shows success message
```

---

## 🎯 Key Features

### 1. **Status Tracking**
- Every API call shows status code and message at bottom
- Success (Green): 200, 201
- Error (Red): 400, 404, 500
- Info (Blue): Search results, filters

### 2. **Error Handling**
- Network errors caught and displayed
- Backend validation errors shown
- Status codes always displayed

### 3. **Data Relationships**
- Loans linked to Customers and LoanTypes
- Payments linked to Loans
- All relationships maintained in database

### 4. **Search & Filter**
- Search customers by email
- Filter customers by credit score
- Filter loans by status
- Pagination support

---

## 📝 Summary

**Total Entities**: 5 (Customer, Loan, LoanType, Guarantor, Payment)

**Total Fields**: 
- Customer: 6 fields
- Loan: 7 fields (including 2 relationships)
- LoanType: 4 fields
- Guarantor: 6 fields
- Payment: 4 fields (including 1 relationship)

**Total API Endpoints**: ~30+ endpoints across all entities

**Request/Response Format**: JSON

**Status Display**: Real-time at bottom of screen with HTTP status codes

This system provides a complete loan management solution with proper data relationships, error handling, and user feedback for all operations.

