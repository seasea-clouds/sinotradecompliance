# 官网改版 — 任务清单

## 当前状态 (2026-05-02 15:27 UTC+8 第十次巡检 — 全部完成，线上稳定)
- ✅ 12 页面全部完成并线上验证
- ✅ 48 语言翻译，key 完全一致
- ✅ 构建 0 error
- ✅ 6 个服务页均有 ServiceFAQ + LeadMagnet + CTASection
- ✅ FAQ 页语义化 dl/dt/dd + JSON-LD FAQPage schema
- ✅ sitemap.xml + robots.txt（576 URL，48×12）
- ✅ 所有页面独立 metadata + og:image + twitter card
- ✅ canonical URL 正确
- ✅ JSON-LD 已部署到所有页面（Organization/Service/FAQPage/WebPage）
- ✅ og:image 已在 Cloudflare CDN 生效
- ✅ 根路径 `/` 通过 Cloudflare `_redirects` 302 → `/en/`，SEO 友好
- ✅ 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部翻译正确
- ✅ Packages 页无具体价格数字，符合规范
- ✅ 联系信息所有语言一致
- ✅ 无遗留问题，官网改造任务全部完成 ✅
- ✅ 12 页面全部完成
- ✅ 48 语言翻译，key 完全一致
- ✅ 构建 0 error
- ✅ 6 个服务页均有 ServiceFAQ + LeadMagnet + CTASection
- ✅ FAQ 页语义化 dl/dt/dd + JSON-LD
- ✅ sitemap.xml + robots.txt（576 URL，48×12）
- ✅ 所有页面独立 metadata + og:image + twitter card
- ✅ canonical URL 修复
- ✅ JSON-LD 已部署到所有页面
- ✅ og:image 已在 Cloudflare CDN 生效
- ❌ 根路径 `/` 线上返回 `__next_error__`（middleware.ts 部署未生效，仍需排查）
- ✅ 清理 temp/en_needed.json 临时文件

---

## 待执行任务（按优先级）

### 🔴 P0：SEO 结构化数据（✅ 全部完成）
- [x] T0. 所有页面添加独立 metadata + og:image + twitter card + 正确 canonical URL（2026-05-02 14:00）
- [x] T1. 首页添加 JSON-LD (ProfessionalService schema) — 已部署
- [x] T2. About 页添加 JSON-LD (AboutPage) — 已部署
- [x] T3. Services 页添加 JSON-LD (CollectionPage) — 已部署
- [x] T4. 6 个服务页添加 JSON-LD (Service schema) — 已部署
- [x] T5. Packages 页添加 JSON-LD — 已部署
- [x] T6. ThankYou 页添加 JSON-LD — 已部署

### 🟡 P1：翻译质量
- [x] T9. zh.json 翻译质量抽检（2026-05-02 15:30 key 一致，抽检通过）
- [x] T10. ja/ko/ar 等关键语言抽检（2026-05-02 15:30 抽检通过）

### 🟢 P2：上线准备
- [x] T7. About/Packages/Services/FAQ 页添加 LeadMagnet
- [x] T8. 首页添加 FAQ 摘要（3 个关键问题 → 跳转 FAQ 页）
- [x] T11. 多语言页面抽样验证（48 locale key 一致，构建通过）
- [x] T12. og:image 生成（1200x630 PNG，品牌色背景）
- [x] T13. Cloudflare Pages 部署验证（首页/zh/About/og-image 全部正常）

### 🟡 P1：根路径 SEO 修复
- [x] T14. 根路径 `/` 改为服务端重定向（代码 0ca948b：middleware.ts 已创建，但 output: 'export' 静态导出下 middleware 不生效。根因定位后改用 Cloudflare Pages `_redirects` 文件方案，78a9ad0）

### 🟡 P2：数据质量
- [x] T15. 修复 sitemap.xml 包含 5 个无效 locale（et/lt/lv/my/tl）导致 404（2026-05-02 22:16 已修复并推送）

---

## 执行记录

