"use client";

import { useRouter } from "next/navigation";
import { Career } from "@/src/app/components/career";
import { routeToPath, type Route } from "@/lib/routing";

export function CareerClient() {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <Career go={go} />;
}
