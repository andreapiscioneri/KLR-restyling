import type { Metadata } from "next";
import { TeamClient } from "./_client";

export const metadata: Metadata = {
  title: "Team | The People Behind KLR Europe",
  description:
    "Meet the 43-person international team behind KLR Europe's loyalty campaigns. Leadership, operations, and creative talent from 11 nationalities working across 20+ European markets.",
  alternates: { canonical: "/team" },
};

export default function Page() {
  return <TeamClient />;
}
