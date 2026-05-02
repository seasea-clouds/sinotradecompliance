#!/usr/bin/env python3
"""Post-build script: inject hreflang <link> tags into static HTML output."""
import json
import os
import re
import sys
from pathlib import Path

LOCALES = [
    "en", "zh", "ja", "ko", "ar", "ru", "es", "fr", "de", "pt", "it", "nl",
    "pl", "tr", "vi", "th", "id", "ms", "hi", "bn", "ta", "te", "mr", "gu",
    "kn", "ml", "pa", "ur", "fa", "he", "el", "cs", "hu", "ro", "uk", "sv",
    "da", "fi", "no", "sk", "sr", "hr", "bg", "ca", "et", "lt", "lv", "sl"
]

BASE = "https://sinotradecompliance.com"
OUT = Path(__file__).parent.parent / "out"


def build_hreflang(route_template: str) -> str:
    links = []
    for loc in LOCALES:
        url = BASE + route_template.replace("{}", loc)
        links.append(f'<link rel="alternate" hreflang="{loc}" href="{url}"/>')
    return "\n".join(links)


def inject_hreflang(html: str, hreflang_block: str) -> str:
    # Next.js SSG export uses charSet (camelCase)
    marker = '<meta charSet="utf-8"/>'
    if marker in html:
        return html.replace(marker, f'{marker}\n{hreflang_block}', 1)
    # Fallback: insert at the very beginning
    return hreflang_block + "\n" + html


def main():
    if not OUT.exists():
        print("out/ directory not found. Run 'next build' first.")
        sys.exit(1)

    count = 0

    # 1. Blog index pages: /{locale}/blog/
    for loc in LOCALES:
        index_file = OUT / loc / "blog" / "index.html"
        if index_file.exists():
            html = index_file.read_text()
            hreflang = build_hreflang("/{}/blog/")
            if "hreflang" not in html:
                index_file.write_text(inject_hreflang(html, hreflang))
                count += 1

    # 2. Blog article pages: /{locale}/blog/{slug}/
    blog_dir = OUT / "en" / "blog"
    if blog_dir.exists():
        for entry in blog_dir.iterdir():
            if entry.is_dir() and entry.name not in ("index.html",):
                slug = entry.name
                for loc in LOCALES:
                    article_file = OUT / loc / "blog" / slug / "index.html"
                    if article_file.exists():
                        html = article_file.read_text()
                        hreflang = build_hreflang("/{}/blog/" + slug + "/")
                        if "hreflang" not in html:
                            article_file.write_text(inject_hreflang(html, hreflang))
                            count += 1

    print(f"✅ Injected hreflang into {count} HTML files")


if __name__ == "__main__":
    main()
