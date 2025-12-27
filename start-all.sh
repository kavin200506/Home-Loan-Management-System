#!/bin/bash

echo "🏦 Home Loan Management System - Starting All Services"
echo "======================================================"
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Function to check if a port is in use
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
}

# Check if ports are available
if check_port 8080; then
    echo "⚠️  Port 8080 is already in use. Backend may already be running."
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

if check_port 3000; then
    echo "⚠️  Port 3000 is already in use. Frontend may already be running."
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📦 Step 1: Installing frontend dependencies (if needed)..."
cd "$SCRIPT_DIR/frontend"
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install frontend dependencies"
        exit 1
    fi
    echo "✅ Frontend dependencies installed"
else
    echo "✅ Frontend dependencies already installed"
fi

echo ""
echo "🔧 Step 2: Starting Spring Boot Backend..."
cd "$SCRIPT_DIR/springapp"
chmod +x mvnw 2>/dev/null

# Start backend in background
./mvnw spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!

echo "   Backend starting... (PID: $BACKEND_PID)"
echo "   Logs: backend.log"

# Wait for backend to start (check if port 8080 is listening)
echo "   Waiting for backend to be ready..."
for i in {1..60}; do
    if curl -s http://localhost:8080/api/customers > /dev/null 2>&1; then
        echo "   ✅ Backend is ready on http://localhost:8080"
        break
    fi
    if [ $i -eq 60 ]; then
        echo "   ⚠️  Backend is taking longer than expected to start"
        echo "   Check backend.log for details"
    fi
    sleep 1
done

echo ""
echo "🎨 Step 3: Starting React Frontend..."
cd "$SCRIPT_DIR/frontend"

# Start frontend in background
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!

echo "   Frontend starting... (PID: $FRONTEND_PID)"
echo "   Logs: frontend.log"

# Wait a bit for frontend to start
sleep 3

echo ""
echo "======================================================"
echo "✅ Application Started Successfully!"
echo "======================================================"
echo ""
echo "📍 Backend:  http://localhost:8080"
echo "📍 Frontend: http://localhost:3000"
echo ""
echo "📋 Process IDs:"
echo "   Backend:  $BACKEND_PID"
echo "   Frontend: $FRONTEND_PID"
echo ""
echo "📝 Logs:"
echo "   Backend:  backend.log"
echo "   Frontend: frontend.log"
echo ""
echo "🛑 To stop the application:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "   Or run: ./stop-all.sh"
echo ""
echo "🌐 Opening browser in 5 seconds..."
sleep 5

# Try to open browser (works on Mac and Linux with xdg-open)
if command -v open > /dev/null; then
    open http://localhost:3000
elif command -v xdg-open > /dev/null; then
    xdg-open http://localhost:3000
fi

echo ""
echo "Press Ctrl+C to stop all services..."

# Wait for user interrupt
trap "echo ''; echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

# Keep script running
wait

