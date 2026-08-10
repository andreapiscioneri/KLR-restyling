import type { Metadata } from "next";
import { legacyStudyIdMap, resolveStudyId, studies as fallbackStudies } from "@/src/app/data";
import { permanentRedirect } from "next/navigation";
import { getStudies } from "@/lib/content";
import { getAdminSessionUser } from "@/lib/admin-auth";
import { StudyDetailClient } from "./_client";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const canonical = fallbackStudies.map((s) => ({ id: s.id }));
  const legacy = Object.keys(legacyStudyIdMap).map((id) => ({ id }));
  return [...canonical, ...legacy];
}

type StudyRecord = typeof fallbackStudies[number] & { status?: string; publicPreview?: boolean };

// Drafts are visible via ?preview=1 either to a logged-in admin, or to
// anyone when the item's own "public preview" flag is enabled (a
// shareable review link, matching the old WordPress workflow).
async function resolveStudies(preview: boolean): Promise<StudyRecord[]> {
  const all = ((await getStudies()) as StudyRecord[] | null) ?? [];
  const source = all.length ? all : (fallbackStudies as StudyRecord[]);
  if (!preview) return source.filter((s) => s.status !== "draft" && s.status !== "deleted");
  const isAdmin = Boolean(await getAdminSessionUser());
  return source.filter((s) => {
    if (s.status === "deleted") return false;
    if (s.status !== "draft") return true;
    return isAdmin || s.publicPreview === true;
  });
}

export async function generateMetadata({ params, searchParams }: { params: { id: string }; searchParams: { preview?: string } }): Promise<Metadata> {
  const resolvedId = resolveStudyId(params.id);
  const studies = await resolveStudies(searchParams.preview === "1");
  const study = studies.find((s) => s.id === resolvedId);
  const title = study ? `${study.title} | Case Study` : "Case Study | KLR Europe";
  const description = study?.summary ?? "KLR Europe loyalty campaign case study.";
  const image = study?.img ?? "/api/media/wp-4522";
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

export default async function Page({ params, searchParams }: { params: { id: string }; searchParams: { preview?: string } }) {
  const resolvedId = resolveStudyId(params.id);
  if (resolvedId !== params.id) {
    permanentRedirect(`/work/${resolvedId}`);
  }
  const studies = await resolveStudies(searchParams.preview === "1");
  return <StudyDetailClient id={resolvedId} initialStudies={studies} />;
}
