"use client";

import { useRouter } from "next/navigation";
import { Blog } from "@/src/app/components/blog";
import { routeToPath, type Route } from "@/lib/routing";

export function BlogClient() {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <Blog go={go} />;
}
