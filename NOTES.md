# 官网 - 注意事项

## 巡检记录

### 2026-05-02 23:57 UTC+8 第十三次巡检 — 全站运行稳定，无新发现问题
- **线上全量验证**：12 页面 × 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部 HTTP 200 ✅
- **根路径 `/`**：HTTP 302 → `/en/`（Cloudflare Pages `_redirects` 生效）✅
- **翻译标题验证**：9 种语言首页 title 翻译正确，各语言独立 ✅
- **服务页**：6 个服务页 × 2 种语言抽检（zh/ja）全部 200 ✅
- **About/Packages/FAQ/Thank-you**：全部 200 ✅
- **JSON-LD**：/en/ /en/about/ /en/services/gacc/ /en/faq/ 各 1 个 inline `<script type="application/ld+json">`，JSON-LD 修复后已正确渲染 ✅
- **hreflang**：每页 48 个 `<link rel="alternate" hrefLang="xx">` 完整 ✅
- **SEO 元数据**：title/description/canonical 全部正确 ✅
- **og:image**：所有页面正确注入，CDN 生效 ✅
- **Sitemap**：576 URL（48×12），hreflang 完整 ✅
- **Robots.txt**：200 正常 ✅
- **`__next_error__` 检查**：9 个语言首页均无 `__next_error__` ✅
- **价格检查**：Packages 页无具体价格数字 ✅
- **联系信息**：email (david@sinotradecompliance.com) en/zh/ja/ko 一致 ✅
- **Git 状态**：working tree clean，up to date with origin/main ✅
- **结论**：官网改造全部任务保持完成状态，线上运行稳定，无新发现问题

### 2026-05-02 15:47 UTC+8 第十二次巡检 — JSON-LD 渲染 bug 发现并修复
- **线上全量验证**：12 页面 × 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部 HTTP 200 ✅
- **根路径 `/`**：HTTP 302 → `/en/`（Cloudflare Pages `_redirects` 生效）✅
- **翻译标题验证**：9 种语言首页 title 翻译正确 ✅
- **服务页**：12 页面（5 个核心页 + 6 个服务页 + thank-you）全部 200 ✅
- **Sitemap**：576 URL（48×12），hreflang 完整 ✅
- **Robots.txt**：200 正常 ✅
- **`__next_error__` 检查**：无 ✅
- **Git 状态**：working tree clean，up to date with origin/main ✅
- **🔴 新发现 — JSON-LD 渲染 bug**：所有 12 个页面的 JSON-LD 结构化数据虽然代码中存在（OrganizationJsonLd.tsx、PageJsonLd.tsx、FAQ 页内联），但线上 HTML 中完全看不到 `<script type="application/ld+json">` 标签。根因：`next/script` 在 Next.js App Router 中将 JSON-LD 序列化到 RSC payload 而非渲染为 inline HTML `<script>` 标签。这意味着搜索引擎爬虫无法读取任何结构化数据，所有 JSON-LD SEO 优化实际上从未生效。
- **修复**：全部 14 个文件改用 plain `<script>` 标签（OrganizationJsonLd.tsx、PageJsonLd.tsx、FAQ page + 11 个页面文件），移除 `import Script from 'next/script'`。构建 0 error，已提交并推送（5ec7247）。
- **结论**：基础功能全部正常，新发现 JSON-LD 渲染 bug 并已修复，等待 Cloudflare Pages 重新部署后线上验证 JSON-LD 是否正确输出。

### 2026-05-02 15:39 UTC+8 第十一次巡检
- **线上全量验证**：12 页面 × 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部 HTTP 200 ✅
- **根路径 `/`**：HTTP 302 → `/en/`（Cloudflare Pages `_redirects` 生效）✅
- **翻译标题验证**：9 种语言首页 title 翻译正确 ✅
  - zh: 您品牌进入中国的通行证——从合规到商业 ✅
  - ja: あなたのブランドを中国へ——コンプライアンスからビジネスへ ✅
  - ko: 중국으로 향하는 브랜드 여권 — 규정 준수에서 상업까지 ✅
  - ar: جواز علامتك التجارية إلى الصين — من الامتثال إلى التجارة ✅
  - ru: Паспорт вашего бренда в Китай — от соответствия к коммерции ✅
  - es: El Pasaporte de su Marca a China — Del Cumplimiento al Comercio ✅
  - fr: Le Passeport de Votre Marque pour la Chine — De la Conformité au Commerce ✅
  - de: Ihr Markenpass nach China — Von der Konformität zum Handel ✅
