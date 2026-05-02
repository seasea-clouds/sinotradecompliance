#!/usr/bin/env python3
"""Translate 5 blog MDX articles from English to 47 languages.

Splits articles into paragraph-level chunks under 4000 chars,
translates each, and preserves MDX frontmatter + markdown structure.
"""

import os
import re
import sys
import time
from pathlib import Path

from deep_translator import GoogleTranslator

BLOG_DIR = Path("content/blog/en")
OUTPUT_BASE = Path("content/blog")

# All non-English locale codes
LOCALES = [
    "zh", "ja", "ko", "ru", "es", "fr", "de", "ar",
    "af", "az", "be", "bg", "bn", "ca", "cs", "da", "el",
    "et", "fa", "fi", "he", "hi", "hr", "hu", "hy", "id",
    "it", "ka", "lo", "lt", "lv", "ms", "my", "ne", "nl",
    "no", "pl", "pt", "ro", "si", "sk", "sl", "sq", "sr",
    "sv", "sw", "ta", "th", "tr", "uk", "ur", "vi"
]

# Google Translate code mapping (some differ from our locale codes)
GOOGLE = {
    "zh": "zh-CN", "ja": "ja", "ko": "ko", "ru": "ru",
    "es": "es", "fr": "fr", "de": "de", "ar": "ar",
    "af": "af", "az": "az", "be": "be", "bg": "bg",
    "bn": "bn", "ca": "ca", "cs": "cs", "da": "da",
    "el": "el", "et": "et", "fa": "fa", "fi": "fi",
    "he": "iw", "hi": "hi", "hr": "hr", "hu": "hu",
    "hy": "hy", "id": "id", "it": "it", "ka": "ka",
    "lo": "lo", "lt": "lt", "lv": "lv", "ms": "ms",
    "my": "my", "ne": "ne", "nl": "nl", "no": "no",
    "pl": "pl", "pt": "pt", "ro": "ro", "si": "si",
    "sk": "sk", "sl": "sl", "sq": "sq", "sr": "sr",
    "sv": "sv", "sw": "sw", "ta": "ta", "th": "th",
    "tr": "tr", "uk": "uk", "ur": "ur", "vi": "vi",
}

MAX_CHUNK = 4000  # Keep well under Google's 5000 limit


def parse_frontmatter(text):
    """Return (dict, body_text) from MDX with YAML frontmatter."""
    m = re.match(r'^---\n(.*?)\n---\n(.*)', text, re.DOTALL)
    if not m:
        return None, text
    fm = {}
    for line in m.group(1).split('\n'):
        if ':' in line:
            k, _, v = line.partition(':')
            fm[k.strip()] = v.strip().strip('"').strip("'")
    return fm, m.group(2)


def build_frontmatter(fm):
    lines = ["---"]
    for k in ("title", "slug", "date", "category", "excerpt", "coverImage"):
        if k in fm:
            lines.append(f'{k}: "{fm[k]}"')
    lines.append("---")
    return "\n".join(lines) + "\n"


def split_into_chunks(body):
    """Split body into translatable chunks, each under MAX_CHUNK chars.
    
    Respects paragraph boundaries (\n\n) to avoid splitting mid-paragraph.
    """
    # Split by double-newline (paragraph boundaries)
    parts = re.split(r'(\n\n)', body)
    chunks = []
    current = ""
    
    for part in parts:
        if len(current) + len(part) > MAX_CHUNK and current.strip():
            chunks.append(current.strip())
            current = part
        else:
            current += part
    
    if current.strip():
        chunks.append(current.strip())
    
    return chunks


def translate_chunk(text, target_code):
    """Translate a single chunk with retry."""
    for attempt in range(3):
        try:
            t = GoogleTranslator(source="en", target=target_code)
            return t.translate(text)
        except Exception as e:
            if attempt < 2:
                time.sleep(2 * (attempt + 1))
            else:
                print(f"    ⚠️  translate failed after 3 retries: {e}")
                return text


def translate_article(filepath, locale, gcode):
    """Translate one MDX article to one locale."""
    text = filepath.read_text()
    fm, body = parse_frontmatter(text)
    if fm is None:
        return False
    
    # Translate frontmatter fields (short strings)
    for key in ("title", "excerpt", "category"):
        if key in fm:
            fm[key] = translate_chunk(fm[key], gcode)
            time.sleep(0.3)
    
    # Translate body in chunks
    chunks = split_into_chunks(body)
    translated_chunks = []
    for i, chunk in enumerate(chunks):
        t = translate_chunk(chunk, gcode)
        translated_chunks.append(t)
        if i < len(chunks) - 1:
            time.sleep(0.5)
    
    translated_body = "\n\n".join(translated_chunks)
    
    # Write output
    out_dir = OUTPUT_BASE / locale
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / filepath.name).write_text(build_frontmatter(fm) + "\n" + translated_body)
    return True


def main():
    articles = sorted(BLOG_DIR.glob("*.mdx"))
    n_articles = len(articles)
    n_langs = len(LOCALES)
    total = n_articles * n_langs
    done = 0
    
    print(f"📚 {n_articles} articles × {n_langs} languages = {total} translations")
    print()
    
    for art in articles:
        print(f"\n{'='*60}")
        print(f"📝 {art.name}")
        print(f"{'='*60}")
        
        for locale in LOCALES:
            gcode = GOOGLE[locale]
            done += 1
            start = time.time()
            
            ok = translate_article(art, locale, gcode)
            elapsed = time.time() - start
            
            status = "✅" if ok else "⚠️"
            print(f"  [{done:>3}/{total}] {locale:>5}  {status}  {elapsed:.1f}s")
            
            # Rate limit: at least 1s between articles per language
            time.sleep(max(0, 1.0 - elapsed))
    
    print(f"\n🎉 Done! {done} translations complete")


if __name__ == "__main__":
    os.chdir("/root/projects/trade/sinotradecompliance")
    main()
