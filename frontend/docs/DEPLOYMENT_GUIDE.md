# 部署优化指南

## 部署前准备

### 1. 环境变量配置

确保在部署平台上设置以下环境变量：

```bash
# 生产环境
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://agivilla.com

# 分析工具（可选）
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SENTRY_DSN=your_sentry_dsn
```

### 2. 构建前检查

```bash
# 运行所有检查
pnpm perf-check      # 性能检查
pnpm type-check      # 类型检查
pnpm lint            # 代码规范检查

# 本地构建测试
pnpm build
pnpm start
```

### 3. 性能审计

使用 Lighthouse 进行审计：

```bash
# 使用 Chrome DevTools 或 CLI
npx lighthouse http://localhost:3000 --view
```

目标分数：
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 95

## 推荐部署平台

### 1. Vercel（推荐）

#### 优势
- ✅ 零配置部署
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 边缘函数支持
- ✅ 自动性能优化
- ✅ 预览部署

#### 部署步骤

1. **连接 Git 仓库**
```bash
vercel
```

2. **配置环境变量**
在 Vercel Dashboard 中设置环境变量

3. **部署配置** (vercel.json)
```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).(.*)$",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. Netlify

#### 部署配置 (netlify.toml)
```toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 3. AWS (Amplify/CloudFront)

#### 优势
- 完全控制
- 可扩展性强
- 企业级功能

#### 基本配置
```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm
        - pnpm install
    build:
      commands:
        - pnpm build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

## 性能优化配置

### 1. CDN 配置

#### CloudFlare（推荐免费方案）

1. **添加网站到 CloudFlare**
2. **启用以下功能**:
   - Auto Minify (JS, CSS, HTML)
   - Brotli Compression
   - HTTP/3 (QUIC)
   - Early Hints
   - Rocket Loader

3. **缓存规则**:
```
/*.(jpg|jpeg|png|gif|ico|svg|webp|avif) - Cache Everything
Cache Level: Standard
Edge TTL: 1 month
Browser TTL: 1 month
```

### 2. 缓存策略

#### Next.js 缓存配置
```js
// next.config.mjs
const nextConfig = {
  // ... 其他配置
  
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### 3. 数据库和 API 优化

如果使用数据库：

```js
// 使用连接池
import { Pool } from 'pg'

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// 使用 SWR 或 React Query 进行数据缓存
import useSWR from 'swr'

const { data } = useSWR('/api/data', fetcher, {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 60000, // 1分钟
})
```

## 监控和分析

### 1. 设置 Vercel Analytics

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 2. Google Analytics 4

```tsx
// app/layout.tsx
import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 3. Sentry 错误监控

```bash
pnpm add @sentry/nextjs
```

```js
// next.config.mjs
const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
  // ... 现有配置
}

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: "your-org",
  project: "your-project",
})
```

### 4. Web Vitals 跟踪

```tsx
// app/layout.tsx
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // 发送到分析服务
    console.log(metric)
    
    // 或发送到自定义端点
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify(metric),
    })
  })
}
```

## 安全配置

### 1. 安全头部

```js
// next.config.mjs
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
]

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

### 2. 内容安全策略 (CSP)

```js
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

// 添加到 headers 配置
{
  key: 'Content-Security-Policy',
  value: cspHeader.replace(/\n/g, ''),
}
```

## 部署检查清单

### 构建前
- [ ] 运行 `pnpm perf-check`
- [ ] 运行 `pnpm type-check`
- [ ] 运行 `pnpm lint`
- [ ] 本地构建测试成功
- [ ] 所有环境变量已配置

### SEO
- [ ] robots.txt 可访问
- [ ] sitemap.xml 已生成
- [ ] Meta 标签完整
- [ ] Open Graph 图片已优化
- [ ] 结构化数据验证通过

### 性能
- [ ] Lighthouse 分数 > 90
- [ ] 图片已优化（WebP/AVIF）
- [ ] 代码分割已实现
- [ ] 字体已优化
- [ ] Core Web Vitals 达标

### 安全
- [ ] HTTPS 已启用
- [ ] 安全头部已配置
- [ ] CSP 策略已设置
- [ ] 敏感信息已移除

### 监控
- [ ] Analytics 已配置
- [ ] 错误监控已设置
- [ ] 性能监控已启用
- [ ] 日志系统已配置

## 持续优化

### 每周任务
- 检查 Analytics 数据
- 审查错误日志
- 监控性能指标
- 更新依赖包

### 每月任务
- 完整性能审计
- SEO 排名检查
- 安全漏洞扫描
- 备份验证

### 工具推荐
- **性能**: Lighthouse, WebPageTest, PageSpeed Insights
- **SEO**: Google Search Console, Ahrefs
- **监控**: Sentry, LogRocket, Datadog
- **分析**: Google Analytics, Vercel Analytics

## 回滚策略

### Vercel
```bash
# 列出部署
vercel ls

# 回滚到特定部署
vercel rollback [deployment-url]
```

### Git
```bash
# 创建回滚分支
git checkout -b rollback/issue-description

# 回滚到特定提交
git revert <commit-hash>

# 推送并部署
git push origin rollback/issue-description
```

## 技术支持

遇到问题时：

1. 检查部署日志
2. 验证环境变量
3. 测试本地构建
4. 查看监控数据
5. 联系平台支持

## 相关资源

- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Vercel 文档](https://vercel.com/docs)
- [Web.dev 性能指南](https://web.dev/performance/)
- [Google Search Console](https://search.google.com/search-console)

