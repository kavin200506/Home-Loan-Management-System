#!/bin/bash

echo "🔍 Checking Application Status..."
echo "================================="
echo ""

# Check Backend
echo "📡 Backend (port 8080):"
if curl -s http://localhost:8080/api/customers > /dev/null 2>&1; then
    echo "   ✅ Running - http://localhost:8080"
else
    echo "   ❌ Not running"
fi

echo ""

# Check Frontend
echo "🎨 Frontend (port 3000):"
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   ✅ Running - http://localhost:3000"
else
    echo "   ⏳ Starting... (may take 30 seconds)"
    echo "   Check: http://localhost:3000"
fi

echo ""

# Check processes
echo "🔧 Running Processes:"
BACKEND_PID=$(lsof -ti:8080 2>/dev/null)
FRONTEND_PID=$(lsof -ti:3000 2>/dev/null)

if [ ! -z "$BACKEND_PID" ]; then
    echo "   Backend PID: $BACKEND_PID"
fi

if [ ! -z "$FRONTEND_PID" ]; then
    echo "   Frontend PID: $FRONTEND_PID"
fi

echo ""
echo "🌐 Open in browser: http://localhost:3000"


