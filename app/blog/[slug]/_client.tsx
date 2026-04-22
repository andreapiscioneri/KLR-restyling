"use client";

import { useRouter } from "next/navigation";
import { BlogDetail } from "@/src/app/components/blog-detail";
import { routeToPath, type Route } from "@/lib/routing";
import type { Post } from "@/src/app/data";

type FullPost = Post & { contentHtml?: string };

export function BlogDetailClient({ slug, initialPost }: { slug: string; initialPost?: FullPost }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <BlogDetail slug={slug} initialPost={initialPost} go={go} />;
}
