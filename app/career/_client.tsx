"use client";

import { useRouter } from "next/navigation";
import { Career } from "@/src/app/components/career";
import { routeToPath, type Route } from "@/lib/routing";

type Position = { id: string; role: string; loc: string; description?: string };

export function CareerClient({ initialCms, initialPositions }: { initialCms?: Record<string, Record<string, string>>; initialPositions?: Position[] }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));

  return <Career go={go} cms={(initialCms ?? {}) as Parameters<typeof Career>[0]["cms"]} positionsList={initialPositions ?? []} />;
}
