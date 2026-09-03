#!/usr/bin/env bash
# Redeploy script — run this ON THE VPS from the project root after `git pull`
# to ship a new version without touching lib/db/*.json or public/uploads/.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Installing dependencies..."
npm ci

echo "Building..."
npm run build

echo "Reloading craftmint via PM2 (zero-downtime)..."
pm2 reload craftmint

echo "Done. Tail logs with: pm2 logs craftmint"
