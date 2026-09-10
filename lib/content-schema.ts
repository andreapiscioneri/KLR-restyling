import type { CustomBlock } from "@/src/app/components/inline-edit";

/**
 * Tipi dei contenuti gestiti dal CMS.
 *
 * Prima non esistevano: le forme venivano dedotte con
 * `typeof studies[number]` dagli array scritti a mano in
 * src/app/data.ts. Quegli array erano fermi a 6 case study su 26 e 7
 * articoli su 31, quindi il tipo descriveva un sottoinsieme dei dati
 * reali — e teneva in vita centinaia di righe di dati morti solo per
 * poterli dedurre.
 *
 * Le definizioni qui sotto sono ricavate dal contenuto effettivo del
 * database (26 case study, 31 articoli, 13 brand), non a intuito.
 */

/** Un campo può mancare del tutto: il mapper in lib/storage.ts omette le
 *  colonne NULL invece di restituirle come chiavi con valore nullo. */
export type ContentStatus = "published" | "draft" | "deleted";

// ── Case study ────────────────────────────────────────────────

/** Cifra in evidenza: `k` è il numero, `v` l'unità ("12" / "Weeks"). */
export type ResultStat = { k: string; v: string };

export type RewardGroup = {
  title: string;
  subtitle: string;
  items: string[];
};

export type GalleryGroup = {
  id: string;
  title: string;
  images: string[];
  /** Se true la galleria è mostrata in evidenza. */
  feature?: boolean;
};

export type StudyDetails = {
  /** URL della pagina originale su WordPress, conservato dalla migrazione. */
  sourceUrl?: string;
  campaignTitle?: string;
  challenge?: string;
  rewardGroups?: RewardGroup[];
  activations?: string[];
  mechanics?: string[];
  gallery?: string[];
  social?: string[];
  videos?: string[];
  videoCaptions?: string[];
  videoPositions?: string[];
  galleryGroups?: GalleryGroup[];
  collectionImage?: string;
  /** "custom" usa `blocks`; in assenza si applica il layout predefinito. */
  layoutMode?: "default" | "custom";
  blocks?: CustomBlock[];
  /** Sovrascrive i titoli di sezione, per chiave (es. "rewards_title"). */
  headings?: Record<string, string>;
  /** Ordine delle sezioni scelto dal redattore. */
  sectionOrder?: string[];
};

export type Study = {
  id: string;
  /** "grocery" | "petrol" nei dati attuali, ma non vincolato: il CMS è libero. */
  cat: string;
  client: string;
  title: string;
  location: string;
  year: string;
  img: string;
  summary: string;
  results: ResultStat[];
  /** Nome del brand, non un id: l'associazione avviene per nome. */
  brand: string;
  details: StudyDetails;
  publicPreview: boolean;
  cornerstone: boolean;
  status?: string;
};

// ── Articoli ──────────────────────────────────────────────────

export type Post = {
  /** Numerico: sono gli id ereditati da WordPress. */
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  img: string;
  link: string;
  category: string;
  contentHtml: string;
  publicPreview: boolean;
  cornerstone: boolean;
  authorName: string;
  authorAvatar: string;
  status?: string;
};

// ── Brand, persone, posizioni aperte ──────────────────────────

export type Brand = {
  id: string;
  name: string;
  tag?: string;
  img?: string;
  logo?: string;
  since?: string;
  campaigns?: string;
  countries?: string;
  desc?: string;
};

export type Leader = {
  id: string;
  name: string;
  role: string;
  img: string;
  bio: string;
  quote: string;
  linkedin?: string;
};

export type Position = {
  id: string;
  role: string;
  loc: string;
  description: string;
};
