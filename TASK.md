# 官网改版 — 任务清单

## 当前状态 (2026-05-02 14:00 UTC+8)
- ✅ 12 页面全部完成
- ✅ 48 语言翻译补齐
- ✅ 构建 0 error
- ✅ 服务页均有 ServiceFAQ + LeadMagnet
- ✅ FAQ 语义化 dl/dt/dd
- ✅ sitemap.xml + robots.txt
- ⚠️ 47 个 locale 文件各多 1 个 key（key 不一致）
- ⚠️ JSON-LD 仅 FAQ 页有，其他页面缺失
- ⚠️ 首页无独立 metadata（依赖 layout.tsx）

---

## 待执行任务（按优先级）

### 🔴 P0：构建 & 数据一致性
- [x] T1. 构建 0 error 验证
- [x] T2. 修复 Home/Packages title/subtitle
- [x] T3. 修复 48 locale key 不一致（各多 1 个 extra key）
- [ ] T4. 校验 npx next build 0 warning

### 🔴 P0：样式统一
- [x] T5. 统一页面顶部间距 pt-28
- [x] T6. 统一 section 间距规范

### 🟡 P1：内容完善
- [x] T7. 服务页添加 ServiceFAQ（4 Q&A × 6 服务）
- [x] T8. FAQ 页语义化 dl/dt/dd
- [x] T9. 各服务页添加 LeadMagnet 表单
- [x] T10. CTA 锚点到表单（LeadMagnet + WhatsApp 双 CTA）

### 🟡 P1：翻译质量
- [ ] T11. 48 locale 文件翻译质量抽检（zh/ja/ko/ar）
- [ ] T12. 修复关键语言翻译不准确

### 🟢 P2：SEO/GEO
- [x] T13. sitemap.xml（600 URLs + 30000 hreflang）
- [x] T14. robots.txt
- [x] T15. Open Graph（layout.tsx）
- [ ] T16. JSON-LD 结构化数据（首页/About/Services/Packages/服务页）
- [ ] T17. 首页独立 metadata（替代 layout.tsx 默认）
- [ ] T18. og:image 生成与部署

### 🟢 P2：上线准备
- [ ] T19. 多语言页面抽样验证（/zh/ /ja/ /ar/ /ru/）
- [ ] T20. 浏览器兼容性检查
- [ ] T21. 性能优化（Lighthouse）
- [ ] T22. Cloudflare Pages 部署验证

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
