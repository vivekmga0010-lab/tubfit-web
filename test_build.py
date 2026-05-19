#!/usr/bin/env python3
import subprocess
import os
import time
import signal
import sys

os.chdir('c:\\ryaanvi\\tubdelhi210426')

print("=" * 50)
print("STEP 1: FILE REPLACEMENT VERIFICATION")
print("=" * 50)
print()

with open('AdminDashboard.jsx', 'r') as f:
    orig = f.read()

with open('AdminDashboard_fixed.jsx', 'r') as f:
    fixed = f.read()

print(f"✓ AdminDashboard.jsx replaced successfully")
print(f"  Original file size: {len(orig)} bytes")
print(f"  Fixed file size: {len(fixed)} bytes")
print(f"  Files match: {'YES' if orig == fixed else 'NO'}")
print()

print("=" * 50)
print("STEP 2: RUNNING NPM BUILD")
print("=" * 50)
print()

try:
    result = subprocess.run(['npm', 'run', 'build'], 
                          capture_output=False, 
                          text=True,
                          timeout=180)
    print()
    print("✓ Build completed successfully")
    print()
    
    if result.returncode == 0:
        print("=" * 50)
        print("STEP 3: STARTING NPM START (30 seconds)")
        print("=" * 50)
        print()
        
        proc = subprocess.Popen(['npm', 'start'], 
                               stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE,
                               text=True)
        
        try:
            time.sleep(30)
        except KeyboardInterrupt:
            pass
        finally:
            proc.terminate()
            try:
                proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                proc.kill()
        
        print()
        print("=" * 50)
        print("STOPPED APP (30 seconds elapsed)")
        print("=" * 50)
    
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
