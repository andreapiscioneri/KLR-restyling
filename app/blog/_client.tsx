"use client";

import { useRouter } from "next/navigation";
import { Blog } from "@/src/app/components/blog";
import { routeToPath, type Route } from "@/lib/routing";

type P = Parameters<typeof Blog>[0];

export function BlogClient({ initialPosts, initialHero }: { initialPosts?: P["initialPosts"]; initialHero?: P["initialHero"] }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <Blog go={go} initialPosts={initialPosts} initialHero={initialHero} />;
}
