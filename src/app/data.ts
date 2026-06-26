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
  { id: "antonio-finazzi", name: "Antonio Finazzi", role: "CEO & Founder", img: "/team/KLR-Antonio-fondo-giallo.png", bio: "Antonio founded KLR in 2015 with a vision to design emotional loyalty across Europe. Three decades of retail and petrol strategy built on relationships.", quote: "Loyalty is never transactional. It's human." },
  { id: "stefano-finazzi", name: "Stefano Finazzi", role: "CMO & Founder", img: "/team/Stefano-FINAZZI.png", bio: "Stefano shapes the creative and marketing vision of KLR — from campaign concept through every retail touchpoint.", quote: "We deliver 6 million moments of joy a year — every single one matters." },
  { id: "sebastjan-kocjancic", name: "Sebastjan Kocjančič", role: "COO", img: "/team/Sebstjan-Kocjancic.png", bio: "Sebastjan runs operations across 10 European locations. Procurement, warehousing, distribution — the backbone behind every flawless rollout.", quote: "Every shopper deserves a reason to come back." },
  { id: "marcello-leonardi", name: "Marcello Leonardi", role: "Managing Director, New Markets", img: "/team/Marcello-LEONARDI.png", bio: "Marcello leads KLR's expansion into new markets across Western and Central Europe.", quote: "New markets need new stories — built on old-school trust." },
  { id: "olga-wojcik", name: "Olga Wojcik", role: "Head of Corporate Sales", img: "/team/Olga-WOJCIK.png", bio: "Olga drives corporate sales across the KLR client portfolio, turning ambitious briefs into long-term partnerships.", quote: "Sales is listening before selling." },
  { id: "marta-marga", name: "Marta Marga", role: "Head of Marketing", img: "/team/Marta-MARGA.png", bio: "Marta leads marketing, content and communications — the voice of KLR across every channel.", quote: "Good marketing feels like good storytelling." },
  { id: "jan-sahbaz-pergar", name: "Jan Šahbaz Pergar", role: "Head of Development", img: "/team/Jan-SAHBAZ-PERGAR.png", bio: "Jan leads product and technology development, including KLR's proprietary campaign management software.", quote: "Great software makes complex things feel simple." },
  { id: "riccardo-fogazzi", name: "Riccardo Fogazzi", role: "Head of Campaigns & Stock Management", img: "/team/Riccardo-FOGAZZI.png", bio: "Riccardo oversees campaign execution and stock management across 20+ markets.", quote: "Plan for the edge cases — delight lives in the details." },
  { id: "nina-bjelivuk", name: "Nina Bjelivuk", role: "Head of Logistics", img: "/team/Nina-BJELIVUK.png", bio: "Nina orchestrates logistics across Europe — from port to pallet to final store.", quote: "Loyalty only works when the reward arrives on time." },
  { id: "natalia-molchanova", name: "Natalia Molchanova", role: "Head of Corporate Communication", img: "/team/Natalia-MOLCHANOVA.png", bio: "Natalia shapes KLR's corporate voice, partnerships and external communications.", quote: "Clear words build loyal relationships." },
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
  { name: "Oracle Red Bull Racing", logo: "/partner/ORBR_TEAM_LOGO_22_MONO_WHITE.png" },
  { name: "NASA", logo: "/partner/pngkey.com-nasa-logo-png-274741.png" },
  { name: "Bugatti", logo: "/partner/casa-bugatti-logo-vector-1.svg" },
  { name: "Pintinox", logo: "/partner/Logo-Pintinox.png" },
  { name: "Eurosport", logo: "/partner/Eurosport-1.svg" },
  { name: "Guzzini Chefline", logo: "/partner/LOGO_CHEFLINE.png" },
  { name: "Zanussi", logo: "/partner/zanussi-01.svg" },
  { name: "Spear & Jackson", logo: "/partner/SpearJackson-1.svg" },
  { name: "Police", logo: "/partner/Police-logo.png" },
  { name: "O bag", logo: null },
  { name: "Mustang", logo: null },
  { name: "Carl Schmidt Sohn", logo: "/partner/footer-css.png" },
  { name: "Luminarc", logo: "/partner/Luminarc_2.svg" },
  { name: "Goodyear", logo: "/partner/goodyear-1.svg" },
  { name: "Blaupunkt", logo: "/partner/Blaupunkt-1.svg" },
  { name: "Elle", logo: "/partner/Elle-1.svg" },
  { name: "NewME", logo: "/partner/NewME-final-1.svg" },
  { name: "Wastebusters", logo: "/partner/Wastebusters-1.svg" },
  { name: "Waverley", logo: "/partner/WAVERLY-LOGO.png" },
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
  {
    id: "oracle-red-bull-racing-adrenaline-for-spar-slovenia",
    cat: "retail",
    client: "SPAR Slovenia",
    title: "Oracle Red Bull Racing Adrenaline for SPAR Slovenia",
    location: "Slovenia",
    year: "2025",
    img: `${CDN}/2025/08/Spar-TZ_RedBull-cover-circle.jpg`,
    summary: "A 12-week national grocery campaign with experiential activations, premium Oracle Red Bull Racing rewards and a Porsche driving lottery.",
    results: [{ k: "12", v: "Weeks" }, { k: "93", v: "Supermarkets" }, { k: "13", v: "Exclusive products" }],
    brand: "Oracle Red Bull Racing",
    details: {
      sourceUrl: "https://klr-europe.com/oracle-red-bull-racing-adrenaline-for-spar-slovenia/",
      campaignTitle: "Fueling Loyalty with Oracle Red Bull Racing Adrenaline",
      challenge:
        "SPAR Slovenia wanted to energize customer engagement and drive store traffic across its national network, increasing spend per visit and building deeper loyalty through aspirational rewards.",
      rewardGroups: [
        {
          title: "Travel & Mobility",
          subtitle: "Essentials designed for seamless movement and smart packing.",
          items: ["Cabin Trolley", "Check-in Trolley", "Carry-on Backpack", "Travel Pillow"],
        },
        {
          title: "Bags & Everyday Gear",
          subtitle: "Stylish and functional companions for daily use or short trips.",
          items: ["Urban Backpack", "Duffle Bag", "Shoulder Bag", "Ladies' Backpack", "Ladies' Bag", "Reversible Umbrella"],
        },
        {
          title: "Food & Drink On-the-Go",
          subtitle: "For staying refreshed and prepared wherever the journey leads.",
          items: ["Water Flask", "Thermo Bottle", "Thermo Food Jar"],
        },
      ],
      activations: [
        "In-store gaming activations in selected SPAR locations increased dwell time and campaign visibility.",
        "Interactive branded touchpoints created shareable moments tied to the Oracle Red Bull Racing world.",
      ],
      mechanics: [
        "Spend 10 EUR to 19.99 EUR to collect 1 loyalty point.",
        "Spend 20 EUR or more to collect additional points based on basket value.",
        "High-octane lottery: chance to win 1 of 5 Porsche 718 driving experiences at Red Bull Ring, Austria.",
      ],
      gallery: [
        "https://klr-europe.com/wp-content/uploads/2025/08/redbull-spar-klr-display-loyalty.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/08/redbull-spar-klr-cashier-loyalty.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/08/redbull-spar-klr-gates-loyalty.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/08/redbull-spar-klr-leaflet-1-loyalty.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/08/redbull-spar-klr-leaflet-loyalty.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/08/redbull-spar-klr-leaflets-loyalty.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/08/redbull-spar-klr-rollup-loyalty.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/08/redbull-spar-klr-wobbler-loyalty.jpg",
      ],
      social: [
        "https://klr-europe.com/wp-content/uploads/2025/07/facebook-red-bull-6.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/07/facebook-red-bull-5.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/07/facebook-red-bull-4.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/07/facebook-red-bull-3.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/07/facebook-red-bull-2.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/07/facebook-red-bull-1.jpg",
      ],
      videos: ["https://klr-europe.com/wp-content/uploads/2025/07/08222.mov"],
    },
  },
  {
    id: "pintinox-bbq-for-mol-hungary",
    cat: "petrol",
    client: "MOL Hungary",
    title: "Pintinox BBQ for MOL Hungary",
    location: "Hungary",
    year: "2025",
    img: `${CDN}/2025/10/pintinox-bbq-collection-cover-1.png`,
    summary: "An 11-week loyalty program across 370 stations built around the Pintinox Master The Grill collection and a digital stamp mechanic in MOL Move.",
    results: [{ k: "11", v: "Weeks" }, { k: "370", v: "Petrol stations" }, { k: "13", v: "Exclusive products" }],
    brand: "Pintinox",
    details: {
      sourceUrl: "https://klr-europe.com/pintinox-bbq-for-mol-hungary/",
      campaignTitle: "Master the Grill - Loyalty Campaign for MOL Hungary",
      challenge:
        "MOL Hungary wanted to increase engagement and spending among MOL Move members with a seasonal loyalty concept that blended practical value and premium design.",
      rewardGroups: [
        {
          title: "Grill Like a Pro",
          subtitle: "Performance-focused tools for serious BBQ sessions.",
          items: ["Cast Iron Grill Pan", "Cast Iron Pan", "BBQ Tool Kit", "BBQ Gloves", "Carving Set (2 pcs)", "Steak Knife Set (4 pcs)"],
        },
        {
          title: "Cool, Carry & Enjoy",
          subtitle: "Comfort and portability for outdoor summer moments.",
          items: ["Picnic Blanket", "Thermic Bag", "Thermo Tumbler", "Hip Flask"],
        },
        {
          title: "Adventure-Ready Essentials",
          subtitle: "Rugged tools for camping and outdoor exploration.",
          items: ["Pro Axe", "Pro Machete", "9-in-1 Knife"],
        },
      ],
      mechanics: [
        "1 digital stamp for every HUF 4,000 spent at participating stations.",
        "Stamps credited automatically in MOL Move when loyalty card is scanned.",
        "5 stamps unlock a digital coupon for one Pintinox item at promotional price.",
        "Coupons redeemable in all 370 participating stations.",
      ],
      gallery: [
        "https://klr-europe.com/wp-content/uploads/2025/10/MOL-HU-Pintinox-BBQ-display-3.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/MOL-HU-Pintinox-BBQ-display-5.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/MOL-HU-Pintinox-BBQ-display-closeup-scaled.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/MOL-HU-Pintinox-BBQ-leaflet-5.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/MOL-HU-Pintinox-BBQ-leaflet-6.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/MOL-HU-Pintinox-BBQ-leaflet-7.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/MOL-HU-Pintinox-BBQ-poster-refill.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/MOL-HU-Pintinox-BBQ-leaflet.jpg",
      ],
      social: [],
      videos: [],
    },
  },
  {
    id: "oracle-red-bull-racing-adrenaline-kaufland-bulgaria",
    cat: "retail",
    client: "Kaufland Bulgaria",
    title: "Oracle Red Bull Racing Adrenaline for Kaufland Bulgaria",
    location: "Bulgaria",
    year: "2025",
    img: `${CDN}/2025/08/Spar-TZ_RedBull-cover-circle.jpg`,
    summary: "A 10-week campaign combining collectible Oracle Red Bull Racing rewards, in-store activations and a Porsche 718 Cayman S experience lottery.",
    results: [{ k: "10", v: "Weeks" }, { k: "68", v: "Supermarkets" }, { k: "13", v: "Exclusive products" }],
    brand: "Oracle Red Bull Racing",
    details: {
      sourceUrl: "https://klr-europe.com/oracle-red-bull-racing-adrenaline-kaufland-bulgaria/",
      campaignTitle: "Fueling Loyalty with Oracle Red Bull Racing Adrenaline",
      challenge:
        "Kaufland Bulgaria aimed to energize its summer calendar, attract new shoppers and increase repeat visits while delivering standout value to Kaufland Card users.",
      rewardGroups: [
        {
          title: "Travel & Mobility",
          subtitle: "Essentials designed for seamless movement and smart packing.",
          items: ["Cabin Trolley", "Check-in Trolley", "Carry-on Backpack", "Travel Pillow"],
        },
        {
          title: "Bags & Everyday Gear",
          subtitle: "Stylish and functional companions for daily use or short trips.",
          items: ["Urban Backpack", "Duffle Bag", "Shoulder Bag", "Ladies' Backpack", "Ladies' Bag", "Reversible Umbrella"],
        },
        {
          title: "Food & Drink On-the-Go",
          subtitle: "For staying refreshed and prepared wherever the journey leads.",
          items: ["Water Flask", "Thermo Bottle", "Thermo Food Jar"],
        },
      ],
      activations: [
        "Pit Stop Challenge at Kaufland XOPark (24-25 May 2025) with real-time tire-change simulation.",
        "F1 Racing Simulator at Kaufland Tsentralni Hali (17-18 May 2025).",
        "F1 Real Show Car display at Sofia Izgrev hypermarket.",
      ],
      mechanics: [
        "Shop & Earn: Kaufland Card users collected points and redeemed products with up to 70% discount.",
        "Lottery #1: buy limited 4-pack Red Bull and register receipt to win 1 of 20 VIP Showrun tickets.",
        "Lottery #2: spend over 59.99 BGN on campaign products to enter draw for 1 of 2 Porsche 718 Cayman S trips at Red Bull Ring.",
      ],
      gallery: [
        "https://klr-europe.com/wp-content/uploads/2025/10/kaufland-oracleredbull-bg-car1.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/kaufland-oracleredbull-bulgaria-instore-2.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/kaufland-oracleredbull-simulator.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/kaufland-oracleredbull-bg-display-13.png",
        "https://klr-europe.com/wp-content/uploads/2025/10/kaufland-oracleredbull-bg-display-2.png",
        "https://klr-europe.com/wp-content/uploads/2025/10/kaufland-oracleredbull-bg-display-1.png",
        "https://klr-europe.com/wp-content/uploads/2025/10/kaufland-oracleredbull-bg-display-6.png",
        "https://klr-europe.com/wp-content/uploads/2025/10/kaufland-oracleredbull-bg-display-12.png",
        "https://klr-europe.com/wp-content/uploads/2025/10/kaufland-oracleredbull-bg-display-15.png",
        "https://klr-europe.com/wp-content/uploads/2025/10/kaufland-oracleredbull-bg-display-16.png",
        "https://klr-europe.com/wp-content/uploads/2025/10/kaufland-oracleredbull-bg-display-20.png",
        "https://klr-europe.com/wp-content/uploads/2025/10/poster.png",
        "https://klr-europe.com/wp-content/uploads/2025/10/totem-2.png",
        "https://klr-europe.com/wp-content/uploads/2025/10/totem.png",
        "https://klr-europe.com/wp-content/uploads/2025/10/totem4.png",
        "https://klr-europe.com/wp-content/uploads/2025/10/Porsche-experience.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/Porsche-experience-6.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/Porsche-experience-5.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/Porsche-experience-4.jpg",
      ],
      social: [
        "https://klr-europe.com/wp-content/uploads/2025/10/496771301_687714860573250_189562626517358206_n.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/496942026_692516116759791_9063172721858987488_n.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/499873973_694573736554029_2412641020266511867_n.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/502714798_702739432404126_7057416049188882066_n.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/505118924_708844875126915_2672801994694239722_n.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/10/505228304_708844878460248_3750810654154981548_n.jpg",
      ],
      videos: ["https://klr-europe.com/wp-content/uploads/2025/10/kaufland-website.mov"],
    },
  },
  {
    id: "bugatti-primo-for-lukoil-bulgaria",
    cat: "petrol",
    client: "Lukoil Bulgaria",
    title: "Bugatti Primo for Lukoil Bulgaria",
    location: "Bulgaria",
    year: "2024",
    img: "https://klr-europe.com/wp-content/uploads/2025/04/Primo-cover.png",
    summary: "Awarded Best Loyalty Campaign 2024 at Lukoil Bulgaria, this 10-week program paired premium Bugatti kitchen rewards with a high-frequency points mechanic.",
    results: [{ k: "10", v: "Weeks" }, { k: "215", v: "Petrol stations" }, { k: "11", v: "Exclusive products" }],
    brand: "Bugatti",
    details: {
      sourceUrl: "https://klr-europe.com/bugatti-primo-for-lukoil-bulgaria/",
      campaignTitle: "Awarded as the Best Loyalty Campaign 2024 by Lukoil Bulgaria",
      challenge:
        "Bring premium differentiation to forecourt loyalty by combining daily fuel purchases with aspirational, high-quality kitchen rewards.",
      rewardGroups: [
        {
          title: "A Culinary Masterpiece",
          subtitle: "Bugatti Primo kitchen essentials blending Italian design and everyday performance.",
          items: [
            "Paring Knife",
            "Utility Knife",
            "Slicing Knife",
            "Chef's Knife",
            "Santoku Knife",
            "Filleting Knife",
            "Cleaver",
            "Knife Sharpener",
            "Damascus Knife",
            "Dough Essentials",
            "Prestigio Knife Set",
          ],
        },
      ],
      mechanics: [
        "1 point for every 10 BGN spent on fuel or goods on a single receipt.",
        "Double points with Lukoil Club loyalty card: 2 points for every 10 BGN.",
        "Customers redeemed Bugatti Primo products with discounts up to 75%.",
      ],
      gallery: [
        "https://klr-europe.com/wp-content/uploads/2025/04/Primo-cover.png",
        "https://klr-europe.com/wp-content/uploads/2025/04/Best-Loyalty-Campaign-Award.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/04/display-lukoil-bugatti-2.jpg",
        "https://klr-europe.com/wp-content/uploads/2025/04/lukoil-bugatti-primo.png",
      ],
      social: ["https://klr-europe.com/wp-content/uploads/2025/04/484966984_1052386520269048_7677509030285945663_n.jpg"],
      videos: [],
    },
  },
  {
    id: "stardust-travel-for-omv-hungary",
    cat: "petrol",
    client: "OMV Hungary",
    title: "Stardust Travel for OMV Hungary",
    location: "Hungary",
    year: "2024",
    img: "https://klr-europe.com/wp-content/uploads/2024/03/OMV-HU-NASA-2023.png",
    summary: "A 12-week NASA-inspired forecourt loyalty campaign with 13 travel products and a lottery to win an Audi Q2.",
    results: [{ k: "12", v: "Weeks" }, { k: "185", v: "Gas stations" }, { k: "Lottery", v: "Audi Q2 prize" }],
    brand: "NASA Stardust",
    details: {
      sourceUrl: "https://klr-europe.com/stardust-travel-for-omv-hungary/",
      campaignTitle: "Stardust Travel for OMV Hungary",
      challenge:
        "Create a space-inspired loyalty journey with strong collectible appeal while increasing fuel and shop spend across OMV's national station network.",
      rewardGroups: [
        {
          title: "Space-Inspired Travel Collection",
          subtitle: "Licensed bags, accessories and family-oriented items designed to boost participation.",
          items: [
            "2 trolleys",
            "Food container",
            "Water bottle",
            "Urban backpack",
            "Cooler backpack",
            "Travel bag",
            "Bumbag",
            "Umbrella",
            "Cap",
            "Kids Academy Set",
            "Shuttle Seat Belt Toy",
            "Outer Space Luminous Blanket",
          ],
        },
      ],
      mechanics: [
        "1 sticker for every HUF 4,000 spent.",
        "Double stickers when buying MaxxMotion fuels.",
        "After 10 stickers, customers could purchase Stardust products at discounted prices.",
        "Lottery mechanic: buy at least 1 Stardust product and register receipt for chance to win an Audi Q2.",
      ],
      gallery: [
        "https://klr-europe.com/wp-content/uploads/2024/03/OMV-HU-NASA-2023-Display-1-1-scaled.jpg",
        "https://klr-europe.com/wp-content/uploads/2024/03/OMV-HU-NASA-2023-Display-2-1-scaled.jpg",
        "https://klr-europe.com/wp-content/uploads/2024/03/OMV-HU-NASA-2023-Gas-Pump-2-1-scaled.jpg",
        "https://klr-europe.com/wp-content/uploads/2024/03/431166283_800854798745210_3057804461490085269_n.jpg",
        "https://klr-europe.com/wp-content/uploads/2024/03/OMV-HU-NASA-2023-outdoor-2-1-scaled.jpg",
        "https://klr-europe.com/wp-content/uploads/2024/03/OMV-HU-NASA-2023-Poster-1-scaled.jpg",
        "https://klr-europe.com/wp-content/uploads/2024/03/OMV-HU-NASA-2023-Gas-Pump-1-scaled.jpg",
        "https://klr-europe.com/wp-content/uploads/2024/03/OMV-HU-NASA-2023-Poster-3-scaled.jpg",
      ],
      social: [
        "https://klr-europe.com/wp-content/uploads/2024/03/431259241_800854845411872_549706086835594963_n.jpg",
        "https://klr-europe.com/wp-content/uploads/2024/03/431433057_800854738745216_1705443015695792399_n.jpg",
        "https://klr-europe.com/wp-content/uploads/2024/03/431467934_800854712078552_1910311464717813433_n.jpg",
        "https://klr-europe.com/wp-content/uploads/2024/03/OMV-HU-NASA-2023-social-2-1.jpeg",
        "https://klr-europe.com/wp-content/uploads/2024/03/OMV-HU-NASA-2023-social-3-1.jpeg",
        "https://klr-europe.com/wp-content/uploads/2024/03/OMV-HU-NASA-2023-social-1.jpeg",
      ],
      videos: [],
    },
  },
  {
    id: "pintinox-trust-forged-in-steel-for-petrom-romania",
    cat: "petrol",
    client: "Petrom Romania",
    title: "Pintinox Trust Forged In Steel for Petrom Romania",
    location: "Romania",
    year: "2024",
    img: "https://klr-europe.com/wp-content/uploads/2024/07/petrom-pintinox-cover.png",
    summary: "A 14-week sticker-based campaign across 389 stations, offering premium Pintinox kitchen and outdoor essentials with discounts up to 83%.",
    results: [{ k: "14", v: "Weeks" }, { k: "389", v: "Petrol stations" }, { k: "10", v: "Products" }],
    brand: "Pintinox",
    details: {
      sourceUrl: "https://klr-europe.com/pintinox-trust-forged-in-steel-for-petrom-romania/",
      campaignTitle: "Pintinox Trust Forged In Steel for Petrom Romania",
      challenge:
        "Drive repeat forecourt visits with a versatile reward collection relevant both to home cooking and outdoor lifestyles.",
      rewardGroups: [
        {
          title: "Kitchen & Outdoor Essentials",
          subtitle: "Designed for customers who are chefs by choice and adventurers by nature.",
          items: [
            "Knife set 4 pcs (Sharpener, Paring, Chef's, Bread)",
            "Knife set 3 pcs (Cleaver, Slicing, Tomato)",
            "Knife set 3 pcs (Santoku, Utility, Scissors)",
            "Knife set 6 pcs (Steak knives)",
            "4 in 1 Carabiner",
            "9 in 1 Knife",
            "13 in 1 Plier",
            "High performance flashlight",
            "Hot and cold thermo flask 750ml",
            "Daypack",
          ],
        },
      ],
      mechanics: [
        "Spend requirement: 25 LEI for 1 sticker.",
        "Collect 15 stickers to unlock 1 product with up to 83% discount.",
        "Time-limited special offers on selected products for loyal Petrom customers.",
      ],
      gallery: [
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-pintinox-poster-loyalty-2.png",
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-pintinox-cashier-loyalty-2.png",
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-pintinox-display-3.png",
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-pintinox-display-loyalty-1.png",
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-pintinox-poster-loyalty-5.png",
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-pintinox-display-2.png",
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-pintinox-poster-video-screen-2.png",
        "https://klr-europe.com/wp-content/uploads/2024/07/rompetrol-pintinox-billboard-3.png",
      ],
      social: [
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-fb-2.jpeg",
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-fb-3.jpeg",
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-fb-4.jpeg",
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-fb-5.jpeg",
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-fb-6.jpeg",
        "https://klr-europe.com/wp-content/uploads/2024/07/petrom-fb-8.jpeg",
      ],
      videos: [],
    },
  },
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
  { city: "Düsseldorf", country: "Germany" },
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

