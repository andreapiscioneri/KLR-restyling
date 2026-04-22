import type { Metadata } from "next";
import { Contact } from "@/src/app/components/contact";

const CDN = "https://klr-europe.com/wp-content/uploads";
const OG = `${CDN}/2022/12/KLR-CONTACTS-scaled.jpg`;

export const metadata: Metadata = {
  title: "Contact | We Operate in Almost 20 Countries",
  description:
    "Get in touch with KLR Europe. Headquartered in Koper, Slovenia, with offices in Italy and a partner network across 20 European markets. info@klr-europe.com",
  alternates: { canonical: "https://klr-europe.com/contact" },
  openGraph: {
    type: "website",
    url: "https://klr-europe.com/contact",
    title: "Contact KLR Europe | We Operate in Almost 20 Countries",
    description:
      "Headquartered in Koper, Slovenia. Offices in Italy. Partner network across 20 European markets. info@klr-europe.com",
    siteName: "KLR Europe",
    images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Contact" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact KLR Europe",
    description: "Headquartered in Koper, Slovenia. Partner network across 20 European markets.",
    images: [OG],
  },
};

export default function Page() {
  return <Contact />;
}
