# 📸 图片资源使用指南

## 📂 上传位置

所有图片素材请上传到：**`frontend/public/images/`**

```
frontend/public/
├── images/
│   ├── logo/       👈 Logo 文件放这里
│   ├── hero/       👈 Hero 区域图片放这里
│   ├── icons/      👈 图标素材放这里
│   ├── team/       👈 团队照片放这里
│   └── events/     👈 活动图片放这里
└── favicon.ico     👈 网站图标
```

## 🎨 Logo 使用示例

### 步骤 1: 上传 Logo
将你的 logo 文件上传到：
```
frontend/public/images/logo/logo.svg
```

### 步骤 2: 在代码中使用

**方法 A: 使用 Next.js Image 组件（推荐）**
```tsx
import Image from 'next/image'

<Image
  src="/images/logo/logo.svg"
  alt="AGI Villa Logo"
  width={32}
  height={32}
  priority
/>
```

**方法 B: 使用普通 img 标签**
```tsx
<img 
  src="/images/logo/logo.svg" 
  alt="AGI Villa Logo"
  className="w-8 h-8"
/>
```

## 🖼️ Hero 背景图使用

### 在组件中使用
```tsx
<div 
  className="hero-section"
  style={{
    backgroundImage: "url('/images/hero/hero-bg.jpg')"
  }}
>
  {/* 内容 */}
</div>
```

### 在 CSS 中使用
```css
.hero-section {
  background-image: url('/images/hero/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}
```

## 📏 推荐尺寸

| 类型 | 尺寸 | 格式 |
|------|------|------|
| Logo | 512x512px | SVG / PNG |
| Favicon | 32x32px, 16x16px | ICO / PNG |
| Hero 背景 | 1920x1080px | JPG / WebP |
| 团队照片 | 400x400px | JPG / WebP |
| Open Graph | 1200x630px | JPG / PNG |

## ⚡ 性能优化建议

1. **压缩图片**
   - 使用 [TinyPNG](https://tinypng.com/) 压缩 PNG
   - 使用 [Squoosh](https://squoosh.app/) 压缩 JPG

2. **使用现代格式**
   - WebP 格式比 JPG 小 30%
   - SVG 适合 logo 和图标

3. **使用 Next.js Image 组件**
   ```tsx
   import Image from 'next/image'
   
   // 自动优化、懒加载、响应式
   <Image
     src="/images/hero.jpg"
     alt="Hero"
     width={1920}
     height={1080}
     quality={85}
     priority={false} // false = 懒加载
   />
   ```

## 🔧 当前项目中的使用

### Navbar Logo
文件位置：`components/layout/Navbar.tsx`

上传 logo 后，取消注释第 35-40 行的代码：
```tsx
<Image
  src="/images/logo/logo.svg"
  alt="AGI Villa Logo"
  width={32}
  height={32}
  className="group-hover:scale-110 transition-transform"
/>
```

然后删除第 43-46 行的临时占位符。

### Hero Section
文件位置：`components/sections/HeroSection.tsx`

可以替换 FloatingCubes 组件为真实图片。

## 📝 命名规范

✅ 推荐：
- `logo-primary.svg`
- `hero-background.jpg`
- `team-member-john.jpg`
- `icon-feature-1.svg`

❌ 避免：
- `Logo Primary.svg` (有空格)
- `图片1.jpg` (中文)
- `IMG_0001.jpg` (无意义)

## 🔗 路径引用规则

在 `public/` 目录下的文件，引用时**不需要**包含 `public`：

```tsx
// ✅ 正确
<img src="/images/logo/logo.svg" />

// ❌ 错误
<img src="/public/images/logo/logo.svg" />
```

## 📞 需要帮助？

如果不确定如何使用某个图片，可以查看：
- [Next.js Image 文档](https://nextjs.org/docs/app/api-reference/components/image)
- [Vercel 图片优化指南](https://vercel.com/docs/image-optimization)

---

**准备好了吗？** 

现在你可以：
1. 将 logo 文件上传到 `frontend/public/images/logo/`
2. 将其他素材上传到对应文件夹
3. 在组件中引用这些图片

