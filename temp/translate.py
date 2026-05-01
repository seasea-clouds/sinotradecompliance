#!/usr/bin/env python3
"""Translate remaining locale files to 18 namespaces using DashScope API."""

import json
import urllib.request
import urllib.error
import time
import sys

BASE_DIR = "/root/projects/trade/sinotradecompliance"
API_KEY = "sk-sp-c65907b42bab47beb754acd6dca3a1eb"
API_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"
MODEL = "qwen-turbo"

REMAINING = {
    "be": "Belarusian",
    "bg": "Bulgarian",
    "ka": "Georgian",
    "ms": "Malay",
    "ne": "Nepali",
    "no": "Norwegian",
    "si": "Sinhala",
    "sk": "Slovak",
    "ta": "Tamil",
    "th": "Thai",
    "uk": "Ukrainian",
}

NEW_NS = ["About", "Faq", "Home", "Packages", "ServiceBrand", "ServiceCcc",
           "ServiceCommon", "ServiceCosmetics", "ServiceEcommerce", "ServiceGacc",
           "ServiceLabel", "Services", "ThankYou"]

KEEP_NS = ["Common", "Expert", "Footer", "LeadMagnet", "Navbar",
           "Hero", "Problem", "Solution"]

en = json.load(open(f"{BASE_DIR}/messages/en.json"))

def translate_batch(items, target_lang):
    """Translate a list of (key, value) pairs to target language."""
    if not items:
        return {}
    input_json = json.dumps({k: v for k, v in items}, ensure_ascii=False, indent=2)
    prompt = f"""Translate the following JSON values from English to {target_lang}.
Rules:
- Keep all JSON keys EXACTLY as they are.
- Only translate the values.
- Preserve all HTML tags like <br/> and formatting.
- Return ONLY valid JSON, no markdown code fences, no explanation.

Input JSON:
{input_json}"""

    data = json.dumps({
        "model": MODEL,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.3,
        "max_tokens": 4000,
    }).encode()

    req = urllib.request.Request(API_URL, data=data, method="POST")
    req.add_header("Content-Type", "application/json")
    req.add_header("Authorization", f"Bearer {API_KEY}")

    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                result = json.loads(resp.read())
                content = result["choices"][0]["message"]["content"].strip()
                # Remove markdown fences if present
                if content.startswith("```"):
                    lines = content.split("\n")
                    if lines[0].startswith("```"):
                        lines = lines[1:]
                    if lines and lines[-1].startswith("```"):
                        lines = lines[:-1]
                    content = "\n".join(lines)
                parsed = json.loads(content)
                return parsed
        except Exception as e:
            print(f"  Attempt {attempt+1} failed: {e}")
            if attempt < 2:
                time.sleep(5 * (attempt + 1))
    return None

def process_locale(code, lang_name):
    filepath = f"{BASE_DIR}/messages/{code}.json"
    current = json.load(open(filepath))
    existing_keys = set(current.keys())
    print(f"\n{'='*50}")
    print(f"Processing {code} ({lang_name}) — currently {len(existing_keys)} keys")

    ns_to_add = [ns for ns in NEW_NS if ns not in existing_keys]
    if not ns_to_add:
        print(f"  All namespaces already present!")
        return True

    print(f"  Need to add {len(ns_to_add)} namespaces: {', '.join(ns_to_add)}")

    # Group namespaces into batches of ~3 to stay within token limits
    batch_size = 3
    for i in range(0, len(ns_to_add), batch_size):
        batch_ns = ns_to_add[i:i+batch_size]
        print(f"  Translating batch: {', '.join(batch_ns)}")

        # Collect all items for this batch
        all_items = []
        for ns in batch_ns:
            ns_data = en.get(ns, {})
            for key, value in ns_data.items():
                all_items.append((key, value))

        translated = translate_batch(all_items, lang_name)
        if translated is None:
            print(f"  FAILED to translate batch {i//batch_size + 1}")
            return False

        # Build new namespace objects
        idx = 0
        for ns in batch_ns:
            ns_data = en.get(ns, {})
            new_ns_data = {}
            for key in ns_data:
                if key in translated:
                    new_ns_data[key] = translated[key]
                else:
                    # Use English as fallback
                    new_ns_data[key] = ns_data[key]
                idx += 1
            current[ns] = new_ns_data

        print(f"  Batch {i//batch_size + 1} done")
        time.sleep(3)  # Rate limit

    # Remove obsolete namespaces
    for ns in ["Hero", "Problem", "Solution"]:
        if ns in current and ns not in en:
            del current[ns]
        elif ns in current and ns in KEEP_NS:
            pass  # keep

    # Write back
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(current, f, ensure_ascii=False, indent=2)

    # Verify
    final = json.load(open(filepath))
    print(f"  Final: {len(final)} keys")
    return len(final) >= 18

def main():
    print(f"Starting translation of {len(REMAINING)} locales")
    results = {}
    for code, lang_name in REMAINING.items():
        success = process_locale(code, lang_name)
        results[code] = success
        if not success:
            print(f"  Skipping remaining locales due to failure")
            break

    print("\n" + "="*50)
    print("Summary:")
    for code, ok in results.items():
        status = "✅" if ok else "❌"
        filepath = f"{BASE_DIR}/messages/{code}.json"
        keys = len(json.load(open(filepath)))
        print(f"  {status} {code}: {keys} keys")

if __name__ == "__main__":
    main()
