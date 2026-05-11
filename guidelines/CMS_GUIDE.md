# CMS KLR - Pannello di Amministrazione

## Accesso
- **URL**: `/admin`
- **Email**: `andrea.piscioneri@denani.it`
- **Password**: `denani`

## Sezioni Gestibili

### 📋 Colori & Tema
Modifica i colori globali del sito:
- **Colore Primario**: #2E2784 (viola scuro)
- **Colore Accento**: #F8AE01 (giallo oro)
- **Logo URL**: Link all'immagine del logo
- **URL Sito**: Dominio principale
- **Email Principale**: Email di contatto predefinita

I cambiamenti ai colori si applicano istantaneamente in tutto il sito.

### ⚙️ Impostazioni Globali
Configura tutte le impostazioni del sito:
- **Informazioni Sito**: Nome, URL, descrizione, keywords SEO
- **Contatti**: Email principale, email support, telefono
- **Sede Principale**: Indirizzo, città, paese
- **Social Media**: Link a LinkedIn, Instagram, Twitter, Facebook
- **Avanzate**: Google Analytics ID, Custom CSS

### 📄 Pagine & Testi
Modifica il contenuto di tutte le pagine del sito. Ogni pagina è suddivisa in:
- **Globale**: Impostazioni globali del sito
- **Navbar**: Testo CTA della barra di navigazione
- **Home**: Sezioni della homepage (hero, stats, framework, etc.)
- **About**: Pagina About (hero, what we do, brand story, etc.)
- **Services**: Pagina Servizi
- **Contact**: Pagina Contatti
- **Team**: Pagina Team
- **Brands**: Pagina Brand Partners
- **Footer**: Sezione Footer

