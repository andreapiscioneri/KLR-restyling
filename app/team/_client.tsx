"use client";

import { useRouter } from "next/navigation";
import { Team } from "@/src/app/components/team";
import { routeToPath, type Route } from "@/lib/routing";

export function TeamClient() {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <Team go={go} />;
}
