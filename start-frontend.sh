#!/bin/bash

echo "🚀 Starting React Frontend..."
echo "=============================="

cd "$(dirname "$0")/frontend"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (first time only)..."
    npm install
fi

# Start Vite dev server
npm run dev

