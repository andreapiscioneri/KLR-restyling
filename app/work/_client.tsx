"use client";

import { useRouter } from "next/navigation";
import { Studies } from "@/src/app/components/studies";
import { routeToPath, type Route } from "@/lib/routing";

export function WorkClient() {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <Studies go={go} />;
}
