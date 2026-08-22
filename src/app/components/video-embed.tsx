"use client";

import { Play } from "lucide-react";
import { useConsentCategories } from "@/components/layout/CookieConsent";
import {
  DURATION_MONTHS,
  LEVEL_PRESETS,
  makeConsentId,
  makeExpiry,
  readConsent,
  writeConsent,
} from "@/lib/cookie-consent";

// Grants marketing ("ads") consent so an embedded 3rd-party player (YouTube,
// Vimeo, Instagram, Facebook) can load. Preserves any existing consent
// record's other categories/duration instead of overwriting the user's choice.
function allowEmbedConsent() {
  const existing = readConsent();
  const base = existing ?? {
    id: makeConsentId(),
    level: "custom" as const,
    duration: "1m" as const,
    categories: LEVEL_PRESETS.silver,
    consentedAt: new Date().toISOString(),
    expiresAt: makeExpiry("1m"),
  };
  writeConsent({
    ...base,
    level: "custom",
    categories: { ...base.categories, ads: true },
    consentedAt: existing ? base.consentedAt : new Date().toISOString(),
    expiresAt: existing ? base.expiresAt : makeExpiry(base.duration),
  });
}

function EmbedConsentPlaceholder({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#11111a", color: "#fff", textAlign: "center", padding: "1.5rem" }}
    >
      <Play className="w-8 h-8" strokeWidth={1.5} />
      <p className="text-sm max-w-xs opacity-90">
        This content is hosted by a third party and requires marketing cookies to load.
      </p>
      <button
        type="button"
        onClick={allowEmbedConsent}
        className="text-xs font-semibold rounded-full px-4 py-2"
        style={{ background: "#F8AE01", color: "#111" }}
      >
        Allow &amp; play
      </button>
    </div>
  );
}

// Turns a pasted video URL (YouTube, Vimeo, or a direct file link) into the
// right player. Editors naturally paste share links (youtube.com/watch?v=…,
// youtu.be/…, vimeo.com/…) which a plain <video> tag can't play — only
// direct .mp4/.webm/.mov files work there. This renders an <iframe> embed
// for the hosted-platform case and falls back to <video> otherwise.
// 3rd-party iframe embeds set cross-site tracking cookies on load, so they're
// gated behind marketing ("ads") consent, same as any other 3rd-party script.
export function VideoEmbed({ url, className, style }: { url: string; className?: string; style?: React.CSSProperties }) {
  const categories = useConsentCategories();
  const embed = toEmbedUrl(url);
  if (embed) {
    if (!categories?.ads) {
      return <EmbedConsentPlaceholder className={className} style={style} />;
    }
    return (
      <iframe
        src={embed}
        className={className}
        style={style}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }
  return (
    <video className={className} style={style} controls preload="metadata" playsInline>
      {/* .mov files are served as video/quicktime, which Chrome and Firefox
          refuse to play natively (only Safari does) — even though the file
          itself is perfectly valid and reachable. Most .mov exports (iPhone,
          screen recordings) are H.264 video in a QuickTime container, which
          is close enough to MP4's ISO base media format that forcing
          type="video/mp4" here lets non-Safari browsers decode it anyway,
          instead of silently refusing the source and showing a blank player. */}
      <source src={url} type={url.toLowerCase().endsWith(".mov") ? "video/mp4" : undefined} />
    </video>
  );
}

function toEmbedUrl(raw: string): string | null {
  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (url.pathname.startsWith("/shorts/") || url.pathname.startsWith("/embed/")) {
        const id = url.pathname.split("/").pop();
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
    }
    if (host === "vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean).pop();
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
    }
    if (host === "player.vimeo.com") {
      return raw;
    }
    if (host === "instagram.com") {
      const m = url.pathname.match(/^\/(p|reel|tv)\/([\w-]+)/);
      return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed` : null;
    }
    if (host === "facebook.com" || host === "fb.watch") {
      if (url.pathname.startsWith("/plugins/")) return raw;
      return `https://www.facebook.com/plugins/${/\/videos?\//.test(url.pathname) || url.pathname.startsWith("/reel/") ? "video" : "post"}.php?href=${encodeURIComponent(raw)}&show_text=false`;
    }
    return null;
  } catch {
    return null;
  }
}
