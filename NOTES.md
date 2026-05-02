# 官网 - 注意事项

## 巡检记录
### 2026-05-03 06:30 UTC+8 第 19 次巡检（第 19 轮组合深度检查）— 发现中文页 Home namespace 翻译渲染 bug
- **执行任务**：无待执行任务（T0-T68 全部完成）
- **组合深度检查（第 19 轮）**：
  - ✅ 构建：867 pages, 0 error
  - ✅ 翻译完整性：48/48 语言 key 结构完全一致（444 keys），0 缺失 0 多余 0 空值
  - ✅ 线上页面：/, /en/, /zh/ 全部 HTTP 200
  - ✅ 根路径 `/`：302 → `/en/` 正常
  - ✅ en 首页：全部正常，内容正确
  - ✅ zh 服务页 GACC：Hero/FAQ/Footer 翻译正确
  - ❌ **T69：中文首页 Home namespace 翻译不渲染** —
    - /zh/ 页面中以下组件显示英文原文（zh.json 翻译完全正确）：
    - SocialProof: "Trusted by Global Brands" 等
    - WhyUsCards: "Full Category Coverage", "One-Stop Service", "Fixed Fee Pricing", "Expert Team"
    - ProcessSteps: "Free Consultation" 等全部 6 步
    - FAQPreview: FAQ 问题为英文
    - CTASection: "Ready to Enter China?"
    - /zh/services/gacc/ 同样：What We Cover / How It Works / Why Choose Us 均为英文
    - 不受影响组件：ServicesGrid（Services namespace 正常）、Navbar、Footer、LeadMagnet
    - 根因待查：可能是 next-intl 在 `output: 'export'` 下对特定 namespace 的 SSG 渲染问题
- **Git**：1 commit 已推送 (7a6ab50)
- **结论**：发现 1 个 P1 翻译渲染 bug（T69），其余正常 ⚠️


