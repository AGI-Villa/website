# SEO 优化清单

## ✅ 已完成的 SEO 优化

### 基础 SEO

#### Meta 标签
- ✅ Title 标签优化（带模板）
- ✅ Description 元标签（160字符内）
- ✅ Keywords 元标签
- ✅ Author 和 Publisher 信息
- ✅ Canonical URL 设置
- ✅ Viewport 设置（响应式）
- ✅ Language 属性设置

#### Open Graph (社交媒体)
- ✅ og:title
- ✅ og:description
- ✅ og:type (website)
- ✅ og:url
- ✅ og:image（1200x630px）
- ✅ og:site_name
- ✅ og:locale

#### Twitter Cards
- ✅ twitter:card (summary_large_image)
- ✅ twitter:title
- ✅ twitter:description
- ✅ twitter:image
- ✅ twitter:creator

### 技术 SEO

#### 爬虫和索引
- ✅ robots.txt 配置
- ✅ sitemap.xml 自动生成
- ✅ 机器人元标签（index, follow）
- ✅ Google 爬虫特定设置
- ✅ 无 noindex 标签阻止索引

#### 结构化数据
- ✅ JSON-LD Schema.org 实现
- ✅ Organization schema
- ✅ 联系信息
- ✅ Logo 和品牌信息

#### 性能优化（影响 SEO）
- ✅ 图片优化（WebP/AVIF）
- ✅ 代码分割
- ✅ 懒加载
- ✅ 压缩启用
- ✅ 字体优化

### PWA 和移动端
- ✅ manifest.json
- ✅ 响应式设计
- ✅ 移动端优化
- ✅ Touch 图标

## 📋 待完成的优化（需要实际数据）

### 1. 社交媒体集成
```tsx
// 在 layout.tsx 中更新
sameAs: [
  'https://twitter.com/agivilla',      // 添加实际链接
  'https://linkedin.com/company/agivilla',
  'https://github.com/agivilla',
  'https://facebook.com/agivilla',
  'https://instagram.com/agivilla',
],
```

### 2. 联系信息
```tsx
contactPoint: {
  '@type': 'ContactPoint',
  contactType: 'General Inquiry',
  email: 'contact@agivilla.com',       // 添加实际邮箱
  telephone: '+1-XXX-XXX-XXXX',        // 添加实际电话
},
```

### 3. 搜索引擎验证
在 `layout.tsx` 的 metadata 中添加：
```tsx
verification: {
  google: 'your-google-verification-code',
  bing: 'your-bing-verification-code',
  yandex: 'your-yandex-verification-code',
},
```

### 4. 扩展 Sitemap
在 `app/sitemap.ts` 中添加所有页面：
```tsx
{
  url: `${baseUrl}/about`,
  lastModified: currentDate,
  changeFrequency: 'monthly',
  priority: 0.8,
},
{
  url: `${baseUrl}/events`,
  lastModified: currentDate,
  changeFrequency: 'weekly',
  priority: 0.9,
},
// ... 其他页面
```

### 5. 图片 Alt 文本
确保所有图片都有描述性的 alt 属性。

### 6. 语义化 HTML
- 使用正确的标题层级（h1, h2, h3...）
- 使用语义化标签（article, section, nav, aside）
- ARIA 标签用于无障碍

## 🔍 SEO 最佳实践

### 内容优化

#### 标题优化
- 主标题包含关键词
- 保持在 50-60 字符
- 每页唯一的标题

#### 描述优化
- 包含主要关键词
- 150-160 字符
- 包含行动号召（CTA）

#### URL 结构
- 简短、描述性
- 使用连字符分隔单词
- 小写字母
- 包含关键词

### 技术要求

#### 页面速度
- ✅ Core Web Vitals 优化
- ✅ LCP < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1

#### 移动友好
- ✅ 响应式设计
- ✅ 适当的字体大小
- ✅ 触摸目标大小足够
- ✅ 无水平滚动

#### HTTPS
- [ ] 确保使用 HTTPS
- [ ] 配置 SSL 证书
- [ ] 强制 HTTPS 重定向

### 链接优化

#### 内部链接
- 使用描述性锚文本
- 确保没有死链
- 创建清晰的导航结构

#### 外部链接
- 使用 rel="noopener" 安全属性
- 可信来源链接
- 适当使用 nofollow

## 📊 监控和分析

### 工具集成

#### Google Search Console
1. 验证网站所有权
2. 提交 sitemap
3. 监控索引状态
4. 检查移动可用性
5. 查看搜索性能

#### Google Analytics 4
```tsx
// 在 layout.tsx 中添加
<Script
  strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
/>
```

#### 其他工具
- Bing Webmaster Tools
- Yandex Webmaster
- Ahrefs / SEMrush（可选）

### 性能监控
- Google PageSpeed Insights
- Lighthouse CI
- WebPageTest
- GTmetrix

## 🎯 关键词策略

### 主要关键词
- venture studio
- AI venture studio
- startup incubator
- community-driven innovation
- AGI villa
- startup accelerator

### 长尾关键词
- community-driven venture studio
- AI-native startup incubator
- how to validate startup ideas
- startup community support
- venture studio vs accelerator

### 本地 SEO（如适用）
- 添加 Google My Business
- 本地 Schema 标记
- 本地关键词优化

## 📝 内容策略

### 博客/新闻（推荐添加）
创建 `/blog` 路由以提升 SEO：
- 定期发布高质量内容
- 优化每篇文章的 SEO
- 包含内部链接
- 社交媒体分享

### Rich Snippets
考虑添加：
- FAQ Schema
- Event Schema（用于活动页面）
- Article Schema（用于博客）
- BreadcrumbList Schema

示例：
```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is AGI Villa?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "AGI Villa is a community-driven, AI-native venture studio..."
    }
  }]
}
```

## ✅ 部署前检查清单

### 基础检查
- [ ] 所有页面有唯一的 title 和 description
- [ ] 所有图片有 alt 文本
- [ ] 没有 404 错误
- [ ] 没有重复内容
- [ ] Canonical URLs 正确设置

### 技术检查
- [ ] robots.txt 可访问
- [ ] sitemap.xml 可访问
- [ ] SSL 证书已安装
- [ ] 301 重定向正确配置
- [ ] 页面加载速度 < 3 秒

### 结构化数据检查
- [ ] 使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 验证
- [ ] 使用 [Schema.org Validator](https://validator.schema.org/) 验证
- [ ] 没有结构化数据错误

### 移动端检查
- [ ] 通过 Google Mobile-Friendly Test
- [ ] 响应式设计在所有设备上正常
- [ ] 触摸元素间距适当

### 分析检查
- [ ] Google Analytics 已配置
- [ ] Google Search Console 已验证
- [ ] 事件跟踪已设置
- [ ] 转化追踪已配置

## 📈 持续优化

### 每月任务
- 检查 Search Console 错误
- 分析搜索性能
- 更新过时内容
- 检查竞争对手

### 每季度任务
- 全面 SEO 审计
- 更新关键词策略
- 分析反向链接
- 优化转化率

### 工具和资源
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [PageSpeed Insights](https://pagespeed.web.dev)
- [Schema.org](https://schema.org)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

