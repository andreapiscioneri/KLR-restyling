import type { Metadata } from "next";
import { ServicesClient } from "./_client";

export const metadata: Metadata = {
  title: "Services | 360° Loyalty Campaign Design & Execution",
  description:
    "KLR Europe offers 360° loyalty marketing services: strategic development, full campaign management, and loyalty measurement & analytics. Tailor-made solutions for grocery and petrol retailers.",
  alternates: { canonical: "/services" },
};

export default function Page() {
  return <ServicesClient />;
}
