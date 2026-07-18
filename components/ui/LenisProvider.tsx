"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Scroll is native (no scroll-hijacking library): on macOS/trackpad in
// particular, JS-reimplemented momentum scrolling (e.g. Lenis smoothWheel)
// fights the OS's own already-smooth scroll physics and reads as stutter.
// The only thing we still need on route change is resetting to the top.
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
