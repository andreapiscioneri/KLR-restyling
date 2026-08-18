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
      <source src={url} />
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
    return null;
  } catch {
    return null;
  }
}
