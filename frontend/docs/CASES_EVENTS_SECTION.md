# Cases & Events Section - 设计文档

## 📋 概述

Community Events 部分采用 **3D 走马灯 + 中心聚焦** 的设计，展示社区活动（Workshops、Hackathons、Meetups）。

## 🎨 视觉设计

### 整体布局

```
┌─────────────────────────────────────────┐
│   Where Innovation Meets Community      │
├─────────────────────────────────────────┤
│                                         │
│   ┌──────┐   ┌──────────┐   ┌──────┐   │
│   │ Prev │   │  CURRENT  │   │ Next │   │
│   │      │   │           │   │      │   │
│   │ 0.4x │   │   1.0x    │   │ 0.4x │   │
│   └──────┘   └──────────┘   └──────┘   │
│      ↑            ↑             ↑       │
│    半透明        高亮         半透明     │
│    75%缩放      100%         75%缩放    │
│                                         │
│        ●  ●  ●  ●  ●  ← 指示器         │
│       [←]        [→]  ← 控制按钮       │
│                                         │
│          [View All Events]              │
└─────────────────────────────────────────┘
```

### 3D 透视效果

```
             正面视图
               ↓
    ╱───╲   ┌─────┐   ╱───╲
   ╱ Prev╲  │Curnt│  ╱ Next╲
  ╱       ╲ │     │ ╱       ╲
 └─────────┘└─────┘└─────────┘
     ↑         ↑        ↑
  倾斜-15°   0°     倾斜+15°
  (rotateY)
```

## 🔧 技术实现

### 核心功能

1. **3D 卡片定位**
```tsx
animate={{
  x: `${position * 42}%`,      // 水平位置
  scale: isCenter ? 1 : 0.75,  // 缩放
  opacity: isCenter ? 1 : 0.4, // 透明度
  rotateY: position * 15,      // 3D 旋转
}}
```

2. **自动轮播**
- 每 5 秒自动切换到下一张
- 鼠标悬停时暂停
- 鼠标移开后继续

3. **手动控制**
- 左右箭头按钮切换
- 点击侧边卡片快速切换
- 底部指示器点击跳转

4. **平滑过渡**
```tsx
transition={{
  duration: 0.6,
  ease: [0.32, 0.72, 0, 1], // cubic-bezier
}}
```

### 卡片结构

```tsx
┌─────────────────────┐
│ 📷 图片区域          │ ← 260px 高度
│   - 占位图标        │
│   - 状态标签(右上)  │
│   - 类型标签(左上)  │
├─────────────────────┤
│ 📝 内容区域          │
│   - 标题            │
│   - 日期/时间       │
│   - 地点            │
│   - 参与人数(可选)  │
│   - 描述(2行截断)   │
│   - CTA按钮(仅中心) │
└─────────────────────┘
```

## 🎯 交互逻辑

### 状态管理

```tsx
const [currentIndex, setCurrentIndex] = useState(0)
const [isHovered, setIsHovered] = useState(false)
const [direction, setDirection] = useState(0)
```

### 切换流程

```
用户点击"Next" →
  ↓
设置 direction = 1
  ↓
currentIndex + 1
  ↓
重新计算 visibleEvents
  ↓
Framer Motion 执行动画
  ↓
卡片平滑移动到新位置
```

### 可见卡片计算

```tsx
const getVisibleEvents = () => {
  const prev = (currentIndex - 1 + events.length) % events.length
  const next = (currentIndex + 1) % events.length
  return [events[prev], events[currentIndex], events[next]]
}
```

**示例**：
```
events = [0, 1, 2, 3, 4]
currentIndex = 2

prev = (2 - 1 + 5) % 5 = 1
current = 2
next = (2 + 1) % 5 = 3

visibleEvents = [events[1], events[2], events[3]]
             = [活动1, 活动2, 活动3]
```

## 🎨 活动状态

### 三种状态

| 状态 | 颜色 | 标签 | CTA 按钮 |
|------|------|------|----------|
| **upcoming** | 紫色 | UPCOMING | Register Now |
| **live** | 绿色 | LIVE NOW | Join Now |
| **completed** | 灰色 | COMPLETED | View Recap |

