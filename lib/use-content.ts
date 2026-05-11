"use client";
import { useState, useEffect } from "react";

export function useContent<T>(type: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);
  useEffect(() => {
    fetch(`/api/content?type=${type}`)
      .then(r => r.json())
      .then(j => { if (j.data) setData(j.data); })
      .catch(() => {});
  }, [type]);
  return data;
}
