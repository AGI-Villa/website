# Vision & Responsibility Section - 设计文档

## 📋 概述

采用 **光辐射/影响力波纹** 设计，通过中心发光核心和向外扩散的波纹，象征 AGI Villa 的社会影响力持续传播。

## 🎨 视觉设计

### 整体布局

```
┌─────────────────────────────────────┐
│  Beyond Business: Our Commitment    │
├─────────────────────────────────────┤
│                                     │
│         💚 1% Profit                │
│          ╲                          │
│           ╲                         │
│            ◉ ← 中心发光核心         │
│           ╱  ╲                      │
│          ╱    ╲                     │
│      🌱 Tech  🎓 Talent             │
│                                     │
│   ～～～～～～～～～  ← 波纹扩散    │
│  ～～～～～～～～～～               │
│ ～～～～～～～～～～～              │
│                                     │
│  "We believe innovation should..."  │
│   [Learn More About Our Impact]     │
└─────────────────────────────────────┘
```

### 核心元素

```
      发光核心
        ◉
       ╱│╲
      ╱ │ ╲  ← 辐射线
     ╱  │  ╲
    ●   ●   ● ← 三个承诺卡片
    
外围：多层波纹持续扩散
```

## 🔧 技术实现

### 1. 中心发光核心 ☀️

```tsx
// 三层结构
┌─────────────────┐
│  外层光晕       │ ← blur(20px), 脉冲动画
│  ┌───────────┐  │
│  │ 核心光球  │  │ ← 径向渐变 + 阴影
│  │ ┌───────┐ │  │
│  │ │内部脉冲│ │  │ ← scale + opacity 动画
│  │ │ AGI   │ │  │
│  │ │ Villa │ │  │
│  │ └───────┘ │  │
│  └───────────┘  │
└─────────────────┘
```

**样式**：
```tsx
// 外层光晕
background: radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)
filter: blur(20px)
animate: scale [1, 1.2, 1], opacity [0.5, 0.8, 0.5]

// 核心光球
width: 120px, height: 120px
background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0.3), transparent)
boxShadow: 0 0 60px rgba(255,255,255,0.5)

// 内部脉冲
animate: scale [1, 1.1, 1], opacity [0.3, 0.6, 0.3]
```

### 2. 波纹扩散效果 🌊

```tsx
// 5 层波纹，依次扩散
{[1, 2, 3, 4, 5].map((index) => (
  <motion.div
    className="rounded-full border border-white/10"
    style={{
      width: `${index * 200}px`,
      height: `${index * 200}px`,
    }}
    animate={{
      opacity: [0, 0.3, 0],      // 淡入淡出
      scale: [0.8, 1.2, 1.5],    // 逐渐扩大
    }}
    transition={{
      duration: 3 + index * 0.5,  // 每层速度不同
      repeat: Infinity,
      delay: index * 0.4,         // 错开时间
    }}
  />
))}
```

**效果**：
```
第1层: 200px,  持续3.0s, 延迟0.0s
第2层: 400px,  持续3.5s, 延迟0.4s
第3层: 600px,  持续4.0s, 延迟0.8s
第4层: 800px,  持续4.5s, 延迟1.2s
第5层: 1000px, 持续5.0s, 延迟1.6s

结果：层层叠加，持续向外扩散
```

### 3. 辐射线 + 能量流 ⚡

```tsx
// 三条辐射线，角度分别为 0°, 120°, 240°
commitments.map((commitment) => (
  <motion.div
    style={{
      width: '2px',
      height: '200px',
      background: 'linear-gradient(to bottom, white 40%, transparent)',
      transform: `rotate(${commitment.position}deg)`,
      transformOrigin: 'top center',
    }}
  >
    {/* 能量流动粒子 */}
    <motion.div
      animate={{
        top: ['0%', '100%'],    // 从上到下
        opacity: [0, 1, 0],     // 淡入淡出
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </motion.div>
))
```

**视觉效果**：
```
    ●
    │ ← 能量粒子向下流动
    │
    │
    ◉ ← 中心
    │
    │
    │ ← 能量粒子向下流动
    ●
```

### 4. 承诺卡片布局 🎴

```tsx
// 三角形分布：0°, 120°, 240°
const getCardPosition = (angle: number, radius: number = 320) => {
  const radian = (angle * Math.PI) / 180
  return {
    x: Math.cos(radian) * radius,
    y: Math.sin(radian) * radius,
  }
}

// 位置计算
0°   → x: 320, y: 0     (右侧)
120° → x: -160, y: 277  (左下)
240° → x: -160, y: -277 (左上)
```

**布局示意**：
```
         240°
      🎓 Talent
         ╲
          ╲
           ◉ 中心
          ╱  ╲
         ╱    ╲
    🌱 Tech   💚 Profit
     120°       0°
```

### 5. 卡片结构 📦