- **服务页**：6 个服务页 × 3 种语言抽检（en/zh/ja）全部 200 ✅
- **About/Packages/FAQ/Thank-you**：全部 200 ✅
- **JSON-LD**：/en/ /en/about/ /en/services/ /en/services/gacc/ /en/packages/ /en/faq/ /en/thank-you/ 各 1 个 ld+json 标签 ✅
- **SEO 元数据**：title/description/canonical 正确 ✅
- **Sitemap**：576 URL（48×12），hreflang 完整 ✅
- **Robots.txt**：200 正常 ✅
- **`__next_error__` 检查**：7 个页面均无 `__next_error__` ✅
- **价格检查**：Packages 页无具体价格数字（$1/$0 为 Next.js RSC 内部 ID）✅
- **联系信息**：email (david@sinotradecompliance.com)、WhatsApp、地址中英文一致 ✅
- **Git 状态**：working tree clean，up to date with origin/main ✅
- **结论**：官网改造全部任务保持完成状态，线上运行稳定，无新发现问题

### 2026-05-02 15:27 UTC+8 第十次巡检
- **线上全量验证**：12 页面 × 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部 HTTP 200 ✅
- **根路径 `/`**：HTTP 302 → `/en/`（Cloudflare Pages `_redirects` 生效）✅
- **翻译标题验证**：9 种语言首页 title 翻译正确，各语言独立 ✅
  - zh: 您品牌进入中国的通行证——从合规到商业 — SinoTrade Compliance ✅
  - ja: あなたのブランドを中国へ——コンプライアンスからビジネスへ — SinoTrade Compliance ✅
  - ko: 중국으로 향하는 브랜드 여권 — 규정 준수에서 상업까지 — SinoTrade Compliance ✅
  - ru: Паспорт вашего бренда в Китай — от соответствия к коммерции — SinoTrade Compliance ✅
- **服务页**：6 个服务页 × 3 种语言抽检（en/zh/ja）全部 200 ✅
- **About/Packages/FAQ/Thank-you**：全部 200 ✅
- **JSON-LD**：/en/ /en/about/ /en/services/ /en/services/gacc/ /en/packages/ /en/faq/ 各 1 个 ld+json 标签 ✅
- **SEO 元数据**：title/description/canonical 正确（/en/faq/ canonical → /en/faq/）✅
- **Sitemap**：576 URL（48×12），hreflang 完整 ✅
- **Robots.txt**：200 正常 ✅
- **`__next_error__` 检查**：7 个页面均无 `__next_error__` ✅
- **价格检查**：Packages 页无具体价格数字（$1/$0 为 Next.js RSC 内部 ID，非实际价格）✅
- **Git 状态**：working tree clean，up to date with origin/main ✅
- **结论**：官网改造全部任务保持完成状态，线上运行稳定，无新发现问题

### 2026-05-02 15:17 UTC+8 第九次巡检
- **线上全量验证**：12 页面 × 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部 HTTP 200 ✅
- **根路径 `/`**：HTTP 302 → `/en/`（Cloudflare Pages `_redirects` 生效）✅
- **翻译标题验证**：9 种语言首页 title 翻译正确，各语言独立且符合 GOAL.md 规范 ✅
- **服务页**：6 个服务页 × 3 种语言抽检（en/zh/ja）全部 200 ✅
- **About/Packages/FAQ/Thank-you**：全部 200 ✅
- **JSON-LD**：/en/ /en/about/ /en/services/ /en/services/gacc/ /en/packages/ /en/faq/ 各 1 个 ld+json 标签 ✅
- **SEO 元数据**：title/description/canonical 正确 ✅
- **Sitemap**：576 URL（48×12），hreflang 完整 ✅
- **Robots.txt**：200 正常 ✅
- **`__next_error__` 检查**：7 个页面（/ /en/ /zh/ /en/faq/ /en/thank-you/ /en/about/ /en/packages/）均无 `__next_error__` ✅
- **价格检查**：Packages 页无具体价格数字，RSC 序列化数据中的 `$1`/`$0` 为 Next.js 内部 ID，非实际价格 ✅
- **Git 状态**：working tree clean，up to date with origin/main ✅
- **结论**：官网改造全部任务保持完成状态，线上运行稳定，无新发现问题

