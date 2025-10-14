# 图片资源目录结构

这个目录用于存放网站的所有图片和静态资源。

## 📁 目录说明

```
public/images/
├── logo/           # Logo 相关
│   ├── logo.svg
│   ├── logo.png
│   ├── logo-dark.svg
│   ├── logo-light.svg
│   └── favicon.ico
│
├── hero/           # Hero 区域图片
│   ├── hero-bg.jpg
│   └── hero-illustration.svg
│
├── icons/          # 图标资源
│   ├── feature-1.svg
│   ├── feature-2.svg
│   └── ...
│
├── team/           # 团队照片
│   ├── member-1.jpg
│   └── ...
│
└── events/         # 活动相关图片
    ├── event-1.jpg
    └── ...
```

## 🖼️ 使用方法

在 Next.js 组件中引用这些图片：

### 方法 1: 使用 Next.js Image 组件（推荐）

```tsx
import Image from 'next/image'

export default function Component() {
  return (
    <Image
      src="/images/logo/logo.svg"
      alt="AGI Villa Logo"
      width={200}
      height={50}
      priority
    />
  )
}
```

### 方法 2: 使用普通 img 标签

```tsx
export default function Component() {
  return (
    <img
      src="/images/logo/logo.svg"
      alt="AGI Villa Logo"
      className="w-auto h-12"
    />
  )
}
```

### 方法 3: 在 CSS 中使用

```css
.hero {
  background-image: url('/images/hero/hero-bg.jpg');
}
```

## 📝 命名规范

- 使用小写字母和连字符：`hero-background.jpg`
- 避免使用空格和特殊字符
- 使用描述性的名称：`team-member-john-doe.jpg`
- 包含尺寸信息（如需要）：`logo-512x512.png`

## 🎨 推荐格式

- **Logo**: SVG（矢量）或 PNG（透明背景）
- **照片**: JPEG 或 WebP（优化后）
- **图标**: SVG（矢量）
- **背景**: JPEG 或 WebP（大尺寸）

## ⚡ 性能优化建议

1. **压缩图片**：使用 TinyPNG 或 ImageOptim
2. **使用 WebP 格式**：更小的文件体积
3. **响应式图片**：提供多种尺寸
4. **懒加载**：使用 Next.js Image 的自动懒加载
5. **CDN 加速**：生产环境使用 Vercel CDN

## 📏 推荐尺寸

- **Logo**: 建议 SVG 矢量格式，或 512x512px PNG
- **Hero 图片**: 1920x1080px（16:9）
- **团队照片**: 400x400px（1:1 正方形）
- **活动横幅**: 1200x630px（Open Graph 标准）
- **Favicon**: 32x32px, 16x16px

---

将您的图片文件上传到对应的文件夹中即可使用。

