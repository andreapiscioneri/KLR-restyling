"use client";

import { useRouter } from "next/navigation";
import { Team } from "@/src/app/components/team";
import { routeToPath, type Route } from "@/lib/routing";

type P = Parameters<typeof Team>[0];

export function TeamClient({ initialLeadership, initialStats, initialTeamCms }: { initialLeadership?: P["initialLeadership"]; initialStats?: P["initialStats"]; initialTeamCms?: P["initialTeamCms"] }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <Team go={go} initialLeadership={initialLeadership} initialStats={initialStats} initialTeamCms={initialTeamCms} />;
}
