# 🧭 导航栏自定义指南

## 文件位置

**主文件**: `frontend/components/layout/Navbar.tsx`

## 🎯 常见修改场景

### 1. 修改导航菜单项

**位置**: 第 9-15 行

#### 场景 A: 改为中文导航

```tsx
// 原代码
const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'Company', href: '#company' },
  { name: 'Resources', href: '#resources' },
  { name: 'Events', href: '#events' },
  { name: 'Pricing', href: '#pricing' },
]

// 修改为
const navItems = [
  { name: '产品特性', href: '#features' },
  { name: '关于我们', href: '#about' },
  { name: '资源中心', href: '#resources' },
  { name: '最新活动', href: '#events' },
  { name: '联系我们', href: '#contact' },
]
```

#### 场景 B: 添加新菜单项

```tsx
const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'Company', href: '#company' },
  { name: 'Resources', href: '#resources' },
  { name: 'Events', href: '#events' },
  { name: 'Blog', href: '/blog' },           // 新增博客
  { name: 'Pricing', href: '#pricing' },
]
```

#### 场景 C: 减少菜单项

```tsx
const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
]
```

#### 场景 D: 添加外部链接

```tsx
const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Blog', href: 'https://blog.agivilla.com' },  // 外部链接
  { name: 'GitHub', href: 'https://github.com/agivilla' },  // 外部链接
]
```

### 2. 修改 Logo

**位置**: 第 44-53 行

#### 更换 Logo 图片

```tsx
<Image
  src="/images/logo/your-new-logo.png"  // 改为你的 Logo 路径
  alt="Your Company Logo"                // 改为你的公司名
  width={140}                            // 调整宽度
  height={40}                            // 调整高度
  className="group-hover:scale-105 transition-transform h-8 sm:h-10 w-auto"
  priority
/>
```

#### 使用文字 Logo

```tsx
<Link href="/" className="flex items-center group">
  <span className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">
    AGI Villa
  </span>
</Link>
```

#### Logo + 文字组合

```tsx
<Link href="/" className="flex items-center gap-3 group">
  <Image
    src="/images/logo/agi-villa.png"
    alt="AGI Villa"
    width={40}
    height={40}
    className="group-hover:scale-105 transition-transform"
  />
  <span className="text-xl font-bold text-white">AGI Villa</span>
</Link>
```

### 3. 修改右侧按钮

**位置**: 第 69-76 行（桌面端）和 145-151 行（移动端）

#### 场景 A: 改为中文按钮

```tsx
<div className="hidden lg:flex items-center space-x-3">
  <Button variant="outline" size="sm" href="#login">
    登录
  </Button>
  <Button variant="primary" size="sm" href="#signup">
    立即开始
  </Button>
</div>
```

#### 场景 B: 改为单个按钮

```tsx
<div className="hidden lg:flex items-center space-x-3">
  <Button variant="primary" size="sm" href="#contact">
    联系我们
  </Button>
</div>
```

#### 场景 C: 添加更多按钮

```tsx
<div className="hidden lg:flex items-center space-x-3">
  <Button variant="outline" size="sm" href="#demo">
    预约演示
  </Button>
  <Button variant="outline" size="sm" href="#login">
    登录
  </Button>
  <Button variant="primary" size="sm" href="#signup">
    免费试用
  </Button>
</div>
```

#### 场景 D: 改变按钮样式

```tsx
<div className="hidden lg:flex items-center space-x-3">
  <Button variant="secondary" size="sm" href="#login">  {/* 改为 secondary */}
    Log In
  </Button>
  <Button variant="primary" size="lg" href="#signup">   {/* 改为大按钮 */}
    Get Started
  </Button>
</div>
```

**可用的按钮样式**:
- `variant="primary"` - 白色背景（主要）
- `variant="secondary"` - 渐变背景（次要）
- `variant="outline"` - 透明边框（轮廓）

**可用的按钮尺寸**:
- `size="sm"` - 小号
- `size="md"` - 中号
- `size="lg"` - 大号

### 4. 修改导航栏样式

#### 改变背景颜色

```tsx
<motion.nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-blue-900/80 backdrop-blur-lg border-b border-blue-800'  // 改为蓝色
      : 'bg-transparent'
  }`}