Ogni campo può contenere:
- **Testo semplice**: Per titoli, sottotitoli, CTA
- **Textarea**: Per contenuti lunghi
- **URL Immagini**: Link completi a immagini (https://...)
- **Colori**: Selettore di colori esadecimale

### 📊 Statistiche
Modifica i numeri KLR che appaiono nella homepage:
- Campagne
- Retailer / Catene
- Paesi
- Anni attività
- Anni Esperienza Combinata
- Persone nel Team
- Nazionalità

### 🏷️ Brand Partners
Gestisci tutti i brand partner:
- **ID Slug**: Identificatore unico (es: "coca-cola")
- **Nome**: Nome del brand
- **Categoria**: Tag/categoria
- **Immagine**: URL logo del brand
- **Anno inizio**: Quando la partnership è iniziata
- **N° Campagne**: Numero di campagne
- **N° Paesi**: Numero di paesi interessati
- **Descrizione**: Testo descrittivo

Azioni disponibili: Aggiungi (+), Modifica, Elimina

### 👥 Team
Gestisci i membri del team:
- **ID Slug**: Identificatore unico
- **Nome**: Nome completo
- **Ruolo**: Posizione/ruolo
- **Foto**: URL foto profilo
- **Bio**: Biografia professionale
- **Citazione**: Quote o frase rappresentativa

Azioni disponibili: Aggiungi (+), Modifica, Elimina

### 🎯 Case Studies
Gestisci le campagne / case studies:
- **ID Slug**: Identificatore unico
- **Titolo**: Nome della campagna
- **Cliente**: Nome del cliente
- **Brand**: Brand partner principale
- **Anno**: Anno della campagna
- **Paese**: Paese/location
- **Categoria**: retail o petrol
- **Immagine**: URL immagine principale
- **Sommario**: Descrizione breve della campagna

Azioni disponibili: Aggiungi (+), Modifica, Elimina

### 📝 Blog
Gestisci gli articoli del blog / Insights:
- **Slug**: Identificatore URL (es: "loyalty-trends-2025")
- **Titolo**: Titolo dell'articolo
- **Data**: Data di pubblicazione (formato: YYYY-MM-DD)
- **Categoria**: Categoria dell'articolo
- **Immagine**: URL immagine di copertina
- **Estratto**: Anteprima breve (summary)
- **Contenuto HTML**: Articolo completo in HTML

Azioni disponibili: Aggiungi (+), Modifica, Elimina

## Come Salvare i Cambiamenti

1. **Modifica i campi** che desideri
2. **Premi il pulsante "Salva"** in basso
3. **Guarda il badge di stato**:
   - 🟡 "Salvataggio..." = in corso
   - 🟢 "✓ Salvato" = completato

Il salvataggio è immediato. I dati vengono scritti nei file JSON in `/content/`.

## Struttura dei File

Tutti i contenuti sono salvati come JSON in `/content/`:

```
/content/
  ├── colors.json           # Colori globali
  ├── settings.json         # Impostazioni sito
  ├── stats.json            # Numeri KLR
  ├── brands.json           # Brand partners
  ├── leadership.json       # Team members
  ├── pages.json            # Contenuto pagine
  ├── studies.json          # Case studies
  ├── posts.json            # Blog articles
  └── users.json            # Credenziali admin
```

## Aggiungere Nuove Pagine

Per aggiungere una nuova pagina al CMS:

1. **Aggiungi la sezione in `pages.json`** con la struttura appropriata
2. **Aggiungi il tab in `PAGE_TABS`** nel file `client.tsx` (riga ~35)
3. **Il CMS automaticamente renderà i campi**

Esempio di struttura nuova pagina in `pages.json`:
```json
{
  "mia-nuova-pagina": {
    "hero": {
      "eyebrow": "Eyebrow text",
      "title": "Page title",
      "subtitle": "Page subtitle",
      "image": "https://example.com/image.jpg"
    },
    "section2": {
      "title": "Section title",
      "text": "Section content"
    }
  }
}
```

## Aggiungere Nuovi Campi in una Sezione

Se aggiungi campi nuovi a una sezione in `pages.json`, il CMS li renderizzerà automaticamente:

- **Campi in `COLOR_FIELDS`**: Saranno color picker
- **Campi in `IMAGE_FIELDS`**: Mostreranno anteprima immagine
- **Campi in `TEXTAREA_FIELDS`**: Saranno textarea multilinea
- **Tutti gli altri**: Input di testo standard

Modifica questi array nel file `client.tsx` per personalizzare il comportamento.

## Tips Utili

### ✅ Valide
- URL immagini complete: `https://example.com/image.jpg`
- Link interni con `/`: `/about`, `/services`, `/contact`
- Colori esadecimali: `#2E2784`, `#F8AE01`
- HTML nel content blog: `<p>Testo</p>`, `<strong>Bold</strong>`

### ❌ Non Valide
- URL immagini relative: `images/photo.jpg`
- Link senza schema: `example.com`
- Link internieri senza `/`: `about`, `services`

## Troubleshooting

**Il login non funziona?**
- Controlla email e password
- Assicurati di usare: `andrea.piscioneri@denani.it` / `denani`

**I cambiamenti non si salvano?**
- Controlla se il badge dice "✗ Errore salvataggio"
- Verifica che tutti i campi obbligatori siano compilati
- Ricarica la pagina e riprova

**Un'immagine non appare?**
- Controlla che l'URL sia corretto e completo
- Prova con un'immagine HTTP se la HTTPS non funziona

**Voglio aggiungere un nuovo tipo di contenuto?**
- Crea un nuovo file JSON in `/content/`
- Aggiungi la funzione getter in `/lib/content.ts`
- Aggiungi il tipo a `VALID_TYPES` in `/app/api/admin/content/route.ts`
- Crea il componente editor nel `client.tsx`
- Aggiungi il tab a `TOP_NAV`

## API Endpoints

Se hai bisogno di integrazioni:

```
GET  /api/admin/content?type={type}   # Legge il contenuto
PUT  /api/admin/content?type={type}   # Scrive il contenuto
POST /api/admin/auth                  # Login
DELETE /api/admin/auth                # Logout
GET  /api/admin/auth                  # Verifica autenticazione
```

## Sicurezza

- **Admin Panel è protetto**: Richiede login
- **Cookie httpOnly**: I dati di sessione sono sicuri
- **Validazione server-side**: Tutti i salvataggi sono validati
- **Token-based auth**: Sessione dura 7 giorni

Non condividere le credenziali di accesso!

---

**CMS Creato**: Maggio 2026
**Ultima modifica**: Maggio 2026
**Versione**: 1.0
