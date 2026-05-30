const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const backendDist = path.join(projectRoot, 'backend', 'dist');
const indexPath = path.join(backendDist, 'index.html');

function run(cmd) {
  console.log('> ' + cmd);
  execSync(cmd, { stdio: 'inherit', cwd: projectRoot });
}

try {
  if (!fs.existsSync(indexPath)) {
    console.log('⚠️ Frontend assets missing. Building frontend now...');
    // Make sure frontend deps are installed
    run('npm --prefix frontend install');
    // Build frontend
    run('npm --prefix frontend run build');
    // Copy built frontend into backend/dist
    run('node scripts/build.js');
    console.log('✓ Frontend build completed and copied to backend/dist');
  } else {
    console.log('✓ Frontend assets already present at backend/dist');
  }
} catch (err) {
  console.error('Prestart error:', err);
  process.exit(1);
}
