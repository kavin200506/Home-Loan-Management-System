# 🚀 Automatic Startup Guide

## ✅ Quick Start (Easiest Method)

### For Mac/Linux:
```bash
./start-all.sh
```

### For Windows:
Double-click: `start-all.bat` (or run both `start-backend.bat` and `start-frontend.bat` in separate terminals)

---

## 📋 Manual Start (If scripts don't work)

### Terminal 1 - Backend:
```bash
cd springapp
./mvnw spring-boot:run
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm install    # First time only
npm run dev
```

---

## 🛑 Stop Application

### Stop Everything:
```bash
./stop-all.sh
```

Or manually:
- Press `Ctrl + C` in both terminal windows
- Or kill processes on ports 8080 and 3000

---

## ✅ Verify It's Running

1. **Backend:** http://localhost:8080/api/customers (should return `[]`)
2. **Frontend:** http://localhost:3000 (should show the application)

---

## 📝 Current Status

- ✅ Backend: Starting/Running on port 8080
- ✅ Frontend: Starting/Running on port 3000
- 🌐 Open: http://localhost:3000 in your browser

---

## ⚠️ Troubleshooting

**Port already in use:**
- Backend (8080): Change in `springapp/src/main/resources/application.properties`
- Frontend (3000): Vite will auto-use next available port

**Can't connect:**
- Wait 30 seconds for both to fully start
- Check browser console (F12) for errors
- Verify MySQL is running


