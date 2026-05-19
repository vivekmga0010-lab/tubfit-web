@echo off
setlocal enabledelayedexpansion
cd /d c:\ryaanvi\tubdelhi210426

echo ========================================
echo RUNNING BUILD
echo ========================================
npm run build
echo.
echo BUILD COMPLETE
echo.

echo ========================================
echo STARTING APP (will run for 30 seconds)
echo ========================================
timeout /t 2
start "" npm start

REM Wait 30 seconds
timeout /t 30

REM Find and kill the npm processes
echo.
echo Stopping app...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM npm.exe 2>nul

echo.
echo Done!
