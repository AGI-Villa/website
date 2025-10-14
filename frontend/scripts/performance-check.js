#!/usr/bin/env node

/**
 * 性能检查脚本
 * 运行方式: node scripts/performance-check.js
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 开始性能检查...\n')

const checks = []

// 1. 检查 next.config.mjs
console.log('📋 检查 Next.js 配置...')
const nextConfigPath = path.join(__dirname, '../next.config.mjs')
if (fs.existsSync(nextConfigPath)) {
  const config = fs.readFileSync(nextConfigPath, 'utf-8')
  
  checks.push({
    name: 'SWC Minify',
    pass: config.includes('swcMinify: true'),
    message: 'SWC 压缩已启用'
  })
  
  checks.push({
    name: 'Gzip 压缩',
    pass: config.includes('compress: true'),
    message: 'Gzip 压缩已启用'
  })
  
  checks.push({
    name: '图片优化',
    pass: config.includes('formats:') && config.includes('webp'),
    message: '图片格式优化已配置'
  })
}

// 2. 检查必要的 SEO 文件
console.log('📋 检查 SEO 文件...')

const seoFiles = [
  { file: 'app/robots.ts', name: 'robots.txt' },
  { file: 'app/sitemap.ts', name: 'sitemap.xml' },
  { file: 'public/manifest.json', name: 'PWA Manifest' }
]

seoFiles.forEach(({ file, name }) => {
  const filePath = path.join(__dirname, '..', file)
  checks.push({
    name: name,
    pass: fs.existsSync(filePath),
    message: `${name} 文件存在`
  })
})

// 3. 检查 package.json 中的脚本
console.log('📋 检查构建脚本...')
const packageJsonPath = path.join(__dirname, '../package.json')
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  
  checks.push({
    name: 'Build 脚本',
    pass: packageJson.scripts && packageJson.scripts.build === 'next build',
    message: 'Build 脚本已配置'
  })
  
  checks.push({
    name: 'Type Check',
    pass: packageJson.scripts && packageJson.scripts['type-check'],
    message: '类型检查脚本已配置'
  })
}

// 4. 检查关键优化文件
console.log('📋 检查优化文件...')

const layoutPath = path.join(__dirname, '../app/layout.tsx')
if (fs.existsSync(layoutPath)) {
  const layout = fs.readFileSync(layoutPath, 'utf-8')
  
  checks.push({
    name: '字体优化',
    pass: layout.includes('display:') && layout.includes('swap'),
    message: '字体 display swap 已配置'
  })
  
  checks.push({
    name: '结构化数据',
    pass: layout.includes('application/ld+json'),
    message: 'JSON-LD 结构化数据已添加'
  })
  
  checks.push({
    name: 'Meta 标签',
    pass: layout.includes('metadataBase') && layout.includes('openGraph'),
    message: 'SEO Meta 标签已完善'
  })
}

// 5. 检查动态导入
const pagePath = path.join(__dirname, '../app/page.tsx')
if (fs.existsSync(pagePath)) {
  const page = fs.readFileSync(pagePath, 'utf-8')
  
  checks.push({
    name: '代码分割',
    pass: page.includes('dynamic('),
    message: '动态导入已实现'
  })
}

// 打印结果
console.log('\n📊 检查结果:\n')

let passCount = 0
let failCount = 0

checks.forEach(check => {
  const icon = check.pass ? '✅' : '❌'
  console.log(`${icon} ${check.name}: ${check.message}`)
  
  if (check.pass) {
    passCount++
  } else {
    failCount++
  }
})

console.log(`\n总计: ${passCount} 通过, ${failCount} 失败\n`)

// 推荐的下一步
if (failCount > 0) {
  console.log('⚠️  建议修复失败的检查项\n')
  process.exit(1)
} else {
  console.log('🎉 所有检查通过！\n')
  console.log('📝 后续步骤:')
  console.log('1. 运行 `pnpm build` 构建生产版本')
  console.log('2. 运行 `pnpm start` 测试生产版本')
  console.log('3. 使用 Lighthouse 进行性能审计')
  console.log('4. 部署到生产环境\n')
}

// 性能优化建议
console.log('💡 性能优化建议:')
console.log('- 使用 CDN 分发静态资源')
console.log('- 启用 HTTP/2 或 HTTP/3')
console.log('- 配置适当的缓存策略')
console.log('- 监控 Core Web Vitals')
console.log('- 定期审查和优化依赖包大小\n')

process.exit(failCount > 0 ? 1 : 0)

