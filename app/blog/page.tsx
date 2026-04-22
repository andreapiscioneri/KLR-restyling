import type { Metadata } from "next";
import { BlogClient } from "./_client";

export const metadata: Metadata = {
  title: "Insights | Loyalty Marketing Trends & Stories",
  description:
    "Your go-to spot for fresh takes on loyalty marketing, industry trends, and the people behind KLR's success. Expert insights on grocery and fuel retail loyalty across Europe.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return <BlogClient />;
}
