import type { Metadata } from "next";
import { WorkClient } from "./_client";

export const metadata: Metadata = {
  title: "Case Studies | Loyalty Campaigns that Drive Success",
  description:
    "340+ loyalty campaigns across 20+ European countries. Explore how KLR Europe helped grocery and fuel retail chains increase visits, grow basket size, and build lasting customer relationships.",
  alternates: { canonical: "/work" },
};

export default function Page() {
  return <WorkClient />;
}
