"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Klr10 } from "@/src/app/components/klr10";
import { routeToPath, type Route } from "@/lib/routing";

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

export function Klr10Client() {
  const router = useRouter();
  const [cms, setCms] = useState<TenYearsCms>({});

  useEffect(() => {
    fetch("/api/content?type=pages", { cache: "no-store" })
      .then(r => r.json())
      .then(d => { if (d?.data?.tenYears) setCms(d.data.tenYears as TenYearsCms); })
      .catch(() => {});
  }, []);

  const go = (r: Route) => router.push(routeToPath(r));
  return <Klr10 go={go} cms={cms} />;
}
