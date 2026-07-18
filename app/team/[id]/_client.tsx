"use client";

import { useRouter } from "next/navigation";
import { TeamDetail } from "@/src/app/components/team-detail";
import { routeToPath, type Route } from "@/lib/routing";

type Leadership = Parameters<typeof TeamDetail>[0]["initialLeadership"];

export function TeamDetailClient({ id, initialLeadership }: { id: string; initialLeadership?: Leadership }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <TeamDetail id={id} go={go} initialLeadership={initialLeadership} />;
}
