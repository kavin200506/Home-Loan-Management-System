# 🚀 Quick Start Guide

## ⚡ Fast Setup (3 Steps)

### 1️⃣ Start MySQL Database
```bash
# Make sure MySQL is running
mysql -u root -p
```

### 2️⃣ Start Backend (Terminal 1)
```bash
cd springapp
./mvnw spring-boot:run          # Mac/Linux
mvnw.cmd spring-boot:run         # Windows
```
✅ Wait for: `Started SpringappApplication`

### 3️⃣ Start Frontend (Terminal 2 - NEW WINDOW)
```bash
cd frontend
npm install                      # First time only
npm run dev
```
✅ Wait for: `Local: http://localhost:3000`

### 4️⃣ Open Browser
🌐 Go to: **http://localhost:3000**

---

## 📋 What You Need

- ✅ Java 17+
- ✅ Node.js 16+
- ✅ MySQL 8.0+
- ✅ Maven (or use mvnw wrapper)

---

## 🔍 Verify It's Working

### Test Backend:
```bash
curl http://localhost:8080/api/customers
```
Should return: `[]` or JSON data

### Test Frontend:
Open: `http://localhost:3000`
Should see: Dashboard with navigation tabs

---

## ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| Port 8080 in use | Change port in `application.properties` |
| Port 3000 in use | Vite will auto-use next port |
| Database error | Check MySQL is running |
| CORS error | Backend allows all requests (should work) |
| npm install fails | Delete `node_modules`, run `npm install` again |

---

## 🛑 Stop Application

- **Frontend:** Press `Ctrl + C` in frontend terminal
- **Backend:** Press `Ctrl + C` in backend terminal

---

## 📚 More Details

See `RUN_GUIDE.md` for detailed instructions.