### 状态样式

```tsx
// Upcoming
bg-purple-500/20 
border-purple-500/50
text-purple-400

// Live
bg-green-500/20
border-green-500/50
text-green-400

// Completed
bg-gray-500/20
border-gray-500/50
text-gray-500
```

## 🎭 视觉效果

### 1. 背景星星

- 50 个随机分布的星星
- 独立的脉冲动画
- 透明度和缩放变化

```tsx
animate={{
  opacity: [0.3, 0.8, 0.3],
  scale: [1, 1.5, 1],
}}
```

### 2. 边缘渐变遮罩

```
黑色 ← [卡片区域] → 黑色
████░░░░       ░░░░████
淡出              淡出
```

- 左侧：`bg-gradient-to-r from-black`
- 右侧：`bg-gradient-to-l from-black`
- 宽度：192px

### 3. 中心卡片增强

- **发光边框**：脉冲动画
- **聚光效果**：图片上方渐变遮罩
- **CTA 按钮**：延迟淡入

```tsx
{isCenter && (
  <motion.div
    animate={{ opacity: [0.5, 0.8, 0.5] }}
    transition={{ duration: 3, repeat: Infinity }}
  />
)}
```

### 4. 3D 透视

```tsx
style={{
  transformStyle: 'preserve-3d',
  perspective: '1000px',
}}
```

## 📦 数据结构

### Event 接口

```tsx
interface Event {
  id: string
  title: string
  type: 'Workshop' | 'Hackathon' | 'Meetup'
  date: string
  time: string
  location: string
  description: string
  imageUrl?: string  // 可选图片 URL
  status: 'upcoming' | 'live' | 'completed'
  attendees?: number // 可选参与人数
}
```

### 示例数据

```tsx
{
  id: '1',
  title: 'AI Product Workshop',
  type: 'Workshop',
  date: 'Dec 20, 2025',
  time: '2:00 PM - 5:00 PM',
  location: 'AGI Villa HQ',
  description: 'Learn how to build AI-powered products...',
  status: 'upcoming',
}
```

## 🖼️ 图片占位符

### 当前实现

使用 emoji 作为占位符：
- 🎓 Workshop
- 💻 Hackathon
- 🤝 Meetup

### 真实图片集成

```tsx
{/* 替换占位符 */}
<Image
  src={event.imageUrl || '/images/events/default.jpg'}
  alt={event.title}
  fill
  className="object-cover"
/>
```

**建议图片规格**：
- 尺寸：1000x600px
- 比例：5:3
- 格式：JPEG/WebP
- 位置：`/public/images/events/`

## 🎮 控制元素

### 1. 箭头按钮

```tsx
<button
  onClick={handlePrevious}
  className="w-12 h-12 rounded-full..."
>
  ←
</button>
```

**特性**：
- 圆形按钮
- 玻璃态背景
- 悬停放大 (scale: 1.1)

### 2. 指示器圆点

```tsx
{events.map((_, index) => (
  <button
    onClick={() => setCurrentIndex(index)}
    className={
      index === currentIndex 
        ? 'w-8 bg-white'      // 当前：长条
        : 'w-2 bg-white/30'   // 其他：圆点
    }
  />
))}
```

### 3. 底部 CTA

```tsx
<Button variant="outline" size="lg">
  View All Events
</Button>
```

## ⚡ 性能优化

### 1. 仅渲染可见卡片

只渲染当前、前一张、后一张，共 3 张卡片：

```tsx
const visibleEvents = getVisibleEvents()
// 只渲染这 3 个，而不是全部
```

### 2. 动画优化

使用 Framer Motion 的 GPU 加速属性：
- `transform`: x, scale, rotateY ✅
- `opacity` ✅

避免使用：
- `width`, `height` ❌
- `top`, `left` ❌

### 3. 自动轮播控制

