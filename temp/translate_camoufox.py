#!/usr/bin/env python3
"""Translate locale files using Camoufox browser + Google Translate."""

import json
import urllib.request
import time
import urllib.parse

BASE_DIR = "/root/projects/trade/sinotradecompliance"
CAMOUFOX = "http://localhost:9377"
USER_ID = "agent"
SESSION_KEY = "translate-session"

LANGS = [
    ("be", "Belarusian", "be"),
    ("bg", "Bulgarian", "bg"),
    ("ka", "Georgian", "ka"),
    ("ms", "Malay", "ms"),
    ("ne", "Nepali", "ne"),
    ("no", "Norwegian", "no"),
    ("si", "Sinhala", "si"),
    ("sk", "Slovak", "sk"),
    ("ta", "Tamil", "ta"),
    ("th", "Thai", "th"),
    ("uk", "Ukrainian", "uk"),
]

en = json.load(open(f"{BASE_DIR}/messages/en.json"))
NEW_NS = ["About","Faq","Home","Packages","ServiceBrand","ServiceCcc",
           "ServiceCommon","ServiceCosmetics","ServiceEcommerce","ServiceGacc",
           "ServiceLabel","Services","ThankYou"]

def camo(method, path, data=None):
    url = f"{CAMOUFOX}{path}"
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, method=method)
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"      API Error {e.code}: {e.read().decode()}")
        raise

def create_tab():
    tab = camo("POST", "/tabs", {
        "userId": USER_ID,
        "sessionKey": SESSION_KEY,
        "url": "https://translate.google.com"
    })
    return tab.get("tabId")

def translate_batch(texts, lang_code, tab_id):
    """Translate a list of texts by joining them with a unique separator."""
    if not texts:
        return []
    
    separator = " \x1f "  # Unit separator - unlikely in normal text
    combined = separator.join(texts)
    
    # Google Translate URL with the combined text
    url = f"https://translate.google.com/?sl=en&tl={lang_code}&text={urllib.parse.quote(combined)}&op=translate"
    
    try:
        camo("POST", f"/tabs/{tab_id}/navigate", {
            "userId": USER_ID,
            "sessionKey": SESSION_KEY,
            "url": url
        })
        time.sleep(3)  # Wait for translation
        
        # Extract translation via JavaScript
        js = """
        (function() {
            const spans = document.querySelectorAll('span[lang]');
            const results = [];
            const seen = new Set();
            for (const s of spans) {
                const lang = s.getAttribute('lang');
                const txt = s.textContent.trim();
                if (lang && lang !== 'en' && txt && !seen.has(txt)) {
                    seen.add(txt);
                    results.push(txt);
                }
            }
            return results.join('|||') || 'FAILED';
        })();
        """
        result = camo("POST", f"/tabs/{tab_id}/evaluate", {
            "userId": USER_ID,
            "sessionKey": SESSION_KEY,
            "expression": js
        })
        translated = result.get("result", "FAILED")
        
        if translated == "FAILED":
            print(f"      ⚠️ Translation failed")
            return texts  # Return originals
        
        # Split by the unique separator
        parts = translated.split("|||")
        # The translation might be one big block, try to split by separator
        if len(parts) == 1:
            # Try splitting by the unit separator in the result
            split_parts = parts[0].split("\x1f")
            if len(split_parts) == len(texts):
                return split_parts
            # If that doesn't work, return the single translation
            return parts
        
        return parts[:len(texts)]  # Ensure same length
    
    except Exception as e:
        print(f"      ❌ Error: {e}")
        return texts  # Return originals on error

def process_locale(code, lang_name, lang_code, tab_id):
    filepath = f"{BASE_DIR}/messages/{code}.json"
    current = json.load(open(filepath))
    
    ns_to_add = [ns for ns in NEW_NS if ns not in current]
    if not ns_to_add:
        print(f"  {code}: already complete ({len(current)} keys)")
        return True
    
    print(f"  {code} ({lang_name}): adding {len(ns_to_add)} namespaces")
    
    for ns in ns_to_add:
        ns_data = en.get(ns, {})
        if not ns_data:
            continue
        
        keys = list(ns_data.keys())
        values = [ns_data[k] for k in keys]
        
        # Translate all values as a batch
        translated_values = translate_batch(values, lang_code, tab_id)
        
        current[ns] = {}
        for i, key in enumerate(keys):
            current[ns][key] = translated_values[i] if i < len(translated_values) else values[i]
        
        print(f"    ✅ {ns}: {len(keys)} keys")
        time.sleep(1)  # Small delay between namespaces
    
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(current, f, ensure_ascii=False, indent=2)
    
    final = json.load(open(filepath))
    print(f"  ✅ {code}: final {len(final)} keys")
    return True

def main():
    print("Creating Camoufox tab for Google Translate...")
    tab_id = create_tab()
    print(f"Tab created: {tab_id}")
    time.sleep(2)
    
    results = {}
    for code, lang_name, lang_code in LANGS:
        print(f"\n{'='*50}")
        print(f"Processing {code} ({lang_name})...")
        try:
            success = process_locale(code, lang_name, lang_code, tab_id)
            results[code] = success
        except Exception as e:
            print(f"  ❌ {code} failed: {e}")
            results[code] = False
        print()
    
    # Close tab
    try:
        camo("DELETE", f"/tabs/{tab_id}")
    except:
        pass
    
    print("\n" + "="*60)
    print("Summary:")
    all_ok = True
    for code, ok in results.items():
        filepath = f"{BASE_DIR}/messages/{code}.json"
        keys = len(json.load(open(filepath)))
        status = "✅" if ok and keys >= 18 else ""
        if keys < 18:
            all_ok = False
        print(f"  {status} {code}: {keys} keys")
    
    if all_ok:
        print("\n All 11 locales successfully translated!")
    else:
        print("\n⚠️ Some locales still incomplete")

if __name__ == "__main__":
    main()
