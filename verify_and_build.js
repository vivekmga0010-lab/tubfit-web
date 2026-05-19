const { execSync } = require('child_process');
const path = require('path');

const workDir = 'c:\\ryaanvi\\tubdelhi210426';
process.chdir(workDir);

console.log('========================================');
console.log('FILE REPLACEMENT VERIFICATION');
console.log('========================================\n');

// Verify file replacement worked
const fs = require('fs');
const origContent = fs.readFileSync('./AdminDashboard.jsx', 'utf-8');
const fixedContent = fs.readFileSync('./AdminDashboard_fixed.jsx', 'utf-8');
const match = origContent === fixedContent;

console.log(`✓ File replacement: ${match ? 'SUCCESS' : 'FAILED'}`);
console.log(`  AdminDashboard.jsx size: ${origContent.length} bytes`);
console.log(`  AdminDashboard_fixed.jsx size: ${fixedContent.length} bytes`);
console.log(`  Files match: ${match}`);
console.log('\n');

console.log('========================================');
console.log('RUNNING NPM BUILD');
console.log('========================================\n');

try {
  const buildOutput = execSync('npm run build', {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe']
  });
  console.log(buildOutput);
  console.log('\n✓ BUILD SUCCESSFUL\n');
} catch (error) {
  console.log('ERROR OUTPUT:');
  console.log(error.stdout);
  console.log(error.stderr);
  console.error('\n✗ BUILD FAILED');
  process.exit(1);
}
