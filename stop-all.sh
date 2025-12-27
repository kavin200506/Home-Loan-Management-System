#!/bin/bash

echo "🛑 Stopping Home Loan Management System..."
echo "=========================================="

# Find and kill processes on ports 8080 and 3000
echo "Stopping backend (port 8080)..."
lsof -ti:8080 | xargs kill -9 2>/dev/null

echo "Stopping frontend (port 3000)..."
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Also kill any mvnw or node processes related to the project
echo "Cleaning up processes..."
pkill -f "mvnw spring-boot:run" 2>/dev/null
pkill -f "vite" 2>/dev/null

echo "✅ All services stopped"