```tsx
useEffect(() => {
  if (isHovered) return // 悬停时不创建定时器
  const interval = setInterval(...)
  return () => clearInterval(interval) // 清理
}, [isHovered])
```

## 🔧 可配置参数

### 调整自动轮播速度

```tsx
setInterval(() => {
  // ...
}, 5000) // 改为 3000 会更快，7000 会更慢
```

### 调整卡片间距

```tsx
x: `${position * 42}%`
// 改为 38% 会更紧密
// 改为 46% 会更分散
```

### 调整侧边卡片透明度

```tsx
opacity: isCenter ? 1 : 0.4
// 改为 0.6 会更明显
// 改为 0.2 会更暗
```

### 调整 3D 倾斜角度

```tsx
rotateY: position * 15
// 改为 10 会更平面
// 改为 20 会更立体
```

## 🎯 用户交互流程

### 场景 1：自动浏览

```
用户滚动到 Events Section
  ↓
看到中心卡片展示活动
  ↓
等待 5 秒
  ↓
自动切换到下一个活动
  ↓
循环播放
```

### 场景 2：手动切换

```
用户点击右箭头
  ↓
卡片向左滑动
  ↓
下一个活动移到中心
  ↓
自动轮播重置（重新开始 5 秒倒计时）
```

### 场景 3：快速跳转

```
用户点击指示器第 3 个圆点
  ↓
卡片快速切换到第 3 个活动
  ↓
平滑动画过渡
```

### 场景 4：点击侧边卡片

```
用户点击右侧的"下一个"卡片
  ↓
相当于点击"Next"按钮
  ↓
该卡片移动到中心
```

## 🎨 响应式设计建议

### 桌面端 (当前实现)

- 卡片宽度：500px
- 显示 3 张卡片
- 3D 透视效果

### 平板端 (建议)

```tsx
<div className="w-[500px] md:w-[400px]">
```

- 卡片宽度：400px
- 仍显示 3 张
- 减小间距

### 移动端 (建议)

```tsx
<div className="w-[500px] md:w-[400px] sm:w-[320px]">
```

- 卡片宽度：320px
- 只显示 1 张（中心）
- 隐藏侧边卡片
- 保留箭头和指示器

## 🎬 动画时间轴

```
切换动作触发 (t=0)
  ↓
卡片开始移动 (0-600ms)
├─ 位置: x 轴平移
├─ 缩放: scale 变化
├─ 透明度: opacity 变化
└─ 旋转: rotateY 变化
  ↓
中心卡片 CTA 淡入 (200-400ms)
  ↓
完成 (t=600ms)
```

## 📝 后续优化建议

### 1. 添加键盘支持

```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
  }
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [])
```

### 2. 触摸滑动支持

```tsx
// 使用 Framer Motion 的拖拽功能
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(e, info) => {
    if (info.offset.x > 100) handlePrevious()
    if (info.offset.x < -100) handleNext()
  }}
>
```

### 3. 懒加载图片

```tsx
<Image
  src={event.imageUrl}
  loading="lazy"
  placeholder="blur"
  blurDataURL={event.placeholderUrl}
/>
```

### 4. 添加音效

```tsx
const playSound = () => {
  const audio = new Audio('/sounds/swoosh.mp3')
  audio.volume = 0.1
  audio.play()
}

// 在切换时调用
handleNext() && playSound()
```

## 🐛 已知限制

1. **固定高度**：当前卡片内容区域固定，描述文字过长会被截断
2. **活动数量**：建议 3-10 个活动，太少或太多体验不佳
3. **图片比例**：占位符为 emoji，真实图片需要统一比例

## 🎯 设计原则

1. ✅ **聚焦中心**：用户注意力集中在中间卡片
2. ✅ **上下文感知**：能看到前后卡片，了解更多内容
3. ✅ **自然交互**：自动轮播 + 手动控制结合
4. ✅ **视觉连贯**：与整体"宇宙/科技"主题一致
5. ✅ **性能优先**：仅渲染必要元素，使用 GPU 加速

---

**最后更新**：2025-10-14
**版本**：1.0.0

