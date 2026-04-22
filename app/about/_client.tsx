"use client";

import { useRouter } from "next/navigation";
import { About } from "@/src/app/components/about";
import { routeToPath, type Route } from "@/lib/routing";

export function AboutClient() {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <About go={go} />;
}
