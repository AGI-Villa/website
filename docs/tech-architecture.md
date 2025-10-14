AGI Villa 网站 - 技术架构

> **版本：** v1.0  
> **最后更新：** 2025-10-14  
> **状态：** 规划中

> ⚠️ **注意**: 本文档包含 Strapi CMS 后端架构设计，该部分仍在规划中，尚未实现。当前项目仅包含前端部分。

---

## 📋 目录

1. [概述](#概述)
2. [技术栈](#技术栈)
3. [系统架构](#系统架构)
4. [项目结构](#项目结构)
5. [基础设施](#基础设施)
6. [开发流程](#开发流程)
7. [部署策略](#部署策略)
8. [性能与SEO](#性能与seo)
9. [安全](#安全)
10. [路线图](#路线图)

---

## 1. 概述

### 项目目标

- **高性能：** 快速加载，流畅动画，优秀的 Core Web Vitals 指标
- **SEO 优化：** 服务端渲染提升搜索引擎可见性
- **内容管理：** 通过 Strapi CMS 轻松更新内容
- **可扩展性：** 支持未来增长（多语言、社区功能）
- **开发体验：** 现代化工具链，类型安全，优秀的开发体验

### 核心需求

- 动态内容驱动的落地页（来自 CMS）
- 多语言支持（中英文）
- 社区门户（未来）
- 活动管理系统（未来）
- 分析数据集成
- 性能监控

---

## 2. 技术栈

### 前端

| 类别 | 技术 | 选择理由 |
|----------|-----------|---------|
| **框架** | Next.js 14+ (App Router) | SSR/SSG，出色的 SEO，React 生态系统，Vercel 优化 |
| **语言** | TypeScript | 类型安全，更好的开发体验，更少的 bug |
| **样式** | TailwindCSS + CSS Modules | 实用优先，符合 design-spec.md，快速开发 |
| **动画** | Framer Motion | 流畅的动画，满足 design-spec.md 要求 |
| **状态管理** | React Context + Zustand | 落地页使用简单状态，复杂功能用 Zustand |
| **数据获取** | React Query (TanStack Query) | 缓存，自动重新获取，乐观更新 |
| **表单** | React Hook Form + Zod | 类型安全验证，优秀的用户体验 |
| **图标** | Lucide React | 现代，一致的图标集 |

### 后端 / CMS

| 类别 | 技术 | 选择理由 |
|----------|-----------|---------|
| **CMS** | Strapi v4 | 开源，无头架构，灵活的内容建模，i18n 支持 |
| **数据库** | PostgreSQL | 稳定可靠，生产就绪，Strapi 推荐 |
| **文件存储** | Cloudinary / AWS S3 | 图片优化，CDN 分发 |
| **认证** | Strapi 内置 + NextAuth（未来） | 基于角色的访问控制 |

### DevOps 与基础设施

| 类别 | 技术 | 选择理由 |
|----------|-----------|---------|
| **托管（前端）** | Vercel | 零配置 Next.js 部署，边缘网络，自动 HTTPS |
| **托管（后端）** | Railway / Render | 便捷的 Strapi 部署，托管 PostgreSQL |
| **CI/CD** | GitHub Actions | 自动化测试，代码检查，部署 |
| **监控** | Vercel Analytics + Sentry | 性能追踪，错误监控 |
| **分析** | Plausible / Google Analytics | 隐私友好的分析工具 |
| **CDN** | Vercel Edge Network | 快速的全球内容分发 |

### 开发工具

| 类别 | 技术 |
|----------|-----------|
| **包管理器** | pnpm |
| **代码检查** | ESLint + Prettier |
| **Git 钩子** | Husky + lint-staged |
| **测试** | Vitest + Testing Library |
| **E2E 测试** | Playwright（未来） |

---

## 3. 系统架构

```
┌─────────────────────────────────────────────────────────────────┐
│                         用户浏览器                                │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Vercel 边缘网络 (CDN)                         │
│                    - 静态资源缓存                                 │
│                    - 边缘函数                                     │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Next.js 前端 (Vercel)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   App Router │  │  React Query │  │   Framer     │          │
│  │   (SSR/SSG)  │  │   (缓存)     │  │   Motion     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼ (API 调用)
┌─────────────────────────────────────────────────────────────────┐
│                  Strapi CMS (Railway/Render)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   REST API   │  │  GraphQL API │  │     i18n     │          │
│  │              │  │              │  │    插件      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                PostgreSQL 数据库（托管）                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              Cloudinary / AWS S3 (媒体存储)                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. 项目结构

```
website/
├── docs/                           # 文档
│   ├── DEVELOPMENT_PLAN.md         # 开发计划
│   ├── design-spec.md              # UI/UX 设计规范
│   ├── landing-page.md             # 内容文案参考
│   └── tech-architecture.md        # 本文件
│
├── frontend/                       # Next.js 应用
│   ├── app/                        # Next.js App Router
│   │   ├── (landing)/              # 落地页路由组
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── [locale]/               # i18n 路由（未来）
│   │   ├── api/                    # API 路由
│   │   ├── globals.css
│   │   └── layout.tsx
│   │
│   ├── components/                 # React 组件
│   │   ├── sections/               # 页面区块
│   │   │   ├── HeroSection.tsx
│   │   │   ├── WhyNowSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── WhatWeDoSection.tsx
│   │   │   ├── JoinEcosystemSection.tsx
│   │   │   ├── CasesEventsSection.tsx
│   │   │   ├── VisionSection.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── ui/                     # 可复用 UI 组件
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Container.tsx
│   │   │   └── ...
│   │   │
│   │   └── animations/             # 动画组件
│   │       ├── FadeIn.tsx
│   │       ├── SlideIn.tsx
│   │       └── ParticleBackground.tsx
│   │
│   ├── lib/                        # 工具函数与配置
│   │   ├── strapi.ts               # Strapi API 客户端
│   │   ├── utils.ts                # 辅助函数
│   │   └── constants.ts            # 应用常量
│   │
│   ├── types/                      # TypeScript 类型
│   │   ├── strapi.ts               # Strapi 响应类型
│   │   └── index.ts
│   │
│   ├── hooks/                      # 自定义 React Hooks
│   │   ├── useScrollReveal.ts
│   │   └── useStrapiContent.ts
│   │
│   ├── public/                     # 静态资源
│   │   ├── images/
│   │   ├── fonts/
│   │   └── favicon.ico
│   │
│   ├── .env.local                  # 环境变量
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── strapi/                         # Strapi CMS
│   ├── config/                     # Strapi 配置
│   │   ├── database.ts
│   │   ├── server.ts
│   │   ├── admin.ts
│   │   └── plugins.ts
│   │
│   ├── src/
│   │   ├── api/                    # 内容类型
│   │   │   ├── hero-section/
│   │   │   ├── why-now-section/
│   │   │   ├── about-section/
│   │   │   ├── what-we-do/
│   │   │   ├── ecosystem-role/
│   │   │   ├── case-study/
│   │   │   ├── social-responsibility/
│   │   │   └── footer/
│   │   │
│   │   ├── components/             # 可复用组件
│   │   ├── extensions/             # 自定义代码
│   │   └── middlewares/
│   │
│   ├── database/
│   ├── public/
│   ├── .env
│   └── package.json
│
├── .github/
│   └── workflows/
│       ├── frontend-ci.yml         # 前端 CI/CD
│       └── strapi-ci.yml           # Strapi CI/CD
│
├── .gitignore
├── README.md
└── package.json                    # 根 package.json（工作区）
```

---

## 5. 基础设施

### 环境配置

**前端 (.env.local)**
```env
# Strapi
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token

# 分析
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=agivilla.org

# 监控
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

**Strapi (.env)**
```env
# 服务器
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
JWT_SECRET=your_jwt_secret

# 数据库
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_SSL=false

# 文件上传
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

### 部署目标

| 环境 | 前端 | 后端 | 数据库 |
|-------------|----------|---------|----------|
| **开发环境** | localhost:3000 | localhost:1337 | 本地 PostgreSQL |
| **测试环境** | staging.agivilla.org | strapi-staging.railway.app | Railway PostgreSQL |
| **生产环境** | agivilla.org | strapi.agivilla.org | Railway PostgreSQL |

---

## 6. 开发流程

### 设置

```bash
# 克隆仓库
git clone https://github.com/agivilla/website.git
cd website

# 安装依赖
pnpm install

# 启动 Strapi（一个终端）
cd strapi
pnpm develop

# 启动前端（另一个终端）
cd frontend
pnpm dev
```

### Git 工作流

1. **分支命名：**
   - `feature/hero-section` - 新功能
   - `fix/animation-bug` - 修复问题
   - `docs/update-readme` - 文档更新

2. **提交规范：**
   - `feat: 添加首屏区块动画`
   - `fix: 修复移动端菜单 bug`
   - `docs: 更新架构文档`
   - `style: 使用 prettier 格式化代码`
   - `refactor: 简化 strapi 客户端`

3. **Pull Request 流程：**
   - 从功能分支创建 PR 到 `main`
   - CI 检查必须通过
   - 需要代码审查
   - Squash and merge

---

## 7. 部署策略

### 自动化部署

**前端（Vercel）**
- 连接到 GitHub 仓库
- 推送到 `main` 分支自动部署
- PR 自动生成预览部署
- 在 Vercel 控制台配置环境变量

**后端（Railway）**
- 连接到 GitHub 仓库（strapi 文件夹）
- 推送到 `main` 分支自动部署
- 托管 PostgreSQL 数据库
- 自动 SSL 证书

### 部署检查清单

- [ ] 环境变量已配置
- [ ] 数据库迁移已执行
- [ ] Strapi 管理员账户已创建
- [ ] Strapi 内容已填充
- [ ] DNS 记录已配置
- [ ] SSL 证书已激活
- [ ] 分析追踪已验证
- [ ] 错误监控已激活
- [ ] 性能已测试

---

## 8. 性能与SEO

### 性能目标

| 指标 | 目标 | 策略 |
|--------|--------|----------|
| **LCP** | < 2.5s | 图片优化，SSG，CDN |
| **FID** | < 100ms | 代码分割，最小化 JS |
| **CLS** | < 0.1 | 为图片预留空间，避免布局偏移 |
| **TTFB** | < 600ms | 边缘缓存，优化 API 调用 |

### SEO 策略

- **服务端渲染（SSR）** - 用于动态内容
- **静态生成（SSG）** - 用于落地页（每小时重新验证）
- **Metadata API** - 动态 meta 标签
- **Sitemap.xml** - 自动生成
- **robots.txt** - 已配置
- **结构化数据** - JSON-LD 用于富摘要
- **Open Graph 标签** - 用于社交分享
- **规范 URL** - 防止重复内容

### 图片优化

- Next.js `<Image>` 组件自动优化
- WebP 格式带回退
- 视口下方图片懒加载
- 响应式图片使用 srcset
- Cloudinary 转换

---

## 9. 安全

### 最佳实践

- **仅 HTTPS** - 通过 Vercel/Railway 强制执行
- **CORS** - 在 Strapi 中配置仅允许前端域名
- **API 速率限制** - 在 Strapi 中实现
- **环境变量** - 永不提交到 Git
- **内容安全策略（CSP）** - 在 Next.js headers 中配置
- **定期更新** - 每月更新依赖
- **输入验证** - 所有表单使用 Zod schemas
- **XSS 防护** - React 内置转义 + CSP

### Strapi 安全

- 管理面板仅通过 HTTPS 访问
- 强制使用强密码
- 基于角色的访问控制（RBAC）
- API tokens 具有有限范围
- 定期备份数据库

---

## 10. 路线图

### 第一阶段：MVP（第 1-4 周）
- [x] 架构设计
- [ ] Strapi 设置和内容类型
- [ ] 前端设置（Next.js + TailwindCSS）
- [ ] 落地页区块实现
- [ ] Strapi-前端集成
- [ ] 基础动画
- [ ] 部署到测试环境

### 第二阶段：优化（第 5-6 周）
- [ ] 按设计规范实现高级动画
- [ ] 性能优化
- [ ] SEO 优化
- [ ] 分析集成
- [ ] 生产环境部署
- [ ] 测试和 bug 修复

### 第三阶段：增强（第 7-8 周）
- [ ] 多语言支持（i18n）
- [ ] 博客/新闻板块
- [ ] 活动日历
- [ ] 邮件订阅
- [ ] 联系表单

### 第四阶段：社区功能（未来）
- [ ] 用户认证
- [ ] 社区门户
- [ ] 项目提交系统
- [ ] 导师匹配
- [ ] 投资人仪表板

---

## 📞 支持与维护

### 监控

- **正常运行时间：** UptimeRobot（99.9% SLA 目标）
- **性能：** Vercel Analytics + Lighthouse CI
- **错误：** Sentry（实时错误追踪）
- **日志：** Railway/Vercel 内置日志

### 备份策略

- **数据库：** 每日自动备份（Railway）
- **媒体：** Cloudinary 自动备份
- **代码：** Git 仓库（GitHub）
- **内容：** 每周 Strapi 导出

### 更新计划

- **安全补丁：** 立即更新
- **依赖更新：** 每月一次
- **内容更新：** 根据需要通过 Strapi
- **功能发布：** 双周迭代

---

**文档维护者：** 开发团队  
**最后审查：** 2025-10-13  
**下次审查：** 2025-11-13
