import type { Metadata } from "next";
import { CareerClient } from "./_client";

export const metadata: Metadata = {
  title: "Career | A Loyal Team of Professionals",
  description:
    "Join KLR Europe — a team of professionals of different nationalities, beliefs and cultures united by cohesion, trust and mutual respect. Be part of our international loyalty marketing team.",
  alternates: { canonical: "/career" },
};

export default function Page() {
  return <CareerClient />;
}
