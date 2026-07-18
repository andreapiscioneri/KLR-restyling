import type { Metadata } from "next";
import { Privacy } from "@/src/app/components/privacy";
import { getPages } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for KLR-EVROPA d.o.o. — how we collect, use and protect your data.",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default async function Page() {
  const pages = await getPages();
  const privacyCms = (pages as Record<string, unknown>)?.privacy as Parameters<typeof Privacy>[0]["initialCms"];
  return <Privacy initialCms={privacyCms} />;
}
