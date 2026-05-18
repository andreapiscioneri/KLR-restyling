"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Career } from "@/src/app/components/career";
import { routeToPath, type Route } from "@/lib/routing";

type Position = { id: string; role: string; loc: string; description?: string };

export function CareerClient() {
  const router = useRouter();
  const go = (r: Route) => router.push(routeToPath(r));

  const [cms, setCms] = useState<Record<string, Record<string, string>>>({});
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    fetch("/api/content?type=pages", { cache: "no-store" })
      .then(r => r.json())
      .then(d => { if (d?.data?.career) setCms(d.data.career); })
      .catch(() => {});

    fetch("/api/content?type=positions", { cache: "no-store" })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d?.data)) setPositions(d.data); })
      .catch(() => {});
  }, []);

  return <Career go={go} cms={cms as Parameters<typeof Career>[0]["cms"]} positionsList={positions} />;
}
