#!/usr/bin/env python3
"""
Translate missing namespaces from en.json into 11 language files.
Strategy: Batch each entire namespace into one MyMemory request.
Format: key<TAB>value lines, translate whole block, parse back.
"""

import json
import time
import urllib.request
import urllib.parse
import sys
import re

MESSAGES_DIR = "/root/projects/trade/sinotradecompliance/messages"
MYMEMORY_API = "https://api.mymemory.translated.net/get"

LANGUAGES = {
    "be": "Belarusian", "bg": "Bulgarian", "ka": "Georgian", "ms": "Malay",
    "ne": "Nepali", "no": "Norwegian", "si": "Sinhala", "sk": "Slovak",
    "ta": "Tamil", "th": "Thai", "uk": "Ukrainian",
}

with open(f"{MESSAGES_DIR}/en.json", encoding="utf-8") as f:
    en_data = json.load(f)

with open(f"{MESSAGES_DIR}/be.json", encoding="utf-8") as f:
    be_data = json.load(f)

ALL_NS = list(en_data.keys())
MISSING_NS = [ns for ns in ALL_NS if ns not in be_data]
print(f"Missing namespaces: {MISSING_NS}")


def flatten(obj, prefix=""):
    """Flatten nested dict into {key_path: value}."""
    items = {}
    for k, v in obj.items():
        full_key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            items.update(flatten(v, full_key))
        else:
            items[full_key] = v
    return items


def unflatten(flat):
    """Unflatten {key_path: value} back into nested dict."""
    result = {}
    for path, value in flat.items():
        keys = path.split(".")
        d = result
        for key in keys[:-1]:
            d = d.setdefault(key, {})
        d[keys[-1]] = value
    return result


def translate_batch(text: str, target_lang: str, retries=3) -> str:
    """Translate a block of text using MyMemory API with retry."""
    # MyMemory max 5000 chars per request
    if len(text) > 4500:
        # Split into chunks
        lines = text.split("\n")
        chunks = []
        current = []
        current_len = 0
        for line in lines:
            if current_len + len(line) > 4000 and current:
                chunks.append("\n".join(current))
                current = [line]
                current_len = len(line)
            else:
                current.append(line)
                current_len += len(line)
        if current:
            chunks.append("\n".join(current))
        
        results = []
        for chunk in chunks:
            results.append(translate_single(chunk, target_lang, retries))
            time.sleep(2)
        return "\n".join(results)
    
    return translate_single(text, target_lang, retries)


def translate_single(text: str, target_lang: str, retries=3) -> str:
    """Single MyMemory API call with retry on 429."""
    if not text.strip():
        return text
    
    encoded = urllib.parse.quote(text)
    url = f"{MYMEMORY_API}?q={encoded}&langpair=en|{target_lang}"
    
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=30) as resp:
                result = json.loads(resp.read())
            if result.get("responseStatus") == 200:
                return result["responseData"]["translatedText"]
            else:
                status = result.get("responseStatus")
                matches = result.get("matches", [])
                # If there are TM matches, use the best one
                if matches:
                    best = max(matches, key=lambda m: m.get("quality", 0))
                    return best.get("translation", text)
                print(f"    WARN: status={status}, attempt {attempt+1}/{retries}")
                if attempt < retries - 1:
                    time.sleep(3 * (attempt + 1))
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait = 5 * (attempt + 1)
                print(f"    429 rate limit, waiting {wait}s (attempt {attempt+1}/{retries})")
                time.sleep(wait)
            else:
                print(f"    HTTP Error {e.code}: {e}")
                if attempt < retries - 1:
                    time.sleep(3)
        except Exception as e:
            print(f"    ERROR: {e}")
            if attempt < retries - 1:
                time.sleep(3)
    
    return text  # Return original on failure


def translate_namespace(ns_data: dict, target_lang: str) -> dict:
    """Translate an entire namespace in one batched request."""
    flat = flatten(ns_data)
    
    # Build batch text: "key<TAB>value" per line
    lines = []
    key_order = []
    for key, value in flat.items():
        lines.append(f"{key}\t{value}")
        key_order.append(key)
    
    batch_text = "\n".join(lines)
    print(f"    Batch size: {len(batch_text)} chars, {len(lines)} values")
    
    # Translate entire batch
    translated_text = translate_batch(batch_text, target_lang)
    
    # Parse back
    result = {}
    translated_lines = translated_text.split("\n")
    for i, line in enumerate(translated_lines):
        if i < len(key_order):
            # Split on first tab only
            parts = line.split("\t", 1)
            if len(parts) == 2:
                result[key_order[i]] = parts[1]
            else:
                # Fallback: the key might have been translated too
                result[key_order[i]] = line
    
    # Fill any missing keys with original values
    for key in key_order:
        if key not in result:
            result[key] = flat[key]
    
    return unflatten(result)


# Process each language
for lang_code, lang_name in LANGUAGES.items():
    filepath = f"{MESSAGES_DIR}/{lang_code}.json"
    print(f"\n{'='*60}")
    print(f"=== {lang_name} ({lang_code}) ===")
    print(f"{'='*60}")
    
    with open(filepath, encoding="utf-8") as f:
        lang_data = json.load(f)
    
    existing_count = len(lang_data)
    
    for ns in MISSING_NS:
        print(f"\n  [{ns}]")
        translated = translate_namespace(en_data[ns], lang_code)
        lang_data[ns] = translated
        print(f"  -> Added {len(flatten(translated))} keys")
        time.sleep(4)  # Delay between namespaces
    
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(lang_data, f, ensure_ascii=False, indent=2)
    
    print(f"\n  ✅ Wrote {filepath} — {len(lang_data)} namespaces total")

# Final validation
print(f"\n{'='*60}")
print("FINAL VALIDATION")
print(f"{'='*60}")
expected = len(ALL_NS)
for lang_code in sorted(LANGUAGES.keys()):
    with open(f"{MESSAGES_DIR}/{lang_code}.json", encoding="utf-8") as f:
        data = json.load(f)
    status = "✅" if len(data) == expected else "❌"
    print(f"  {status} {lang_code}: {len(data)} namespaces (expected {expected})")