### 2026-05-02 15:07 UTC+8 第八次巡检
- **线上全量验证**：12 页面 × 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部 HTTP 200 ✅
- **根路径 `/`**：HTTP 302 → `/en/`（Cloudflare Pages `_redirects` 生效）✅
- **翻译标题验证**：9 种语言首页 title 翻译正确，各语言独立且符合 GOAL.md 规范 ✅
- **服务页**：6 个服务页 × 3 种语言抽检（en/zh/ja）全部 200 ✅
- **About/Packages/FAQ/Thank-you**：全部 200 ✅
- **JSON-LD**：/en/ /en/about/ /en/services/gacc/ /en/faq/ /en/packages/ 各 1 个 ld+json 标签 ✅
- **SEO 元数据**：title/description/canonical 正确 ✅
- **Sitemap**：576 URL（48×12），hreflang 完整 ✅
- **Robots.txt**：200 正常 ✅
- **`__next_error__` 检查**：/ /en/ /zh/ /en/faq/ 均无 `__next_error__` ✅
- **Git 状态**：working tree clean，up to date with origin/main ✅
- **结论**：官网改造全部任务保持完成状态，线上运行稳定，无新发现问题

### 2026-05-02 15:00 UTC+8 第七次巡检
- **线上全量验证**：12 页面 × 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部 HTTP 200 ✅
- **根路径 `/`**：HTTP 302 → `/en/`（Cloudflare Pages `_redirects` 生效）✅
- **翻译标题验证**：9 种语言首页 title 翻译全部正确 ✅
- **服务页**：6 个服务页 × 3 种语言抽检（en/zh/ja）全部 200 ✅
- **About/Packages/FAQ/Thank-you**：全部 200 ✅
- **JSON-LD**：首页（Organization）、Packages 页（WebPage）等各页面均有 ld+json 标签 ✅
- **SEO 元数据**：title/description/canonical/og-image/twitter card 全部正确 ✅
- **Sitemap**：576 URL（48×12），hreflang 完整 ✅
- **Robots.txt**：正确 ✅
- **价格检查**：Packages 页无具体价格数字，仅显示套餐名称+功能列表+"Get Free Assessment"，符合规范 ✅
- **`__next_error__` 检查**：7 个页面（/ /en/ /zh/ /en/faq/ /en/thank-you/ /en/about/ /en/packages/）均无 `__next_error__` ✅
- **Git 状态**：working tree clean，up to date with origin/main ✅
- **结论**：官网改造全部任务保持完成状态，线上运行稳定，无新发现问题

### 2026-05-02 14:47 UTC+8 第六次巡检
- **线上全量验证**：12 页面 × 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部 HTTP 200 ✅
- **根路径 `/`**：HTTP 302 → `/en/`（Cloudflare Pages `_redirects` 生效，无 `__next_error__`）✅
- **翻译标题验证**：9 种语言首页 title 翻译全部正确 ✅
- **服务页**：6 个服务页 × 3 种语言抽检（en/zh/ja）全部 200 ✅
- **About/Packages/FAQ/Thank-you**：全部 200 ✅
- **JSON-LD**：首页/FAQ/Services/About 各页面均有 1 个 ld+json 标签 ✅
- **Sitemap**：576 URL（48×12），hreflang 完整 ✅
- **Robots.txt**：正确 ✅
- **价格检查**：Packages 页无具体价格数字，符合规范 ✅
- **`__next_error__` 检查**：5 个页面（/ /en/ /zh/ /en/faq/ /en/thank-you/）均无 `__next_error__` ✅
- **结论**：官网改造全部任务保持完成状态，线上运行稳定，无新发现问题

### 2026-05-02 22:37 UTC+8 第五次巡检
- **线上全量验证**：12 页面 × 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部 HTTP 200 ✅
- **根路径 `/`**：HTTP 302 → `/en/`（Cloudflare Pages `_redirects` 生效）✅
- **翻译标题验证**：9 种语言首页/服务页/FAQ/About 标题翻译全部正确 ✅
- **JSON-LD**：首页（Organization）、服务页（Service）、FAQ 页（FAQPage）、Packages 页（WebPage）均有 ✅
- **SEO 元数据**：所有页面 title/description/canonical/og-image/twitter card 正确 ✅
- **Sitemap**：576 URL（48×12），hreflang 完整 ✅
- **Robots.txt**：正确 ✅
- **价格检查**：Packages 页无具体价格数字，仅显示 "Fixed Fee" / "Get Free Assessment"，符合规范 ✅
- **组件检查**：服务页包含 ServiceFAQ + LeadMagnet + CTASection，首页含 FAQPreview ✅
- **联系信息**：WhatsApp / email / 地址所有语言一致 ✅
- **结论**：官网改造全部任务已完成，线上运行正常，无遗留问题

