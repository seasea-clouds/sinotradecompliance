#!/usr/bin/env python3
"""Translate 5 blog MDX articles into 47 non-English languages.
Preserves MDX frontmatter structure and markdown formatting.
Uses deep_translator GoogleTranslator with rate limiting.
"""

import json
import os
import re
import sys
import time
from pathlib import Path
from deep_translator import GoogleTranslator

BLOG_DIR = Path("/root/projects/trade/sinotradecompliance/content/blog")
EN_DIR = BLOG_DIR / "en"
MESSAGES_DIR = Path("/root/projects/trade/sinotradecompliance/messages")

# Map locale codes to Google Translate language codes
# deep_translator uses Google Translate v2 language codes
LOCALE_MAP = {
    "af": "af", "ar": "ar", "az": "az", "be": "be", "bg": "bg",
    "bn": "bn", "ca": "ca", "cs": "cs", "da": "da", "de": "de",
    "el": "el", "es": "es", "et": "et", "fa": "fa", "fi": "fi",
    "fr": "fr", "he": "he", "hi": "hi", "hr": "hr", "hu": "hu",
    "hy": "hy", "id": "id", "it": "it", "ja": "ja", "ka": "ka",
    "ko": "ko", "ms": "ms", "ne": "ne", "nl": "nl", "no": "no",
    "pl": "pl", "pt": "pt", "ro": "ro", "ru": "ru", "si": "si",
    "sk": "sk", "sl": "sl", "sq": "sq", "sr": "sr", "sv": "sv",
    "sw": "sw", "ta": "ta", "th": "th", "tr": "tr", "uk": "uk",
    "ur": "ur", "vi": "vi", "zh": "zh-CN",
    "he": "iw",  # deep_translator uses 'iw' for Hebrew
}

# Frontmatter fields to translate (slug and coverImage stay as-is)
TRANSLATE_FIELDS = {"title", "category", "excerpt"}


def get_target_locales():
    """Get all 47 non-English locale codes from messages directory."""
    locales = []
    for f in sorted(MESSAGES_DIR.iterdir()):
        code = f.stem
        if code != "en" and code in LOCALE_MAP:
            locales.append(code)
    return locales


def parse_mdx(content):
    """Parse MDX file into frontmatter dict and body string."""
    match = re.match(r'^---\n(.*?)\n---\n(.*)', content, re.DOTALL)
    if not match:
        raise ValueError(f"Invalid MDX format: no frontmatter found")
    fm_text = match.group(1)
    body = match.group(2)

    frontmatter = {}
    for line in fm_text.split("\n"):
        if ":" in line:
            key, val = line.split(":", 1)
            key = key.strip()
            val = val.strip().strip('"').strip("'")
            frontmatter[key] = val

    return frontmatter, body


def build_mdx(frontmatter, body):
    """Rebuild MDX content from frontmatter dict and body string."""
    fm_lines = []
    for key, val in frontmatter.items():
        # Quote values that contain spaces
        if " " in val:
            fm_lines.append(f'{key}: "{val}"')
        else:
            fm_lines.append(f"{key}: {val}")
    fm_text = "\n".join(fm_lines)
    return f"---\n{fm_text}\n---\n\n{body}"


def translate_text(text, target_lang, translator=None):
    """Translate text to target language. Split into chunks if too long."""
    if not translator:
        translator = GoogleTranslator(source="en", target=target_lang)

    # Google Translate has a ~5000 char limit per request
    # Split by paragraphs to stay under limit
    max_chunk = 4000
    if len(text) <= max_chunk:
        try:
            result = translator.translate(text)
            return result if result else text
        except Exception as e:
            print(f"  ⚠ Translation error: {e}, skipping")
            return text

    # Split into paragraphs and translate each
    paragraphs = text.split("\n\n")
    results = []
    current_chunk = ""

    for para in paragraphs:
        if len(current_chunk) + len(para) + 2 <= max_chunk:
            current_chunk += ("\n\n" if current_chunk else "") + para
        else:
            if current_chunk:
                try:
                    translated = translator.translate(current_chunk)
                    results.append(translated if translated else current_chunk)
                except Exception as e:
                    print(f"  ⚠ Chunk translation error: {e}")
                    results.append(current_chunk)
            current_chunk = para

    if current_chunk:
        try:
            translated = translator.translate(current_chunk)
            results.append(translated if translated else current_chunk)
        except Exception as e:
            print(f"  ⚠ Chunk translation error: {e}")
            results.append(current_chunk)

    return "\n\n".join(results)


