"use client";

import { useRouter } from "next/navigation";
import { Services } from "@/src/app/components/services";
import { routeToPath, type Route } from "@/lib/routing";

export function ServicesClient() {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <Services go={go} />;
}