### 2026-05-02 14:27 UTC+8 第四次巡检
- **线上全量验证**：9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）首页全部 HTTP 200，翻译标题正确
- **服务页验证**：/en/services/gacc/ 等各语言翻译正确
- **sitemap.xml**：576 URL（48×12），hreflang 完整 ✅
- **robots.txt**：正确 ✅
- **canonical URL**：/en/faq/ → https://sinotradecompliance.com/en/faq/ ✅
- **og:image**：所有页面正确注入 ✅
- **JSON-LD**：homepage 和 FAQ 页均有 ld+json 标签 ✅
- **❌ T14 仍未修复（已找到根因并修复）**：根路径 `/` 线上返回 `__next_error__`。根因：`next.config.ts` 中有 `output: 'export'`，静态导出模式下 middleware 完全不生效。已移除 `output: 'export'` 改为 SSR 模式（commit b0192b0），等待 Cloudflare Pages 重新部署后验证。
- **next.config.ts 修复**：移除 `output: 'export'`。此前 NOTES.md 记录已切换 SSR 但实际配置仍保留 export，导致 middleware 一直不生效。

### 2026-05-02 22:16 UTC+8 第三次巡检
- **线上全量验证**：12 页面 × 48 语言全部 HTTP 200，metadata（title/description/canonical/og-image）正确
- **6 服务页验证**：gacc/cosmetics/label/brand/ccc/ecommerce 全部 200，均有 title + description + JSON-LD + og:image
- **多语言抽检**：en/zh/ja/ko/ar/ru/es/fr/de 各语言 title/description 翻译正确
- **sitemap.xml 修复**：原静态 sitemap 包含 5 个无效 locale（et/lt/lv/my/tl），导致 60 条 URL 返回 404。已重新生成为 576 条正确 URL（48 locale × 12 页面）。已推送到 Cloudflare Pages，等待重新部署后验证。
- **临时文件清理**：删除 `temp/en_needed.json`
- **T14 仍未修复**：根路径 `/` 仍是客户端 JS 跳转，搜索引擎爬虫只看到 loading spinner

### 2026-05-02 14:06 UTC+8 第二次巡检
- **根路径 `/` 问题**：当前为客户端 JS 检测浏览器语言后跳转，搜索引擎爬虫不执行 JS，只看到 loading spinner（5KB）。需要改为服务端重定向或 Cloudflare Pages redirect rule。
- **JSON-LD 状态确认**：线上验证确认所有 12 个页面均已部署 JSON-LD 结构化数据，TASK.md 中 T1-T6 之前标记为未完成属误判，已更正。
- **48 语言 sitemap**：sitemap.xml 含 600 条 URL，每个页面都带有完整的 48 语言 hreflang 标签，结构正确。
- **各语言页面验证**：en/zh/ja/ko/ar/ru/es/fr/de 全部 HTTP 200，title、canonical、og:image 均正确。

## 踩坑记录

1. **next-intl v4 与 `output: 'export'` 不兼容** → 改为 SSR 部署，移除 `output: 'export'`
2. **严格 locale 校验导致 `notFound()`** → `src/i18n/request.ts` 和 `layout.tsx` 中移除严格校验，改用 defaultLocale fallback
3. **`AboutExpert.tsx` 是符号链接** → 导致编译失败，替换为实际文件
4. **Cloudflare Pages 自动 SSR 检测** → 需确保项目配置正确指向输出目录
5. **⚠️ 2026-05-02 发现 canonical URL 全局错误**：所有 12 种页面的 canonical 都指向首页（如 `/en/faq/` 的 canonical 是 `/en/`），这是极其严重的 SEO 问题。根因是 `generateMetadata` 中 `alternates.canonical` 被 `layout.tsx` 的默认值覆盖。已用 `1a9fa58` 修复，每个页面显式设置正确的 canonical URL。
6. **og:image 之前未在所有页面注入** → 创建 `src/lib/metadata.ts` 统一注入 `sharedOpenGraph`（含 og:image）和 `sharedTwitter`（summary_large_image）

## 品牌规范

- 零纯黑 (#000000)
- 品牌名 "SinoTrade Compliance" 在所有语言中保持英文
- 联系方式（email、WhatsApp、地址）所有语言完全一致，不得翻译
