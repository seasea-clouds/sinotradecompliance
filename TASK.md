# 官网改版 — 任务清单

## 当前状态 (2026-05-01 23:18 UTC+8)
- ✅ 改版方案已确认，首页组件已升级
- ✅ 48 种语言已配置
- ✅ 组件命名空间对齐（Home / ServiceCommon 双格式兼容）
- ✅ 16 个翻译文件正在 AI 生成中（子-agent 执行）

## 执行清单

### Phase 1: 翻译文件
- [x] 定义 messages/en.json 所有新增 key（18 个 namespace）
- [x] AI 生成 47 种语言翻译 — **32/48 已完成，16 个待翻译（子-agent 执行中）**
- [ ] 校验 48 个文件 key 完整性（不允许缺失）
- [ ] 校验 npx next build 无 missing key warning

#### 已完成（32 个，完整 18 keys）
ar, bn, ca, cs, da, de, el, en, es, fa, fi, fr, he, hr, hu, id, it, ja, ko, nl, pl, pt, ro, ru, sl, sr, sv, sw, tr, vi, zh, af

#### 待翻译（16 个，旧 8 keys 结构 → 需更新为 18 keys）
az, be, bg, hi, hy, ka, ms, ne, no, si, sk, sq, ta, th, uk, ur
> ⏳ 子-agent `translate-remaining-16` 正在执行

> ⚠️ 翻译可能有频率限制，分 5 批执行，批次间隔 ≥10 分钟。
> 用 cron 设置定时任务，每 15 分钟执行一批。

### Phase 2: 路由 + 页面框架
- [x] 新建 8 个页面路由（about / services / 6 services / packages / faq）
- [x] 新建组件：ServicesGrid / ServiceHero / CoverSection / ProcessSteps / FAQAccordion / PackageCards / WhyUsCards / CTASection
- [x] 升级 Navbar（Services 下拉菜单 + 新页面链接）
- [x] 升级 Footer（服务链接列表 + 快速链接）
- [x] npx next build 通过（579 页面，exit 0）

### Phase 3: 内容填充
- [x] 首页（Hero 升级 Home namespace / ServicesGrid / WhyUsCards 4 卡片 / ProcessSteps / Expert / CTASection / LeadMagnet）
- [x] 服务总览页（ServicesGrid + CTASection）
- [x] 6 个服务详情页（gacc / label / ccc / cosmetics / ecommerce / brand）— 路由+组件结构已完成
- [x] 套餐页（PackageCards + CTASection）
- [x] FAQ 页（FAQAccordion + JSON-LD + CTASection）
- [x] 关于页（Mission / Values / CTA）

### Phase 4: SEO + GEO
- [x] 每页独立 metadata（title / description / OG / hreflang）— 所有页面 generateMetadata 已完成
- [x] JSON-LD 结构化数据（OrganizationJsonLd 组件 + FAQ JSON-LD）
- [x] sitemap.xml（scripts/generate-sitemap.mjs 已创建）
- [x] robots.txt（public/robots.txt 已创建）
- [ ] FAQ 语义化结构（dl/dt/dd）

### Phase 5: 第三方表单集成
- [ ] 嵌入第三方表单到 LeadMagnet
- [ ] 各服务页 CTA 锚点到表单

### Phase 6: 构建 + 部署
- [ ] npx next build → 确认 0 error
- [ ] 校验 48 语言 key 完整性
- [ ] git add / commit / push
- [ ] 验证 Cloudflare Pages 构建成功
- [ ] 多语言页面抽样验证

## 关键规则
- ❌ 不展示价格
- ❌ 不展示交付周期
- ✅ 48 语言翻译开发阶段补齐
- ✅ 第三方表单，无数据库
- ✅ 一次性全量上线

## 详细方案
见 `REDESIGN-PLAN.md`
