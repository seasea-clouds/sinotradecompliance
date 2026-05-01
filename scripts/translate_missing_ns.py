#!/usr/bin/env python3
"""Translate missing namespaces into 16 language files using DashScope API."""

import json
import time
import urllib.request
import sys
import os

MESSAGES_DIR = os.path.dirname(os.path.abspath(__file__)) + "/../messages"
API_URL = "https://coding.dashscope.aliyuncs.com/v1/chat/completions"
MODEL = "qwen3.5-plus"

# Read API key from config
def get_api_key():
    key = os.environ.get("DASHSCOPE_API_KEY", "")
    if not key:
        with open("/root/.openclaw/openclaw.json") as f:
            cfg = json.load(f)
        key = cfg.get("models", {}).get("providers", {}).get("bailian", {}).get("apiKey", "")
    return key

API_KEY = get_api_key()

LANG_MAP = {
    "az": "Azerbaijani", "be": "Belarusian", "bg": "Bulgarian",
    "hi": "Hindi", "hy": "Armenian", "ka": "Georgian",
    "ms": "Malay", "ne": "Nepali", "no": "Norwegian",
    "si": "Sinhala", "sk": "Slovak", "sq": "Albanian",
    "ta": "Tamil", "th": "Thai", "uk": "Ukrainian", "ur": "Urdu",
}

NEW_NAMESPACES = [
    "About", "Faq", "Home", "Packages", "ServiceBrand", "ServiceCcc",
    "ServiceCommon", "ServiceCosmetics", "ServiceEcommerce", "ServiceGacc",
    "ServiceLabel", "Services", "ThankYou",
]

def call_dashscope(messages, temperature=0.1):
    """Call DashScope API."""
    payload = json.dumps({
        "model": MODEL,
        "messages": messages,
        "temperature": temperature,
    }).encode()
    req = urllib.request.Request(API_URL, data=payload, method="POST")
    req.add_header("Content-Type", "application/json")
    req.add_header("Authorization", f"Bearer {API_KEY}")
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                result = json.loads(resp.read())
                return result["choices"][0]["message"]["content"]
        except Exception as e:
            if attempt < 2:
                wait = 5 * (attempt + 1)
                print(f"  API error: {e}, retrying in {wait}s...")
                time.sleep(wait)
            else:
                raise

def translate_namespace(ns_data, lang_code, lang_name):
    """Translate an entire namespace JSON in one call."""
    input_json = json.dumps(ns_data, ensure_ascii=False, indent=2)
    prompt = (
        f"Translate the following JSON values from English to {lang_name}. "
        f"Keep the JSON keys exactly the same. Return ONLY the translated JSON, no markdown, no explanation. "
        f"Do not translate HTML tags like <span>, <br>, etc. if present."
    )
    messages = [
        {"role": "system", "content": "You are a professional translator. Output valid JSON only."},
        {"role": "user", "content": f"{prompt}\n\n```json\n{input_json}\n```"},
    ]
    response = call_dashscope(messages)
    # Clean response - strip markdown code blocks if present
    response = response.strip()
    if response.startswith("```"):
        response = response.split("\n", 1)[1] if "\n" in response else response[3:]
        if response.endswith("```"):
            response = response[:-3]
        response = response.strip()
    # Parse and validate
    translated = json.loads(response)
    assert len(translated) == len(ns_data), f"Key count mismatch: expected {len(ns_data)}, got {len(translated)}"
    return translated

def process_language(lang_code):
    """Add missing namespaces to a language file."""
    lang_name = LANG_MAP[lang_code]
    filepath = f"{MESSAGES_DIR}/{lang_code}.json"
    with open(filepath) as f:
        data = json.load(f)
    
    existing_keys = set(data.keys())
    missing = [ns for ns in NEW_NAMESPACES if ns not in existing_keys]
    
    if not missing:
        print(f"  {lang_code}: All 13 namespaces already present")
        return True
    
    print(f"  {lang_code}: {len(missing)} namespaces to translate ({', '.join(missing[:3])}...)")
    
    with open(f"{MESSAGES_DIR}/en.json") as f:
        en_data = json.load(f)
    
    success_count = 0
    for ns_name in missing:
        ns_data = en_data[ns_name]
        key_count = len(ns_data)
        print(f"    Translating {ns_name} ({key_count} keys) to {lang_name}...")
        try:
            translated = translate_namespace(ns_data, lang_code, lang_name)
            data[ns_name] = translated
            with open(filepath, "w") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                f.write("\n")
            success_count += 1
            print(f"    ✓ {ns_name} done")
        except Exception as e:
            print(f"    ✗ {ns_name} failed: {e}")
        time.sleep(2)  # Rate limit
    
    print(f"  {lang_code}: {success_count}/{len(missing)} succeeded")
    return success_count == len(missing)

def main():
    target_languages = sorted(LANG_MAP.keys())
    total = len(target_languages)
    print(f"Starting translation for {total} languages")
    
    results = {}
    for lang_code in target_languages:
        print(f"\n=== {lang_code} ({LANG_MAP[lang_code]}) ===")
        results[lang_code] = process_language(lang_code)
        time.sleep(1)
    
    # Summary
    print("\n" + "=" * 50)
    print("SUMMARY:")
    for lc, ok in results.items():
        status = "✓" if ok else "✗"
        print(f"  {status} {lc} ({LANG_MAP[lc]})")

if __name__ == "__main__":
    main()
