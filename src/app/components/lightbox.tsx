"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxState = { images: string[]; index: number } | null;

export function Lightbox({ state, onClose, onNavigate }: {
  state: LightboxState;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!state) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((state!.index - 1 + state!.images.length) % state!.images.length);
      if (e.key === "ArrowRight") onNavigate((state!.index + 1) % state!.images.length);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [state, onClose, onNavigate]);

  if (!state || !mounted) return null;
  const { images, index } = state;
  const src = images[index];

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      <button type="button" onClick={onClose} aria-label="Chiudi"
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
        <X size={20} />
      </button>
      {images.length > 1 && (
        <button type="button" aria-label="Immagine precedente"
          onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + images.length) % images.length); }}
          className="absolute left-3 md:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
          <ChevronLeft size={22} />
        </button>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="max-w-full max-h-full object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
      {images.length > 1 && (
        <button type="button" aria-label="Immagine successiva"
          onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % images.length); }}
          className="absolute right-3 md:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
          <ChevronRight size={22} />
        </button>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-tight">
          {index + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  );
}
