"use client";

import { useRouter } from "next/navigation";
import { Brands } from "@/src/app/components/brands";
import { routeToPath, type Route } from "@/lib/routing";

type P = Parameters<typeof Brands>[0];

export function BrandsClient({ initialBrands, initialBrandsCms }: { initialBrands?: P["initialBrands"]; initialBrandsCms?: P["initialBrandsCms"] }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <Brands go={go} initialBrands={initialBrands} initialBrandsCms={initialBrandsCms} />;
}
