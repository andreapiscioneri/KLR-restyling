import type { Metadata } from "next";
import { legacyStudyIdMap, resolveStudyId, studies } from "@/src/app/data";
import { permanentRedirect } from "next/navigation";
import { StudyDetailClient } from "./_client";

export const dynamicParams = false;

export async function generateStaticParams() {
  const canonical = studies.map((s) => ({ id: s.id }));
  const legacy = Object.keys(legacyStudyIdMap).map((id) => ({ id }));
  return [...canonical, ...legacy];
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const resolvedId = resolveStudyId(params.id);
  const study = studies.find((s) => s.id === resolvedId);
  const title = study ? `${study.title} | Case Study` : "Case Study | KLR Europe";
  const description = study?.summary ?? "KLR Europe loyalty campaign case study.";
  const image = study?.img ?? "https://klr-europe.com/wp-content/uploads/2025/08/Spar-TZ_RedBull-cover-circle.jpg";
  return {
    title,
    description,
    alternates: { canonical: `https://klr-europe.com/work/${resolvedId}` },
    openGraph: {
      type: "article",
      url: `https://klr-europe.com/work/${resolvedId}`,
      title,
      description,
      siteName: "KLR Europe",
      images: [{ url: image, width: 1200, height: 630, alt: study?.title ?? "KLR Case Study" }],
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
  const resolvedId = resolveStudyId(params.id);
  if (resolvedId !== params.id) {
    permanentRedirect(`/work/${resolvedId}`);
  }
  return <StudyDetailClient id={resolvedId} />;
}
