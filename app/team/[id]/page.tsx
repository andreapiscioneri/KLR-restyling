import type { Metadata } from "next";
import { leadership } from "@/src/app/data";
import { TeamDetailClient } from "./_client";

export async function generateStaticParams() {
  return leadership.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const person = leadership.find((p) => p.id === params.id);
  return {
    title: person ? `${person.name} | ${person.role}` : "Team Member",
    description: person?.bio ?? "KLR Europe team member.",
    alternates: { canonical: `/team/${params.id}` },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <TeamDetailClient id={params.id} />;
}
