"use client";

import { useRouter } from "next/navigation";
import { StudyDetail } from "@/src/app/components/study-detail";
import { routeToPath, type Route } from "@/lib/routing";
import type { Brand, Study } from "@/lib/content-schema";

export function StudyDetailClient({ id, initialStudies, initialBrands }: {
  id: string;
  initialStudies?: Study[];
  initialBrands?: Brand[];
}) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <StudyDetail id={id} go={go} initialStudies={initialStudies} initialBrands={initialBrands} />;
}
