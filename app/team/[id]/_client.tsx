"use client";

import { useRouter } from "next/navigation";
import { TeamDetail } from "@/src/app/components/team-detail";
import { routeToPath, type Route } from "@/lib/routing";

export function TeamDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <TeamDetail id={id} go={go} />;
}
