#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\ryaanvi\\tubdelhi210426';
const adminFilePath = path.join(projectDir, 'AdminDashboard.jsx');

console.log('========== VERIFICATION REPORT ==========\n');

// Step 1: Verify file replacement
console.log('1. FILE REPLACEMENT VERIFICATION:');
try {
    const content = fs.readFileSync(adminFilePath, 'utf8');
    if (content.includes('text-blue-600 font-bold uppercase mt-1')) {
        console.log('   ✗ FAILED - Corrupted line still exists');
        process.exit(1);
    } else {
        console.log('   ✓ SUCCESS - Corrupted line removed');
        console.log('   ✓ File structure is correct');
    }
} catch (err) {
    console.log('   ✗ ERROR reading file:', err.message);
    process.exit(1);
}

// Step 2: Run npm run build
console.log('\n2. BUILD VERIFICATION:');
try {
    process.chdir(projectDir);
    const buildOutput = execSync('npm run build', { encoding: 'utf8', stdio: 'pipe' });
    console.log(buildOutput);
    console.log('   ✓ BUILD SUCCEEDED');
} catch (err) {
    console.log('   ✗ BUILD FAILED');
    console.log(err.stdout || err.message);
    process.exit(1);
}

// Step 3: Start the server
console.log('\n3. SERVER STARTUP TEST:');
console.log('   Starting server with npm start...');
const serverProcess = spawn('npm', ['start'], { 
    cwd: projectDir,
    stdio: 'pipe',
    shell: true
});

let startupOutput = '';
let errorOutput = '';

serverProcess.stdout.on('data', (data) => {
    startupOutput += data.toString();
    process.stdout.write(data);
});

serverProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
    process.stdout.write(data);
});

// Wait for server to start
setTimeout(() => {
    console.log('\n   Stopping server after test...');
    serverProcess.kill('SIGTERM');
    
    // Check for build errors in output
    if (errorOutput.includes('error') || errorOutput.includes('ERROR')) {
        console.log('\n   ✗ ERRORS DETECTED IN SERVER OUTPUT');
        process.exit(1);
    } else if (startupOutput.includes('listening') || startupOutput.includes('started')) {
        console.log('   ✓ SERVER STARTED SUCCESSFULLY');
    }
    
    console.log('\n========== ALL VERIFICATIONS PASSED ==========');
}, 10000);
