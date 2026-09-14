#!/bin/bash
# Deploy verso il VPS.
#
# Carica il sorgente via rsync e lancia il build sul server: better-sqlite3
# e sharp sono moduli nativi, quindi un bundle compilato in locale (macOS)
# non girerebbe sul server (Linux x86_64).
#
# Configurabile via variabili d'ambiente:
#   KLR_HOST  (default ubuntu@57.129.151.86)
#   KLR_KEY   (default ~/.ssh/klr_deploy)
set -euo pipefail

HOST="${KLR_HOST:-ubuntu@57.129.151.86}"
KEY="${KLR_KEY:-$HOME/.ssh/klr_deploy}"
REMOTE_DIR=/var/www/klr/current
SSH_OPTS=(-i "$KEY" -o BatchMode=yes)

cd "$(dirname "$0")/.."

echo "### rsync del sorgente verso $HOST"
# data/ e .env.local restano esclusi: i dati di produzione vivono in
# /srv/klr sul server e non vanno mai sovrascritti da una copia locale.
# --chmod forza i permessi a prescindere da quelli della copia locale:
# senza, rsync -a propaga il mode del sorgente (su una checkout con
# `chmod 700` in locale questo lascia fuori nginx, che legge gli asset
# statici in .next/static direttamente da disco come www-data — il
# sito è andato giù così tre volte in questa sessione).
rsync -az --delete \
  --chmod=D755,F644 \
  --exclude node_modules --exclude .next --exclude data --exclude .git \
  --exclude .env.local --exclude tsconfig.tsbuildinfo --exclude '*.pdf' \
  -e "ssh ${SSH_OPTS[*]}" \
  ./ "$HOST:$REMOTE_DIR/"

echo "### build e riavvio sul server"
ssh "${SSH_OPTS[@]}" "$HOST" 'sudo -n /usr/local/bin/klr-deploy'
