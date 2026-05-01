# 官网改造 - 目标

## 当前状态
- 项目：`/root/projects/trade/sinotradecompliance`
- 已有 8 种语言：en, zh, es, fr, de, ja, pt, ru
- `npx next build` 已通过，生成 20 个静态页面
- 架构：`output: 'export'` + `[locale]` 路由 + 客户端语言检测
- 无 middleware（Cloudflare Pages 免费版兼容）

## 目标
- 扩展到 **34 种语言**，覆盖全球主要市场
- 部署到 Cloudflare Pages
- 所有语言翻译质量过关，联系方式全语言统一

## 34 种语言列表
en, zh, es, fr, de, ja, pt, ru（已有）
ar, ko, it, nl, tr, vi, id, th, hi, pl, sv, el, cs, ro, hu, fi, da, no, uk, bg, hr, sr, sk, sl, ms, ka（新增 26 种）

## 规则
- 联系方式（email、WhatsApp、地址）**所有语言完全一致**，不许翻译
- 品牌名 "SinoTrade Compliance" 保持英文
- 翻译要专业、自然，符合当地商务用语习惯
- 每个语言文件放到 `messages/{locale}.json`
- 更新 `src/i18n/routing.ts` 的 locales 和 localeNames
- 更新 `src/app/page.tsx` 的 localeMap
- 完成后运行 `npx next build` 确认通过
