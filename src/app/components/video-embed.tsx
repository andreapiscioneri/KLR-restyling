// Turns a pasted video URL (YouTube, Vimeo, or a direct file link) into the
// right player. Editors naturally paste share links (youtube.com/watch?v=…,
// youtu.be/…, vimeo.com/…) which a plain <video> tag can't play — only
// direct .mp4/.webm/.mov files work there. This renders an <iframe> embed
// for the hosted-platform case and falls back to <video> otherwise.
export function VideoEmbed({ url, className, style }: { url: string; className?: string; style?: React.CSSProperties }) {
  const embed = toEmbedUrl(url);
  if (embed) {
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
