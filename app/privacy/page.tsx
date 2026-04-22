import type { Metadata } from "next";
import { Privacy } from "@/src/app/components/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for KLR-EVROPA d.o.o. — how we collect, use and protect your data.",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function Page() {
  return <Privacy />;
}
