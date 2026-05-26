const { spawn } = require('child_process');

function spawnProcess(command, args, name) {
  const p = spawn(command, args, { stdio: 'inherit', shell: true });
  p.on('close', (code) => console.log(`${name} exited with code ${code}`));
  p.on('error', (err) => console.error(`${name} failed:`, err));
  return p;
}

console.log('Starting backend (server) on port 3000...');
const backend = spawnProcess('npm', ['run', 'server'], 'backend');

// Wait a moment for backend to boot before starting dev server
setTimeout(() => {
  console.log('Starting Vite dev server on port 5173...');
  const vite = spawnProcess('npm', ['run', 'dev'], 'vite');

  const shutdown = () => {
    console.log('Shutting down child processes...');
    backend.kill();
    vite.kill();
    process.exit();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}, 1000);
