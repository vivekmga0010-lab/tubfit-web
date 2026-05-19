@echo off
cd /d "%~dp0"
echo Building and starting TUB Fit production server...
echo.
echo Open this URL after the build finishes:
echo http://localhost:3000/
echo.
echo Keep this window open while the website is running.
echo Press Ctrl+C to stop the server.
echo.
npm start
pause
