@echo off
REM Batch script to run build and tests
setlocal enabledelayedexpansion

cd /d c:\ryaanvi\tubdelhi210426

REM Verify file replacement
echo ========================================
echo FILE REPLACEMENT VERIFICATION
echo ========================================
echo.
echo Checking AdminDashboard.jsx...
dir AdminDashboard*.jsx
echo.

REM Run Node.js script to handle the rest
echo Running build and start tests...
node run_tasks.js

pause
