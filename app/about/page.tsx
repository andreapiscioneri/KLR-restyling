import type { Metadata } from "next";
import { AboutClient } from "./_client";

export const metadata: Metadata = {
  title: "About | People First to Deliver the Best Results",
  description:
    "KLR Europe is a human-centered loyalty marketing agency. We combine qualitative and quantitative methodologies to design loyalty campaigns that deliver measurable commercial results across 20+ European markets.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutClient />;
}
