export type ContentCheck = {
  label: string;
  passed: boolean;
  message: string;
  group: "seo" | "sem" | "geo" | "aio";
};

export type ContentAnalysis = {
  seoScore: number;
  semScore: number;
  geoScore: number;
  aioScore: number;
  overallScore: number;
  checks: ContentCheck[];
};

export type AnalyzeInput = {
  title: string;
  description: string;
  contentHtml: string;
  slug: string;
  hasImage: boolean;
  focusKeyword?: string;
};

export type TrafficLight = "red" | "orange" | "green";

export function trafficLight(score: number): TrafficLight {
  if (score >= 80) return "green";
  if (score >= 50) return "orange";
  return "red";
}

export const TRAFFIC_LIGHT_COLOR: Record<TrafficLight, string> = {
  green: "#16a34a",
  orange: "#F8AE01",
  red: "#dc2626",
};

export const TRAFFIC_LIGHT_LABEL: Record<TrafficLight, string> = {
  green: "Buono",
  orange: "Sufficiente",
  red: "Da migliorare",
};

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text: string): number {
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

function groupScore(checks: ContentCheck[], group: ContentCheck["group"]): number {
  const inGroup = checks.filter(c => c.group === group);
  if (inGroup.length === 0) return 0;
  return Math.round((inGroup.filter(c => c.passed).length / inGroup.length) * 100);
}

export type AccessibilityCheck = { label: string; passed: boolean; message: string };
export type AccessibilityAnalysis = { score: number; checks: AccessibilityCheck[] };

// Kept fully separate from SEO/SEM/GEO/AIO: accessibility is about people using
// screen readers or assistive tech, not search/AI ranking — never mix it into those 4.
export function analyzeAccessibility(input: AnalyzeInput): AccessibilityAnalysis {
  const html = input.contentHtml || "";
  const bodyText = stripHtml(html);
  const words = wordCount(bodyText);
  const sentences = bodyText.split(/(?<=[.!?])\s+/).filter(s => wordCount(s) > 0);
  const avgSentenceLen = sentences.length ? words / sentences.length : 0;
  const headingMatches = html.match(/<h[23][^>]*>/gi) || [];
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  const imgsWithoutAlt = imgTags.filter(tag => !/alt\s*=\s*["'][^"']+["']/i.test(tag));
  const linkTags = html.match(/<a[^>]*>(.*?)<\/a>/gi) || [];
  const vagueLinks = linkTags.filter(tag => /clicca qui|leggi tutto|read more|click here/i.test(stripHtml(tag)));

  const checks: AccessibilityCheck[] = [
    {
      label: "Testo alternativo immagini",
      passed: imgTags.length === 0 || imgsWithoutAlt.length === 0,
      message: imgTags.length === 0 ? "Nessuna immagine nel testo." : imgsWithoutAlt.length === 0 ? "Tutte le immagini nel testo hanno un testo alternativo (alt)." : `${imgsWithoutAlt.length} immagine/i nel contenuto senza testo alternativo: aggiungilo per chi usa uno screen reader.`,
    },
    {
      label: "Immagine in evidenza descrittiva",
      passed: input.hasImage,
      message: input.hasImage ? "Immagine in evidenza presente." : "Manca l'immagine in evidenza: aggiungine una con un nome file descrittivo.",
    },
    {
      label: "Struttura con sottotitoli",
      passed: headingMatches.length >= 2,
      message: headingMatches.length >= 2 ? "La struttura con sottotitoli aiuta la navigazione da tastiera e screen reader." : "Aggiungi sottotitoli H2/H3: chi naviga con tastiera o screen reader li usa per saltare tra le sezioni.",
    },
    {
      label: "Leggibilità (lunghezza delle frasi)",
      passed: avgSentenceLen > 0 && avgSentenceLen <= 20,
      message: avgSentenceLen === 0 ? "Nessun testo da analizzare." : avgSentenceLen <= 20 ? `Frasi brevi e chiare (${avgSentenceLen.toFixed(1)} parole in media): più facili da leggere per chi ha difficoltà cognitive o dislessia.` : `Frasi lunghe (${avgSentenceLen.toFixed(1)} parole in media): accorciale per essere accessibile anche a chi ha difficoltà di lettura.`,
    },
    {
      label: "Testo dei link descrittivo",
      passed: vagueLinks.length === 0,
      message: vagueLinks.length === 0 ? "I link nel testo hanno un'etichetta descrittiva." : `${vagueLinks.length} link generici (es. "clicca qui"): usa un testo che descriva la destinazione, utile per chi naviga a link con uno screen reader.`,
    },
  ];

  const score = Math.round((checks.filter(c => c.passed).length / checks.length) * 100);
  return { score, checks };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  const re = new RegExp(escapeRegExp(needle), "gi");
  return (haystack.match(re) || []).length;
}

export function analyzeContent(input: AnalyzeInput): ContentAnalysis {
  const title = (input.title || "").trim();
  const description = (input.description || "").trim();
  const bodyText = stripHtml(input.contentHtml || "");
  const words = wordCount(bodyText);
  const html = input.contentHtml || "";
  const headingMatches = html.match(/<h[23][^>]*>/gi) || [];
  const listMatches = html.match(/<(ul|ol)[^>]*>/gi) || [];
  const hasQuestionHeading = /<h[23][^>]*>[^<]*\?/i.test(html);
  const hasNumbers = /\b\d+([.,]\d+)?\s?(%|percent|anni|years|clienti|campagne|paesi|countries)\b/i.test(bodyText) || /\b\d+%/.test(bodyText);
  const firstParagraphMatch = html.match(/<p[^>]*>(.*?)<\/p>/i);
  const firstParagraph = firstParagraphMatch ? stripHtml(firstParagraphMatch[1]) : bodyText.slice(0, 200);
  const answersEarly = wordCount(firstParagraph) >= 15 && wordCount(firstParagraph) <= 60;
  const slug = (input.slug || "").trim();
  const keyword = (input.focusKeyword || "").trim();

  const sentences = bodyText.split(/(?<=[.!?])\s+/).filter(s => wordCount(s) > 0);
  const avgSentenceLen = sentences.length ? words / sentences.length : 0;

  const checks: ContentCheck[] = [
    {
      group: "seo",
      label: "Lunghezza titolo",
      passed: title.length >= 30 && title.length <= 65,
      message: title.length === 0 ? "Il titolo è vuoto." : title.length < 30 ? `Titolo troppo corto (${title.length} caratteri, ideale 30-65).` : title.length > 65 ? `Titolo troppo lungo (${title.length} caratteri, verrà troncato nei risultati di ricerca).` : "Lunghezza titolo ottimale.",
    },
    {
      group: "seo",
      label: "Meta descrizione",
      passed: description.length >= 70 && description.length <= 160,
      message: description.length === 0 ? "Manca l'estratto/descrizione." : description.length < 70 ? `Descrizione troppo corta (${description.length} caratteri, ideale 70-160).` : description.length > 160 ? `Descrizione troppo lunga (${description.length} caratteri, verrà troncata).` : "Lunghezza descrizione ottimale.",
    },
    {
      group: "seo",
      label: "Lunghezza contenuto",
      passed: words >= 300,
      message: words === 0 ? "Il contenuto è vuoto." : words < 300 ? `Contenuto breve (${words} parole, consigliate almeno 300 per un buon posizionamento).` : `Contenuto sostanzioso (${words} parole).`,
    },
    {
      group: "seo",
      label: "Slug URL",
      passed: /^[a-z0-9-]+$/.test(slug) && slug.length > 0 && slug.length <= 75,
      message: slug.length === 0 ? "Slug mancante." : !/^[a-z0-9-]+$/.test(slug) ? "Lo slug dovrebbe contenere solo lettere minuscole, numeri e trattini." : "Slug ben formato.",
    },
    {
      group: "seo",
      label: "Immagine in evidenza",
      passed: input.hasImage,
      message: input.hasImage ? "Immagine in evidenza presente." : "Manca l'immagine in evidenza (utile anche per social e AI crawler).",
    },
  ];

  // SEM: quanto il contenuto è pronto a fare da landing page per una parola chiave
  // target (organica o a pagamento) — utile anche per impostare campagne Google Ads.
  if (keyword) {
    const densityCount = countOccurrences(bodyText, keyword);
    const density = words > 0 ? (densityCount / words) * 100 : 0;
    checks.push(
      {
        group: "sem",
        label: "Parola chiave nel titolo",
        passed: title.toLowerCase().includes(keyword.toLowerCase()),
        message: title.toLowerCase().includes(keyword.toLowerCase()) ? `"${keyword}" trovata nel titolo.` : `Inserisci "${keyword}" nel titolo per rafforzare la rilevanza per la parola chiave target.`,
      },
      {
        group: "sem",
        label: "Parola chiave nello slug",
        passed: slug.toLowerCase().includes(keyword.toLowerCase().replace(/\s+/g, "-")),
        message: slug.toLowerCase().includes(keyword.toLowerCase().replace(/\s+/g, "-")) ? `"${keyword}" presente nello slug.` : `Includi "${keyword}" nello slug URL.`,
      },
      {
        group: "sem",
        label: "Parola chiave nella meta descrizione",
        passed: description.toLowerCase().includes(keyword.toLowerCase()),
        message: description.toLowerCase().includes(keyword.toLowerCase()) ? `"${keyword}" presente nella meta descrizione.` : `Aggiungi "${keyword}" nella meta descrizione: è l'annuncio che vedrà chi arriva da una ricerca o da un annuncio a pagamento.`,
      },
      {
        group: "sem",
        label: "Densità parola chiave",
        passed: density >= 0.5 && density <= 3,
        message: densityCount === 0 ? `"${keyword}" non compare nel testo.` : density < 0.5 ? `Densità troppo bassa (${density.toFixed(1)}%, ideale 0.5%-3%).` : density > 3 ? `Densità troppo alta (${density.toFixed(1)}%): rischio keyword stuffing.` : `Densità ottimale (${density.toFixed(1)}%).`,
      },
    );
  } else {
    checks.push({
      group: "sem",
      label: "Parola chiave principale",
      passed: false,
      message: "Imposta una parola chiave principale per valutare quanto la pagina è pronta per campagne SEM (Google Ads e ricerca a pagamento).",
    });
  }
  checks.push({
    group: "sem",
    label: "Leggibilità (frasi brevi)",
    passed: avgSentenceLen > 0 && avgSentenceLen <= 20,
    message: avgSentenceLen === 0 ? "Nessun testo da analizzare." : avgSentenceLen <= 20 ? `Frasi scorrevoli (${avgSentenceLen.toFixed(1)} parole in media): un buon landing page per campagne a pagamento.` : `Frasi troppo lunghe (${avgSentenceLen.toFixed(1)} parole in media): semplifica per aumentare il tasso di conversione.`,
  });

  checks.push(
    {
      group: "geo",
      label: "Sottotitoli strutturati (H2/H3)",
      passed: headingMatches.length >= 2,
      message: headingMatches.length >= 2 ? `${headingMatches.length} sottotitoli trovati: struttura chiara per i motori generativi.` : "Aggiungi almeno 2 sottotitoli H2/H3: aiutano i motori AI a estrarre le sezioni.",
    },
    {
      group: "geo",
      label: "Dati e numeri concreti",
      passed: hasNumbers,
      message: hasNumbers ? "Contiene statistiche/numeri citabili — ottimo per risposte AI." : "Aggiungi numeri o statistiche concrete: i motori generativi preferiscono citare fatti verificabili.",
    },
    {
      group: "geo",
      label: "Titoli in forma di domanda",
      passed: hasQuestionHeading,
      message: hasQuestionHeading ? "Presenti sottotitoli in forma di domanda, ideali per le AI Overview." : "Prova a formulare almeno un sottotitolo come domanda (es. \"Perché...?\"): aumenta la probabilità di comparire nelle risposte AI.",
    },
    {
      group: "aio",
      label: "Risposta diretta in apertura",
      passed: answersEarly,
      message: answersEarly ? "Il primo paragrafo risponde in modo diretto e sintetico: perfetto per gli AI Overview." : "Fai in modo che il primo paragrafo risponda subito alla domanda principale, in 15-60 parole.",
    },
    {
      group: "aio",
      label: "Elenchi puntati/numerati",
      passed: listMatches.length > 0,
      message: listMatches.length > 0 ? "Contenuto scansionabile grazie a elenchi puntati." : "Aggiungi un elenco puntato o numerato: rende il contenuto più facile da estrarre per le AI.",
    },
    {
      group: "aio",
      label: "Titolo chiaro e descrittivo",
      passed: title.split(" ").length >= 4,
      message: title.split(" ").length >= 4 ? "Titolo descrittivo, facile da interpretare per un assistente AI." : "Usa un titolo più descrittivo (almeno 4-5 parole) così un assistente AI capisce subito l'argomento.",
    },
  );

  const seoScore = groupScore(checks, "seo");
  const semScore = groupScore(checks, "sem");
  const geoScore = groupScore(checks, "geo");
  const aioScore = groupScore(checks, "aio");
  const overallScore = Math.round((seoScore + semScore + geoScore + aioScore) / 4);

  return { seoScore, semScore, geoScore, aioScore, overallScore, checks };
}
