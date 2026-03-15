# Emoji Maker - MVP 需求文档

## 1. 项目概述

**产品名称：** Emoji Maker

**定位：** SEO 内容站 + AI 工具引流

**核心价值：** 用户输入文字描述，AI 生成 emoji，一键导出适配 Slack/Discord 的标准尺寸 PNG

**目标用户：** Slack/Discord 用户、设计师、内容创作者

**变现方式：** Freemium（免费限次 + 付费无限，MVP 阶段暂不接入支付）

---

## 2. 技术栈

- 框架：Next.js 14（App Router，兼容 Cloudflare Pages Edge Runtime）
- AI 推理：SiliconFlow API（FLUX.1-schnell 模型，国内可访问，免费额度）
- 图片处理：浏览器 Canvas API（纯前端，零服务端存储）
- 部署：Cloudflare Pages + Workers
- 样式：Tailwind CSS
- 支付：暂不接入（MVP 阶段）

**架构原则：** 图片不落服务端，Replicate 返回 URL 后由前端 Canvas 处理并直接下载，成本极低。

---

## 3. 页面结构

- `/` → 首页（核心工具页）【P0】
- `/emoji-maker-for-slack` → Slack 场景落地页【P0】
- `/emoji-maker-for-discord` → Discord 场景落地页【P0】
- `/ai-emoji-generator` → AI 生成场景页【P1】
- `/blog/[slug]` → 内容文章【P1】

---

## 4. 核心功能需求

### 4.1 AI Emoji 生成【P0】

**用户流程：**

1. 用户在输入框输入描述（如 "a happy cat with sunglasses"）
2. 点击 Generate 按钮
3. 显示 loading 状态（预计 5-15 秒）
4. 展示生成结果
5. 用户点击下载按钮，获得 PNG 文件

**功能细节：**

- 输入框支持英文描述，placeholder 提供示例文案
- 每次生成 1 张（MVP 阶段，节省 API 成本）
- 免费用户：每天 3 次生成（基于 localStorage 计数，无需登录）
- 超出限制：展示友好提示，引导付费（MVP 阶段仅展示文案，不实际拦截 API 调用）

### 4.2 Canvas 图片处理【P0】

生成完成后，前端自动处理：

- 裁剪为正方形
- 导出尺寸：128×128px（Slack/Discord 标准）
- 格式：PNG，透明背景优先
- 下载文件名：`emoji-[timestamp].png`
- 下载完成后立即释放内存（URL.revokeObjectURL）

### 4.3 落地页内容【P0】

每个场景落地页包含：

- 工具组件（复用首页生成器）
- 场景化标题和描述文案
- How to use（3 步说明）
- FAQ（5 条，针对场景关键词优化）
- 相关工具推荐（内链）

---

## 5. SEO 需求

### 5.1 目标关键词

| 关键词 | 类型 | 对应页面 |
|---|---|---|
| emoji maker | 核心词 | / |
| ai emoji maker | 核心词 | / |
| emoji maker for slack | 场景词（转化高） | /emoji-maker-for-slack |
| emoji maker for discord | 场景词（转化高） | /emoji-maker-for-discord |
| ai emoji generator | 功能词 | /ai-emoji-generator |
| custom emoji maker free | 免费意图词 | / |

### 5.2 页面 SEO 配置（每页必须）

- `title`：包含目标关键词，60 字符以内
- `meta description`：包含关键词，150 字符以内
- `h1`：唯一，包含主关键词
- Open Graph 标签：og:title / og:description / og:image
- Canonical URL
- 结构化数据：WebApplication schema

### 5.3 技术 SEO

- sitemap.xml 自动生成
- robots.txt 配置
- 页面加载速度 LCP < 2.5s（Cloudflare CDN + 静态优先）
- 移动端完整适配

---

## 6. UI/UX 要求

### 6.1 首页布局（从上到下）

1. Header：Logo + 导航
2. Hero：大标题 + 副标题
3. 生成器区域：输入框 + Generate 按钮 + 结果展示 + 下载按钮
4. How it works：3 步说明
5. 场景入口：Slack / Discord 卡片
6. FAQ
7. Footer

### 6.2 设计风格

- 简洁现代，工具为主体
- 主色：紫色系（emoji 氛围感）
- 字体：Inter 或 Geist
- 移动端优先设计

### 6.3 Loading 与错误状态

- 生成中：spinner 动画 + 文案 "Generating your emoji..."
- 超时（30s）：显示错误提示，提供重试按钮
- API 失败：友好错误文案，不暴露技术细节

---

## 7. API 集成

### 7.1 SiliconFlow API

- 接口：`POST https://api.siliconflow.cn/v1/images/generations`
- 模型：`black-forest-labs/FLUX.1-schnell`（免费，国内服务器可访问）
- 需要注册 SiliconFlow 账号获取 API Key：https://cloud.siliconflow.cn
- 请求参数示例：

```json
{
  "model": "black-forest-labs/FLUX.1-schnell",
  "prompt": "emoji sticker of happy cat, white background, simple, clean, cartoon style",
  "image_size": "512x512",
  "num_inference_steps": 4,
  "batch_size": 1
}
```

- 响应：返回图片 URL，服务端转为 base64 后返回前端（避免跨域）
- 环境变量：`SILICONFLOW_API_KEY`

### 7.2 Rate Limiting（前端）

- localStorage 记录当日生成次数，key 格式：`emoji_count_YYYY-MM-DD`
- 免费限额：3 次/天（前端软限制，引导付费）
- SiliconFlow 免费额度用完后需充值，建议后续加服务端限流

---

## 8. 非功能需求

| 项目 | 要求 |
|---|---|
| 性能 | 首屏 LCP < 2.5s |
| 兼容性 | Chrome / Safari / Firefox 最新版 |
| 移动端 | 全功能可用 |
| 无障碍 | 基础 alt 文本、键盘可操作 |
| 隐私 | 不存储用户图片，无需注册 |

---

## 9. MVP 范围界定

### ✅ 包含

- AI emoji 生成（文字描述 → 图片）
- Canvas 处理 + PNG 下载（128×128px）
- 首页 + Slack 落地页 + Discord 落地页
- 基础 SEO 配置（meta、sitemap、schema）
- 每日免费次数限制（前端 localStorage）
- 移动端适配

### ❌ 不包含（后续迭代）

- 用户注册 / 登录
- 付费订阅 / Stripe 接入
- 图片上传（photo to emoji）
- 批量生成
- 历史记录
- 社交分享

---

## 10. 开发里程碑（7 天上线）

| 阶段 | 内容 | 时间 |
|---|---|---|
| Day 1-2 | 项目初始化，Cloudflare Pages 部署，Replicate API 调通 | 2天 |
| Day 3 | Canvas 处理 + 下载功能完成 | 1天 |
| Day 4 | 首页 UI 完成，SEO meta 配置 | 1天 |
| Day 5 | Slack / Discord 落地页完成 | 1天 |
| Day 6-7 | 内容填充，提交 Google Search Console，正式上线 | 2天 |
