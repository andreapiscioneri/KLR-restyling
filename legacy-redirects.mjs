/**
 * Redirect dagli URL del vecchio sito WordPress.
 *
 * I permalink di klr-europe.com sono stati condivisi su LinkedIn e sui
 * social per anni: senza queste corrispondenze quei link finirebbero su
 * un 404. Ricavate dalla sitemap del sito storico (142 URL) e associate
 * ai contenuti attuali del database.
 *
 * I case study erano già coperti da next.config.mjs; qui si aggiungono
 * articoli, categorie, tag e autori, che non lo erano.
 */

// Articoli: WordPress li serviva alla radice, ora stanno sotto /blog.\n// Lo slug e' rimasto identico in tutti e 31 i casi.
export const LEGACY_POST_REDIRECTS = {
  "/10-loyalty-insights-from-milano-home": "/blog/10-loyalty-insights-from-milano-home",
  "/10-years-of-evolution-how-klr-transformed-its-data-management-tools-to-scale-success": "/blog/10-years-of-evolution-how-klr-transformed-its-data-management-tools-to-scale-success",
  "/10-years-of-growth-a-journey-shaped-by-people": "/blog/10-years-of-growth-a-journey-shaped-by-people",
  "/10-years-of-klr-a-journey-full-of-people-emotions-and-growth": "/blog/10-years-of-klr-a-journey-full-of-people-emotions-and-growth",
  "/6-emerging-marketing-trends-in-2024-for-supermarkets": "/blog/6-emerging-marketing-trends-in-2024-for-supermarkets",
  "/6-years-of-marketing": "/blog/6-years-of-marketing",
  "/7-psychological-principles-behind-successful-loyalty-programs": "/blog/7-psychological-principles-behind-successful-loyalty-programs",
  "/8-monsters-that-haunt-loyalty-campaigns": "/blog/8-monsters-that-haunt-loyalty-campaigns",
  "/a-decade-with-klrgrowing-together": "/blog/a-decade-with-klrgrowing-together",
  "/b2b-marketing-in-2026-10-strategic-shifts-that-will-define-success": "/blog/b2b-marketing-in-2026-10-strategic-shifts-that-will-define-success",
  "/branding-from-within-culture-digital-trends-courage": "/blog/branding-from-within-culture-digital-trends-courage",
  "/driving-retail-growth-through-loyalty-in-latin-america": "/blog/driving-retail-growth-through-loyalty-in-latin-america",
  "/from-inspiration-to-action-creative-lessons-from-forward-festival-vienna-2025": "/blog/from-inspiration-to-action-creative-lessons-from-forward-festival-vienna-2025",
  "/from-the-first-steps-to-lasting-partnerships-how-klr-built-and-evolved-client-relationships": "/blog/from-the-first-steps-to-lasting-partnerships-how-klr-built-and-evolved-client-relationships",
  "/growing-together-our-2024-team-building-experience-in-franciacorta": "/blog/growing-together-our-2024-team-building-experience-in-franciacorta",
  "/how-to-create-a-winning-value-proposition-for-a-retail-loyalty-campaign": "/blog/how-to-create-a-winning-value-proposition-for-a-retail-loyalty-campaign",
  "/klr-10-anniversary-franciacorta-2025": "/blog/klr-10-anniversary-franciacorta-2025",
  "/klr-is-ready-to-move-beyond-europe": "/blog/klr-is-ready-to-move-beyond-europe",
  "/klr-wins-best-loyalty-campaign-award-at-lukoils-customer-smile-summit-2024": "/blog/klr-wins-best-loyalty-campaign-award-at-lukoils-customer-smile-summit-2024",
  "/licensing-expo-2025-takeaways-on-loyalty-marketing": "/blog/licensing-expo-2025-takeaways-on-loyalty-marketing",
  "/licensing-expo-2026-insights": "/blog/licensing-expo-2026-insights",
  "/mapping-the-customer-journey-for-supermarket-and-petrol-chains-key-touchpoints": "/blog/mapping-the-customer-journey-for-supermarket-and-petrol-chains-key-touchpoints",
  "/promotion-awards-2026-oracle-red-bull-racing-kaufland-bulgaria": "/blog/promotion-awards-2026-oracle-red-bull-racing-kaufland-bulgaria",
  "/strategic-loyalty-marketing-insights-from-loyalty-connect-global-2025-dubai": "/blog/strategic-loyalty-marketing-insights-from-loyalty-connect-global-2025-dubai",
  "/team-building-2026-playing-games-seriously": "/blog/team-building-2026-playing-games-seriously",
  "/the-evolving-role-of-a-coo": "/blog/the-evolving-role-of-a-coo",
  "/the-importance-of-brands-to-reward-customers-in-loyalty-marketing": "/blog/the-importance-of-brands-to-reward-customers-in-loyalty-marketing",
  "/the-importance-of-time-off-6-secrets-of-work-life-balance": "/blog/the-importance-of-time-off-6-secrets-of-work-life-balance",
  "/the-role-of-data-in-loyalty-programs": "/blog/the-role-of-data-in-loyalty-programs",
  "/the-value-of-learning-through-travel": "/blog/the-value-of-learning-through-travel",
  "/unlock-the-power-of-loyalty-for-your-brand": "/blog/unlock-the-power-of-loyalty-for-your-brand",
};

