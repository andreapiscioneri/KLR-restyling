"use client";

import { useRouter } from "next/navigation";
import { BlogDetail } from "@/src/app/components/blog-detail";
import { routeToPath, type Route } from "@/lib/routing";
import type { Post } from "@/lib/content-schema";

type FullPost = Post & { contentHtml?: string; authorName?: string; authorAvatar?: string };

export function BlogDetailClient({ slug, initialPost, initialOthers, contentHtmlOptimized }: { slug: string; initialPost: FullPost; initialOthers?: FullPost[]; contentHtmlOptimized?: string }) {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));
  return <BlogDetail slug={slug} initialPost={initialPost} initialOthers={initialOthers} contentHtmlOptimized={contentHtmlOptimized} go={go} />;
}
