import type { Metadata } from "next";
import { leadership } from "@/src/app/data";
import { TeamDetailClient } from "./_client";

export const dynamicParams = false;

export async function generateStaticParams() {
  return leadership.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const person = leadership.find((p) => p.id === params.id);
  const title = person ? `${person.name} — ${person.role} | KLR Europe` : "Team Member | KLR Europe";
  const description = person?.bio ?? "KLR Europe team member.";
  const image = person?.img ?? "https://klr-europe.com/wp-content/uploads/2025/09/KLR10-14-e1758293512394.jpg";
  return {
    title,
    description,
    alternates: { canonical: `https://klr-europe.com/team/${params.id}` },
    openGraph: {
      type: "profile",
      url: `https://klr-europe.com/team/${params.id}`,
      title,
      description,
      siteName: "KLR Europe",
      images: [{ url: image, width: 800, height: 1000, alt: person?.name ?? "KLR Team Member" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <TeamDetailClient id={params.id} />;
}
