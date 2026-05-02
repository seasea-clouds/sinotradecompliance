import json, os, time, re
from deep_translator import GoogleTranslator

MESSAGES = "messages"
en = json.load(open(os.path.join(MESSAGES, "en.json")))

LANG_MAP = {
    'zh': 'zh-CN', 'ja': 'ja', 'ko': 'ko', 'ar': 'ar', 'ru': 'ru',
    'es': 'es', 'fr': 'fr', 'de': 'de', 'pt': 'pt', 'it': 'it',
    'nl': 'nl', 'pl': 'pl', 'tr': 'tr', 'sv': 'sv', 'da': 'da',
    'no': 'no', 'fi': 'fi', 'el': 'el', 'cs': 'cs', 'hu': 'hu',
    'ro': 'ro', 'bg': 'bg', 'hr': 'hr', 'sk': 'sk', 'sl': 'sl',
    'sr': 'sr', 'uk': 'uk', 'he': 'he', 'hi': 'hi', 'th': 'th',
    'vi': 'vi', 'id': 'id', 'ms': 'ms', 'tl': 'tl', 'sw': 'sw',
    'af': 'af', 'az': 'az', 'be': 'be', 'bn': 'bn', 'ca': 'ca',
    'et': 'et', 'fa': 'fa', 'ka': 'ka', 'hy': 'hy', 'lt': 'lt',
    'lv': 'lv', 'my': 'my', 'ne': 'ne', 'si': 'si', 'ta': 'ta',
    'sq': 'sq', 'ur': 'ur',
}

def validate_translation(original, translated):
    if not translated or not translated.strip():
        return False
    if translated.count('{') != translated.count('}'):
        return False
    placeholders_orig = re.findall(r'\{[^}]*\}', original)
    placeholders_trans = re.findall(r'\{[^}]*\}', translated)
    if not placeholders_orig and placeholders_trans:
        return False
    if '<' in translated and '>' in translated:
        if translated.count('<') != translated.count('>'):
            return False
    return True

def translate_safe(text, target, max_retries=3):
    for attempt in range(max_retries):
        try:
            t = GoogleTranslator(source='en', target=target)
            result = t.translate(text)
            if validate_translation(text, result):
                return result
            time.sleep(1)
        except:
            time.sleep(2)
    return text

# T46: zh.json
print("=== T46: zh.json ===")
zh = json.load(open(os.path.join(MESSAGES, "zh.json")))
fa_keys = [k for k in en['Faq'] if zh['Faq'].get(k, '') == en['Faq'][k]]
blog_keys = [k for k in en['Blog'] if zh['Blog'].get(k, '') == en['Blog'][k] and k != 'author']

for k in fa_keys:
    zh['Faq'][k] = translate_safe(en['Faq'][k], 'zh-CN')
for k in blog_keys:
    zh['Blog'][k] = translate_safe(en['Blog'][k], 'zh-CN')
zh['Blog']['author'] = '张大卫'
with open(os.path.join(MESSAGES, "zh.json"), 'w', encoding='utf-8') as f:
    json.dump(zh, f, ensure_ascii=False, indent=2); f.write('\n')
print(f"  T46 done: {len(fa_keys) + len(blog_keys) + 1} keys")

# T47
print("=== T47: FAQ × 47 ===")
T47_KEYS = ['generalQ11','generalA11','labelQ5','labelQ5a','ecommerceQ5','ecommerceA5','brandQ5','brandQ5a','cosmeticsA2','cosmeticsA3']
total = 0
for lf in sorted(os.listdir(MESSAGES)):
    if lf in ('en.json','zh.json'): continue
    lang = lf.replace('.json', '')
    data = json.load(open(os.path.join(MESSAGES, lf)))
    tl = LANG_MAP.get(lang, lang)
    for k in T47_KEYS:
        if k in en['Faq'] and data['Faq'].get(k, '') == en['Faq'][k]:
            data['Faq'][k] = translate_safe(en['Faq'][k], tl)
            total += 1
    with open(os.path.join(MESSAGES, lf), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2); f.write('\n')
    print(f"  {lang} done")
print(f"  T47 done: {total} keys")

# T48
print("=== T48: Blog × 46 ===")
T48_KEYS = list(en['Blog'].keys())
total = 0
for lf in sorted(os.listdir(MESSAGES)):
    if lf in ('en.json','zh.json'): continue
    lang = lf.replace('.json', '')
    data = json.load(open(os.path.join(MESSAGES, lf)))
    tl = LANG_MAP.get(lang, lang)
    for k in T48_KEYS:
        if data['Blog'].get(k, '') == en['Blog'][k]:
            data['Blog'][k] = translate_safe(en['Blog'][k], tl)
            total += 1
    with open(os.path.join(MESSAGES, lf), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2); f.write('\n')
    print(f"  {lang} done")
print(f"  T48 done: {total} keys")
