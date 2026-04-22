"use client";

import { useRouter } from "next/navigation";
import { BrandDetail } from "@/src/app/components/brand-detail";
import { routeToPath, type Route } from "@/lib/routing";

export function BrandDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <BrandDetail id={id} go={go} />;
}