// Archivi per categoria: il nuovo blog filtra lato client, senza un\n// URL dedicato, quindi si punta all'elenco piu' vicino per argomento.
export const LEGACY_CATEGORY_REDIRECTS = {
  "/category/case-studies": "/work",
  "/category/klr-life": "/blog",
  "/category/leadershipculture": "/blog",
  "/category/loyalty-marketing-insights": "/blog",
  "/category/retail-business-trends": "/blog",
};

// Archivi per autore: dove la persona esiste ancora si va alla sua\n// scheda, altrimenti alla pagina del team.
export const LEGACY_AUTHOR_REDIRECTS = {
  "/author/albertomontero": "/team",
  "/author/antonio-finazzi": "/team/antonio-finazzi",
  "/author/klr-europe": "/team",
  "/author/laurabarcellandi": "/team",
  "/author/marta-marga": "/team/marta-marga",
  "/author/natklr": "/team",
  "/author/ninabjelivuk": "/team/nina-bjelivuk",
  "/author/sebastjan-kocjancic": "/team/sebastjan-kocjancic",
  "/author/stefano-finazzi": "/team/stefano-finazzi",
};

// Archivi per tag: nel sito nuovo non esiste un equivalente. Si\n// reindirizza all'elenco degli articoli per non lasciare link morti;\n// se si preferisse la via piu' ortodossa per i motori di ricerca,\n// questi 61 URL andrebbero lasciati rispondere 404.
export const LEGACY_TAG_REDIRECTS = {
  "/tag/10-loyalty-marketing-key-insights-from-the-brand-power-conference-at-milano-home-2025": "/blog",
  "/tag/alfa-romeo": "/blog",
  "/tag/awards": "/blog",
  "/tag/bbq": "/blog",
  "/tag/billa": "/blog",
  "/tag/blaupunkt": "/blog",
  "/tag/brands": "/blog",
  "/tag/bugatti": "/blog",
  "/tag/bugatti-buono": "/blog",
  "/tag/bulgaria": "/blog",
  "/tag/carrefour": "/blog",
  "/tag/case-studies": "/blog",
  "/tag/circle-k": "/blog",
  "/tag/cookware": "/blog",
  "/tag/corporate-communication": "/blog",
  "/tag/czech-republic": "/blog",
  "/tag/estonia": "/blog",
  "/tag/eurosport": "/blog",
  "/tag/flosman": "/blog",
  "/tag/hruska": "/blog",
  "/tag/hungary": "/blog",
  "/tag/intermarche": "/blog",
  "/tag/kaufland": "/blog",
  "/tag/klr": "/blog",
  "/tag/klr-anniversary": "/blog",
  "/tag/klr-culture": "/blog",
  "/tag/klr-team": "/blog",
  "/tag/knives": "/blog",
  "/tag/latvia": "/blog",
  "/tag/licensing": "/blog",
  "/tag/lithuania": "/blog",
  "/tag/loyalty-connect-global": "/blog",
  "/tag/loyalty-marketing": "/blog",
  "/tag/lukoil": "/blog",
  "/tag/marketing": "/blog",
  "/tag/marketing-trends": "/blog",
  "/tag/maxima": "/blog",
  "/tag/mego": "/blog",
  "/tag/mol": "/blog",
  "/tag/multitools": "/blog",
  "/tag/nasa": "/blog",
  "/tag/omv": "/blog",
  "/tag/orlen": "/blog",
  "/tag/petrol": "/blog",
  "/tag/petrom": "/blog",
  "/tag/pintinox": "/blog",
  "/tag/poland": "/blog",
  "/tag/police": "/blog",
  "/tag/red-bull": "/blog",
  "/tag/retail": "/blog",
  "/tag/romania": "/blog",
  "/tag/rompetrol": "/blog",
  "/tag/slovakia": "/blog",
  "/tag/slovenia": "/blog",
  "/tag/slovnaft": "/blog",
  "/tag/spear-and-jackson": "/blog",
  "/tag/stardust": "/blog",
  "/tag/supermarket": "/blog",
  "/tag/trends": "/blog",
  "/tag/viada": "/blog",
  "/tag/zanussi": "/blog",
};


// WordPress serviva i feed RSS e la paginazione degli archivi: il sito
// nuovo non ha equivalenti, si porta chi arriva all'elenco articoli.
// Nota: chi era iscritto al feed smette comunque di ricevere aggiornamenti.
// Per non perderli servirebbe generare un vero feed, non un redirect.
export const LEGACY_FEED_REDIRECTS = {
  "/feed": "/blog",
  "/blog/feed": "/blog",
  "/comments/feed": "/blog",
};

export const ALL_LEGACY_REDIRECTS = {
  ...LEGACY_POST_REDIRECTS,
  ...LEGACY_CATEGORY_REDIRECTS,
  ...LEGACY_AUTHOR_REDIRECTS,
  ...LEGACY_TAG_REDIRECTS,
  ...LEGACY_FEED_REDIRECTS,
};
