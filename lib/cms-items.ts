/**
 * Unione degli override del CMS con un elenco definito nel codice.
 *
 * Alcune sezioni del sito (i pilastri del framework, i due settori, le
 * tappe del percorso) hanno un layout che presuppone un numero fisso di
 * elementi: tre colonne, due colonne, una timeline. Rendere modificabile
 * anche il *numero* di voci darebbe modo di rompere la pagina senza
 * accorgersene, quindi l'arietà resta quella del codice e il CMS può
 * cambiare solo i testi.
 *
 * Le voci si sovrascrivono per posizione, con chiavi item1, item2, … —
 * la stessa convenzione già usata da `about.vision` e dai pilastri di
 * `services`, ed è la forma che l'editor generico dell'admin sa rendere
 * automaticamente (oggetti annidati di un livello, gli array li salta).
 *
 * Un campo lasciato vuoto nel CMS non azzera il testo: torna al valore
 * del codice.
 */
export function mergeCmsItems<T extends Record<string, unknown>>(
  base: readonly T[],
  section: Record<string, unknown> | undefined | null,
): T[] {
  return base.map((item, index) => {
    const override = section?.[`item${index + 1}`];
    if (!override || typeof override !== "object" || Array.isArray(override)) return { ...item };

    const patch: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
      if (typeof value === "string" && value.trim()) patch[key] = value;
    }
    return { ...item, ...patch };
  });
}
