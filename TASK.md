# 官网改造 - 任务计划

## 当前状态
- ✅ 已有 8 种语言：en, zh, es, fr, de, ja, pt, ru
- ✅ `npx next build` 通过
- ✅ 架构：`output: 'export'` + `[locale]` 路由 + 客户端语言检测
- ✅ 组件已全部接入 `useTranslations`

## 任务：扩展到 34 种语言

### 需要新增的 26 种语言
```
ar, ko, it, nl, tr, vi, id, th, hi, pl, sv, el, cs, ro, hu, fi, da, no, uk, bg, hr, sr, sk, sl, ms, ka
```

### 每步操作
1. 创建 `messages/{locale}.json`（复制 en.json 模板翻译）
2. 更新 `src/i18n/routing.ts` 的 `locales` 和 `localeNames`
3. 更新 `src/app/page.tsx` 的 `localeMap`
4. 更新 `src/app/[locale]/layout.tsx` 的 hreflang links
5. 运行 `npx next build` 确认通过

### 规则
- 联系方式（email、WhatsApp、地址）**所有语言完全一致**，不许翻译
- 品牌名 "SinoTrade Compliance" 保持英文
- 翻译要专业、自然，符合当地商务用语

### 验收标准
- `npx next build` 通过，所有 34 种语言页面生成
- 语言切换器正常
- 联系方式不被翻译
