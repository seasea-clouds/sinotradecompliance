#!/usr/bin/env python3
"""Add new languages using MyMemory Translation API."""
import json, urllib.request, urllib.parse, sys, time

# New languages to add
NEW_LANGS = {
    'he': '🇮🇱 עברית',      # Hebrew - Israel trade
    'sw': '🇰🇪 Kiswahili',  # Swahili - East Africa
    'bn': '🇧🇩 বাংলা',      # Bengali - Bangladesh
    'ca': '🇦🇩 Català',     # Catalan - Spain
    'af': '🇿🇦 Afrikaans',  # Afrikaans - South Africa
    'sq': '🇦🇱 Shqip',      # Albanian
    'az': '🇦🇿 Azərbaycan', # Azerbaijani
    'mk': '🇲🇰 Македонски', # Macedonian
    'hy': '🇦🇲 Հայերեն',    # Armenian
    'lt': '🇱🇹 Lietuvių',    # Lithuanian
}

# Load English messages
with open('messages/en.json', 'r') as f:
    en = json.load(f)

# Flatten nested dict
def flatten(d, prefix=''):
    result = {}
    for k, v in d.items():
        key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            result.update(flatten(v, key))
        else:
            result[key] = v
    return result

# Unflatten back
def unflatten(d):
    result = {}
    for k, v in d.items():
        parts = k.split('.')
        obj = result
        for p in parts[:-1]:
            obj = obj.setdefault(p, {})
        obj[parts[-1]] = v
    return result

flat_en = flatten(en)
print(f"English has {len(flat_en)} translatable strings")

lang_map = {
    'he': 'iw', 'bn': 'bn', 'sw': 'sw', 'ca': 'ca', 'af': 'af',
    'sq': 'sq', 'az': 'az', 'mk': 'mk', 'hy': 'hy', 'lt': 'lt'
}

for lang_code, lang_name in NEW_LANGS.items():
    target = lang_map[lang_code]
    translated = {}
    print(f"\nTranslating {lang_name}...")
    
    for key, text in flat_en.items():
        if not text or len(text) < 2:
            translated[key] = text
            continue
        
        # Use MyMemory API (free, no key needed)
        url = f"https://api.mymemory.translated.net/get?q={urllib.parse.quote(text)}&langpair=en|{target}"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read())
                result = data.get('responseData', {}).get('translatedText', text)
                translated[key] = result
                print(f"  {key}: {result[:40]}...")
                time.sleep(0.3)  # Rate limit
        except Exception as e:
            print(f"  {key}: ERROR {e}, using English")
            translated[key] = text
    
    # Unflatten and save
    output = unflatten(translated)
    with open(f'messages/{lang_code}.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"✅ Saved messages/{lang_code}.json")

# Generate routing.ts update code
print("\n\n=== Add these to routing.ts locales array ===")
print("  '" + "', '".join(NEW_LANGS.keys()) + "',")

print("\n=== Add these to localeNames ===")
for code, name in NEW_LANGS.items():
    print(f"  {code}: '{name}',")
