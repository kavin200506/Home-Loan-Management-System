@echo off
echo Starting React Frontend...
echo ===========================

cd frontend

if not exist node_modules (
    echo Installing dependencies (first time only)...
    call npm install
)

call npm run dev

pause

