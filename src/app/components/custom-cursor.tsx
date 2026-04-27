"use client";

import { useEffect, useRef } from "react";

// Browsers normalize hex → rgb() when reading back inline styles
const BLUE_TOKENS = [
  "rgb(46, 39, 132)", "rgb(36, 31, 105)", "rgb(91, 83, 191)",
  "#2e2784", "#241f69", "#5b53bf",
];
const YELLOW_TOKENS = [
  "rgb(248, 174, 1)", "rgb(255, 217, 90)", "rgb(222, 152, 0)",
  "#f8ae01", "#ffd95a", "#de9800",
];

function detectTheme(x: number, y: number): "yellow" | "blue" | null {
  let node = document.elementFromPoint(x, y) as HTMLElement | null;
  while (node) {
    const bg = (
      (node.style?.background ?? "") + " " + (node.style?.backgroundImage ?? "")
    ).toLowerCase();
    if (bg && BLUE_TOKENS.some((t) => bg.includes(t))) return "yellow";
    if (bg && YELLOW_TOKENS.some((t) => bg.includes(t))) return "blue";
    node = node.parentElement as HTMLElement | null;
  }
  return null;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<string>("#2E2784");

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Only show on pointer-fine devices (mouse, not touch)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    dot.style.opacity = "1";

    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      const theme = detectTheme(e.clientX, e.clientY);
      const color = theme === "yellow" ? "#F8AE01" : theme === "blue" ? "#2E2784" : themeRef.current;
      if (color !== themeRef.current) {
        themeRef.current = color;
        dot.style.background = color;
      }
    };

    const onLeave = () => { dot.style.opacity = "0"; };
    const onEnter = () => { dot.style.opacity = "1"; };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#2E2784",
        marginLeft: -6,
        marginTop: -6,
        opacity: 0,
        transform: "translate(-100px, -100px)",
        transition: "background 0.2s ease, opacity 0.3s ease",
        willChange: "transform",
      }}
    />
  );
}
