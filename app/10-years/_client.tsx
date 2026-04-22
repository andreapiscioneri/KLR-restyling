"use client";

import { useRouter } from "next/navigation";
import { Klr10 } from "@/src/app/components/klr10";
import { routeToPath, type Route } from "@/lib/routing";

export function Klr10Client() {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <Klr10 go={go} />;
}
