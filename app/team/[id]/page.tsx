import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Leader } from "@/lib/content-schema";
import { getLeadership } from "@/lib/content";
import { TeamDetailClient } from "./_client";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const leadership = ((await getLeadership()) as { id?: string }[] | null) ?? [];
  return leadership.map((p) => p?.id).filter((id): id is string => Boolean(id)).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const leadership = ((await getLeadership()) as Leader[] | null) ?? [];
  const person = leadership.find((p) => p.id === params.id);
  const title = person ? `${person.name} — ${person.role} | KLR Europe` : "Team Member | KLR Europe";
  const description = person?.bio ?? "KLR Europe team member.";
  const image = person?.img ?? "/api/media/wp-4569";
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

export default async function Page({ params }: { params: { id: string } }) {
  const leadership = ((await getLeadership()) as Leader[] | null) ?? [];

  // Senza questo controllo un id inesistente rendeva comunque una pagina
  // con HTTP 200 — un soft 404. Si notava anche sui file statici rimossi:
  // /team/Rovato.png finiva qui come se "Rovato.png" fosse una persona.
  if (!leadership.some((p) => p.id === params.id)) {
    notFound();
  }

  return <TeamDetailClient id={params.id} initialLeadership={leadership} />;
}