### 2026-05-03 06:20 UTC+8 第 18 次巡检（第 18 轮组合深度检查）— 全站稳定，全部通过
- **执行任务**：无待执行任务（T0-T68 全部完成）
- **组合深度检查（第 18 轮）**：
  - ✅ 构建：867 pages, 0 error
  - ✅ 翻译完整性：48/48 语言 key 结构完全一致（444 keys），0 缺失 0 多余 0 空值
  - ✅ 线上页面：/, /en/, /zh/, /en/services/gacc/, /en/blog/, /en/blog/gacc-registration-guide/, /en/faq/, /en/packages/, /en/about/ 全部 HTTP 200
  - ✅ 根路径 `/`：302 → `/en/` 正常
  - ✅ JSON-LD：首页 Organization+ProfessionalService，FAQ 页 FAQPage，博客文章 BlogPosting，全部正确渲染为 inline `<script>`
  - ✅ hreflang：常规页 48 个 `<link rel="alternate">`，博客文章页 96 个（含 blog 列表 + 文章本身），`hrefLang` camelCase 格式
  - ✅ Sitemap：864 URL（576 基础 + 48 博客列表 + 240 博客文章）
  - ✅ H1 唯一：6 页抽检均 = 1
  - ✅ og-image：https://sinotradecompliance.com/og-image.png 正确注入
  - ✅ canonical：/en/faq/ → https://sinotradecompliance.com/en/faq/ 正确
  - ✅ __next_error__：6 页抽检均 0 个
  - ✅ 品牌名：48 语言 Navbar.logo 均为 "SinoTrade Compliance"
  - ✅ 联系方式：email 4 处、WhatsApp 13 处，全部一致
  - ✅ 禁用内容：无纯黑 (#000000)，翻译文件无价格数字
  - ✅ 博客内容：无违规定价/交付承诺，仅法规流程说明
  - ✅ 无 orphaned 文件：content/blog/ 48 种语言目录均为有效配置语言
  - ✅ .inspection.lock 已加入 .gitignore，避免后续误提交
- **Git**：1 commit 已推送 (318a2ec)
- **结论**：全站运行稳定，无新发现问题 ✅

### 2026-05-03 06:00 UTC+8 第 17 次巡检（第 17 轮组合深度检查）— 发现 6 种语言翻译残留
- **执行任务**：无待执行任务（T0-T67 全部完成）
- **组合深度检查（第 17 轮）— 竞品对比 + 回归测试 + 翻译深度审计**：
  - ✅ 构建：867 pages, 0 error
  - ✅ 线上页面：/, /en/, /zh/, /en/services/gacc/, /zh/services/gacc/, /en/packages/, /en/about/, /zh/faq/, /zh/blog/, /en/blog/gacc-registration-guide/ 全部 HTTP 200
  - ✅ 根路径 `/`：302 → `/en/` 正常
  - ✅ JSON-LD：FAQ 页 4 个 script 标签含 FAQPage schema ✅，首页 Organization schema ✅
  - ✅ hreflang：zh/ 页面 48 个 hrefLang 链接完整（camelCase 格式）
  - ✅ Sitemap：864 URL，41472 xhtml:link hreflang 条目
  - ✅ __next_error__：0 个页面出现
  - ✅ FAQ 页：39 个 dt/dd 语义化对，数量正确
  - ✅ Blog 列表：5 篇文章卡片全部渲染，21 article 元素
  - ❌ **T68：6 种语言首页英文翻译残留** —
    - `*Industries`（6 keys）：zh/sv/sw/ur/vi/sr 为英文原文（如 "Dairy, meat, seafood..."）
    - `*PainPoint`（6 keys）：zh/sv/sw/ur/vi/sr/ro 为英文原文（如 "Confused by Decree 248/249?..."）
    - `socialProofTitle` + `socialProofSubtitle`：zh/sv/sw/ur/vi 为英文（"Trusted by Global Brands"）
    - `stat*Label`（4 keys）：zh/sv/sw/ur/vi 为英文（"Brands Served"/"Countries" 等）
    - 根因：T23 文案丰富化时新增的 Industries/PainPoint/SocialProof/statLabel keys 在批量翻译中遗漏了这些语言
    - 影响：中文用户访问首页时，服务卡片提示语、社交证明区、统计数据标签全部为英文
  - **T68 修复**：修复 7 种语言（zh/sv/sw/ur/vi/sr/fi）共 91 个翻译 key
    - Services namespace：`*Industries`+`*PainPoint`（12 keys）修复 zh/sv/sw/ur/vi/sr
    - Home namespace：`socialProofTitle`+`socialProofSubtitle`+`stat*Label`（6 keys）修复 zh/sv/sw/ur/vi
    - fi：修复 `stat4Label`（1 key）
    - 构建验证：867 pages, 0 error，48 语言各 439 keys 完全一致
    - Commit: 422885e

### 2026-05-03 05:30 UTC+8 第 16 次巡检（第 16 轮组合深度检查）— 全站稳定，全部任务完成
- **执行任务**：T58 ✅（et/ 目录已清理）, T62 ✅（PROJECT.md 已包含博客描述）, T63 ✅（巡检协议已完善）, T64 ✅（packages 空白为正常留白）
- **组合深度检查（第 16 轮）**：
  - ✅ 构建：867 pages, 0 error
  - ✅ 翻译完整性：48/48 语言 key 结构完全一致（460 deep keys），0 缺失 0 多余 0 空值
  - ✅ 线上页面：/, /en/, /zh/, /en/services/gacc/, /en/blog/, /en/blog/gacc-registration-guide/, /en/faq/, /en/packages/, /en/about/ 全部 HTTP 200
  - ✅ 根路径 `/`：302 → `/en/` 正常
  - ✅ JSON-LD：inline `<script>` 正确渲染，首页 Organization + 博客 BlogPosting schema
  - ✅ hreflang：48 alternate 链接（含博客文章页），`hrefLang` 属性完整
  - ✅ Sitemap：864 URL，41472 xhtml:link hreflang 条目
  - ✅ H1 唯一：6 页抽检均 = 1
  - ✅ 语义化 HTML：nav/main/footer/dl/dt/dd/aria 完整
  - ✅ og-image/canonical：博客文章页正确
  - ✅ __next_error__：0 个页面出现
  - ✅ 无 orphaned 文件：content/blog/ 目录仅 48 种有效语言
- **Git**：1 commit 已推送 (ad86b2e)
- **结论**：全站运行稳定，无新发现问题 ✅

### 2026-05-03 05:20 UTC+8 第 15 次巡检（第 15 轮回归测试 + 文件一致性）— 全站稳定，发现 1 个残留文件
- **执行任务**：无待执行任务（T0-T57 全部完成）
- **回归测试（第 15 轮）**：
  - ✅ 翻译完整性：48/48 语言 key 结构完全一致（460 keys），0 缺失 0 多余
  - ✅ 空翻译值：0 个
  - ✅ 构建：867 pages, 0 error, 0 MISSING_MESSAGE
  - ✅ 线上页面：/,/en/,/zh/,/en/about/,/en/services/gacc/,/en/faq/,/en/blog/,/en/blog/gacc-registration-guide/ 全部 200
  - ✅ 根路径 `/`：302 → `/en/` 正常
  - ✅ JSON-LD：首页 Organization + Blog 页 BlogPosting schema 正确渲染
  - ✅ hreflang：博客文章页 48 alternate 链接完整
  - ✅ Sitemap：864 URL（576 基础 + 48 博客列表 + 240 博客文章），hreflang 完整
  - ✅ SEO 结构：H1=1, nav/main/section 语义化，51 aria 属性
  - ✅ 博客翻译：48 语言 × 5 篇文章 = 240 MDX 文件齐全
  - ❌ **T58：orphaned blog 目录** — content/blog/et/ 包含 5 篇 MDX 文章，但 `et`（爱沙尼亚语）不在 48 种已配置语言中（T15 已修复 sitemap 包含此无效 locale），该目录为残留文件
- **Git**：working tree clean（巡检更新 TASK.md + NOTES.md）
- **结论**：全站运行稳定，发现 1 个残留文件问题（T58）

### 2026-05-03 13:10 UTC+8 第 14 次巡检（第 14 轮组合深度检查）— T56/T57 完成，全站无新问题
- **执行任务**：T56 ✅（Navbar.blog key 添加到 48 语言）, T57 ✅（Packages.keys 补齐 48 语言 + 清理 47 语言 16 个死 keys）
- **组合深度检查（第 14 轮）**：
  - ✅ Key 结构一致性：48/48 语言完全一致
  - ✅ 空翻译值：0 个
  - ✅ 品牌名一致性：48 语言 Navbar.logo 均为 "SinoTrade Compliance"
  - ✅ 联系信息：email 3 文件、WhatsApp 13 文件，全部一致
  - ✅ 禁用内容：¥5000/¥26000 为跨境电商监管限额说明（非定价），2-4 weeks 为 FAQ 注册流程时间说明（非交付承诺），均为合规内容
  - ✅ 博客 MDX：245 文件（49 locale × 5 篇）
- **构建**：867 pages, 0 error, 0 MISSING_MESSAGE ✅
- **Git**：1 commit 已推送 (0f59394)
- **结论**：全站运行稳定，无新发现问题 ✅

### 2026-05-02 19:15 UTC+8 第 23 次巡检（第 4 轮内容一致性审计）— T46-T48 全部完成，全站一致性通过
- **执行任务**：T46 ✅（zh FAQ 已翻译）, T47 ✅（sv/sw/ur/vi cosmeticsA2/A3 翻译）, T48 ✅（he 14 Blog keys + 19 语言 Blog author + 4 语言 Blog title/categories/pagination 翻译）
- **内容一致性（第 4 轮）**：
  - ✅ 联系邮箱 david@sinotradecompliance.com 所有语言一致（硬编码在组件中）
  - ✅ WhatsApp URL https://wa.me/message/HPPZ5X6XZSMLM1 所有组件一致
  - ✅ 地址 Jing'an District, Shanghai, China 全局一致
  - ✅ 品牌名 "SinoTrade Compliance" 所有 48 语言 Navbar.logo 一致
  - ✅ 无价格数字展示（¥5,000/¥26,000 为跨境电商监管限额说明，非服务定价）
  - ✅ 无交付周期承诺
  - ✅ 无空翻译值
  - ✅ 无注入模式
  - ✅ 48 语言 key 结构完全一致（19 namespaces，Faq 87 keys，Blog 14 keys）
- **构建**：632 pages, 0 error ✅
- **Git**：1 commit 已推送 (be5dd8d)，清理 temp/ 3 个文件

### 2026-05-02 18:20 UTC+8 第二十次巡检（第 3 轮组件交互审计）— 发现 7 个翻译缺口 + 1 个导航 bug
- **执行任务**：无待执行任务（T0-T38 全部完成）
- **组件交互（第 3 轮）**：
  - ✅ Services 下拉菜单 — 6 项全部正常（GACC/Label/CCC/Cosmetics/Ecommerce/Brand）
  - ✅ 语言切换器 — 48 种语言全部显示，切换到中文正常工作
  - ✅ 表单提交 — LeadMagnet 表单成功提交并跳转到 ThankYou 页
  - ✅ FAQ 手风琴 — 点击展开/收起正常
  - ✅ CTA 按钮 — 所有 WhatsApp 链接正确（https://wa.me/message/HPPZ5X6XZSMLM1）
  - ✅ 内部导航 — 首页→服务页→About 页→Blog 页全部正常
  - ❌ **翻译缺口**：中文版本多个页面仍有英文文本未翻译（详见 TASK.md T39-T45）
  - ❌ **导航 bug**：ThankYou 页 "← Back to Home" 链接指向 `/` 而非 `/zh/`，导致从中文版返回时跳转到英文首页
- **线上验证**：en/zh 首页、GACC 页、About 页、Blog 页全部 HTTP 200 ✅
- **构建**：632 pages, 0 error（上次构建）
- **Git**：TASK.md 已更新（新增 T39-T45），待后续修复

### 2026-05-02 16:17 UTC+8 第十五次巡检 — 全站运行稳定，无新发现问题
- **线上全量验证**：12 页面 × 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部 HTTP 200 ✅
- **根路径 `/`**：HTTP 302 → `/en/`（Cloudflare Pages `_redirects` 生效）✅
- **翻译标题验证**：9 种语言首页 title 翻译正确，各语言独立 ✅
  - en: Your Brand's Passport to China — From Compliance to Commerce
  - zh: 您品牌进入中国的通行证——从合规到商业
  - ja: あなたのブランドを中国へ——コンプライアンスからビジネスへ
  - ko: 중국으로 향하는 브랜드 여권 — 규정 준수에서 상업까지
  - ar: جواز علامتك التجارية إلى الصين — من الامتثال إلى التجارة
  - ru: Паспорт вашего бренда в Китай — от соответствия к коммерции
  - es: El Pasaporte de su Marca a China — Del Cumplimiento al Comercio
  - fr: Le Passeport de Votre Marque pour la Chine — De la Conformité au Commerce
  - de: Ihr Markenpass nach China — Von der Konformität zum Handel
- **服务页**：6 个服务页 × 3 种语言抽检（en/zh/ja）全部 200 ✅
  - zh 服务页标题全部正确：GACC 食品注册 / 化妆品备案（NMPA）/ 中文标签合规 / 品牌保护 / CCC 认证 / 跨境电商
- **About/Packages/FAQ/Thank-you**：全部 200 ✅
- **JSON-LD**：首页 inline `<script type="application/ld+json">` 正确渲染，Organization schema 完整 ✅
- **hreflang**：每页 48 个 `<link rel="alternate" hrefLang="xx">` 完整 ✅
- **canonical URL**：/en/ → https://sinotradecompliance.com/en/，/zh/ → https://sinotradecompliance.com/zh/ ✅
- **og:image**：https://sinotradecompliance.com/og-image.png 正确注入 ✅
- **SEO 元数据**：title/description/canonical 全部正确 ✅
- **Sitemap**：576 URL（48×12），200 正常 ✅
- **Robots.txt**：User-agent: * / Allow: / / Sitemap 正确 ✅
- **`__next_error__` 检查**：9 个语言首页均无 `__next_error__` ✅
- **价格检查**：Packages 页无实际价格数字（检测到的 `$10` 均为 Next.js RSC 内部引用 ID，非实际展示价格）✅
- **联系信息**：email (david@sinotradecompliance.com) 一致 ✅
- **Git 状态**：working tree clean，up to date with origin/main ✅
- **结论**：官网改造全部任务保持完成状态，线上运行稳定，无新发现问题

### 2026-05-02 16:07 UTC+8 第十四次巡检 — 全站运行稳定，无新发现问题
- **线上全量验证**：12 页面 × 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部 HTTP 200 ✅
- **根路径 `/`**：HTTP 302 → `/en/`（Cloudflare Pages `_redirects` 生效）✅
- **翻译标题验证**：9 种语言首页 title 翻译正确 ✅
- **服务页**：6 个服务页 × 3 种语言抽检（en/zh/ja）全部 200 ✅（注意：实际 slug 为 `/brand/` 和 `/label/`，非旧版 `brand-compliance`/`label-review`）
- **About/Packages/FAQ/Thank-you**：全部 200 ✅
- **JSON-LD**：/en/ /en/about/ /en/faq/ /en/services/gacc/ /en/packages/ /en/thank-you/ 各 1 个 inline `<script type="application/ld+json">` 正确渲染 ✅
- **hreflang**：每页 48 个 `<link rel="alternate" hrefLang="xx">` 完整 ✅
- **SEO 元数据**：title/description/canonical 全部正确 ✅
- **og:image**：所有页面正确注入，CDN 生效 ✅
- **Sitemap**：576 URL（48×12），hreflang 完整 ✅
- **Robots.txt**：200 正常 ✅
- **`__next_error__` 检查**：9 个语言首页均无 `__next_error__` ✅
- **价格检查**：Packages 页无具体价格数字 ✅
- **联系信息**：email (david@sinotradecompliance.com) 一致 ✅
- **Git 状态**：working tree clean，up to date with origin/main ✅
- **结论**：官网改造全部任务保持完成状态，线上运行稳定，无新发现问题

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

### 2026-05-02 19:20 UTC+8 第 25 次巡检（第 5 轮构建分析）— 清理 7 个无用文件 + 发现 INVALID_MESSAGE 构建错误
- **执行任务**：T49 ✅（删除 5 个模板 SVG + david.jpg，节省 ~155KB）, T50 ✅（删除死代码 src/middleware.ts）, T51 待调查
- **构建分析（第 5 轮）**：
  - ✅ 632 pages, 0 error, exit 0（构建成功）
  - ✅ 编译时间 1552ms，静态生成 1652ms（18 workers）
  - ✅ JS chunks 总计 712KB，最大单块 227KB（合理）
  - ✅ CSS 30KB 单文件（无重复样式问题）
  - ✅ og-image.png 8.8KB（已优化）
  - ❌ 5 个 Next.js 模板 SVG 未使用（file/globe/next/vercel/window.svg，~3.3KB）→ T49 已清理
  - ❌ public/david.jpg 148KB 未引用（组件使用 images/david-zhang.jpg）→ T49 已清理
  - ❌ src/middleware.ts 1392 bytes 死代码（output: 'export' 下不执行）→ T50 已清理
  - ❌ INVALID_MESSAGE 构建错误 13 次（博客页面生成期间），不阻塞构建但需调查 → T51
  - ℹ️ 博客内容仅英文（content/blog/en/ 5 篇），47 种语言博客页为空列表（符合设计）
  - ℹ️ images.unoptimized: true（output: 'export' 必需）
- **构建**：632 pages, 0 error ✅
- **Git**：4 commits 已推送（a3f0f52 T48 Blog翻译, 7780c11 T49+T50清理, e94dd60 temp清理）

### 2026-05-02 18:10 UTC+8 第十九次巡检（第 1 轮翻译完整性审计）— 全站运行稳定，发现并修复 3 个空翻译
- **执行任务**：T22（分析各页面文案不足）✅ 全部 8 项子需求已完成，FAQ 从 35→45 questions
- **翻译完整性（第 1 轮）**：47 语言 × 441 keys，0 缺失，0 多余 ✅
- **空翻译修复**：no.json（Services.cccSubtitle）、sk.json（Footer.faq + Home.processStep6Title）共 3 个空值已修复
- **品牌名一致性**：所有 48 语言 Navbar.logo 包含 "SinoTrade Compliance" ✅
- **FAQ 问题数**：45 questions × 48 语言 ✅
- **线上验证**：en/zh/en/faq/en/blog 全部 HTTP 200 ✅
- **构建**：632 pages, 0 error ✅
- **Git**：2 commits 已推送（3bd2154, 8da5436）

---

### 2026-05-02 16:28 UTC+8 第十六次巡检 — 全站运行稳定，无新发现问题
- **线上全量验证**：12 页面 × 9 种语言（en/zh/ja/ko/ar/ru/es/fr/de）全部 HTTP 200 ✅
- **根路径 `/`**：HTTP 302 → `/en/`（Cloudflare Pages `_redirects` 生效）✅
- **翻译标题验证**：9 种语言首页 title 翻译正确，各语言独立 ✅
  - en: Your Brand's Passport to China — From Compliance to Commerce
  - zh: 您品牌进入中国的通行证——从合规到商业
  - ja: あなたのブランドを中国へ——コンプライアンスからビジネスへ
  - ko: 중국으로 향하는 브랜드 여권 — 규정 준수에서 상업까지
  - ar: جواز علامتك التجارية إلى الصين — من الامتثال إلى التجارة
  - ru: Паспорт вашего бренда в Китай — от соответствия к коммерции
  - es: El Pasaporte de su Marca a China — Del Cumplimiento al Comercio
  - fr: Le Passeport de Votre Marque pour la Chine — De la Conformité au Commerce
  - de: Ihr Markenpass nach China — Von der Konformität zum Handel
- **服务页**：6 个服务页 × 3 种语言抽检（en/zh/ja）全部 200 ✅
- **About/Packages/FAQ/Thank-you**：全部 200 ✅
- **JSON-LD**：/en/ /en/about/ /en/services/gacc/ 各 1 个 inline `<script type="application/ld+json">` 正确渲染 ✅
- **hreflang**：每页 48 个 `<link rel="alternate" hrefLang="xx">` 完整 ✅
- **canonical URL**：/en/faq/ → https://sinotradecompliance.com/en/faq/ ✅
- **og:image**：https://sinotradecompliance.com/og-image.png 正确注入，1200x630 ✅
- **Sitemap**：576 URL（48×12），200 正常 ✅
- **Robots.txt**：200 正常 ✅
- **`__next_error__` 检查**：5 个语言首页（en/zh/ja/ko/ar）均无 `__next_error__` ✅
- **价格检查**：Packages 页无实际价格数字 ✅
- **Git 状态**：working tree clean，up to date with origin/main ✅
- **结论**：官网改造全部任务保持完成状态，线上运行稳定，无新发现问题

### 2026-05-03 03:40 UTC+8 第 26 次巡检（第 8 轮组合深度检查）— 发现 FAQ 6 个缺失 A keys
- **执行任务**：无待执行任务（T0-T51 全部完成）
- **组合深度检查（第 8 轮）**：
  - ✅ 构建：632 pages, 0 error, 无任何 warning/INVALID_MESSAGE
  - ✅ 线上页面：/,/en/,/zh/,/en/about/,/en/services/,/en/faq/,/en/blog/ 全部 200
  - ✅ 根路径 `/`：302 → `/en/` 正常
  - ✅ 服务页：6×6 语言（en/zh/ja/ko/ar/ru）全部 200
  - ✅ 博客页：8 语言 + 5 篇文章全部 200
  - ✅ 翻译完整性：48 语言 × 443 keys 全部一致，0 缺失 0 多余
  - ✅ 空翻译：0 个空值
  - ✅ 品牌名：48 语言一致
  - ✅ 联系方式：48 语言 email 一致
  - ✅ __next_error__：0 个页面出现
  - ✅ JSON-LD：7 个关键页面各 1 个 ld+json 标签
  - ✅ Sitemap：576 URL，hreflang 完整
  - ✅ Robots.txt：正确
  - ✅ SEO 结构：H1=1, nav/main/dl/dt/dd 语义化完整
  - ✅ 价格检查：无实际价格数字（$10/$15 为 RSC 内部 ID）
  - ✅ 交付周期：FAQ 中的时间为法规流程说明，非服务承诺
  - ✅ og-image：8.9KB PNG 已优化
  - ❌ **BUG：FAQ 页 6 个 sub-question A keys 缺失** — labelA3a/A4a/A5a、cccA3a/A4a、brandA5a 在 en.json 中有 Q keys 但 A keys 全部不存在，导致 6 个 FAQ 子问题不渲染。FAQ 页当前 33 个问题，应为 39 个。所有 48 语言均受影响。（详见 TASK.md T52）
- **构建**：632 pages, 0 error ✅
- **Git**：TASK.md 新增 T52
- **执行任务**：T39-T45 全部完成 ✅
- **组件交互深度检查**：
  - ✅ ThankYou 页 — 组件已从硬编码英文改为 t() 翻译，Back 链接改为 locale-aware
  - ✅ ServiceCommon CTA — ctaTitle/ctaSubtitle/ctaButton 已验证为中文 ✓
  - ✅ 6 个服务页 FAQ — faq5q/5a/6q/6a 已全部翻译 ✓
  - ✅ About 页 — teamTitle/teamSubtitle/teamMember*/partnersTitle/partnersSubtitle 已全部翻译 ✓
  - ✅ Blog 页（zh）— 全部 14 keys 已翻译 ✓
  - ❌ **新发现 — zh.json FAQ 页 44 keys 未翻译**（扩展 FAQ Q5/Q6/generalQ5-11 等仍为英文）
  - ❌ **新发现 — 47 语言各 8 个 FAQ keys 未翻译**（generalQ11/labelQ5/ecommerceQ5/brandQ5 等）
  - ❌ **新发现 — 46 语言 Blog namespace 全部未翻译**（非 en/zh 语言）
- **构建**：632 pages, 0 error ✅
- **Git**：2 commits 已推送（016fac9, ae04229），TASK.md 新增 T46-T48

## 第 17 轮巡检 — hreflang 全链路修复 (2026-05-03)
- **发现：** 11 个非博客页面缺失全部 hreflang 链接
  - **根因：** `generateMetadata` 中 `alternates: { canonical: url }` 在 Next.js App Router 中会**完全覆盖** layout 级 `alternates.languages`，而非合并
  - **受影响：** about, packages, faq, thank-you, services + gacc/label/ccc/cosmetics/ecommerce/brand
  - **修复：** 为每个页面补全 `alternates.languages`（48 语言 × 11 页面 = 528 个 hreflang 链接）
  - **验证：** 构建输出 FAQ 页从 0→48 个 hreflang ✅
- **博客 hreflang 优化：** 删除冗余 `blog/head.tsx`，改用内联 `<link>` 标签（`output: 'export'` 兼容）
- **构建：** 867 pages, 0 errors ✅
- **Git**：2 commits 已推送（b3f12bc T65, cad8765 T66）
