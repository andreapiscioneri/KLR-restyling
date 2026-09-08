// Old WordPress site served case studies as flat root-level permalinks
// (klr-europe.com/<slug>/). The new site serves them at /work/<id>, and in
// a few cases the id was renamed during migration, so the old slug no
// longer matches. These map every legacy case-study URL (e.g. ones already
// shared on LinkedIn) to its new location instead of 404ing.
const LEGACY_STUDY_SLUG_TO_ID = {
  "oracle-red-bull-racing-adrenaline-for-spar-slovenia": "oracle-red-bull-racing-adrenaline-for-spar-slovenia",
  "pintinox-bbq-for-mol-hungary": "pintinox-bbq-for-mol-hungary",
  "oracle-red-bull-racing-adrenaline-kaufland-bulgaria": "oracle-red-bull-racing-adrenaline-kaufland-bulgaria",
  "bugatti-primo-for-lukoil-bulgaria": "bugatti-primo-for-lukoil-bulgaria",
  "stardust-travel-for-omv-hungary": "stardust-travel-for-omv-hungary",
  "pintinox-trust-forged-in-steel-for-petrom-romania": "pintinox-trust-forged-in-steel-for-petrom-romania",
  "police-for-mol-hungary": "police-for-mol-hungary",
  "pintinox-for-viada-latvia": "pintinox-for-viada-latvia",
  "zanussi-zmart-move-for-carrefour-poland": "zanussi-zmart-move-for-carrefour-poland",
  "space-collection-for-petrol-slovenia-croatia-bosnia-herzegovina": "space-collection-for-petrol-slovenia-croatia-bosnia-herzegovina",
  "eurosport-champions-for-viada-latvia-lithuania": "eurosport-champions-for-viada-latvia-lithuania",
  "bugatti-spezia-for-maxima-latvia": "bugatti-spezia-for-maxima-latvia",
  "zanussi-supergrip-for-iki-latvia": "zanussi-supergrip-for-iki-latvia",
  "bugatti-buono-loyalty-campaign-for-billa-bulgaria": "bugatti-buono-loyalty-campaign-for-billa-bulgaria",
  "stardust-travel-slovnaft-slovakia": "stardust-travel-slovnaft-slovakia",
  "newme-food-for-longer-for-tropic-and-crvena-jabuka-bosnia-and-herzegovina": "newme-food-for-longer-for-tropic-and-crvena-jabuka-bosnia-and-herzegovina",
  "alfa-romeo-gran-turismo-for-rompetrol-romania": "alfa-romeo-gran-turismo-for-rompetrol-romania",
  "alfa-romeo-gran-turismo-for-omv-slovenia": "alfa-romeo-gran-turismo-for-omv-slovenia",
  "blaupunkt-hi-fidelity-mego-latvia": "blaupunkt-hi-fidelity-mego-latvia",
  "spearjackson-sense-of-adventure-for-maxima-estonia-2022": "spearjackson-sense-of-adventure-for-maxima-estonia-2022",
  "viada-latvia-bugatti-prestigio-2022": "viada-latvia-bugatti-prestigio-2022",
  "horizon-travel-circle-k-polska-poland": "horizon-travel-collection-for-circle-k-poland",
  "bugatti-buono-coop-morava-czech-republic": "bugatti-buono-cookware-for-coop-morava-czech-republic",
  "pintinox-for-orlen-slovakia": "pintinox-trust-forged-in-steel-for-orlen-slovakia",
  "oracle-red-bull-racing-adrenaline-for-intermarche-poland": "oracle-red-bull-racing-travel-like-a-champion-for-intermarche-poland",
  "pintinox-virtuoso-flosman-czech-republic": "pintinox-virtuoso-for-flop-hruska-czech-republic",
};

// Core WordPress pages whose slug changed (or which had no direct new-site
// equivalent) when migrating to the new site's route structure.
const LEGACY_PAGE_REDIRECTS = {
  "/workscasestudies": "/work",
  "/contacts": "/contact",
  "/klr-10-years": "/10-years",
  "/petrol": "/services",
};

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "klr-europe.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
    // better-sqlite3 è un modulo nativo: va lasciato fuori dal bundle
    // e richiesto a runtime, altrimenti il build fallisce.
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
  async redirects() {
    const studyRedirects = Object.entries(LEGACY_STUDY_SLUG_TO_ID).map(([slug, id]) => ({
      source: `/${slug}`,
      destination: `/work/${id}`,
      permanent: true,
    }));
    const pageRedirects = Object.entries(LEGACY_PAGE_REDIRECTS).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
    return [...studyRedirects, ...pageRedirects];
  },
};

export default nextConfig;
