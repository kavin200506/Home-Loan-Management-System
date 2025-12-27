# Quick Setup Guide

## Step-by-Step Setup

### 1. Database Setup
```bash
# Make sure MySQL is running
# The database will be created automatically if it doesn't exist
# Database name: loandb
# Default credentials: root / Root@1234
```

### 2. Start Backend
```bash
cd springapp
./mvnw spring-boot:run
# Wait for: "Started SpringappApplication"
```

### 3. Start Frontend (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

### 4. Access Application
Open browser: `http://localhost:3000`

## First Time Setup

1. **Install Node.js** (if not installed)
   - Download from https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **Install Maven** (if not installed)
   - Or use the included `mvnw` wrapper

3. **MySQL Setup**
   - Install MySQL 8.0+
   - Start MySQL service
   - Update credentials in `springapp/src/main/resources/application.properties` if needed

## Troubleshooting

### Port Already in Use
- Backend (8080): Change `server.port` in `application.properties`
- Frontend (3000): Vite will auto-select next available port

### Database Connection Failed
- Check MySQL is running: `mysql -u root -p`
- Verify credentials in `application.properties`
- Ensure database exists or can be created

### Frontend Can't Connect to Backend
- Verify backend is running: `curl http://localhost:8080/api/customers`
- Check browser console for errors
- Ensure no firewall blocking port 8080

### CORS Errors
- During development: Vite proxy should handle this
- If issues persist, you may need to add CORS configuration to backend SecurityConfig
- For production: Configure CORS properly in Spring Boot

## Testing the Connection

1. Start backend
2. Test API: `curl http://localhost:8080/api/customers`
3. Should return: `[]` (empty array) or customer data
4. Start frontend
5. Open browser console - should see no CORS errors

## Development Workflow

1. **Backend changes**: Restart Spring Boot application
2. **Frontend changes**: Hot reload (automatic with Vite)
3. **Database changes**: Hibernate will auto-update schema

## Production Build

### Frontend
```bash
cd frontend
npm run build
# Output in: frontend/dist/
```

### Backend
```bash
cd springapp
./mvnw clean package
# JAR file in: springapp/target/
```

