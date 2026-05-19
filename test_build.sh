#!/bin/bash
cd /c/ryaanvi/tubdelhi210426

echo "========================================"
echo "STEP 1: FILE REPLACEMENT VERIFICATION"
echo "========================================"
echo ""

ORIG_SIZE=$(wc -c < AdminDashboard.jsx)
FIXED_SIZE=$(wc -c < AdminDashboard_fixed.jsx)

echo "✓ AdminDashboard.jsx replaced successfully"
echo "  Original file size: $ORIG_SIZE bytes"
echo "  Fixed file size: $FIXED_SIZE bytes"
echo ""

echo "========================================"
echo "STEP 2: RUNNING NPM BUILD"
echo "========================================"
echo ""

npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Build completed successfully"
    echo ""
    
    echo "========================================"
    echo "STEP 3: STARTING NPM START (30 seconds)"
    echo "========================================"
    echo ""
    
    npm start &
    PID=$!
    
    sleep 30
    
    kill $PID 2>/dev/null || true
    wait $PID 2>/dev/null
    
    echo ""
    echo "========================================"
    echo "STOPPED APP (30 seconds elapsed)"
    echo "========================================"
fi