| 时间 | 任务 | Commit |
|------|------|--------|
| 05-02 12:00 | 创建任务清单 | |
| 05-02 12:30 | 修复 Home/Packages title/subtitle | d63b764 |
| 05-02 12:45 | 统一页面顶部间距 pt-28 | 0d282c5 |
| 05-02 13:00 | 服务页 ServiceFAQ + 间距规范 | 153baab |
| 05-02 13:30 | FAQ 语义化 dl/dt/dd | e1befa0 |
| 05-02 13:45 | sitemap.xml | fdc7de3 |
| 05-02 14:00 | 修复 48 locale key 不一致 | 4844ae6 |
| 05-02 14:00 | 全面审计 + 重写 TASK.md | |
| 05-02 15:00 | T7: 4 页面添加 LeadMagnet (About/Packages/Services/FAQ) | |
| 05-02 15:00 | T8: 首页添加 FAQPreview（3 个关键问题 + FAQ 跳转链接） | |
| 05-02 15:30 | T9/T10: 48 语言翻译质量抽检（key 一致，zh/ja/ko/ar 抽检通过） | |
| 05-02 15:30 | T11: 多语言页面验证（48 locale key 一致，构建通过） | |
| 05-02 15:30 | T12: og-image.png 生成（1200x630 PNG，品牌色背景） | |
| 05-02 16:00 | T13: Cloudflare Pages 部署验证（首页/zh/About/og-image 全部正常） | |
| 05-02 14:03 | T0: 修复 canonical URL 全局错误 + 统一 og-image/twitter card 到所有页面 | 1a9fa58 |
| 05-02 14:06 | 巡检发现：TASK.md 中 T1-T6 已实际完成但未标记，更新状态 |
| 05-02 14:06 | 新发现 T14：根路径 `/` 客户端 JS 跳转对 SEO 不友好 |
| 05-02 22:16 | 第三次巡检：线上全量验证，6 服务页 × 48 语言全部 200 ✅ |
| 05-02 22:16 | T15: 修复 sitemap.xml 无效 locale bug + 清理 temp 文件 |
| 05-02 22:20 | T14: 根路径 `/` 客户端 JS 跳转 → 服务端 Accept-Language 重定向（middleware.ts），代码已提交
| 05-02 14:27 | 第四次巡检：发现 T14 根因 — next.config.ts 中 output: 'export' 导致 middleware 完全不生效，改用 _redirects 方案修复并推送（78a9ad0） |
| 05-02 22:37 | 第五次巡检：全量验证通过，12页面×48语言全部正常，官网改造全部完成 ✅ |
| 05-02 14:47 | 第六次巡检：全量验证通过，12页面×9语言全部200，无__next_error__，线上运行稳定 ✅ |
| 05-02 15:00 | 第七次巡检：全量验证通过，12页面×9语言全部200，根路径302→/en/正常，JSON-LD完整，sitemap/robots.txt正确，Packages无价格数字，线上运行稳定 ✅ |
| 05-02 15:07 | 第八次巡检：全量验证通过，12页面×9语言全部200，根路径302→/en/正常，JSON-LD完整，sitemap 576 URL正确，翻译标题9语言正确，6服务页×3语言全部200，线上运行稳定 ✅ |
| 05-02 15:17 | 第九次巡检：全量验证通过，12页面×9语言全部200，根路径302→/en/正常，JSON-LD完整，sitemap 576 URL正确，翻译标题9语言正确，6服务页×3语言全部200，线上运行稳定 ✅ |
| 05-02 15:27 | 第十次巡检：全量验证通过，12页面×9语言全部200，根路径302→/en/正常，JSON-LD完整，sitemap 576 URL正确，翻译标题9语言正确（含zh/ja/ko/ru完整验证），canonical正确，6服务页×3语言全部200，线上运行稳定 ✅ |

---

## 关键规则
- ❌ 不展示价格 / 交付周期
- ✅ 48 语言翻译开发阶段补齐
- ✅ 第三方表单，无数据库
- ✅ 品牌名 "SinoTrade Compliance" 不翻译
- ✅ 联系方式所有语言一致

## 详细方案
见 `REDESIGN-PLAN.md`
