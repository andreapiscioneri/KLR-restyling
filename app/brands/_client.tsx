"use client";

import { useRouter } from "next/navigation";
import { Brands } from "@/src/app/components/brands";
import { routeToPath, type Route } from "@/lib/routing";

export function BrandsClient() {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <Brands go={go} />;
}