```tsx
┌──────────────────────┐
│ 💚                 ● │ ← 装饰角标
│                      │
│ GIVING BACK          │ ← 副标题（小字）
│                      │
│ 1% Profit for Good   │ ← 主标题（粗体）
│                      │
│ 1% of our annual...  │ ← 描述文字
│                      │
└──────────────────────┘
```

**样式**：
```css
width: 288px (w-72)
padding: 24px (p-6)
background: white/5
backdrop-blur: sm
border: white/10
border-radius: 16px (rounded-2xl)
```

## 🎬 动画时间轴

### 完整加载序列

```
滚动进入视图 (t=0)
  ↓
标题淡入 (0-0.8s)
  ↓
波纹开始出现 (0.3s-)
  ↓
中心光核出现 (0.3-1.1s)
├─ 外层光晕扩大
├─ 核心光球缩放
└─ 内部脉冲启动
  ↓
辐射线延伸 (0.5-1.3s)
├─ 第一条 (0.5-1.3s)
├─ 第二条 (0.7-1.5s)
└─ 第三条 (0.9-1.7s)
  ↓
能量粒子开始流动 (0.5s-)
  ↓
三个卡片依次出现 (1.0-1.8s)
├─ 卡片1 (1.0-1.6s)
├─ 卡片2 (1.2-1.8s)
└─ 卡片3 (1.4-2.0s)
  ↓
引言文字上升 (1.8-2.6s)
  ↓
CTA 按钮淡入 (2.0-2.8s)
  ↓
完成！
```

## 🎯 交互效果

### 鼠标悬停卡片

```tsx
onMouseEnter → setHoveredCommitment(id)
  ↓
1. 卡片上浮 10px
2. 卡片放大 5%
3. 出现径向光晕
4. 对应辐射线加粗变亮
5. 阴影增强
  ↓
onMouseLeave → setHoveredCommitment(null)
  ↓
1. 卡片下降
2. 卡片恢复原大小
3. 光晕消失
4. 辐射线恢复
5. 阴影减弱
```

**代码**：
```tsx
animate={
  isHovered
    ? {
        y: -10,           // 上浮
        scale: 1.05,      // 放大
      }
    : {
        y: 0,
        scale: 1,
      }
}

// 辐射线响应
background: isHovered
  ? 'linear-gradient(..., rgba(255,255,255,0.8), ...)' // 更亮
  : 'linear-gradient(..., rgba(255,255,255,0.4), ...)' // 正常
```

## 📦 数据结构

### Commitment 接口

```tsx
interface Commitment {
  id: string              // 唯一标识
  icon: string            // emoji 图标
  title: string           // 主标题
  subtitle: string        // 副标题
  description: string     // 描述文字
  position: number        // 角度位置 (0-360)
}
```

### 示例数据

```tsx
{
  id: 'profit',
  icon: '💚',
  title: '1% Profit for Good',
  subtitle: 'Giving Back',
  description: '1% of our annual profits are donated to charitable organizations',
  position: 0,  // 右侧（0度）
}
```

## 🎨 视觉层次

### Z-index 结构

```
z-50: (未使用)
z-30: 承诺卡片 ← 最前
z-20: 中心光核
z-10: 辐射线 + 背景星星
z-0:  波纹圆环 ← 最后
```

### 透明度层次

```
中心光核:  90% → 30% (径向渐变)
辐射线:    40% → 10% (线性渐变)
波纹:      30% → 0%  (淡入淡出)
卡片背景:  5% (玻璃态)
卡片边框:  10%
星星:      20-50%
```

## 🌟 寓意与象征

### 视觉隐喻

| 元素 | 象征意义 |
|------|----------|
| ☀️ 中心光源 | AGI Villa 的核心价值观 |
| 🌊 波纹扩散 | 社会影响力持续传播 |
| ⚡ 辐射线 | 连接核心与行动 |
| 🎴 三个卡片 | 三大社会承诺 |
| ✨ 能量粒子 | 持续的能量输出 |
| ⭐ 背景星星 | 宏大的愿景背景 |

### 设计理念

```
Beyond Business = Beyond Borders

不仅仅是商业 ↔ 超越边界
社会责任     ↔ 全球影响
长期主义     ↔ 持续传播
```

## 🎭 配色方案

### 主色调：黑白

```
背景:     #000000 (纯黑)
文字:     #FFFFFF (白色)
副文字:   #9CA3AF (gray-400)
边框:     rgba(255,255,255,0.1)
```

### 强调色（微妙）

```
光源核心: 白色 → 淡金色渐变
波纹:     白色/10%
辐射线:   白色/40% → 白色/10%
光晕:     白色/30%
```

### 玻璃态效果

```css
background: rgba(255, 255, 255, 0.05)
backdrop-filter: blur(4px)
border: 1px solid rgba(255, 255, 255, 0.1)
```

## 📱 响应式设计

### 桌面端 (当前)

```
标题: text-6xl (60px)
卡片宽度: 288px (w-72)
辐射距离: 320px
波纹最大: 1000px
```

