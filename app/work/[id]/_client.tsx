"use client";

import { useRouter } from "next/navigation";
import { StudyDetail } from "@/src/app/components/study-detail";
import { routeToPath, type Route } from "@/lib/routing";

type Studies = Parameters<typeof StudyDetail>[0]["initialStudies"];

export function StudyDetailClient({ id, initialStudies }: { id: string; initialStudies?: Studies }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <StudyDetail id={id} go={go} initialStudies={initialStudies} />;
}
