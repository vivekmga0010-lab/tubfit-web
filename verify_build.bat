@echo off
chdir /d c:\ryaanvi\tubdelhi210426

echo ========== Verifying File Replacement ==========
type AdminDashboard.jsx | find "text-blue-600" >nul
if errorlevel 1 (
    echo ✓ File replacement successful - corrupted line removed
) else (
    echo ✗ File replacement failed - corrupted line still exists
    exit /b 1
)

echo.
echo ========== Running npm run build ==========
call npm run build
if errorlevel 1 (
    echo Build FAILED
    exit /b 1
) else (
    echo Build SUCCEEDED
)

echo.
echo ========== Build verification complete ==========
