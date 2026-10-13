const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const backendDist = path.join(projectRoot, 'backend', 'dist');
const indexPath = path.join(backendDist, 'index.html');
const logPath = path.join(projectRoot, 'deploy-log.txt');

function appendLog(line) {
  const ts = new Date().toISOString();
  fs.appendFileSync(logPath, `[${ts}] ${line}\n`);
}

function run(cmd) {
  appendLog('> ' + cmd);
  try {
    const out = execSync(cmd, { cwd: projectRoot, stdio: ['ignore', 'pipe', 'pipe'] });
    const text = out.toString();
    appendLog(text.trim());
    process.stdout.write(text);
  } catch (err) {
    const stdout = err.stdout ? String(err.stdout) : '';
    const stderr = err.stderr ? String(err.stderr) : err.message;
    if (stdout) appendLog(stdout.trim());
    appendLog(stderr.trim());
    process.stderr.write(stderr + '\n');
    throw err;
  }
}

try {
  appendLog('=== prestart run ===');

  // Always rebuild the frontend so the live app does not serve stale menu data from an old dist bundle.
  appendLog('🔄 Rebuilding frontend assets...');
  run('npm --prefix frontend install');
  run('npm --prefix frontend run build');
  run('node scripts/build.js');
  appendLog('✓ Frontend build completed and copied to backend/dist');

  appendLog('=== prestart finished ===');
} catch (err) {
  appendLog('Prestart error: ' + (err && err.message ? err.message : String(err)));
  process.exit(1);
}