// Kept for About page (used in existing About component)
export const aboutValues = [
  { title: "Human-centered", desc: "A unique human-centred approach to loyalty design is the key to delivering successful campaigns." },
  { title: "Trustful", desc: "Positive, trustful and loyal relationships between retail chains and their clients." },
  { title: "Smart incentive-based", desc: "Creative, incentive-based solutions that create real engagement with customers." },
  { title: "Empowered", desc: "Our values ensure that everyone who works at KLR feels empowered and ambitious." },
];

export const fallbackPosts = [
  { id: 4822, slug: "licensed-to-connect-key-takeaways-licensing-expo-2025", title: "Licensed to Connect: Key Takeaways from Licensing Expo 2025 on Reinventing Loyalty in Grocery and Petrol Retail", date: "2026-04-23", excerpt: "At the recent Licensing Expo in Las Vegas, one theme stood out clearly: the future of retail is not simply digital or physical—it's experiential, emotional, and increasingly hybrid.", img: `${CDN}/2025/08/Spar-TZ_RedBull-cover-circle.jpg`, link: "/blog/licensed-to-connect-key-takeaways-licensing-expo-2025", category: "Retail Trends", contentHtml: `
<h3 style="color: #2E2784; font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem 0;">Overview</h3>
<p>At the recent Licensing Expo in Las Vegas, one theme stood out clearly: the future of retail is not simply digital or physical—it's experiential, emotional, and increasingly hybrid. As the retail world evolves, so too must loyalty strategies in key sectors like grocery and petrol. For brands in these traditionally practical industries, licensing offers a bold pathway to foster deeper connections, build brand love, and drive sustained customer engagement.</p>

<h3 style="color: #2E2784; font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem 0;">From Functional to Emotional Loyalty</h3>
<p>Today's consumers demand more than points and discounts. They seek <strong>moments of joy, authenticity, and meaning</strong>. Insights shared during the conference highlighted how flagship destinations and even modest in-store activations can transform everyday shopping into memorable experiences. Petrol stations and supermarkets may not seem like emotional hotspots, but when infused with the right storytelling and licensed partnerships, they can become just that.</p>

<h3 style="color: #2E2784; font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem 0;">Hybrid Retail and Loyalty Integration</h3>
<p>The retail landscape is now <strong>fluid</strong>. Customers drift between online platforms and brick-and-mortar environments seeking both convenience and connection. Loyalty programs should reflect this reality by offering a seamless, omnichannel experience. For example, a digital app might notify a customer of an in-store-only reward linked to a limited-edition, co-branded collectible—enticing them into the store and elevating their brand interaction.</p>

<h3 style="color: #2E2784; font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem 0;">Enter the Kidult: Collectibles and Fandom as Loyalty Drivers</h3>
<p>The rise of the 'kidult'—adults who enjoy collectibles and playful nostalgia—presents an untapped opportunity. These customers are drawn to <strong>licensed products that celebrate mood, memory, and identity</strong>. Imagine petrol loyalty schemes offering exclusive toy sets, retro toy-inspired merchandise, or seasonal character drops. These items generate delight, encourage repeat visits, and offer high perceived value.</p>

<h3 style="color: #2E2784; font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem 0;">Art as an Emerging Force in Licensing</h3>
<p>Another compelling trend from the Expo was the growing role of art and design in brand licensing. From puzzles to home décor, artistic IPs like museums and artists are being transformed into commercial assets that evoke <strong>emotion and elevate aesthetic</strong> value. For grocery and fuel retail, partnering with art licensors could bring unexpected creativity into loyalty campaigns—think exclusive prints, artist-inspired rewards, or seasonal character drops. This approach not only drives visual interest but <strong>adds cultural cachet</strong> to brand offerings.</p>

<h3 style="color: #2E2784; font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem 0;">The Sustainability Equation</h3>
<p>Consumers, particularly younger ones, say they care about sustainability. However, <strong>when it comes to choosing rewards, emotional joy often takes precedence</strong>. A loyalty strategy that blends the two—offering durable, beautifully designed licensed products that feel good and do good—will stand out. Secondhand and circular product models, such as earn-and-return schemes for refurbished collectibles, can also align with eco-conscious values while keeping engagement high.</p>

<h3 style="color: #2E2784; font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem 0;">Smaller Drops, Bigger Impact</h3>
<p>One major takeaway from the conference: relevance today is fleeting, and <strong>staying fresh requires experimentation</strong>. Smaller, frequent, themed loyalty drops or campaigns using timely IPs or pop culture references can maintain interest and create excitement. These micro-campaigns don't just reward customers—they entertain and invite them to play.</p>

<h3 style="color: #2E2784; font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem 0;">Looking Forward: from transactional programs to transformational relationships</h3>
<p>For grocery and petrol retailers aiming to stay relevant in a fast-evolving market, the way forward isn't just about more promotions—it's about <strong>better emotional engagement</strong>. By weaving licensing, experiential touchpoints, and personalized rewards into loyalty strategies, retailers can move <strong>from transactional programs to transformational relationships</strong>.</p>

<p style="margin-top: 2rem;">At KLR, we believe loyalty isn't just about collecting points. It's about creating stories, sparking emotions, and building lasting brand connections. With the insights from the Licensing Expo as inspiration, the next chapter in loyalty marketing is going to be <strong>more human, creative, and resonant</strong> than ever before.</p>
  ` },
  { id: 4809, slug: "b2b-marketing-in-2026-10-strategic-shifts-that-will-define-success", title: "B2B Marketing in 2026: 10 Strategic Shifts That Will Define Success", date: "2026-02-02", excerpt: "AI is now the norm, but it's not replacing human connection — it's reshaping how we connect. Because while people still want to buy from people, the way we build relationships is evolving fast.", img: `${CDN}/2026/02/b2b-marketing-trends-no-text.png`, link: "/blog/b2b-marketing-in-2026-10-strategic-shifts-that-will-define-success", category: "Loyalty Marketing" },
  { id: 4762, slug: "from-inspiration-to-action-creative-lessons-from-forward-festival-vienna-2025", title: "From Inspiration to Action: Creative Lessons from Forward Festival Vienna 2025", date: "2025-10-31", excerpt: "Vienna once again proved itself a creative epicenter during Forward Festival 2025, where designers, thinkers, and brand innovators met under one unifying call: 'Turn Ideas into Action'.", img: `${CDN}/2025/10/forward-festival-cover.jpg`, link: "/blog/from-inspiration-to-action-creative-lessons-from-forward-festival-vienna-2025", category: "Retail Trends" },
  { id: 4686, slug: "oracle-red-bull-racing-adrenaline-kaufland-bulgaria", title: "Oracle Red Bull Racing Adrenaline for Kaufland Bulgaria", date: "2025-10-30", excerpt: "Discover how Kaufland Bulgaria and KLR turned everyday grocery shopping into an adrenaline-charged experience. Exclusive rewards, in-store activations, and a Porsche driving experience.", img: `${CDN}/2025/08/Spar-TZ_RedBull-cover-circle.jpg`, link: "/blog/oracle-red-bull-racing-adrenaline-kaufland-bulgaria", category: "KLR Life" },
  { id: 4650, slug: "pintinox-bbq-for-mol-hungary", title: "Pintinox BBQ for MOL Hungary", date: "2025-10-14", excerpt: "Key points about the Pintinox 'Master The Grill' collection that we organized in cooperation with MOL Hungary — a standout summer campaign on the forecourt.", img: `${CDN}/2025/10/pintinox-bbq-collection-cover-1.png`, link: "/blog/pintinox-bbq-for-mol-hungary", category: "KLR Life" },
  { id: 4551, slug: "klr-10-anniversary-franciacorta-2025", title: "A decade of Trust and Teamwork: Highlights from KLR's Anniversary Event", date: "2025-09-28", excerpt: "KLR's 10th anniversary was more than a milestone — it was a firework of energy, trust, and teamwork. From Franciacorta to the many colleagues, partners, and clients who traveled to celebrate.", img: `${CDN}/2025/09/KLR10-14-e1758293512394.jpg`, link: "/blog/klr-10-anniversary-franciacorta-2025", category: "Leadership & Culture" },
  { id: 4478, slug: "oracle-red-bull-racing-adrenaline-for-spar-slovenia", title: "Oracle Red Bull Racing Adrenaline for Spar Slovenia", date: "2025-08-07", excerpt: "Discover how SPAR Slovenia and KLR turned everyday grocery shopping into an adrenaline-charged experience with exclusive F1 rewards, in-store activations and a Porsche experience.", img: `${CDN}/2025/08/Spar-TZ_RedBull-cover-circle.jpg`, link: "/blog/oracle-red-bull-racing-adrenaline-for-spar-slovenia", category: "Loyalty Marketing" },
];

export type Post = typeof fallbackPosts[number];