>
```

#### 改变导航栏高度

```tsx
<div className="flex h-20 items-center justify-between">  {/* 从 h-16 改为 h-20 */}
```

#### 改变文字颜色

```tsx
<a
  href={item.href}
  className="px-4 py-2 text-sm text-blue-300 hover:text-white transition-colors"  {/* 改为蓝色 */}
>
  {item.name}
</a>
```

### 5. 添加下拉菜单（高级）

如果需要下拉菜单，需要修改数据结构：

```tsx
const navItems = [
  { 
    name: 'Products',
    href: '#products',
    submenu: [
      { name: 'Product 1', href: '#product1' },
      { name: 'Product 2', href: '#product2' },
    ]
  },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]
```

然后修改渲染逻辑（需要额外的代码）。

### 6. 移动端菜单自定义

移动端菜单会自动同步桌面端的 `navItems`，但按钮需要单独修改：

**位置**: 第 145-151 行

```tsx
<div className="pt-4 space-y-3 border-t border-gray-800">
  <Button variant="outline" size="md" href="#login" className="w-full">
    登录
  </Button>
  <Button variant="primary" size="md" href="#signup" className="w-full">
    注册账号
  </Button>
</div>
```

## 🚀 快速示例：完整的中文导航

```tsx
// 第 9-15 行
const navItems = [
  { name: '首页', href: '#home' },
  { name: '关于我们', href: '#about' },
  { name: '服务项目', href: '#services' },
  { name: '成功案例', href: '#cases' },
  { name: '联系我们', href: '#contact' },
]

// 第 44-53 行（Logo 部分保持不变或修改）

// 第 69-76 行（桌面端按钮）
<div className="hidden lg:flex items-center space-x-3">
  <Button variant="outline" size="sm" href="#login">
    登录
  </Button>
  <Button variant="primary" size="sm" href="#signup">
    免费试用
  </Button>
</div>

// 第 145-151 行（移动端按钮）
<div className="pt-4 space-y-3 border-t border-gray-800">
  <Button variant="outline" size="md" href="#login" className="w-full">
    登录
  </Button>
  <Button variant="primary" size="md" href="#signup" className="w-full">
    免费试用
  </Button>
</div>
```

## ✅ 修改后的步骤

1. **保存文件**: 修改后保存 `Navbar.tsx`
2. **查看效果**: 开发服务器会自动刷新
3. **测试响应式**: 在不同设备尺寸下测试
4. **测试移动端菜单**: 点击汉堡菜单测试

## 🔍 调试技巧

### 查看当前导航项

在浏览器控制台输入：
```javascript
console.log(navItems)
```

### 检查移动端菜单

1. 打开 Chrome DevTools (F12)
2. 切换到移动设备模式 (Ctrl+Shift+M)
3. 点击汉堡菜单图标
4. 检查菜单是否正常显示

## 📝 注意事项

1. **链接格式**:
   - 页面内链接: `#section-id` (锚点)
   - 站内链接: `/about` (相对路径)
   - 外部链接: `https://example.com` (完整 URL)

2. **移动端同步**:
   - `navItems` 数组会同时应用到桌面端和移动端
   - 只需要修改一个地方

3. **按钮一致性**:
   - 记得同时修改桌面端（69-76行）和移动端（145-151行）的按钮
   - 保持文案和链接一致

4. **响应式考虑**:
   - Logo 在移动端会自动变小 (`h-8 sm:h-10`)
   - 菜单在小屏幕会自动隐藏，显示汉堡菜单

## 🎨 样式参考

### 文字颜色类
- `text-gray-300` - 浅灰色
- `text-white` - 白色
- `text-blue-300` - 浅蓝色
- `text-purple-300` - 浅紫色

### 背景颜色类
- `bg-black/80` - 80% 透明度的黑色
- `bg-white/10` - 10% 透明度的白色
- `bg-gradient-to-r from-blue-500 to-purple-600` - 渐变背景

### 间距类
- `space-x-3` - 水平间距
- `gap-4` - 网格间距
- `px-4 py-2` - 内边距

## 🔗 相关文件

- **按钮组件**: `frontend/components/ui/Button.tsx`
- **页脚**: `frontend/components/layout/Footer.tsx`
- **主页**: `frontend/app/page.tsx`

---

**需要更多帮助？** 查看 Button 组件文档或联系开发团队。

