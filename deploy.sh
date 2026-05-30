#!/usr/bin/env bash
set -euo pipefail

# deploy.sh - build frontend, copy to backend/dist, restart pm2 app
# Usage: ./deploy.sh

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "Project root: $ROOT_DIR"

echo "Installing dependencies..."
npm --prefix "$ROOT_DIR/frontend" ci
npm --prefix "$ROOT_DIR/backend" ci || true

echo "Building frontend and copying assets to backend/dist..."
npm --prefix "$ROOT_DIR" run build

if command -v pm2 >/dev/null 2>&1; then
  echo "Restarting pm2 process 'tubfit' (or starting it)..."
  pm2 restart tubfit || pm2 start "$ROOT_DIR/backend/server.js" --name tubfit
  echo "(pm2 logs follow)"
  pm2 logs tubfit --lines 100
else
  echo "pm2 not found. Start the backend manually:" 
  echo "  cd $ROOT_DIR/backend && npm install && node server.js &"
fi

echo "Deploy complete."
