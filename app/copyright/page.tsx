import type { Metadata } from "next";
import { Copyright } from "@/src/app/components/copyright";
import { getPages } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Copyright & Terms of Use",
  description: "Copyright and terms of use for KLR-EVROPA d.o.o. — KLR Europe.",
  alternates: { canonical: "/copyright" },
  robots: { index: false },
};

export default async function Page() {
  const pages = await getPages();
  const copyrightCms = (pages as Record<string, unknown>)?.copyright as Parameters<typeof Copyright>[0]["initialCms"];
  return <Copyright initialCms={copyrightCms} />;
}
