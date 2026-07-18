import type { Metadata } from "next";
import { Contact } from "@/src/app/components/contact";
import { getPages } from "@/lib/content";

export const revalidate = 60;

const OG = "/api/media/wp-1024";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages() as Record<string, { seo?: { title?: string; description?: string } }>;
  const seo = pages.contact?.seo;
  const title = seo?.title || "Contact | We Operate in Almost 20 Countries";
  const description = seo?.description ||
    "Get in touch with KLR Europe. Headquartered in Koper, Slovenia, with offices in Italy and a partner network across 20 European markets. info@klr-europe.com";
  return {
    title,
    description,
    alternates: { canonical: "https://klr-europe.com/contact" },
    openGraph: {
      type: "website",
      url: "https://klr-europe.com/contact",
      title,
      description,
      siteName: "KLR Europe",
      images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Contact" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG],
    },
  };
}

export default async function Page() {
  const pages = await getPages();
  const contactCms = (pages as Record<string, unknown>)?.contact as Parameters<typeof Contact>[0]["initialCms"];
  return <Contact initialCms={contactCms} />;
}
