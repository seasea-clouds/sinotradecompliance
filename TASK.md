# 官网改版 — 任务清单

## 当前状态 (2026-05-02 12:00 UTC+8)
- ⚠️ 构建仍有报错（About 页面 key 不匹配），最新修复已推送但未部署完成
- ⚠️ 页面样式不统一（顶部间距不一致）
- ⚠️ 第三方表单 Web3Forms 已恢复代码但未验证
- ⚠️ FAQ 缺少语义化结构和 Common Questions

---

## 待执行任务（按优先级）

### 🔴 P0：修复构建
- [x] T1. 验证最新构建成功（commit 后需 0 error） — 387d21c ✅
- [x] T2. 修复所有页面翻译 key 不匹配问题（About/Packages/Home 的 title/subtitle 等）
- [x] T3. 校验 48 个 locale 文件 key 与 en.json 完全一致

### 🔴 P0：样式统一
- [x] T4. 统一所有页面顶部间距为 pt-28 — Hero pt-28, ServicesGrid pt-28, ServiceHero pt-28
- [x] T5. 统一 section 间距规范 — Hero pt-28 pb-16, content py-16
- [ ] T6. 验证各页面在移动端响应式正常（部署后手动检查）

### 🟡 P1：内容完善
- [x] T7. 各服务页添加 Common Questions（ServiceFAQ 组件，4 Q&A × 6 服务）
- [x] T8. FAQ 页改为语义化结构（dl/dt/dd + details/summary）— GEO 优化
- [ ] T9. LeadMagnet 第三方表单功能验证（Web3Forms 已恢复代码，需部署后测试）
- [ ] T10. 各服务页 CTA 锚点或跳转到表单

### 🟡 P1：翻译质量
- [ ] T11. 48 个 locale 文件翻译质量抽检（中文、日文、韩文、阿拉伯文等）
- [ ] T12. 修复 zh.json 等关键语言翻译不准确问题（之前用户报告过翻译质量问题）

### 🟢 P2：SEO/GEO
- [ ] T13. 验证 sitemap.xml 含全部 576 路由 + hreflang
- [ ] T14. 验证 JSON-LD 结构化数据正确
- [ ] T15. 添加 Open Graph image（og:image）

### 🟢 P2：上线准备
- [ ] T16. 多语言页面抽样验证（/zh/ /ja/ /ar/ /ru/）
- [ ] T17. 浏览器兼容性检查
- [ ] T18. 性能优化（Lighthouse 评分）

---

## 执行记录

| 时间 | 任务 | 状态 |
|------|------|------|
| 05-02 12:00 | 创建此任务清单 | ✅ |
| 05-02 12:30 | 修复 Home/Packages title/subtitle 构建报错 | ✅ d63b764 |
| 05-02 12:45 | 统一所有页面顶部间距 pt-28 | ✅ 0d282c5 |
| 05-02 13:00 | 服务页添加 Common Questions (FAQ) + 间距规范 | ✅ 153baab |
| 05-02 13:30 | FAQ 页语义化 dl/dt/dd + details/summary | ✅ e1befa0 |
| | | |

---

## 关键规则
- ❌ 不展示价格
- ❌ 不展示交付周期
- ✅ 48 语言翻译开发阶段补齐
- ✅ 第三方表单，无数据库
- ✅ 一次性全量上线

## 详细方案
见 `REDESIGN-PLAN.md`
