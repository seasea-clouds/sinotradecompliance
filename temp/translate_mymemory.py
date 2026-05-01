#!/usr/bin/env python3
"""Translate remaining locale files using MyMemory free API (no key needed)."""

import json
import urllib.request
import urllib.parse
import time
import sys

BASE_DIR = "/root/projects/trade/sinotradecompliance"
NEW_NS = ["About", "Faq", "Home", "Packages", "ServiceBrand", "ServiceCcc",
           "ServiceCommon", "ServiceCosmetics", "ServiceEcommerce", "ServiceGacc",
           "ServiceLabel", "Services", "ThankYou"]
OLD_NS = ["Hero", "Problem", "Solution"]

LANG_MAP = {
    "be": "be", "bg": "bg", "ka": "ka", "ms": "ms", "ne": "ne",
    "no": "no", "si": "si", "sk": "sk", "ta": "ta", "th": "th", "uk": "uk",
}

en = json.load(open(f"{BASE_DIR}/messages/en.json"))

def translate_batch(texts, target_lang):
    """Translate a list of texts. Join with ||| separator for efficiency."""
    if not texts:
        return []
    
    separator = " ||| "
    combined = separator.join(texts)
    
    # MyMemory max 500 chars per request, so split into chunks
    results = []
    chunks = []
    current_chunk = []
    current_len = 0
    
    for text in texts:
        # Each text + separator
        text_len = len(text.encode('utf-8'))
        if current_len + text_len > 450 and current_chunk:
            chunks.append(current_chunk)
            current_chunk = [text]
            current_len = text_len
        else:
            current_chunk.append(text)
            current_len += text_len
    
    if current_chunk:
        chunks.append(current_chunk)
    
    for chunk in chunks:
        combined = separator.join(chunk)
        encoded = urllib.parse.quote(combined)
        url = f"https://api.mymemory.translated.net/get?q={encoded}&langpair=en|{target_lang}"
        
        for attempt in range(3):
            try:
                req = urllib.request.Request(url)
                with urllib.request.urlopen(req, timeout=30) as resp:
                    result = json.loads(resp.read())
                    translated = result.get('responseData', {}).get('translatedText', '')
                    if translated:
                        results.extend(translated.split(separator))
                        break
                    else:
                        raise Exception(f"Empty response: {result}")
            except Exception as e:
                print(f"    API error (attempt {attempt+1}): {e}")
                if attempt < 2:
                    time.sleep(3)
                else:
                    # Return originals for this chunk
                    results.extend(chunk)
        
        time.sleep(1.2)  # Rate limit
    
    return results[:len(texts)]  # Ensure same length

def process_locale(code, lang_code):
    filepath = f"{BASE_DIR}/messages/{code}.json"
    current = json.load(open(filepath))
    
    ns_to_add = [ns for ns in NEW_NS if ns not in current]
    if not ns_to_add:
        print(f"  {code}: already complete ({len(current)} keys)")
        return True
    
    print(f"  {code}: adding {len(ns_to_add)} namespaces")
    
    for ns in ns_to_add:
        ns_data = en.get(ns, {})
        if not ns_data:
            continue
        
        keys = list(ns_data.keys())
        values = [ns_data[k] for k in keys]
        
        translated = translate_batch(values, lang_code)
        
        current[ns] = {}
        for i, key in enumerate(keys):
            current[ns][key] = translated[i] if i < len(translated) else values[i]
        
        print(f"    {ns}: {len(keys)} keys translated")
        time.sleep(0.5)
    
    # Remove obsolete namespaces that don't exist in en.json
    for ns in OLD_NS:
        if ns in current and ns not in en:
            del current[ns]
    
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(current, f, ensure_ascii=False, indent=2)
    
    final = json.load(open(filepath))
    print(f"  {code}: final {len(final)} keys")
    return True

def main():
    print(f"Starting translation of {len(LANG_MAP)} locales via MyMemory API")
    results = {}
    
    for code, lang_code in LANG_MAP.items():
        success = process_locale(code, lang_code)
        results[code] = success
    
    print("\n" + "="*50)
    print("Summary:")
    for code, ok in results.items():
        filepath = f"{BASE_DIR}/messages/{code}.json"
        keys = len(json.load(open(filepath)))
        status = "✅" if ok and keys >= 18 else "❌"
        print(f"  {status} {code}: {keys} keys")

if __name__ == "__main__":
    main()
