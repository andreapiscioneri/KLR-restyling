export const images = {
  hero: "/api/media/wp-1010",
  human: "/api/media/wp-991",
  teamwork: "/api/media/wp-909",
  family: "/api/media/wp-1760",
  family2: "/api/media/wp-1702",
  mask: "/api/media/wp-605",
  services: "/api/media/wp-934",
  servicesInfographic: "/api/media/wp-2663",
  tailorMade: "/api/media/wp-916",
  aboutTonda: "/api/media/wp-1732",
  wordsCloud: "/api/media/wp-433",
  career: "/api/media/wp-1064",
  recruiting: "/api/media/wp-1014",
  contacts: "/api/media/wp-1024",
  anniversario: "/api/media/wp-4231",
  teamPhoto: "/api/media/wp-4569",
  map: "/api/media/wp-3436",
  journey: "/api/media/wp-3983",
  petrolCouple: "/api/media/wp-3694",
  petrolProfile: "/api/media/wp-3703",
};

// KLR IN NUMBERS — from 2026 presentation
export const stats = {
  campaigns: "340+",
  retailers: "150+",
  countries: "20+",
  years: "10+",
  combinedExperience: "275",
  people: "43",
  nationalities: "11",
};

export const productCategories = [
  { title: "Kitchenware", desc: "Cookware, BBQ, knives, bakeware" },
  { title: "Outdoor", desc: "Garden tools, multi-tools, adventure gear" },
  { title: "Travel", desc: "Luggage, bags, travel accessories" },
  { title: "Lifestyle", desc: "Fashion accessories, watches, bags" },
  { title: "Family & Kids", desc: "Backpacks, educational, toys" },
  { title: "Sports", desc: "Athletic gear, sports accessories" },
];

export const legacyStudyIdMap: Record<string, string> = {
  "spar-redbull": "oracle-red-bull-racing-adrenaline-for-spar-slovenia",
  "mol-pintinox": "pintinox-bbq-for-mol-hungary",
  "kaufland-redbull": "oracle-red-bull-racing-adrenaline-kaufland-bulgaria",
  "petrol-slovenia-bugatti": "bugatti-primo-for-lukoil-bulgaria",
  "circle-k-nasa": "stardust-travel-for-omv-hungary",
  "rompetrol-pintinox": "pintinox-trust-forged-in-steel-for-petrom-romania",
};

export function resolveStudyId(id: string): string {
  return legacyStudyIdMap[id] || id;
}

export const retailerLogos = {
  grocery: [
    { name: "Coop", logo: "/loghi_home/coop.png" },
    { name: "Kaufland", logo: "/loghi_home/Kaufland.png" },
    { name: "Carrefour", logo: "/loghi_home/Carrefour.png" },
    { name: "Intermarché", logo: "/loghi_home/Intermarché.png" },
    { name: "Esselunga", logo: "/loghi_home/esselunga.png" },
    { name: "Maxima", logo: "/loghi_home/Maxima.png" },
    { name: "Conad", logo: "/loghi_home/Conad.png" },
    { name: "Fantastico", logo: "/loghi_home/Fantastico.png" },
    { name: "Plodine", logo: "/loghi_home/Plodine.png" },
    { name: "IKI", logo: "/loghi_home/iki.png" },
    { name: "Spar", logo: "/loghi_home/SPAR.png" },
    { name: "Mercator", logo: "/loghi_home/Mercator.png" },
    { name: "Billa", logo: "/loghi_home/BILLA.png" },
    { name: "Gadis", logo: "/loghi_home/Gadis.png" },
    { name: "Konzum", logo: "/loghi_home/Konzum.png" },
  ],
  petrol: [
    { name: "Viada", logo: "/loghi_home/Viada.png" },
    { name: "EKO", logo: "/loghi_home/EKO.png" },
    { name: "BP", logo: "/loghi_home/BP.png" },
    { name: "OMV", logo: "/loghi_home/OMV.png" },
    { name: "Petrol", logo: "/loghi_home/Petrol.png" },
    { name: "MOL", logo: "/loghi_home/MOL.png" },
    { name: "Circle K", logo: "/loghi_home/Circle K.png" },
    { name: "Petrom", logo: "/loghi_home/Petrom.png" },
    { name: "Slovnaft", logo: "/loghi_home/Slovnaft.png" },
    { name: "SOCAR", logo: "/loghi_home/socar.png" },
  ],
};

// Service pillars — 3 per spec
export const pillars = [
  { n: "01", title: "Loyalty Marketing Strategy", what: "We develop loyalty strategies rooted in behavioural insight and local market understanding, tailored to your goals, competitive landscape, and customers' real motivations.", how: "Market analysis, customer segmentation, campaign concept design, mechanics selection (collectibles, instant rewards, tiered programmes), reward strategy.", out: "A fully developed campaign concept with defined mechanics, reward selection, visual direction, and projected KPIs." },
  { n: "02", title: "Full Campaign Management", what: "End-to-end execution across multiple markets. Creative production, POSM, logistics, stock management, staff training, daily support.", how: "Our network across 10 European locations handles procurement, warehousing, distribution. Proprietary software with weekly performance monitoring.", out: "Stress-free rollout with dedicated project management, real-time reporting, single point of contact." },
  { n: "03", title: "Measurement & Analytics", what: "Data-driven campaign evaluation. Period sales uplift, ROI, brand equity, CRR, RPR, redemption patterns, basket size impact.", how: "Quantitative data + qualitative insights from discovery workshops and social media audits. Custom metrics.", out: "Actionable reports with optimisation recommendations. Compounding knowledge base." },
];

