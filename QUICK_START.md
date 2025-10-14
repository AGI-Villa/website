# 🚀 快速部署到 Vercel

## 最快速的方法（3 分钟部署）

### 方法 1: 使用自动化脚本（推荐）

```bash
# 在项目根目录运行
./deploy-to-vercel.sh
```

脚本会自动：
- ✅ 检查并安装 Vercel CLI
- ✅ 运行所有检查（性能、类型、Lint）
- ✅ 本地构建测试
- ✅ 部署到 Vercel

### 方法 2: 手动部署（Web 界面）

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择您的 Git 仓库

3. **配置设置**
   ```
   Framework: Next.js
   Root Directory: frontend
   Build Command: pnpm build
   Install Command: pnpm install
   ```

4. **点击 "Deploy"**
   - 等待 2-3 分钟
   - 完成！🎉

### 方法 3: 命令行部署

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 进入前端目录
cd frontend

# 4. 部署
vercel --prod
```

## 📋 部署前检查（可选）

```bash
cd frontend

# 检查性能配置
pnpm perf-check

# 类型检查
pnpm type-check

# 代码规范检查
pnpm lint

# 本地构建测试
pnpm build
```

## ⚙️ 重要配置

### 在 Vercel Dashboard 设置环境变量

1. 进入项目 Settings → Environment Variables
2. 添加以下变量：

```bash
# 生产环境
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NODE_ENV=production

# 可选 - Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 自定义域名（可选）

1. Settings → Domains
2. 输入您的域名：`agivilla.com`
3. 按照提示配置 DNS 记录

## 🎯 部署后步骤

### 1. 验证部署
- [ ] 访问 Vercel 提供的 URL
- [ ] 测试所有功能
- [ ] 检查性能（Lighthouse）

### 2. SEO 配置
- [ ] 提交到 Google Search Console
- [ ] 提交 sitemap: `https://your-domain.com/sitemap.xml`
- [ ] 验证 robots.txt: `https://your-domain.com/robots.txt`

### 3. 性能监控
- [ ] 启用 Vercel Analytics
- [ ] 配置 Google Analytics
- [ ] 监控 Core Web Vitals

## 📊 预期结果

部署成功后，您将获得：

✅ **自动 HTTPS** - 免费 SSL 证书  
✅ **全球 CDN** - 边缘节点加速  
✅ **自动部署** - 推送代码即自动部署  
✅ **预览部署** - 每个 PR 都有预览链接  
✅ **性能优化** - 图片优化、代码分割等  

## 🐛 遇到问题？

### 问题 1: 构建失败
```bash
# 清理并重新构建
cd frontend
rm -rf node_modules .next
pnpm install
pnpm build
```

### 问题 2: 找不到模块
- 检查 `package.json` 中的依赖
- 确保使用的是 `pnpm` 而不是 `npm`

### 问题 3: 环境变量未生效
- 确保变量名以 `NEXT_PUBLIC_` 开头
- 在 Vercel Dashboard 重新部署

## 📚 详细文档

- [完整 Vercel 部署指南](./VERCEL_DEPLOYMENT.md)
- [性能优化文档](./frontend/docs/PERFORMANCE_OPTIMIZATION.md)
- [SEO 检查清单](./frontend/docs/SEO_CHECKLIST.md)
- [部署优化指南](./frontend/docs/DEPLOYMENT_GUIDE.md)

## 🆘 获取帮助

- Vercel 文档: https://vercel.com/docs
- Vercel 社区: https://vercel.com/community
- Next.js 部署: https://nextjs.org/docs/deployment

---

**现在就开始部署吧！** 🚀

```bash
./deploy-to-vercel.sh
```

