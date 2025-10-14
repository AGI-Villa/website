# Vercel 部署指南

## 🚀 快速部署步骤

### 方法一：通过 Vercel Dashboard（推荐新手）

这是最简单的方法，通过 Web 界面完成部署。

#### 步骤：

1. **访问 Vercel**
   - 打开 [vercel.com](https://vercel.com)
   - 使用 GitHub/GitLab/Bitbucket 账号登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择您的 Git 仓库
   - 如果看不到仓库，点击 "Adjust GitHub App Permissions"

3. **配置项目**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: pnpm build
   Output Directory: .next
   Install Command: pnpm install
   ```

4. **设置环境变量**（可选）
   - 点击 "Environment Variables"
   - 添加以下变量：
     ```
     NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
     NODE_ENV=production
     ```

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待 2-3 分钟完成部署
   - 部署成功后会得到一个 `.vercel.app` 域名

### 方法二：通过 Vercel CLI（推荐开发者）

适合熟悉命令行的开发者，可以更灵活地控制部署过程。

#### 步骤：

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```
   按提示选择登录方式（Email 或 GitHub）

3. **进入前端目录**
   ```bash
   cd frontend
   ```

4. **初始化部署**
   ```bash
   vercel
   ```
   
   按提示回答问题：
   ```
   ? Set up and deploy "~/frontend"? [Y/n] y
   ? Which scope do you want to deploy to? [选择您的账号]
   ? Link to existing project? [N/y] n
   ? What's your project's name? agivilla-frontend
   ? In which directory is your code located? ./
   ```

5. **部署到生产环境**
   ```bash
   vercel --prod
   ```

## 📋 部署前检查清单

在部署之前，请确认：

- [ ] ✅ 所有代码已提交到 Git
  ```bash
  git status
  git add .
  git commit -m "Prepare for deployment"
  git push origin main
  ```

- [ ] ✅ 本地构建测试通过
  ```bash
  cd frontend
  pnpm build
  pnpm start
  ```

- [ ] ✅ 类型检查和 Lint 通过
  ```bash
  pnpm type-check
  pnpm lint
  ```

- [ ] ✅ 性能检查通过
  ```bash
  pnpm perf-check
  ```

## ⚙️ Vercel 项目设置

### 推荐配置

登录 Vercel Dashboard 后，在项目设置中配置：

#### 1. General Settings

```
Project Name: agivilla-frontend
Framework: Next.js
Root Directory: frontend
Node.js Version: 18.x (推荐)
Build Command: pnpm build
Output Directory: .next
Install Command: pnpm install
Development Command: pnpm dev
```

#### 2. Environment Variables

添加以下环境变量（Settings → Environment Variables）：

**Production 环境：**
```bash
# 必需
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# 可选 - Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 可选 - 其他服务
# SENTRY_DSN=your_sentry_dsn_here
```

**Preview 和 Development 环境：**
```bash
NEXT_PUBLIC_SITE_URL=https://preview-your-project.vercel.app
```

#### 3. Domains（域名设置）

- 默认域名：`your-project.vercel.app`
- 自定义域名：在 Settings → Domains 中添加
  - 输入您的域名（如 `agivilla.com`）
  - 按照提示配置 DNS 记录

#### 4. Git（自动部署）

- ✅ Production Branch: `main`
- ✅ 启用自动部署（每次推送到 main 分支自动部署）
- ✅ Preview 部署（每个 Pull Request 都会创建预览）

## 🔧 Vercel 配置文件说明

项目根目录的 `vercel.json` 配置了：

```json
{
  "buildCommand": "cd frontend && pnpm install && pnpm build",
  "outputDirectory": "frontend/.next",
  "framework": "nextjs",
  "installCommand": "pnpm install --filter frontend",
  "headers": [
    // 安全头部配置
    // 缓存策略配置
  ]
}
```

### 关键配置说明：

- **buildCommand**: 构建命令（进入 frontend 目录后构建）
- **outputDirectory**: 输出目录
- **headers**: HTTP 响应头配置
  - 安全头部（X-Frame-Options, CSP 等）
  - 缓存策略（静态资源长期缓存）

## 🌐 自定义域名配置

### 1. 在 Vercel 添加域名

1. 进入项目 Settings → Domains
2. 输入域名：`agivilla.com` 和 `www.agivilla.com`
3. 点击 "Add"

### 2. 配置 DNS 记录

在您的域名注册商（如阿里云、GoDaddy 等）添加以下 DNS 记录：

#### A 记录（推荐）
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

```
Type: A
Name: www
Value: 76.76.21.21
TTL: 3600
```

#### 或者使用 CNAME 记录
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 3. 等待 DNS 传播

- 通常需要 10 分钟到 48 小时
- 使用 [DNS Checker](https://dnschecker.org) 检查传播状态

## 📊 部署后监控

### 1. Vercel Analytics

在 Dashboard 中启用：
- 访问项目 → Analytics
- 查看性能指标、访问量等

### 2. 部署日志

每次部署都会生成详细日志：
- Deployments → 选择部署 → View Function Logs
- 可以看到构建过程和运行时日志

### 3. 性能监控

查看 Core Web Vitals：
- 项目 → Speed Insights
- 监控 LCP、FID、CLS 等指标

## 🔄 持续部署流程

配置完成后，工作流程如下：

```bash
# 1. 开发功能
git checkout -b feature/new-feature
# ... 编写代码 ...

# 2. 提交代码
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# 3. 创建 Pull Request
# - GitHub 上创建 PR
# - Vercel 自动创建预览部署
# - 预览链接会出现在 PR 评论中

# 4. 合并到 main 分支
# - 代码审查通过后合并
# - Vercel 自动部署到生产环境
```

## 🐛 常见问题解决

### 问题 1：构建失败 - "Module not found"

**解决方案：**
```bash
# 清理本地缓存重新构建
cd frontend
rm -rf node_modules .next
pnpm install
pnpm build
```

如果本地成功，检查 Vercel 的 Node.js 版本设置。

### 问题 2：环境变量未生效

**解决方案：**
1. 确保环境变量名以 `NEXT_PUBLIC_` 开头（客户端变量）
2. 重新部署项目（Settings → General → Redeploy）

### 问题 3：静态资源 404

**解决方案：**
确保图片路径正确：
```tsx
// ❌ 错误
<img src="./images/logo.png" />

// ✅ 正确
<img src="/images/logo.png" />

// ✅ 最佳（使用 next/image）
<Image src="/images/logo.png" width={100} height={100} />
```

### 问题 4：部署慢

**解决方案：**
1. 使用 pnpm 而不是 npm（已配置）
2. 检查依赖包大小
3. 启用缓存（Vercel 默认启用）

### 问题 5：自定义域名不工作

**解决方案：**
1. 检查 DNS 记录是否正确
2. 等待 DNS 传播（最多 48 小时）
3. 使用 `dig your-domain.com` 检查 DNS

## 📈 优化建议

### 1. 启用 Edge Functions

```tsx
// app/layout.tsx 或 page.tsx
export const runtime = 'edge'
```

### 2. 配置 ISR（增量静态再生成）

```tsx
// app/page.tsx
export const revalidate = 3600 // 每小时重新生成
```

### 3. 使用 Vercel Speed Insights

```bash
cd frontend
pnpm add @vercel/speed-insights
```

```tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

## 🔐 安全检查

部署后检查：

- [ ] HTTPS 已启用（Vercel 自动配置）
- [ ] 安全头部已配置（通过 vercel.json）
- [ ] 敏感信息不在代码中
- [ ] .env 文件已在 .gitignore 中

## 📞 获取帮助

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Vercel 社区](https://vercel.com/community)
- [GitHub Discussions](https://github.com/vercel/vercel/discussions)

## 🎉 部署成功后的步骤

1. **验证网站**
   - 访问您的 .vercel.app 域名
   - 测试所有功能
   - 检查性能（Lighthouse）

2. **配置 Google Search Console**
   - 提交网站
   - 提交 sitemap: `https://your-domain.com/sitemap.xml`

3. **设置监控**
   - Google Analytics
   - Vercel Analytics
   - Sentry（可选）

4. **分享您的网站** 🚀
   - 在社交媒体上分享
   - 收集用户反馈
   - 持续优化

---

**准备好了吗？开始部署吧！** 🚀

```bash
# 快速开始
cd frontend
vercel
```

有任何问题，随时查看本文档或联系 Vercel 支持团队。

