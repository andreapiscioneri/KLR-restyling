import type { Metadata } from "next";
import { HomePage } from "./_home";

export const metadata: Metadata = {
  title: "KLR Europe | Key to Loyalty in Retail",
  description:
    "KLR Europe designs emotional loyalty campaigns for grocery and fuel retail chains. 340+ campaigns delivered across 20+ European countries. Built on trust and teamwork.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
