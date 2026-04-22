import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LogoLoader } from "@/components/ui/LogoLoader";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL("https://klr-europe.com"),
  title: {
    default: "KLR Europe | Key to Loyalty in Retail",
    template: "%s | KLR Europe",
  },
  description:
    "KLR Europe designs and delivers emotional loyalty campaigns for grocery and fuel retail chains across 20+ European markets. 340+ campaigns, 150+ clients, 10+ years.",
  keywords: [
    "loyalty marketing", "retail loyalty", "loyalty campaigns",
    "grocery retail", "petrol retail", "KLR Europe", "loyalty program Europe",
    "emotional loyalty", "reward campaigns",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://klr-europe.com",
    siteName: "KLR Europe",
    title: "KLR Europe | Key to Loyalty in Retail",
    description:
      "We design and deliver emotional loyalty campaigns for European retail and petrol chains. Built on trust and teamwork.",
    images: [{ url: "/klr-logo.png", width: 512, height: 512, alt: "KLR Europe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KLR Europe | Key to Loyalty in Retail",
    description: "Emotional loyalty campaigns for European retail chains.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KLR-EVROPA d.o.o.",
  alternateName: "KLR Europe",
  url: "https://klr-europe.com",
  logo: "https://klr-europe.com/wp-content/uploads/2022/10/KLR-Logosito.png",
  description:
    "KLR Europe specializes in human-centered loyalty marketing for retail businesses. 10+ years of experience, 340+ campaigns, 20+ countries.",
  foundingDate: "2015",
  numberOfEmployees: 43,
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Ulica 15. Maja 19",
      addressLocality: "Koper",
      postalCode: "SI-6000",
      addressCountry: "SI",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Via XXV Aprile 68",
      addressLocality: "Rovato",
      postalCode: "25038",
      addressCountry: "IT",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@klr-europe.com",
    telephone: "+386-5-902-87-58",
    contactType: "customer service",
  },
  sameAs: [
    "https://www.linkedin.com/company/klr-key-to-loyalty-in-retail/",
    "https://www.youtube.com/@klreurope",
  ],
  areaServed: {
    "@type": "Place",
    name: "Europe",
  },
  serviceType: [
    "Loyalty Marketing Strategy",
    "Full Loyalty Campaign Management",
    "Loyalty Measurement and Analytics",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <LenisProvider>
          <CustomCursor />
          <LogoLoader />
          <Nav />
          <main className="relative z-10">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
