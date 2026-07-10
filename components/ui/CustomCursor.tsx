"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type CursorState = "default" | "explore" | "cta" | "link";
type CursorTheme = "default" | "yellow" | "purple";

export function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState<CursorTheme>(() => {
    if (typeof document === "undefined") return "default";
    const t = document.body.dataset.cursorTheme;
    return t === "yellow" || t === "purple" ? t : "default";
  });

  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.5 });
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 500, mass: 0.3 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 500, mass: 0.3 });

  useEffect(() => {
    const readTheme = (): CursorTheme => {
      const t = document.body.dataset.cursorTheme;
      return t === "yellow" || t === "purple" ? t : "default";
    };

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const nextTheme = readTheme();
      if (nextTheme !== theme) setTheme(nextTheme);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest("[data-cursor]") as HTMLElement | null;
      const nextTheme = readTheme();
      if (nextTheme !== theme) setTheme(nextTheme);
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
  }, [mouseX, mouseY, visible, theme]);

  const size = state === "explore" ? 80 : state === "cta" ? 64 : state === "link" ? 44 : 32;

  const ringColor =
    theme === "yellow" ? "rgba(248,174,1,0.95)" :
    theme === "purple" ? "rgba(46,39,132,0.9)" :
    "rgba(255,255,255,0.9)";
  const dotColor =
    theme === "yellow" ? "#F8AE01" :
    theme === "purple" ? "#2E2784" :
    "#ffffff";

  const bg =
    theme === "yellow" && state === "cta" ? "rgba(248,174,1,0.9)" :
    theme === "purple" && state === "cta" ? "#2E2784" :
    state === "explore" ? (theme === "purple" ? "rgba(46,39,132,0.12)" : "rgba(255,255,255,0.15)") :
    state === "cta"     ? "#F8AE01" :
    state === "link"    ? (theme === "purple" ? "rgba(46,39,132,0.12)" : "rgba(255,255,255,0.15)") :
    "transparent";

  const border =
    state === "default" ? `2px solid ${ringColor}` :
    state === "link"    ? `2px solid ${theme === "yellow" ? "rgba(248,174,1,0.85)" : theme === "purple" ? "rgba(46,39,132,0.85)" : "rgba(255,255,255,0.8)"}` : "none";

  const labelColor = state === "explore" ? "#ffffff" : "#000000";

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
