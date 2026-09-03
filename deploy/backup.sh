#!/usr/bin/env bash
# Backs up the JSON "database" and uploaded project images — this is the
# app's only persistent data, so back it up regularly (cron this daily).
# Usage: ./deploy/backup.sh [destination-dir]
set -euo pipefail

cd "$(dirname "$0")/.."

DEST="${1:-$HOME/craftmint-backups}"
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT="$DEST/craftmint-$STAMP.tar.gz"

mkdir -p "$DEST"
tar -czf "$OUT" lib/db public/uploads

echo "Backed up lib/db and public/uploads to $OUT"

# Keep the last 14 backups, delete older ones
ls -1t "$DEST"/craftmint-*.tar.gz | tail -n +15 | xargs -r rm --
