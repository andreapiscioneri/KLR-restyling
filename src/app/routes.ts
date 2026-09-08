import type { Page } from "./components/nav";

/**
 * Destinazioni della navigazione interna.
 *
 * Il tipo viveva in App.tsx, l'entry della vecchia single-page
 * application esportata da Figma: quel file è stato rimosso perché non
 * girava più (l'app usa il routing di Next), ma il tipo era importato da
 * quindici componenti ancora vivi, quindi ha un modulo proprio.
 */
export type Route =
  | { page: Page }
  | { page: "brand-detail"; id: string }
  | { page: "study-detail"; id: string }
  | { page: "team-detail"; id: string }
  | { page: "blog-detail"; slug: string };
