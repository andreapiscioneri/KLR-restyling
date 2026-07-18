"use client";

import { useRouter } from "next/navigation";
import { Studies } from "@/src/app/components/studies";
import { routeToPath, type Route } from "@/lib/routing";

type P = Parameters<typeof Studies>[0];

export function WorkClient({ initialStudies, initialPageData }: { initialStudies?: P["initialStudies"]; initialPageData?: P["initialPageData"] }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <Studies go={go} initialStudies={initialStudies} initialPageData={initialPageData} />;
}
