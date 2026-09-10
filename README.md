# KLR Europe

Sito e CMS di KLR Europe. Next.js 14 (App Router), contenuti su SQLite,
media su filesystem, in esecuzione su un VPS dietro nginx.

Il progetto nasce da un export di Figma Make, ma l'applicazione che gira
oggi è il progetto Next in `app/`; i componenti di presentazione stanno
in `src/app/components/`.

## Come è fatto

| | |
|---|---|
| Framework | Next.js 14, App Router, TypeScript |
| Contenuti | SQLite (`better-sqlite3`) — testi, articoli, case study, utenti, log |
| Media | file su disco, fuori dal repository |
| Autenticazione | Auth.js (NextAuth v5), credenziali con PBKDF2 |
| Deploy | VPS Ubuntu, systemd + nginx |

I dati **non stanno nel repository**: vivono in un percorso indicato da
`DATABASE_PATH` e `MEDIA_DIR`. È deliberato — se stessero nell'albero del
codice, un deploy sovrascriverebbe quanto scritto dal CMS.

I file in `content/*.json` sono solo il **seed del primo avvio** di
un'installazione nuova. Non sono un backup e non riflettono la
produzione.

## Sviluppo locale

```bash
npm install
cp .env.example .env.local     # poi genera AUTH_SECRET
npm run dev
```

`AUTH_SECRET` si genera con `openssl rand -base64 32`. Senza, Auth.js
non parte.

Al primo avvio, se il database non esiste, viene creato e popolato dai
`content/*.json`. Per lavorare sui dati veri conviene invece portarsi
giù una copia dalla produzione:

```bash
scp -i ~/.ssh/klr_deploy ubuntu@<host>:/srv/klr/klr.db data/klr.db
```

Il database locale è una copia: modificarlo non tocca la produzione.

## Schema e migrazioni

Lo schema è in `db/schema.sql` e descrive sempre lo stato più recente:
un database creato da zero nasce aggiornato.

Per i database esistenti ci sono migrazioni incrementali in `lib/db.ts`,
applicate all'avvio e registrate in `schema_migrations`. Devono essere
idempotenti. Aggiungerne una significa aggiungere una voce all'array
`MIGRATIONS` e aggiornare `db/schema.sql`.

## Deploy

```bash
./scripts/deploy.sh
```

Carica il sorgente via rsync, fa un backup del database, installa le
dipendenze, compila e riavvia il servizio.

Il build gira **sul server**, non in locale: `better-sqlite3` e `sharp`
sono moduli nativi, e un bundle compilato su macOS non è eseguibile su
Linux.

Configurabile con `KLR_HOST` e `KLR_KEY`.

### Sul server

```
/var/www/klr/current/   codice, sostituito a ogni deploy
/srv/klr/klr.db         database
/srv/klr/media/         file caricati
/srv/klr/klr.env        variabili d'ambiente (systemd, permessi 640)
/srv/klr/backups/       backup giornaliero, 30 giorni di storico
```

Comandi utili: `sudo systemctl status klr`, `sudo journalctl -u klr -f`,
`sudo /usr/local/bin/klr-backup`.

## Variabili d'ambiente

Vedi `.env.example`. In produzione stanno in `/srv/klr/klr.env`.

⚠️ `AUTH_URL` va aggiornata quando si punta il dominio definitivo: dietro
reverse proxy, senza di essa Auth.js costruisce i redirect di login
sull'indirizzo interno.

## Script

| Comando | Cosa fa |
|---|---|
| `npm run db:import` | Costruisce il database da un export di contenuti |
| `node scripts/optimize-images.mjs` | Converte in WebP le immagini pesanti di `public/` (anteprima senza `--apply`) |
| `./scripts/deploy.sh` | Deploy completo |

Gli script `cms:backup`, `cms:list` e `cms:restore` risalgono a quando i
contenuti erano file JSON: oggi il backup che conta è quello del
database, fatto ogni notte sul server.

## URL storici

Il sito precedente era su WordPress e i suoi permalink sono stati
condivisi per anni. `legacy-redirects.mjs` e `next.config.mjs` mappano
142 vecchi indirizzi sulle destinazioni attuali, e
`app/wp-content/uploads/[...path]` risolve i vecchi URL delle immagini.

Il feed RSS è servito su `/feed` e `/blog/feed`, gli stessi percorsi di
WordPress, così le iscrizioni esistenti restano valide.
