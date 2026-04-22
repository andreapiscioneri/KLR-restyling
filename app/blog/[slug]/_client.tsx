"use client";

import { useRouter } from "next/navigation";
import { BlogDetail } from "@/src/app/components/blog-detail";
import { routeToPath, type Route } from "@/lib/routing";

export function BlogDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <BlogDetail slug={slug} go={go} />;
}
