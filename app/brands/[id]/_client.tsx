"use client";

import { useRouter } from "next/navigation";
import { BrandDetail } from "@/src/app/components/brand-detail";
import { routeToPath, type Route } from "@/lib/routing";

type P = Parameters<typeof BrandDetail>[0];

export function BrandDetailClient({ id, initialBrands, initialStudies }: { id: string; initialBrands?: P["initialBrands"]; initialStudies?: P["initialStudies"] }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <BrandDetail id={id} go={go} initialBrands={initialBrands} initialStudies={initialStudies} />;
}
