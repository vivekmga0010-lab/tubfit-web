#!/usr/bin/env node
/**
 * build.js - Cross-platform build script to copy frontend/dist to backend/dist
 * Runs after vite build and ensures all frontend assets are available to the backend server
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.dirname(path.dirname(__filename));
const frontendDist = path.join(projectRoot, 'frontend', 'dist');
const backendDist = path.join(projectRoot, 'backend', 'dist');

function copyDir(src, dest) {
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.cpSync(src, dest, { recursive: true });
}

function main() {
  try {
    if (!fs.existsSync(frontendDist)) {
      console.error(`Error: frontend/dist not found at ${frontendDist}`);
      process.exit(1);
    }

    console.log(`Copying ${frontendDist} to ${backendDist}`);
    copyDir(frontendDist, backendDist);
    console.log('✓ Frontend assets copied to backend/dist');
  } catch (err) {
    console.error('Build error:', err.message);
    process.exit(1);
  }
}

main();
