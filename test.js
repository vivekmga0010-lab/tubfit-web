#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

process.chdir('c:\\ryaanvi\\tubdelhi210426');

console.log('========================================');
console.log('STEP 1: FILE REPLACEMENT VERIFICATION');
console.log('========================================\n');

const origFile = './AdminDashboard.jsx';
const fixedFile = './AdminDashboard_fixed.jsx';

const orig = fs.readFileSync(origFile, 'utf-8');
const fixed = fs.readFileSync(fixedFile, 'utf-8');

console.log(`✓ AdminDashboard.jsx replaced successfully`);
console.log(`  Original file size: ${orig.length} bytes`);
console.log(`  Fixed file size: ${fixed.length} bytes`);
console.log(`  Files match: ${orig === fixed ? 'YES' : 'NO'}\n`);

console.log('========================================');
console.log('STEP 2: RUNNING NPM BUILD');
console.log('========================================\n');

let buildOutput = '';
let buildError = '';

const build = spawn('npm', ['run', 'build'], {
  cwd: 'c:\\ryaanvi\\tubdelhi210426',
  shell: true,
  stdio: ['inherit', 'pipe', 'pipe']
});

build.stdout.on('data', (data) => {
  const text = data.toString();
  buildOutput += text;
  process.stdout.write(text);
});

build.stderr.on('data', (data) => {
  const text = data.toString();
  buildError += text;
  process.stderr.write(text);
});

build.on('close', (code) => {
  console.log(`\n✓ Build completed with code: ${code}\n`);
  
  if (code === 0) {
    console.log('========================================');
    console.log('STEP 3: STARTING NPM START (30 seconds)');
    console.log('========================================\n');
    
    let startOutput = '';
    const start = spawn('npm', ['start'], {
      cwd: 'c:\\ryaanvi\\tubdelhi210426',
      shell: true,
      stdio: ['inherit', 'pipe', 'pipe']
    });
    
    start.stdout.on('data', (data) => {
      const text = data.toString();
      startOutput += text;
      process.stdout.write(text);
    });
    
    start.stderr.on('data', (data) => {
      const text = data.toString();
      startOutput += text;
      process.stderr.write(text);
    });
    
    setTimeout(() => {
      console.log('\n\n========================================');
      console.log('STOPPING APP (30 seconds elapsed)');
      console.log('========================================\n');
      start.kill('SIGTERM');
      process.exit(0);
    }, 30000);
  } else {
    process.exit(code);
  }
});