export const sectors = [
  { title: "Grocery Retail", desc: "Supermarkets are the ultimate loyalty battleground — high frequency, high competition. We design programs that shift shopping habits, deepen basket size, and turn weekly shoppers into genuine brand advocates." },
  { title: "Fuel Retail", desc: "When fuel is interchangeable, loyalty must be earned through experience. We design programs that give customers a compelling reason to choose — and keep choosing — the same pump." },
];

// What KLR delivers — About page
export const whatWeDeliver = [
  { title: "Excite & Engage", desc: "Customers of all targets — families, millennials, collectors, car enthusiasts. We design for real people." },
  { title: "Deliver Real Impact", desc: "Measurable KPIs: period sales uplift, ROI, brand equity. Not just participation, but commercial results." },
  { title: "Easy to Run", desc: "For retailers and their marketing teams. We handle the complexity so you focus on your business." },
];

export const aboutImpact = [
  { title: "Your Customers Will Shop One More Time.", desc: "Increased visit frequency through emotional engagement and collectible mechanics." },
  { title: "Your Turnover Will Be Higher. Like-4-Like.", desc: "Measurable commercial uplift that goes beyond the campaign period." },
  { title: "Your Banner Will Become a Love Brand.", desc: "Emotional connection that competitors can't replicate with price alone." },
];

// Why brands partner with KLR — Brands page
export const whyBrandsPartner = [
  { title: "Rapid Market Expansion", desc: "Access 20+ European markets through established retail partnerships. Enter new countries without the cost of direct distribution." },
  { title: "Massive Audience Reach", desc: "150+ retail chains, millions of consumers engaging weekly. Your products reach hands that might never encounter your brand through traditional channels." },
  { title: "Premium Brand Positioning", desc: "Your products become aspirational rewards — not impulse purchases. Customers earn them through loyalty, creating stronger emotional association." },
  { title: "High-Volume Exposure", desc: "340+ campaigns delivered. Each runs 8–16 weeks with in-store POSM, digital marketing, and omnichannel visibility across entire retail chains." },
  { title: "Turnkey Execution", desc: "We handle everything: product adaptation, packaging, logistics, marketing materials, in-store execution. Your brand gets exposure without operational burden." },
  { title: "Long-Lasting Consumer Impact", desc: "Loyalty rewards stay in homes for years. A pan, a backpack, a knife set — daily reminders of your brand, unlike digital ads that vanish in seconds." },
];

export const brandPartnershipProcess = [
  { n: "01", title: "Brand Strategy", desc: "We define which product lines best fit both the brand strategy and the loyalty campaign and manage the full process of product adaptation, partner alignment, and execution." },
  { n: "02", title: "Campaign POS Development", desc: "Our design team creates campaign-ready collections with premium packaging, photography, and video." },
  { n: "03", title: "Multi-Market Deployment", desc: "Through 150+ retail clients across 20+ countries, your collection reaches millions. We manage logistics and fulfilment." },
  { n: "04", title: "Campaign Integration", desc: "Your brand becomes the centrepiece: in-store displays, POSM, digital marketing, engagement mechanics." },
  { n: "05", title: "Performance Reporting", desc: "Full reports: redemption rates, engagement, geographic performance, media value analysis." },
];

// 10 European locations
export const locations = [
  { city: "Koper", country: "Slovenia" },
  { city: "Rovato", country: "Italy" },
  { city: "Milan", country: "Italy" },
  { city: "Lille", country: "France" },
  { city: "Budapest", country: "Hungary" },
  { city: "Lublin", country: "Poland" },
  { city: "Prague", country: "Czechia" },
  { city: "Belgrade", country: "Serbia" },
  { city: "Riga", country: "Latvia" },
  { city: "Madrid", country: "Spain" },
];

// Real offices — headquarters Koper, sales office Rovato
export const offices = [
  { city: "Headquarters", addr: "Ulica 15 Maja 19\nSI-6000 Koper/Capodistria, Slovenia", phone: "+386 5 902 87 58", email: "info@klr-europe.com", region: "European Sales Region" },
  { city: "Regional Sales Headquarter", addr: "Via XXV Aprile, 66\n25038 – Rovato(BS) – Italy", phone: "+39 030 5281427", email: "info@klr-europe.com", region: "Italy" },
];

// Journey milestones — About/KLR 10 page
export const journey = [
  { year: "2015", title: "First office, Koper" },
  { year: "2015", title: "First petrol campaign" },
  { year: "2016", title: "First supermarket campaign" },
  { year: "2017", title: "Rovato office opens · 10 countries" },
  { year: "2017", title: "First multi-country rollout" },
  { year: "2019", title: "First lottery campaign" },
  { year: "2021", title: "Proprietary campaign software" },
  { year: "2024", title: "Best Loyalty Campaign award" },
  { year: "2025", title: "10 years · 20 countries" },
];

// Career value blocks — kept for Team page "How we work"
export const careerValues = [
  { title: "Open-minded", desc: "Flexible, engaging professionals dedicated to innovative and impactful loyalty marketing." },
  { title: "Collaborative", desc: "We work collaboratively and openly communicate with one another." },
  { title: "Trust & Support", desc: "Fostering a culture of trust, respect, and support at every level." },
];

