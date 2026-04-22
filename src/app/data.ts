export const CDN = "https://klr-europe.com/wp-content/uploads";

export const images = {
  hero: `${CDN}/2022/12/KLR-HERO-HOME-scaled.jpg`,
  human: `${CDN}/2022/12/KLR-HUMAN-CENTERED-scaled-e1674495532538.jpg`,
  teamwork: `${CDN}/2022/12/KLR-TEAMWORK-scaled.jpg`,
  family: `${CDN}/2022/12/KLR-cheering-family-scaled.jpg`,
  family2: `${CDN}/2022/12/KLR-cheering-family2-scaled.jpg`,
  mask: `${CDN}/2022/12/KLR-Mask-group_hero.png`,
  services: `${CDN}/2022/12/KLR-SERVICES-scaled.jpg`,
  servicesInfographic: `${CDN}/2023/02/KLR-Infographic-Services_website_Tavola-disegno-1-scaled.jpg`,
  tailorMade: `${CDN}/2022/12/KLR_TailorMade-.png`,
  aboutTonda: `${CDN}/2022/12/KLR-About-Tonda.png`,
  wordsCloud: `${CDN}/2022/12/KLR_WordsCloud.png`,
  career: `${CDN}/2022/12/KLR-CAREER-SUPERHERO-1024x1024.jpg`,
  recruiting: `${CDN}/2022/12/KLR-RECRUITING-scaled.jpg`,
  contacts: `${CDN}/2022/12/KLR-CONTACTS-scaled.jpg`,
  anniversario: `${CDN}/2025/05/KLR-anniverarsio-10-anni-def.png`,
  teamPhoto: `${CDN}/2025/09/KLR10-14-e1758293512394.jpg`,
  map: `${CDN}/2025/02/1Mappa-KLR.png`,
  journey: `${CDN}/2025/04/KLR-discover-our-joruney.png`,
  petrolCouple: `${CDN}/2025/04/Petrol-couple2.jpg`,
  petrolProfile: `${CDN}/2025/04/KLR-Company-Profile-Petrol-2025.jpg`,
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

// Leadership — full management team (13 people)
export const leadership = [
  { id: "antonio-finazzi", name: "Antonio Finazzi", role: "CEO & Founder", img: `${CDN}/2025/04/KLR-Antonio-fondo-giallo.png`, bio: "Antonio founded KLR in 2015 with a vision to design emotional loyalty across Europe. Three decades of retail and petrol strategy built on relationships.", quote: "Loyalty is never transactional. It's human." },
  { id: "stefano-finazzi", name: "Stefano Finazzi", role: "CMO & Founder", img: `${CDN}/2025/04/KLR-STEFANO-PUNTI.png`, bio: "Stefano shapes the creative and marketing vision of KLR — from campaign concept through every retail touchpoint.", quote: "We deliver 6 million moments of joy a year — every single one matters." },
  { id: "sebastjan-kocjancic", name: "Sebastjan Kocjančič", role: "COO", img: `${CDN}/2025/04/KLR-SEBASTJAN-PUNTI.png`, bio: "Sebastjan runs operations across 10 European locations. Procurement, warehousing, distribution — the backbone behind every flawless rollout.", quote: "Every shopper deserves a reason to come back." },
  { id: "marcello-leonardi", name: "Marcello Leonardi", role: "Managing Director, New Markets", img: images.teamwork, bio: "Marcello leads KLR's expansion into new markets across Western and Central Europe.", quote: "New markets need new stories — built on old-school trust." },
  { id: "olga-wojcik", name: "Olga Wojcik", role: "Head of Corporate Sales", img: images.human, bio: "Olga drives corporate sales across the KLR client portfolio, turning ambitious briefs into long-term partnerships.", quote: "Sales is listening before selling." },
  { id: "marta-marga", name: "Marta Marga", role: "Head of Marketing", img: images.family, bio: "Marta leads marketing, content and communications — the voice of KLR across every channel.", quote: "Good marketing feels like good storytelling." },
  { id: "jan-sahbaz-pergar", name: "Jan Šahbaz Pergar", role: "Head of Development", img: images.teamwork, bio: "Jan leads product and technology development, including KLR's proprietary campaign management software.", quote: "Great software makes complex things feel simple." },
  { id: "riccardo-fogazzi", name: "Riccardo Fogazzi", role: "Head of Campaigns & Stock Management", img: images.services, bio: "Riccardo oversees campaign execution and stock management across 20+ markets.", quote: "Plan for the edge cases — delight lives in the details." },
  { id: "nina-bjelivuk", name: "Nina Bjelivuk", role: "Head of Logistics", img: images.family2, bio: "Nina orchestrates logistics across Europe — from port to pallet to final store.", quote: "Loyalty only works when the reward arrives on time." },
  { id: "natalia-molchanova", name: "Natalia Molchanova", role: "Head of Corporate Communication", img: images.human, bio: "Natalia shapes KLR's corporate voice, partnerships and external communications.", quote: "Clear words build loyal relationships." },
  { id: "team-design", name: "Design Studio", role: "Creative & Product Design", img: images.tailorMade, bio: "Our in-house design studio develops packaging, POSM and campaign identities tailored to every retailer and brand.", quote: "Design is how people fall in love with a campaign." },
  { id: "team-analytics", name: "Analytics Team", role: "Measurement & Insight", img: images.servicesInfographic, bio: "KLR's analytics team delivers custom metrics, KPI dashboards and post-campaign insights.", quote: "Numbers tell us what worked — and what to try next." },
  { id: "team-account", name: "Account Management", role: "Client Partnership", img: images.teamwork, bio: "Dedicated account managers serve as the single point of contact for every KLR retail and petrol client.", quote: "We answer the phone — always." },
];

// Expose legacy alias
export const founders = leadership.slice(0, 3);

// Brand partners with per-brand stats from spec
export const brands = [
  { id: "bugatti", name: "Bugatti", tag: "Kitchenware", img: `${CDN}/2023/01/Bugatti-Prestigio-KLR-Europe.jpg`, since: "2020", campaigns: "32", countries: "17", desc: "Iconic Italian design for the modern kitchen — a collection synonymous with craftsmanship and style." },
  { id: "pintinox", name: "Pintinox", tag: "Cookware & BBQ", img: `${CDN}/2024/01/Pintinox-Trust-Forged-In-Steel.jpg`, since: "2024", campaigns: "25", countries: "15", desc: "Since 1919, Pintinox has defined the art of Italian stainless steel — cutlery, tabletop and cookware." },
  { id: "nasa", name: "NASA Stardust", tag: "Family & Kids", img: `${CDN}/2024/04/NASA-STARDUST-black-KLR-Europe.jpg`, since: "2023", campaigns: "15", countries: "14", desc: "Exclusive NASA-licensed collectibles — a cosmic collection engineered for ambitious loyalty programs." },
  { id: "red-bull", name: "Oracle Red Bull Racing", tag: "Lifestyle", img: `${CDN}/2025/08/Spar-TZ_RedBull-cover-circle.jpg`, since: "2025", campaigns: "5", countries: "5", desc: "Exclusive F1 merchandise — speed, precision and adrenaline for loyal shoppers." },
  { id: "eurosport", name: "Eurosport", tag: "Sports", img: images.teamwork, since: "2022", campaigns: "12", countries: "8", desc: "Multi-market sports campaigns across the Baltics & CEE — the Eurosport brand meets loyalty." },
  { id: "spear-jackson", name: "Spear & Jackson", tag: "Outdoor", img: `${CDN}/2023/04/Spear-and-Jackson-The-Best-Sellers-KLR-Europe.jpg`, since: "2021", campaigns: "18", countries: "11", desc: "British garden heritage since 1760 — tools that bring shoppers closer to the outdoors." },
  { id: "zanussi", name: "Zanussi", tag: "Kitchenware", img: `${CDN}/2023/04/ZAnussi-Cooking-Easy-KLR-Europe-1.jpg`, since: "2019", campaigns: "22", countries: "12", desc: "A European household name reimagined for loyalty — kitchen tools that simplify everyday life." },
  { id: "guzzini", name: "Guzzini Chefline", tag: "Kitchenware", img: `${CDN}/2025/02/Guzzini-Chefline.jpg`, since: "2023", campaigns: "9", countries: "6", desc: "Colorful, contemporary Italian design for the table and kitchen." },
  { id: "police", name: "Police", tag: "Lifestyle", img: `${CDN}/2025/02/police.jpg`, since: "2022", campaigns: "7", countries: "5", desc: "Attitude, design and heritage. The Police lifestyle brand brings identity to retail and petrol loyalty." },
];

// Brand partner logos grid
export const brandPartners: { name: string; logo: string | null }[] = [
  { name: "Oracle Red Bull Racing", logo: `${CDN}/2025/08/Spar-TZ_RedBull-cover-circle.jpg` },
  { name: "NASA", logo: `${CDN}/2025/02/pngkey.com-nasa-logo-png-274741.png` },
  { name: "Bugatti", logo: `${CDN}/2022/12/casa-bugatti-logo-vector-1.svg` },
  { name: "Pintinox", logo: `${CDN}/2024/01/Logo-Pintinox.png` },
  { name: "Eurosport", logo: `${CDN}/2022/12/Eurosport-1.svg` },
  { name: "Guzzini Chefline", logo: `${CDN}/2025/02/LOGO_CHEFLINE.png` },
  { name: "Zanussi", logo: `${CDN}/2022/12/zanussi-01.svg` },
  { name: "Spear & Jackson", logo: `${CDN}/2022/12/SpearJackson-1.svg` },
  { name: "Police", logo: `${CDN}/2024/01/Police-logo.png` },
  { name: "O bag", logo: null },
  { name: "Mustang", logo: null },
  { name: "Carl Schmidt Sohn", logo: null },
  { name: "Luminarc", logo: `${CDN}/2022/12/Luminarc_2.svg` },
  { name: "Goodyear", logo: `${CDN}/2022/12/goodyear-1.svg` },
  { name: "Blaupunkt", logo: `${CDN}/2022/12/Blaupunkt-1.svg` },
  { name: "Elle", logo: `${CDN}/2022/12/Elle-1.svg` },
  { name: "NewME", logo: `${CDN}/2022/12/NewME-final-1.svg` },
  { name: "Wastebusters", logo: `${CDN}/2022/12/Wastebusters-1.svg` },
];

export const productCategories = [
  { title: "Kitchenware", desc: "Cookware, BBQ, knives, bakeware" },
  { title: "Outdoor", desc: "Garden tools, multi-tools, adventure gear" },
  { title: "Travel", desc: "Luggage, bags, travel accessories" },
  { title: "Lifestyle", desc: "Fashion accessories, watches, bags" },
  { title: "Family & Kids", desc: "Backpacks, educational, toys" },
  { title: "Sports", desc: "Athletic gear, sports accessories" },
];

export const studies = [
  { id: "spar-redbull", cat: "retail", client: "SPAR Slovenia", title: "Oracle Red Bull Racing Adrenaline", location: "Slovenia", year: "2025", img: `${CDN}/2025/08/Spar-TZ_RedBull-cover-circle.jpg`, summary: "SPAR Slovenia and KLR turned everyday grocery shopping into an adrenaline-charged experience — with exclusive rewards, in-store activations and a Porsche driving experience as grand prize.", results: [{ k: "+31%", v: "Basket size" }, { k: "8 wk", v: "Campaign" }, { k: "420k", v: "Redemptions" }], brand: "Red Bull Racing" },
  { id: "mol-pintinox", cat: "petrol", client: "MOL Hungary", title: "Pintinox BBQ · Master The Grill", location: "Hungary", year: "2025", img: `${CDN}/2025/10/pintinox-bbq-collection-cover-1.png`, summary: "The Pintinox 'Master The Grill' collection for MOL Hungary turned the forecourt into a destination for barbecue enthusiasts across the country.", results: [{ k: "+19%", v: "Fuel volume" }, { k: "14 wk", v: "Run-time" }, { k: "680k", v: "Items redeemed" }], brand: "Pintinox" },
  { id: "kaufland-redbull", cat: "retail", client: "Kaufland Bulgaria", title: "Red Bull Racing for Kaufland", location: "Bulgaria", year: "2025", img: `${CDN}/2025/08/Spar-TZ_RedBull-cover-circle.jpg`, summary: "Kaufland Bulgaria and KLR combined adrenaline with retail loyalty — a campaign built around collectible F1 merchandise and a real Porsche driving experience.", results: [{ k: "+27%", v: "Loyalty sign-ups" }, { k: "10 wk", v: "Campaign" }, { k: "380k", v: "Redemptions" }], brand: "Red Bull Racing" },
  { id: "petrol-slovenia-bugatti", cat: "petrol", client: "Petrol Slovenia", title: "Italian cookware, on every forecourt", location: "Slovenia", year: "2024", img: `${CDN}/2025/04/KLR-Bugatti.png`, summary: "Bugatti's Prestigio cookware elevated Petrol Slovenia's fuel rewards program — pairing Italian design with a strong retention mechanic.", results: [{ k: "+18%", v: "Fuel volume" }, { k: "12 wk", v: "Run-time" }, { k: "900k", v: "Items redeemed" }], brand: "Bugatti" },
  { id: "circle-k-nasa", cat: "petrol", client: "Circle K", title: "A cosmic forecourt · NASA Stardust", location: "Baltics", year: "2024", img: `${CDN}/2025/04/KLR-stardust-travel.png`, summary: "The NASA Stardust licensed range took Circle K's loyalty program into new territory — literally. A cosmic collection that engaged shoppers across three markets.", results: [{ k: "+29%", v: "App usage" }, { k: "3", v: "Countries" }, { k: "550k", v: "Redemptions" }], brand: "NASA Stardust" },
  { id: "rompetrol-pintinox", cat: "petrol", client: "Rompetrol", title: "Pintinox Romania", location: "Romania", year: "2024", img: `${CDN}/2025/04/KLR-Pintinox-Romania.png`, summary: "A nationwide Pintinox campaign that gave Rompetrol Romania a standout moment in a crowded fuel-loyalty market.", results: [{ k: "+22%", v: "Repeat visits" }, { k: "1.1M", v: "Cards issued" }, { k: "550", v: "Stations live" }], brand: "Pintinox" },
];

// Retailers — full list from presentation, split by sector
export const retailers = {
  grocery: ["Coop", "Kaufland", "Carrefour", "Esselunga", "Maxima", "Conad", "Fantastico", "Plodine", "IKI", "Spar", "Tropic", "Tinex", "Mercator", "Cora", "bi1", "MaxiMarché", "Billa", "Gadis", "CBA", "Univerexport", "Tuš", "Konzum"],
  petrol: ["Viada", "EKO", "BP", "Lukoil", "Makpetrol", "INA", "OMV", "Petrol", "MOL", "Circle K", "Petrom", "NIS", "Adria Oil", "Slovnaft", "SOCAR", "Baltic Petroleum"],
};

// Legacy alias for existing components
export const partners = {
  petrol: retailers.petrol,
  retail: retailers.grocery,
};

// Service pillars — 3 per spec
export const pillars = [
  { n: "01", title: "Loyalty Marketing Strategy", what: "We develop loyalty strategies rooted in behavioural insight and local market understanding, tailored to your goals, competitive landscape, and customers' real motivations.", how: "Market analysis, customer segmentation, campaign concept design, mechanics selection (collectibles, instant rewards, tiered programmes), reward strategy.", out: "A fully developed campaign concept with defined mechanics, reward selection, visual direction, and projected KPIs." },
  { n: "02", title: "Full Campaign Management", what: "End-to-end execution across multiple markets. Creative production, POSM, logistics, stock management, staff training, daily support.", how: "Our network across 10 European locations handles procurement, warehousing, distribution. Proprietary software with weekly performance monitoring.", out: "Stress-free rollout with dedicated project management, real-time reporting, single point of contact." },
  { n: "03", title: "Measurement & Analytics", what: "Data-driven campaign evaluation. Period sales uplift, ROI, brand equity, CRR, RPR, redemption patterns, basket size impact.", how: "Quantitative data + qualitative insights from discovery workshops and social media audits. Custom metrics.", out: "Actionable reports with optimisation recommendations. Compounding knowledge base." },
];

// Legacy alias (some older components still import `services`)
export const services = pillars.map((p) => ({ n: p.n, title: p.title, desc: p.what }));

// Loyalty Framework — 3 pillars of emotional loyalty
export const loyaltyFramework = [
  { n: "01", title: "Desire", desc: "Dream, high-quality rewards that money can't buy. Aspirational rewards, compelling visuals, clear value perception, strong storytelling." },
  { n: "02", title: "Experience", desc: "High participation is the key to real engagement. Motivating milestones, clear progress systems, engaging communication, intuitive journeys." },
  { n: "03", title: "Satisfaction", desc: "High perceived value rewards that last forever in your best customers' hearts. Long positive memory through exceptional quality." },
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

export const moreThanLoyalty = [
  { title: "Creative Designers", desc: "We create cool product collections customers want. Tailor-made for YOUR loyalty needs. Best-quality products." },
  { title: "Top Campaign Managers", desc: "Concept, POSM, marketing, logistics and returns. With weekly performance monitoring." },
  { title: "Reliable Partners", desc: "Retailers have trusted us for years. Why? Because we deliver. That's why we are masters of repeat business." },
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
  { n: "01", title: "Licensing & Product Strategy", desc: "We define which product lines fit the loyalty format and handle licensing negotiations and product adaptation." },
  { n: "02", title: "Collection Development", desc: "Our design team creates campaign-ready collections with premium packaging, photography, and video." },
  { n: "03", title: "Multi-Market Deployment", desc: "Through 150+ retail clients across 20+ countries, your collection reaches millions. We manage logistics and fulfilment." },
  { n: "04", title: "Campaign Integration", desc: "Your brand becomes the centrepiece: in-store displays, POSM, digital marketing, engagement mechanics." },
  { n: "05", title: "Performance Reporting", desc: "Full reports: redemption rates, engagement, geographic performance, media value analysis." },
];

// 10 European locations
export const locations = [
  { city: "Koper", country: "Slovenia" },
  { city: "Rovato", country: "Italy" },
  { city: "Milan", country: "Italy" },
  { city: "Düsseldorf", country: "Germany" },
  { city: "Lille", country: "France" },
  { city: "Budapest", country: "Hungary" },
  { city: "Lublin", country: "Poland" },
  { city: "Prague", country: "Czechia" },
  { city: "Belgrade", country: "Serbia" },
  { city: "Riga", country: "Latvia" },
];

// Real offices — headquarters Koper, sales office Rovato
export const offices = [
  { city: "Headquarters · Koper", addr: "Ulica 15. Maja 19\nSI-6000 Koper/Capodistria", phone: "+386 5 902 87 58", region: "Slovenia" },
  { city: "Sales Office · Rovato", addr: "Via XXV Aprile 68\n25038 Rovato (BS)", phone: "+39 030 52 81 427", region: "Italy" },
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

// Kept for About page (used in existing About component)
export const aboutValues = [
  { title: "Human-centered", desc: "A unique human-centred approach to loyalty design is the key to delivering successful campaigns." },
  { title: "Trustful", desc: "Positive, trustful and loyal relationships between retail chains and their clients." },
  { title: "Smart incentive-based", desc: "Creative, incentive-based solutions that create real engagement with customers." },
  { title: "Empowered", desc: "Our values ensure that everyone who works at KLR feels empowered and ambitious." },
];

export const fallbackPosts = [
  { id: 4809, slug: "b2b-marketing-in-2026-10-strategic-shifts-that-will-define-success", title: "B2B Marketing in 2026: 10 Strategic Shifts That Will Define Success", date: "2026-02-02", excerpt: "AI is now the norm, but it's not replacing human connection — it's reshaping how we connect. Because while people still want to buy from people, the way we build relationships is evolving fast.", img: `${CDN}/2026/02/b2b-marketing-trends-no-text.png`, link: "https://klr-europe.com/b2b-marketing-in-2026-10-strategic-shifts-that-will-define-success/", category: "Loyalty Marketing" },
  { id: 4762, slug: "from-inspiration-to-action-creative-lessons-from-forward-festival-vienna-2025", title: "From Inspiration to Action: Creative Lessons from Forward Festival Vienna 2025", date: "2025-10-31", excerpt: "Vienna once again proved itself a creative epicenter during Forward Festival 2025, where designers, thinkers, and brand innovators met under one unifying call: 'Turn Ideas into Action'.", img: `${CDN}/2025/10/forward-festival-cover.jpg`, link: "https://klr-europe.com/from-inspiration-to-action-creative-lessons-from-forward-festival-vienna-2025/", category: "Retail Trends" },
  { id: 4686, slug: "oracle-red-bull-racing-adrenaline-kaufland-bulgaria", title: "Oracle Red Bull Racing Adrenaline for Kaufland Bulgaria", date: "2025-10-30", excerpt: "Discover how Kaufland Bulgaria and KLR turned everyday grocery shopping into an adrenaline-charged experience. Exclusive rewards, in-store activations, and a Porsche driving experience.", img: `${CDN}/2025/08/Spar-TZ_RedBull-cover-circle.jpg`, link: "https://klr-europe.com/oracle-red-bull-racing-adrenaline-kaufland-bulgaria/", category: "KLR Life" },
  { id: 4650, slug: "pintinox-bbq-for-mol-hungary", title: "Pintinox BBQ for MOL Hungary", date: "2025-10-14", excerpt: "Key points about the Pintinox 'Master The Grill' collection that we organized in cooperation with MOL Hungary — a standout summer campaign on the forecourt.", img: `${CDN}/2025/10/pintinox-bbq-collection-cover-1.png`, link: "https://klr-europe.com/pintinox-bbq-for-mol-hungary/", category: "KLR Life" },
  { id: 4551, slug: "klr-10-anniversary-franciacorta-2025", title: "A decade of Trust and Teamwork: Highlights from KLR's Anniversary Event", date: "2025-09-28", excerpt: "KLR's 10th anniversary was more than a milestone — it was a firework of energy, trust, and teamwork. From Franciacorta to the many colleagues, partners, and clients who traveled to celebrate.", img: `${CDN}/2025/09/KLR10-14-e1758293512394.jpg`, link: "https://klr-europe.com/klr-10-anniversary-franciacorta-2025/", category: "Leadership & Culture" },
  { id: 4478, slug: "oracle-red-bull-racing-adrenaline-for-spar-slovenia", title: "Oracle Red Bull Racing Adrenaline for Spar Slovenia", date: "2025-08-07", excerpt: "Discover how SPAR Slovenia and KLR turned everyday grocery shopping into an adrenaline-charged experience with exclusive F1 rewards, in-store activations and a Porsche experience.", img: `${CDN}/2025/08/Spar-TZ_RedBull-cover-circle.jpg`, link: "https://klr-europe.com/oracle-red-bull-racing-adrenaline-for-spar-slovenia/", category: "Loyalty Marketing" },
];

export type Post = typeof fallbackPosts[number];