def translate_article(en_file_path, locale_code, translator):
    """Translate one MDX article to target locale."""
    with open(en_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    frontmatter, body = parse_mdx(content)

    # Translate frontmatter fields
    target_lang = LOCALE_MAP.get(locale_code)
    if not target_lang:
        print(f"  ⏭ Skipping {locale_code}: no translator mapping")
        return False

    translator_obj = GoogleTranslator(source="en", target=target_lang)

    # Translate frontmatter fields
    for field in TRANSLATE_FIELDS:
        if field in frontmatter:
            translated = translate_text(frontmatter[field], target_lang, translator_obj)
            frontmatter[field] = translated
            time.sleep(0.5)  # Rate limit

    # Translate body in sections (preserve markdown headers structure)
    # Split by ## headers to keep structure
    sections = re.split(r'(\n## .+?\n)', body)
    translated_sections = []

    for section in sections:
        if re.match(r'\n## .+?\n', section):
            # This is a header - translate it
            header_match = re.match(r'\n(## .+?)\n', section)
            if header_match:
                header_text = header_match.group(1)
                # Extract the actual text after ##
                header_content_match = re.match(r'## (.+)', header_text)
                if header_content_match:
                    header_text_only = header_content_match.group(1)
                    translated_header = translate_text(header_text_only, target_lang, translator_obj)
                    translated_sections.append(f"\n## {translated_header}\n")
                    time.sleep(0.5)
                else:
                    translated_sections.append(section)
            else:
                translated_sections.append(section)
        elif section.strip():
            # Content section - translate
            translated = translate_text(section, target_lang, translator_obj)
            translated_sections.append(translated)
            time.sleep(0.5)
        else:
            translated_sections.append(section)

    translated_body = "".join(translated_sections)

    # Build output
    output = build_mdx(frontmatter, translated_body)

    # Write file
    locale_dir = BLOG_DIR / locale_code
    locale_dir.mkdir(exist_ok=True)

    output_path = locale_dir / en_file_path.name
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(output)

    return True


def main():
    locales = get_target_locales()
    print(f"Target locales: {len(locales)}")

    # Get all English articles
    en_articles = sorted([f.name for f in EN_DIR.iterdir() if f.name.endswith(".mdx")])
    print(f"English articles: {len(en_articles)}")
    for a in en_articles:
        print(f"  - {a}")

    total_files = 0
    total_skipped = 0
    total_errors = 0

    for locale in locales:
        locale_dir = BLOG_DIR / locale
        locale_dir.mkdir(exist_ok=True)

        for article in en_articles:
            en_path = EN_DIR / article
            output_path = locale_dir / article

            # Skip if file already exists and is non-empty
            if output_path.exists() and output_path.stat().st_size > 100:
                print(f"  ✓ {locale}/{article} (already exists)")
                total_skipped += 1
                continue

            print(f"  🔄 Translating {article} → {locale}...")
            try:
                success = translate_article(en_path, locale, None)
                if success:
                    total_files += 1
                    print(f"  ✅ {locale}/{article}")
                else:
                    total_skipped += 1
            except Exception as e:
                total_errors += 1
                print(f"  ❌ {locale}/{article}: {e}")

            # Rate limit between articles
            time.sleep(1)

        print(f"--- Completed locale: {locale} ---")

    print(f"\n=== Summary ===")
    print(f"Files created: {total_files}")
    print(f"Files skipped (already existed): {total_skipped}")
    print(f"Errors: {total_errors}")


if __name__ == "__main__":
    main()
