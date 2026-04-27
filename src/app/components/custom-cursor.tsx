"use client";

import { useEffect, useRef } from "react";

// These hex values appear in G.blue / G.yellow as written in source — checked against the raw style attribute
const BLUE_FRAGMENTS = ["#2e2784", "#241f69", "#5b53bf", "rgb(46, 39, 132)", "rgb(36, 31, 105)", "rgb(91, 83, 191)"];
const YELLOW_FRAGMENTS = ["#f8ae01", "#ffd95a", "#de9800", "rgb(248, 174, 1)", "rgb(255, 217, 90)", "rgb(222, 152, 0)"];

function sectionCursorColor(section: Element): string | null {
  // Read the raw style attribute (React writes it as-is) and computed background-image
  const raw = (section.getAttribute("style") ?? "").toLowerCase();
  const computed = window.getComputedStyle(section).backgroundImage.toLowerCase();
  const bg = raw + " " + computed;

  if (BLUE_FRAGMENTS.some((f) => bg.includes(f))) return "#F8AE01"; // blue bg → yellow cursor
  if (YELLOW_FRAGMENTS.some((f) => bg.includes(f))) return "#2E2784"; // yellow bg → blue cursor
  return null;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<string>("#2E2784");

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    dot.style.opacity = "1";

    const getColor = (x: number, y: number): string => {
      // Walk up from the element under the cursor until we hit a <section>
      let node = document.elementFromPoint(x, y) as HTMLElement | null;
      while (node) {
        if (node.tagName === "SECTION") {
          return sectionCursorColor(node) ?? "#2E2784";
        }
        node = node.parentElement;
      }
      return "#2E2784";
    };

    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const color = getColor(e.clientX, e.clientY);
      if (color !== colorRef.current) {
        colorRef.current = color;
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
