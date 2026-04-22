import type { Metadata } from "next";
import { Klr10Client } from "./_client";

export const metadata: Metadata = {
  title: "KLR 10 Years | A Decade of Trust and Teamwork",
  description:
    "KLR Europe celebrates 10 years of commitment, teamwork and growth. From a single office in Koper in 2015 to 43 professionals across 20+ European markets.",
  alternates: { canonical: "/10-years" },
};

export default function Page() {
  return <Klr10Client />;
}
