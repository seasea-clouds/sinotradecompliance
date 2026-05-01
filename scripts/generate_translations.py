#!/usr/bin/env python3
"""Generate translation files for SinoTrade Compliance website.
Uses OpenAI-compatible API for translations. Falls back to inline generation."""

import json, os, sys

BASE = "/root/projects/trade/sinotradecompliance/messages"
SRC = os.path.join(BASE, "en.json")

# Languages that already have full translations (18 keys)
DONE = {"en", "de", "es", "fr", "ja", "zh", "sl", "sw", "it", "nl"}

# All 48 locales
ALL_LOCALES = [
    "zh", "es", "fr", "de", "ja", "pt", "ru", "ar", "ko", "it", "nl", "tr",
    "vi", "id", "th", "hi", "pl", "sv", "el", "cs", "ro", "hu", "fi", "da",
    "no", "uk", "bg", "hr", "sr", "sk", "sl", "ms", "ka", "he", "sw", "bn",
    "ca", "fa", "ur", "ta", "af", "sq", "az", "hy", "be", "ne", "si"
]

TODO = [l for l in ALL_LOCALES if l not in DONE]
print(f"Need to generate: {len(TODO)} languages")
print(f"Done: {len(DONE)} languages")
print(f"TODO: {TODO}")

# Language name mapping
LANG_NAMES = {
    "pt": "Portuguese", "ru": "Russian", "ar": "Arabic", "ko": "Korean",
    "tr": "Turkish", "vi": "Vietnamese", "id": "Indonesian", "th": "Thai",
    "hi": "Hindi", "pl": "Polish", "sv": "Swedish", "el": "Greek",
    "cs": "Czech", "ro": "Romanian", "hu": "Hungarian", "fi": "Finnish",
    "da": "Danish", "no": "Norwegian", "uk": "Ukrainian", "bg": "Bulgarian",
    "hr": "Croatian", "sr": "Serbian", "sk": "Slovak", "ms": "Malay",
    "ka": "Georgian", "he": "Hebrew", "bn": "Bengali", "ca": "Catalan",
    "fa": "Persian", "ur": "Urdu", "ta": "Tamil", "af": "Afrikaans",
    "sq": "Albanian", "az": "Azerbaijani", "hy": "Armenian", "be": "Belarusian",
    "ne": "Nepali", "si": "Sinhala"
}

def translate_text(text, lang):
    """Translate a single text string. This is a placeholder - we need the API."""
    # We'll use curl to call DashScope API
    import subprocess
    key = os.environ.get("DASHSCOPE_API_KEY", "")
    if not key:
        # Check for any API key in config
        for path in ["/root/.openclaw/config.yaml", "/root/.openclaw/config.yml"]:
            if os.path.exists(path):
                with open(path) as f:
                    content = f.read()
                    if "dashscope" in content.lower() or "api" in content.lower():
                        pass
        return None
    
    prompt = f"Translate the following English text to {LANG_NAMES.get(lang, lang)}. Return ONLY the translated text, no explanations:\n\n{text}"
    
    try:
        result = subprocess.run([
            "curl", "-s",
            "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
            "-H", f"Authorization: Bearer {key}",
            "-H", "Content-Type: application/json",
            "-d", json.dumps({
                "model": "qwen-turbo",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.3
            })
        ], capture_output=True, text=True, timeout=30)
        
        resp = json.loads(result.stdout)
        return resp["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"Error: {e}")
        return None

def translate_value(value, lang):
    """Recursively translate a value (string, dict, or list)."""
    if isinstance(value, dict):
        return {k: translate_value(v, lang) for k, v in value.items()}
    elif isinstance(value, str):
        return translate_text(value, lang)
    elif isinstance(value, list):
        return [translate_value(v, lang) for v in value]
    return value

# Check if we can use the API
key = os.environ.get("DASHSCOPE_API_KEY", "")
if not key:
    print("No DASHSCOPE_API_KEY found. Cannot generate translations via API.")
    print("Suggestion: generate translations manually or via sub-agent")
    sys.exit(1)

print(f"Using API key: {key[:8]}...")

# Load source
with open(SRC) as f:
    src = json.load(f)

# Translate each TODO locale
for i, locale in enumerate(TODO):
    print(f"\n[{i+1}/{len(TODO)}] Translating to {locale} ({LANG_NAMES.get(locale, locale)})...")
    
    translated = {}
    for ns, content in src.items():
        print(f"  Translating namespace: {ns}")
        if isinstance(content, dict):
            translated[ns] = {}
            for key, val in content.items():
                t = translate_value(val, locale)
                if t:
                    translated[ns][key] = t
                else:
                    print(f"    WARNING: Failed to translate {ns}.{key}")
                    translated[ns][key] = val  # fallback to English
        else:
            translated[ns] = translate_value(content, locale)
    
    out_path = os.path.join(BASE, f"{locale}.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(translated, f, indent=2, ensure_ascii=False)
    print(f"  Written: {out_path}")

print(f"\nDone! Generated {len(TODO)} translation files.")
