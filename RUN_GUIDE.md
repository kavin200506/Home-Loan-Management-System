# How to Run the Home Loan Management System

Complete step-by-step guide to run both Frontend and Backend locally.

## Prerequisites Check

Before starting, ensure you have:

1. **Java 17+** installed
   ```bash
   java -version
   ```
   Should show Java 17 or higher

2. **Maven** installed (or use the included wrapper)
   ```bash
   mvn -version
   ```
   Or the project includes `mvnw` wrapper

3. **Node.js 16+** and npm installed
   ```bash
   node --version
   npm --version
   ```
   Download from: https://nodejs.org/

4. **MySQL 8.0+** installed and running
   ```bash
   mysql --version
   ```
   Make sure MySQL service is running

---

## Step 1: Database Setup

1. **Start MySQL service**
   - Windows: Start MySQL from Services or Command Prompt
   - Mac/Linux: `sudo systemctl start mysql` or `brew services start mysql`

2. **Verify MySQL is running**
   ```bash
   mysql -u root -p
   ```
   Enter your MySQL password (default: `Root@1234`)

3. **The database will be created automatically** when you run the Spring Boot app
   - Database name: `loandb`
   - It will be created if it doesn't exist (configured in `application.properties`)

---

## Step 2: Configure Backend (if needed)

1. **Check database credentials** in:
   ```
   springapp/src/main/resources/application.properties
   ```

2. **Update if your MySQL credentials are different:**
   ```properties
   spring.datasource.username=root
   spring.datasource.password=Root@1234
   ```

---

## Step 3: Run Spring Boot Backend

### Option A: Using Maven Wrapper (Recommended)

1. **Open Terminal/Command Prompt**

2. **Navigate to springapp directory:**
   ```bash
   cd "Home Loan Management/springapp"
   ```
   Or on Windows:
   ```cmd
   cd "Home Loan Management\springapp"
   ```

3. **Run the application:**
   - **Windows:**
     ```cmd
     mvnw.cmd spring-boot:run
     ```
   - **Mac/Linux:**
     ```bash
     ./mvnw spring-boot:run
     ```

### Option B: Using IDE (IntelliJ IDEA / Eclipse)

1. **Open the project** in your IDE
2. **Navigate to:** `springapp/src/main/java/com/examly/springapp/SpringappApplication.java`
3. **Right-click** → **Run 'SpringappApplication'**

### Option C: Using Maven (if installed globally)

```bash
cd springapp
mvn spring-boot:run
```

### ✅ Backend is Running When You See:

```
Started SpringappApplication in X.XXX seconds
```

**Backend URL:** `http://localhost:8080`

**Keep this terminal window open!**

---

## Step 4: Verify Backend is Running

1. **Open a new terminal/command prompt**

2. **Test the API:**
   ```bash
   curl http://localhost:8080/api/customers
   ```
   Or open in browser: `http://localhost:8080/api/customers`
   
   Should return: `[]` (empty array) or JSON data

3. **If you see data or empty array, backend is working! ✅**

---

## Step 5: Run React Frontend

1. **Open a NEW Terminal/Command Prompt** (keep backend running)

2. **Navigate to frontend directory:**
   ```bash
   cd "Home Loan Management/frontend"
   ```
   Or on Windows:
   ```cmd
   cd "Home Loan Management\frontend"
   ```

3. **Install dependencies (First time only):**
   ```bash
   npm install
   ```
   This will install all required packages. Wait for it to complete.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

### ✅ Frontend is Running When You See:

```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Frontend URL:** `http://localhost:3000`

---

## Step 6: Access the Application

1. **Open your web browser**

2. **Navigate to:** `http://localhost:3000`

3. **You should see:**
   - Beautiful gradient header
   - Navigation tabs (Dashboard, Customers, Loans, etc.)
   - Dashboard with statistics

---

## Complete Running Setup

You should now have:

- ✅ **Terminal 1:** Spring Boot backend running on port 8080
- ✅ **Terminal 2:** React frontend running on port 3000
- ✅ **Browser:** Application open at http://localhost:3000

---

## Quick Commands Summary

### Backend (Terminal 1)
```bash
cd springapp
./mvnw spring-boot:run          # Mac/Linux
mvnw.cmd spring-boot:run         # Windows
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install                      # First time only
npm run dev
```

---

## Troubleshooting

### ❌ Backend Won't Start

**Port 8080 already in use:**
```bash
# Find what's using port 8080
# Windows:
netstat -ano | findstr :8080

# Mac/Linux:
lsof -i :8080

# Kill the process or change port in application.properties
```

**Database connection error:**
- Check MySQL is running
- Verify credentials in `application.properties`
- Test connection: `mysql -u root -p`

**Maven wrapper not working:**
- Make `mvnw` executable: `chmod +x mvnw` (Mac/Linux)
- Or use: `mvn spring-boot:run` (if Maven is installed)

### ❌ Frontend Won't Start

**Port 3000 already in use:**
- Vite will automatically use the next available port (3001, 3002, etc.)
- Check the terminal output for the actual URL

**npm install fails:**
- Clear cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Cannot connect to backend:**
- Verify backend is running: `curl http://localhost:8080/api/customers`
- Check browser console (F12) for errors
- Ensure backend URL in `frontend/src/services/api.js` is correct

### ❌ CORS Errors in Browser

If you see CORS errors:
- Backend SecurityConfig should allow all requests
- Vite proxy should handle this during development
- Check browser console for specific error messages

### ❌ Database Issues

**Database doesn't exist:**
- The app will create it automatically (see `createDatabaseIfNotExist=true`)
- Or create manually:
  ```sql
  CREATE DATABASE loandb;
  ```

**Access denied:**
- Check username/password in `application.properties`
- Verify MySQL user has proper permissions

---

## Testing the Application

1. **Dashboard:**
   - Should show statistics (may be 0s initially)
   - Click "🔄 Refresh" to update

2. **Create a Customer:**
   - Go to "Customers" tab
   - Click "➕ Add Customer"
   - Fill in name and email (required)
   - Click "➕ Create"
   - Should see success message

3. **View Customers:**
   - Click "🔄 Refresh" or "📋 Get All Customers"
   - Should see the customer you created

4. **Create Loan Type:**
   - Go to "Loan Types" tab
   - Create a loan type (e.g., "Home Loan", 5.5% interest)

5. **Create a Loan:**
   - Go to "Loans" tab
   - Create a loan linked to the customer and loan type

---

## Stopping the Application

1. **Stop Frontend:**
   - In frontend terminal, press `Ctrl + C`

2. **Stop Backend:**
   - In backend terminal, press `Ctrl + C`

3. **Stop MySQL (optional):**
   - Only if you want to stop the database service

---

## Next Steps

- Explore all the features in each tab
- Create sample data (customers, loans, payments)
- Test search and filter functionality
- Check the dashboard statistics

---

## Need Help?

- Check browser console (F12) for errors
- Check backend terminal for error messages
- Verify both services are running on correct ports
- Review the main README.md for more details

---

## Summary

**Backend:** `http://localhost:8080` (Spring Boot)  
**Frontend:** `http://localhost:3000` (React)  
**Database:** MySQL on `localhost:3306`

Both must be running simultaneously for the application to work!


