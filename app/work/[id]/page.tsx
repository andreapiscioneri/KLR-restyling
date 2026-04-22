import type { Metadata } from "next";
import { studies } from "@/src/app/data";
import { StudyDetailClient } from "./_client";

export async function generateStaticParams() {
  return studies.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const study = studies.find((s) => s.id === params.id);
  return {
    title: study ? `${study.title} | Case Study` : "Case Study",
    description: study?.summary ?? "KLR Europe case study.",
    alternates: { canonical: `/work/${params.id}` },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <StudyDetailClient id={params.id} />;
}
