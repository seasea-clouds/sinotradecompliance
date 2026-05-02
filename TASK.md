# 官网改版 — 任务清单

## 当前状态 (2026-05-02 14:00 UTC+8)
- ✅ 12 页面全部完成
- ✅ 48 语言翻译，key 完全一致
- ✅ 构建 0 error
- ✅ 6 个服务页均有 ServiceFAQ + LeadMagnet + CTASection
- ✅ FAQ 页语义化 dl/dt/dd + JSON-LD
- ✅ sitemap.xml + robots.txt
- ⚠️ JSON-LD 仅 FAQ 页有，其余 11 页缺失
- ⚠️ 首页/ThankYou 无独立 metadata
- ⚠️ About/Packages/Services 缺少 LeadMagnet

---

## 待执行任务（按优先级）

### 🔴 P0：SEO 结构化数据
- [ ] T1. 首页添加独立 metadata + JSON-LD
- [ ] T2. About 页添加 JSON-LD (AboutPage)
- [ ] T3. Services 页添加 JSON-LD (CollectionPage)
- [ ] T4. 6 个服务页添加 JSON-LD (Service schema)
- [ ] T5. Packages 页添加 JSON-LD + LeadMagnet
- [ ] T6. ThankYou 页添加独立 metadata

### 🟡 P1：内容完善
- [ ] T7. About/Packages/Services/FAQ 页添加 LeadMagnet（非服务页也需表单入口）
- [ ] T8. 首页添加 FAQ 摘要（3 个关键问题 → 跳转 FAQ 页）

### 🟡 P1：翻译质量
- [ ] T9. zh.json 翻译质量抽检（用户之前报告过翻译问题）
- [ ] T10. ja/ko/ar 等关键语言抽检

### 🟢 P2：上线准备
- [ ] T11. 多语言页面抽样验证（/zh/ /ja/ /ar/ /ru/）
- [ ] T12. og:image 生成
- [ ] T13. Cloudflare Pages 部署验证

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

---

## 关键规则
- ❌ 不展示价格 / 交付周期
- ✅ 48 语言翻译开发阶段补齐
- ✅ 第三方表单，无数据库
- ✅ 品牌名 "SinoTrade Compliance" 不翻译
- ✅ 联系方式所有语言一致

## 详细方案
见 `REDESIGN-PLAN.md`
