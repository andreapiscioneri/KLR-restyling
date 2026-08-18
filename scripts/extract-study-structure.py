#!/usr/bin/env python3
"""Extracts, per case study, the heading->image-group and video structure
from a saved live-page HTML snapshot (klr-europe.com Elementor pages).
Read-only: prints a JSON report per case study, does not touch content files.
"""
import json, re, sys, os

CONTENT_DIR = os.path.join(os.path.dirname(__file__), "..", "content")
PAGES_DIR = "/tmp/case-pages"

THUMB_SUFFIX_RE = re.compile(r"-(\d+)x(\d+)\.(jpg|jpeg|png|webp)$", re.I)
NOISE_NAMES = ("KLR-Favicon", "KLR-Logosito", "KLR-HERO-SYMBOL", "Senza-titolo")

def full_size_images(chunk):
    urls = re.findall(r"https://klr-europe\.com/wp-content/uploads/[^\"'\s]+\.(?:jpg|jpeg|png|webp)", chunk)
    out = []
    seen = set()
    for u in urls:
        if any(n in u for n in NOISE_NAMES):
            continue
        if THUMB_SUFFIX_RE.search(u):
            continue
        if u not in seen:
            seen.add(u)
            out.append(u)
    return out

def videos_in(chunk):
    out = []
    for m in re.finditer(r"youtu\.be\\?/([\w-]+)", chunk):
        out.append(f"https://youtu.be/{m.group(1)}")
    for m in re.finditer(r"youtube\.com\\?/(?:watch\\?v=|embed\\?/)([\w-]+)", chunk):
        out.append(f"https://youtu.be/{m.group(1)}")
    for m in re.finditer(r"https://klr-europe\.com/wp-content/uploads/[^\"'\s]+\.mov", chunk):
        out.append(m.group(0))
    seen = set()
    dedup = []
    for v in out:
        if v not in seen:
            seen.add(v)
            dedup.append(v)
    return dedup

# Headings whose chunk is never a real gallery/video: footer CTA/social links,
# and "Overview" — that KPI section always re-embeds the page's hero cover
# image (already used as the study's main img), not a gallery item.
FOOTER_HEADINGS = {"are you ready to \nstart something new together?",
                    "key to loyalty in retail", "keep in touch", "links:", "overview"}

def extract(html):
    heads = [(m.start(), m.end(), re.sub("<[^>]+>", "", m.group(1)).strip())
             for m in re.finditer(r'<h[1-6][^>]*class="elementor-heading-title[^"]*"[^>]*>(.*?)</h[1-6]>', html, re.S)]
    # filter out pure-number headings (KPI stat blocks) and the page title (first)
    heads = [h for h in heads if h[2] and not h[2].isdigit()]
    result = {"headings": [h[2] for h in heads], "groups": [], "videos": []}
    for i, (start, end, label) in enumerate(heads):
        if label.strip().lower() in FOOTER_HEADINGS:
            continue
        chunk_end = heads[i + 1][0] if i + 1 < len(heads) else len(html)
        chunk = html[end:chunk_end]
        imgs = full_size_images(chunk)
        vids = videos_in(chunk)
        if imgs:
            result["groups"].append({"label": label, "images": imgs})
        if vids:
            # a heading with videos but no images is likely a caption for that video
            caption = label if not imgs else ""
            for v in vids:
                result["videos"].append({"url": v, "caption": caption})
    return result

def main():
    ids = sys.argv[1:]
    if not ids:
        ids = [f[:-5] for f in os.listdir(PAGES_DIR) if f.endswith(".html")]
    report = {}
    for sid in ids:
        path = os.path.join(PAGES_DIR, f"{sid}.html")
        if not os.path.exists(path):
            report[sid] = {"error": "no html"}
            continue
        html = open(path, encoding="utf-8").read()
        report[sid] = extract(html)
    print(json.dumps(report, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