### 平板端 (建议)

```
标题: text-5xl (48px)
卡片宽度: 256px (w-64)
辐射距离: 280px
波纹最大: 800px
```

### 移动端 (建议)

```
标题: text-4xl (36px)
卡片宽度: 全屏 - 32px
布局: 竖向排列（不用三角形）
辐射线: 简化或隐藏
波纹: 减少层数
```

## ⚡ 性能优化

### 1. 固定星星位置

```tsx
const stars = useRef(
  Array.from({ length: 40 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    // ... 只计算一次
  }))
).current
```

### 2. GPU 加速动画

使用 `transform` 和 `opacity`（GPU 加速）：
```tsx
✅ transform: scale, translate, rotate
✅ opacity
❌ width, height, top, left
```

### 3. 条件渲染

```tsx
{isHovered && (
  <motion.div>
    {/* 只在悬停时渲染 */}
  </motion.div>
)}
```

### 4. 波纹层数控制

- 桌面端：5 层波纹
- 移动端：3 层波纹（减少计算）

## 🔧 可调整参数

### 波纹速度

```tsx
duration: 3 + index * 0.5
// 改为 2 + index * 0.3 会更快
// 改为 4 + index * 0.7 会更慢
```

### 辐射距离

```tsx
const radius = 320
// 改为 280 会更紧密
// 改为 360 会更分散
```

### 中心光球大小

```tsx
width: '120px'
// 改为 '100px' 会更小
// 改为 '140px' 会更大
```

### 能量粒子速度

```tsx
duration: 2
// 改为 1.5 会更快
// 改为 3 会更慢
```

## 🎬 完整用户体验流程

```
用户滚动到 Vision Section
  ↓
标题出现："Beyond Business"
  ↓
中心光球亮起 ✨
  ↓
波纹开始扩散 🌊
  ↓
辐射线延伸到三个方向 ⚡
  ↓
能量粒子沿辐射线流动 ✨
  ↓
三个承诺卡片依次出现 💚🌱🎓
  ↓
用户鼠标移到某个承诺 🖱️
  ↓
卡片上浮 + 发光 ✨
对应辐射线变亮 ⚡
  ↓
用户阅读详细内容
  ↓
鼠标移开，卡片恢复
  ↓
继续浏览引言文字
  ↓
点击 CTA："Learn More About Our Impact"
```

## 🎯 设计亮点

1. ✅ **视觉隐喻** - 光辐射象征影响力传播
2. ✅ **动态感强** - 波纹、粒子持续运动
3. ✅ **层次分明** - 清晰的前后景关系
4. ✅ **交互友好** - 悬停响应自然流畅
5. ✅ **寓意贴切** - 符合"Beyond Business"理念
6. ✅ **视觉连贯** - 延续整体宇宙/能量主题
7. ✅ **信息清晰** - 三个承诺一目了然
8. ✅ **温暖有力** - 既科技又人文

## 🐛 已知限制

1. **移动端布局** - 三角形布局在小屏幕可能过于拥挤
2. **波纹性能** - 5层波纹在低端设备可能卡顿
3. **文字长度** - 描述过长会影响卡片高度一致性

## 💡 后续优化建议

### 1. 移动端自适应

```tsx
const isMobile = useMediaQuery('(max-width: 768px)')

{isMobile ? (
  <VerticalLayout />  // 竖向排列
) : (
  <TriangleLayout />  // 三角形布局
)}
```

### 2. 添加数据统计

```tsx
// 在卡片上显示数字
<div className="text-4xl font-bold">1%</div>
<div className="text-sm">Annual Profits</div>
```

### 3. 添加进度指示

```tsx
// 显示影响力指标
<CircularProgress value={85} label="Impact Score" />
```

### 4. 添加微交互

```tsx
// 点击卡片展开详情
<motion.div
  onClick={() => setExpanded(!expanded)}
  animate={{ height: expanded ? 'auto' : '200px' }}
/>
```

## 🎉 核心代码片段

### 波纹效果

```tsx
{[1, 2, 3, 4, 5].map((index) => (
  <motion.div
    key={index}
    className="absolute rounded-full border border-white/10"
    style={{
      width: `${index * 200}px`,
      height: `${index * 200}px`,
    }}
    animate={{
      opacity: [0, 0.3, 0],
      scale: [0.8, 1.2, 1.5],
    }}
    transition={{
      duration: 3 + index * 0.5,
      repeat: Infinity,
      delay: index * 0.4,
    }}
  />
))}
```

### 中心发光核心

```tsx
<div
  style={{
    width: '120px',
    height: '120px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0.3), transparent)',
    boxShadow: '0 0 60px rgba(255,255,255,0.5), inset 0 0 30px rgba(255,255,255,0.3)',
  }}
>
  <motion.div
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
    }}
  />
</div>
```

---

**最后更新**：2025-10-14
**版本**：1.0.0

