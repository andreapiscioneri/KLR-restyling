"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type CursorState = "default" | "explore" | "cta" | "link";

function getLuminance(el: Element | null): number {
  let node = el as HTMLElement | null;
  while (node) {
    const bg = getComputedStyle(node).backgroundColor;
    const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (m) {
      const r = +m[1], g = +m[2], b = +m[3];
      if (r + g + b > 0) return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
    node = node.parentElement;
  }
  return 1;
}

export function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [dark, setDark] = useState(false);
  const tickRef = useRef(false);

  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.5 });
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 500, mass: 0.3 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 500, mass: 0.3 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      if (!tickRef.current) {
        tickRef.current = true;
        requestAnimationFrame(() => {
          tickRef.current = false;
          const el = document.elementFromPoint(e.clientX, e.clientY);
          setDark(getLuminance(el) < 0.5);
        });
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest("[data-cursor]") as HTMLElement | null;
      if (closest) {
        setState((closest.dataset.cursor as CursorState) || "default");
      } else if (target.closest("a, button")) {
        setState("link");
      } else {
        setState("default");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseleave", onLeave);
    document.body.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseover", onMouseOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
      document.body.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [mouseX, mouseY, visible]);

  const size = state === "explore" ? 80 : state === "cta" ? 64 : state === "link" ? 44 : 32;

  const ringColor = dark ? "rgba(255,255,255,0.9)" : "rgba(46,39,132,0.7)";
  const dotColor = dark ? "#ffffff" : "#2E2784";

  const bg =
    state === "explore" ? (dark ? "rgba(255,255,255,0.15)" : "rgba(46,39,132,0.92)") :
    state === "cta"     ? "#F8AE01" :
    state === "link"    ? (dark ? "rgba(255,255,255,0.15)" : "rgba(248,174,1,0.15)") :
    "transparent";

  const border =
    state === "default" ? `2px solid ${ringColor}` :
    state === "link"    ? `2px solid ${dark ? "rgba(255,255,255,0.8)" : "#F8AE01"}` : "none";

  const labelColor = state === "explore" ? (dark ? "#ffffff" : "#ffffff") : "#000000";

  return (
    <>
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: size,
          background: bg,
          border,
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: size, height: size, background: bg }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {state === "explore" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ color: labelColor }}
            className="text-[10px] font-semibold tracking-widest uppercase select-none"
          >
            Explore
          </motion.span>
        )}
        {state === "cta" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-black text-[10px] font-bold tracking-widest uppercase select-none"
          >
            Open
          </motion.span>
        )}
      </motion.div>

      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          background: dotColor,
          opacity: visible && state === "default" ? 1 : 0,
        }}
      />
    </>
  );
}
