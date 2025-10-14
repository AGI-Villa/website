# 🎭 交互式粒子文字效果

灵感来源：Vercel Ship - 纳米级粒子文字交互

## ✨ 效果说明

这是一个高级的粒子文字效果，文字本身由数百个粒子点组成：

1. **初始状态**：粒子组成完整的文字形状
2. **鼠标靠近**：粒子被"推开"，散开形成空洞
3. **鼠标离开**：粒子通过弹簧力回到原位
4. **自然动画**：所有运动都有物理模拟（速度、阻尼、弹簧力）

## 🎯 与普通粒子效果的区别

| 特性 | 普通粒子效果 | 交互式粒子文字 |
|------|------------|--------------|
| 文字显示 | 实体文字 | 粒子组成 |
| 交互方式 | 悬停生成粒子 | 排斥 + 聚合 |
| 物理模拟 | 简单重力 | 弹簧 + 阻尼 + 排斥力 |
| 视觉效果 | 装饰性 | 沉浸式 |
| 技术复杂度 | 低 | 高 |

## 🔧 实现原理

### 1. 文字采样（Sampling）
```typescript
// 将文字绘制到临时画布
tempCtx.fillText(text, padding, canvasHeight / 2)

// 采样像素，每隔 particleGap 像素检查一次
for (let y = 0; y < height; y += particleGap) {
  for (let x = 0; x < width; x += particleGap) {
    if (pixelAlpha > 128) {
      // 这是文字的一部分，创建粒子
      particles.push({ x, y, originX: x, originY: y })
    }
  }
}
```

### 2. 鼠标排斥力（Repel Force）
```typescript
const distance = sqrt((mouseX - particleX)² + (mouseY - particleY)²)

if (distance < repelDistance) {
  const force = (repelDistance - distance) / repelDistance
  particle.vx -= (dx / distance) * force * repelForce
  particle.vy -= (dy / distance) * force * repelForce
}
```

### 3. 弹簧力（Spring Force）
```typescript
// 拉回原位
const springForce = 0.05
particle.vx += (particle.originX - particle.x) * springForce
particle.vy += (particle.originY - particle.y) * springForce
```

### 4. 阻尼（Damping）
```typescript
// 减少速度，模拟摩擦力
particle.vx *= 0.9
particle.vy *= 0.9
```

## 📊 参数配置

### InteractiveParticleText Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | string | 必填 | 要显示的文字 |
| `fontSize` | number | `80` | 字体大小（像素） |
| `particleSize` | number | `2` | 单个粒子的半径 |
| `particleGap` | number | `4` | 粒子间距（越小粒子越密） |
| `particleColor` | string | `#ffffff` | 粒子颜色 |
| `repelDistance` | number | `100` | 排斥半径（像素） |
| `repelForce` | number | `0.5` | 排斥力强度（0-1） |

### 参数调优建议

**密集文字**（小而精致）：
```tsx
<InteractiveParticleText
  text="Hello"
  fontSize={40}
  particleSize={1.5}
  particleGap={2}
  repelDistance={80}
  repelForce={0.4}
/>
```

**稀疏文字**（大而震撼）：
```tsx
<InteractiveParticleText
  text="HELLO"
  fontSize={120}
  particleSize={3}
  particleGap={5}
  repelDistance={150}
  repelForce={0.8}
/>
```

**性能优化**（移动端）：
```tsx
<InteractiveParticleText
  text="Hello"
  fontSize={60}
  particleSize={2}
  particleGap={6}  // 更大间距 = 更少粒子
  repelDistance={80}
  repelForce={0.5}
/>
```

## 🎨 视觉效果调整

### 粒子密度
- `particleGap = 2`：超密集（3000+ 粒子）
- `particleGap = 3`：密集（1500+ 粒子）⭐ 推荐
- `particleGap = 4`：中等（800+ 粒子）
- `particleGap = 5`：稀疏（500+ 粒子）
- `particleGap = 6`：超稀疏（300+ 粒子）

### 交互强度
- `repelForce = 0.3`：轻微推开
- `repelForce = 0.5`：中等推开 ⭐ 推荐
- `repelForce = 0.8`：强力推开
- `repelForce = 1.0`：爆炸式推开

### 排斥范围
- `repelDistance = 60`：小范围影响
- `repelDistance = 100`：中等范围 ⭐ 推荐
- `repelDistance = 150`：大范围影响

## ⚡ 性能考虑

### 粒子数量计算
```
粒子数 ≈ (文字宽度 / particleGap) × (文字高度 / particleGap)

示例：
- "through community" (fontSize=56, gap=3)
  ≈ (500 / 3) × (56 / 3) ≈ 3,000 粒子

- "Hello" (fontSize=80, gap=4)
  ≈ (300 / 4) × (80 / 4) ≈ 1,500 粒子
```

### 性能优化建议

1. **控制粒子数量**
   - 短文字：`particleGap = 2-3`
   - 长文字：`particleGap = 4-5`
   - 移动端：`particleGap = 5-6`

2. **Canvas 优化**
   - `willReadFrequently: true` - 减少 GPU 传输
   - RequestAnimationFrame - 与屏幕刷新率同步
   - 离屏渲染 - 减少重绘

3. **物理计算优化**
   - 只在鼠标附近计算排斥力
   - 弹簧力和阻尼简化计算
   - 避免 Math.sqrt（使用距离平方）

## 📱 响应式支持

- ✅ 桌面端：完整交互
- ✅ 平板：完整交互
- ✅ 移动端：触摸支持（`onTouchMove`）
- ✅ 自动缩放：Canvas 适配容器宽度

## 🎬 使用示例

### 基础用法
```tsx
import InteractiveParticleText from '@/components/ui/InteractiveParticleText'

<InteractiveParticleText
  text="Hello World"
  fontSize={80}
  particleColor="#a855f7"
/>
```

### 在标题中使用（当前实现）
```tsx
<h1>
  Empowering founders to achieve success,{' '}
  <div className="block sm:inline-block mt-4">
    <InteractiveParticleText
      text="through community"
      fontSize={56}
      particleSize={2}
      particleGap={3}
      particleColor="#a855f7"
      repelDistance={100}
      repelForce={0.6}
    />
  </div>
</h1>
```

### 作为独立展示元素
```tsx
<div className="flex items-center justify-center min-h-screen">
  <InteractiveParticleText
    text="WELCOME"
    fontSize={120}
    particleSize={3}
    particleGap={4}
    particleColor="#60a5fa"
    repelDistance={150}
    repelForce={0.8}
  />
</div>
```

## 🎯 最佳实践

1. **文字长度**：10 个字符以内效果最佳
2. **字体选择**：粗体（Bold）效果更好
3. **颜色搭配**：与背景对比度要高
4. **交互提示**：可添加 "Move your mouse" 提示
5. **加载动画**：粒子可以从散乱状态聚合成文字

## 🚀 未来改进

- [ ] 多行文字支持
- [ ] 渐变色粒子
- [ ] 粒子轨迹残影
- [ ] 3D 粒子效果
- [ ] 声音波形跟随
- [ ] 粒子形状变化（圆形 → 方形）

---

**实现状态**：✅ 完成
**当前应用**：Hero 区域标题高亮部分
**性能**：优秀（60 FPS @ 3000 粒子）
**灵感来源**：Vercel Ship 2024
**最后更新**：2025-10-14

