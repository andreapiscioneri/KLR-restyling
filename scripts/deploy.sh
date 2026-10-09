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

echo "### verifica del casing della working tree"
# Su macOS il filesystem e' case-insensitive: un rename di sola maiuscola/
# minuscola viene registrato nell'indice di git ma la cartella su disco
# conserva il nome vecchio. rsync legge il disco, non git, e con --delete
# spedisce il nome vecchio al server, che invece e' case-sensitive.
#
# E' cosi' che i 24 loghi clienti della home sono spariti: git diceva
# public/loghi_home, il disco della macchina che ha deployato diceva
# ancora Loghi_home, e ogni /_next/image su quei file rispondeva 400.
#
# Qui si confronta l'elenco dei file tracciati da git con i nomi reali
# enumerati sul disco, e si interrompe prima di toccare il server.
git rev-parse --git-dir >/dev/null 2>&1 || {
  echo "  ERRORE: $PWD non e' una checkout git, impossibile verificare." >&2
  exit 1
}

casing_exp=$(mktemp) && casing_act=$(mktemp)
trap 'rm -f "$casing_exp" "$casing_act"' EXIT

git -c core.quotePath=false ls-files -z | tr '\0' '\n' | LC_ALL=C sort > "$casing_exp"
[ -s "$casing_exp" ] || {
  echo "  ERRORE: git ls-files non ha restituito nulla, verifica non attendibile." >&2
  exit 1
}

# find enumera le directory con readdir e restituisce i nomi reali. Un
# `ls percorso/indicato/da/git` non servirebbe: su un filesystem
# case-insensitive quel percorso si risolve lo stesso e il confronto si
# auto-conferma, che e' esattamente il caso che vogliamo intercettare.
find . \( -name node_modules -o -name .next -o -name .git \) -prune \
  -o -type f -print 2>/dev/null \
  | sed 's|^\./||' | LC_ALL=C sort -u > "$casing_act"

missing=$(LC_ALL=C comm -23 "$casing_exp" "$casing_act")

if [ -n "$missing" ]; then
  echo "  ERRORE: questi percorsi sono in git ma sul disco hanno un nome diverso" >&2
  echo "  (tipicamente maiuscole/minuscole) o non esistono:" >&2
  printf '%s\n' "$missing" | sed 's|^|    |' >&2
  echo >&2
  echo "  Deploy interrotto: con --delete il server perderebbe quei file." >&2
  echo "  Per un rename di sola maiuscola/minuscola serve il doppio passaggio:" >&2
  echo "    mv public/Nome public/nome-tmp && mv public/nome-tmp public/nome" >&2
  exit 1
fi
echo "  ok: nessuna divergenza tra git e disco"

echo "### rsync del sorgente verso $HOST"
# data/ e .env.local restano esclusi: i dati di produzione vivono in
# /srv/klr sul server e non vanno mai sovrascritti da una copia locale.
# I permessi vanno forzati a prescindere da quelli della copia locale:
# rsync -a propaga il mode del sorgente, e su una checkout con `chmod 700`
# questo lascia fuori nginx, che legge gli asset statici in .next/static
# direttamente da disco come www-data — il sito è andato giù così più
# volte.
#
# --chmod però non esiste nell'openrsync che macOS installa di serie, e
# lì il deploy si interrompe subito. Si usa quando c'è; in ogni caso
# klr-deploy li reimpone sul server, dove il comportamento è certo.
# Il rilevamento va fatto provando davvero: l'openrsync di macOS elenca
# --chmod nella riga d'uso ma poi la rifiuta.
CHMOD_OPT=()
if rsync -a --chmod=D755,F644 --dry-run /dev/null /dev/null >/dev/null 2>&1; then
  CHMOD_OPT=(--chmod=D755,F644)
else
  echo "  (rsync locale senza --chmod: ai permessi pensa il server)"
fi

rsync -az --delete \
  ${CHMOD_OPT[@]+"${CHMOD_OPT[@]}"} \
  --exclude node_modules --exclude .next --exclude data --exclude .git \
  --exclude .env.local --exclude tsconfig.tsbuildinfo --exclude '*.pdf' \
  -e "ssh ${SSH_OPTS[*]}" \
  ./ "$HOST:$REMOTE_DIR/"

echo "### build e riavvio sul server"
ssh "${SSH_OPTS[@]}" "$HOST" 'sudo -n /usr/local/bin/klr-deploy'
