"use client";

import { useRouter } from "next/navigation";
import { StudyDetail } from "@/src/app/components/study-detail";
import { routeToPath, type Route } from "@/lib/routing";

export function StudyDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <StudyDetail id={id} go={go} />;
}
