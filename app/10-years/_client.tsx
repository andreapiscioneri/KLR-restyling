"use client";

import { useRouter } from "next/navigation";
import { Klr10 } from "@/src/app/components/klr10";
import { routeToPath, type Route } from "@/lib/routing";
import type { Leader, Post } from "@/lib/content-schema";

type TenYearsSection = Record<string, string | boolean | undefined>;

type TenYearsCms = {
  hero?: TenYearsSection;
  intro?: TenYearsSection;
  stats?: TenYearsSection;
  journey?: TenYearsSection;
  map?: TenYearsSection;
  vision?: TenYearsSection;
  anniversary?: TenYearsSection;
  closing?: TenYearsSection;
};

export function Klr10Client({ initialCms, initialLeadership, initialPosts }: {
  initialCms?: TenYearsCms;
  initialLeadership?: Leader[];
  initialPosts?: Post[];
}) {
  const router = useRouter();
  const cms = initialCms ?? {};

  const go = (r: Route) => router.push(routeToPath(r));
  return <Klr10 go={go} cms={cms} leadership={initialLeadership} posts={initialPosts} />;
}
