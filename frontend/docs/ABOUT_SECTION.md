# 🌟 About Section 设计说明

## 🎨 设计理念

采用**时间线式布局**，配合**彗星引导线**效果，营造出动态的叙事体验。

## ✨ 核心特性

### 1. 彗星引导线 ☄️
- **跟随滚动**：彗星位置随页面滚动而移动
- **发光效果**：白色光晕 + 脉动动画
- **尾迹效果**：渐变尾巴，向上延伸
- **视觉引导**：自然引导用户向下浏览

### 2. 时间线布局 📍
```
┌─────────────┐
│   标题区    │ 
├─────────────┤
│  内容 1 (R) ──●── 
│             │
│      ──●── 内容 2 (L)
│             │
│  内容 3 (R) ──●──
│             │
│      ──●── 内容 4 (L)
└─────────────┘

● = 连接点
──── = 中心引导线
☄️ = 彗星（随滚动移动）
```

### 3. 左右交替内容
- **右侧**: We are founders... / Vision
- **左侧**: Mission / Values
- **连接点**: 白色圆点连接到中心线
- **动画**: 从两侧滑入 + 淡入

### 4. 卡片样式
- **毛玻璃效果**: `bg-white/5 backdrop-blur-sm`
- **边框**: `border-white/10`
- **悬停**: 提升亮度和边框
- **圆角**: `rounded-2xl`

## 🎬 动画效果

### 彗星动画
```typescript
1. 位置跟随滚动:
   scrollYProgress: 0 → 1
   cometY: 0% → 100%

2. 脉动效果:
   scale: [1, 1.2, 1]
   opacity: [1, 0.8, 1]
   duration: 2s

3. 尾迹呼吸:
   opacity: [0.6, 0.3, 0.6]
   scaleY: [1, 1.2, 1]
```

### 内容卡片动画
```typescript
1. 滑入 + 淡入:
   初始: { opacity: 0, x: ±50 }
   目标: { opacity: 1, x: 0 }
   
2. 错开延迟:
   delay: index × 0.2s
   
3. 触发时机:
   viewport: { margin: '-100px' }
   once: true
```

### 连接点动画
```typescript
scale: 0 → 1
duration: 0.4s
delay: index × 0.2s
```

## 🎯 内容结构

```typescript
const contents = [
  {
    side: 'right',
    title: 'We are founders building with founders',
    content: 'AGI Villa was founded on...'
  },
  {
    side: 'left',
    title: 'Mission',
    content: 'Achieving success together...'
  },
  {
    side: 'right',
    title: 'Vision',
    content: 'To become the world\'s most...'
  },
  {
    side: 'left',
    title: 'Values',
    content: 'Co-creation & Sharing / Long-termism...'
  }
]
```

## 📐 布局细节

### 桌面端 (lg+)
```
┌────────────────────────────────┐
│         Section Title          │
├────────────┬───────────────────┤
│  内容 (R)  │  ●  │             │
│            │  │  │             │
│            │  │  │  内容 (L)   │
│            │  │  │             │
│  内容 (R)  │  ●  │             │
│            │  │  │             │
│            │  │  │  内容 (L)   │
└────────────┴───────────────────┘
```

### 移动端
```
┌─────────┐
│  Title  │
├─────────┤
│    ●    │
│ 内容 1  │
├─────────┤
│    ●    │
│ 内容 2  │
├─────────┤
│    ●    │
│ 内容 3  │
└─────────┘
```

## 🎨 视觉元素

### 1. 彗星组成
```
┌─ 光晕 (w-12 h-12, blur-xl)
│
├─ 尾迹 (h-32, gradient)
│
└─ 核心 (w-4 h-4, glow)
```

### 2. 中心线
- 垂直渐变: `from-transparent via-white/20 to-transparent`
- 宽度: 1px
- 位置: 居中 (`left-1/2`)

### 3. 连接点
- 大小: 4×4
- 背景: 白色
- 边框: 4px 黑色 (防止与背景混淆)
- Z-index: 10

## 💡 技术实现

### useScroll Hook
```typescript
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start end', 'end start'],
})
```

### useTransform
```typescript
const cometY = useTransform(
  scrollYProgress, 
  [0, 1], 
  ['0%', '100%']
)
```

### whileInView
```typescript
<motion.div
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: '-100px' }}
>
```

## ⚡ 性能优化

1. **once: true** - 动画只触发一次
2. **viewport margin** - 提前触发动画
3. **will-change** - CSS 优化（自动）
4. **backdrop-filter** - 硬件加速

## 🎯 响应式断点

| 断点 | 布局 | 间距 |
|------|------|------|
| < 1024px | 单列纵向 | gap-24 |
| ≥ 1024px | 双列左右 | gap-16 |

## 🌟 视觉亮点

1. **彗星引导** - 独特的滚动交互
2. **左右交替** - 动态的阅读节奏
3. **毛玻璃卡片** - 现代高级质感
4. **连接点** - 清晰的时间线结构
5. **渐进式动画** - 自然的视觉流动

## 🎨 配色方案（黑白系）

- 背景: `bg-black`
- 卡片: `bg-white/5` → `hover:bg-white/[0.07]`
- 边框: `border-white/10` → `hover:border-white/20`
- 标题: `text-white`
- 内容: `text-gray-400`
- 彗星: `bg-white` + `shadow-white`
- 中心线: `bg-white/20`

## 🚀 未来扩展

- [ ] 添加图片/图标到每个卡片
- [ ] 彗星点击交互
- [ ] 卡片展开详情
- [ ] 粒子尾迹效果
- [ ] 卡片视差滚动

---

**实现状态**: ✅ 完成  
**视觉效果**: ⭐⭐⭐⭐⭐  
**交互体验**: ⭐⭐⭐⭐⭐  
**最后更新**: 2025-10-14

