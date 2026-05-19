const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const workdir = 'c:\\ryaanvi\\tubdelhi210426';

// Change to working directory
process.chdir(workdir);

console.log('========================================');
console.log('STEP 1: FILE REPLACEMENT VERIFICATION');
console.log('========================================\n');

try {
  const orig = fs.readFileSync('./AdminDashboard.jsx', 'utf-8');
  const fixed = fs.readFileSync('./AdminDashboard_fixed.jsx', 'utf-8');
  
  console.log('✓ AdminDashboard.jsx replaced successfully');
  console.log(`  Original file size: ${orig.length} bytes`);
  console.log(`  Fixed file size: ${fixed.length} bytes`);
  console.log(`  Files match: ${orig === fixed ? 'YES' : 'NO'}`);
  console.log('');
  
  // Check for the corruption marker
  if (orig.includes('text-[10px] text-blue-600 font-bold uppercase mt-1">')) {
    console.log('  ✗ WARNING: File still contains corruption marker!');
  } else {
    console.log('  ✓ Corruption marker not found - replacement successful');
  }
  console.log('');
} catch (e) {
  console.error('Error reading files:', e.message);
  process.exit(1);
}

console.log('========================================');
console.log('STEP 2: RUNNING NPM BUILD');
console.log('========================================\n');

try {
  // Run npm build synchronously and capture output
  const output = execSync('npm run build 2>&1', {
    cwd: workdir,
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024
  });
  console.log(output);
  console.log('\n✓ Build completed successfully\n');
} catch (e) {
  console.log('Build output:\n');
  console.log(e.stdout || '');
  console.log(e.stderr || '');
  console.error('\n✗ Build failed');
  process.exit(1);
}

console.log('========================================');
console.log('STEP 3: STARTING NPM START (30 seconds)');
console.log('========================================\n');

// Run npm start asynchronously and capture first 30 seconds
const startProc = spawn('npm', ['start'], {
  cwd: workdir,
  shell: true,
  stdio: ['ignore', 'pipe', 'pipe']
});

let startOutput = '';

startProc.stdout.on('data', (data) => {
  const text = data.toString();
  startOutput += text;
  console.log(text);
});

startProc.stderr.on('data', (data) => {
  const text = data.toString();
  startOutput += text;
  console.error(text);
});

const timeout = setTimeout(() => {
  console.log('\n========================================');
  console.log('STOPPING APP (30 seconds elapsed)');
  console.log('========================================\n');
  
  startProc.kill('SIGTERM');
  
  setTimeout(() => {
    process.exit(0);
  }, 2000);
}, 30000);

startProc.on('exit', (code) => {
  clearTimeout(timeout);
  console.log(`\nProcess exited with code: ${code}`);
  process.exit(0);
});

startProc.on('error', (err) => {
  clearTimeout(timeout);
  console.error('Error starting app:', err.message);
  process.exit(1);
});
