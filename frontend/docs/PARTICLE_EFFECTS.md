# 🎨 粒子效果实现指南

灵感来源：Vercel Ship 页面的交互式粒子效果

## ✨ 已实现的效果

### 1. **按钮粒子效果** (内置在 `Button` 组件)
鼠标在按钮上移动时，产生微小的粒子飘散效果

**使用位置**：
- 所有按钮组件
- CTA 按钮自动支持

**特点**：
- 轻量级 DOM 实现
- 黑白粒子（根据按钮样式自适应）
- 随机生成，更自然
- 悬停光晕效果

### 2. **粒子文字效果**
详细文档请参考：[交互式粒子文字](./INTERACTIVE_PARTICLES.md)

**可用组件**：
- `InteractiveParticleText` - 交互式粒子文字（鼠标排斥效果）
- `StaticParticleText` - 静态粒子文字

## 🎯 使用方法

### 按钮粒子效果

按钮组件已内置，无需额外配置：

```tsx
import Button from '@/components/ui/Button'

<Button variant="primary">
  Click Me
</Button>
```

### 粒子文字效果

详细使用方法请参考：[交互式粒子文字文档](./INTERACTIVE_PARTICLES.md)

## ⚙️ 配置选项

### 按钮粒子

按钮组件的粒子效果自动配置，无需手动设置。

### 粒子文字配置

详细配置请参考：[交互式粒子文字文档](./INTERACTIVE_PARTICLES.md)

## 🎨 设计建议

### 颜色选择
- **标题**：使用品牌色或渐变色（如紫色 `#a855f7`）
- **按钮**：自动适配（白底黑粒子，黑底白粒子）
- **装饰**：半透明白色 `rgba(255, 255, 255, 0.6)`

### 性能考虑
- 粒子数量：20-50 个（过多会影响性能）
- 粒子生命周期：0.5-1 秒
- Canvas 优于 DOM（大量粒子时）

### 视觉效果
- 标题：中等粒子（2-4px）
- 按钮：小粒子（1-2px）
- 装饰：大粒子（3-6px）

## 🔧 技术实现

### Button Particles (DOM)
- React State 管理粒子
- CSS 动画（`particle-fade`）
- 自动清理（setTimeout）
- 限制粒子数量（最多 20 个）

### Particle Text (Canvas)
详细技术实现请参考：[交互式粒子文字文档](./INTERACTIVE_PARTICLES.md)

## 📱 响应式支持

所有粒子效果均支持：
- ✅ 桌面端（完整效果）
- ✅ 平板（完整效果）
- ✅ 移动端（建议减少粒子数量）

## ⚡ 性能优化

1. **粒子限制**：最多同时存在 20-50 个粒子
2. **自动清理**：粒子生命周期结束后自动移除
3. **条件渲染**：仅在悬停时生成粒子
4. **RAF 优化**：使用 requestAnimationFrame
5. **混合模式**：CSS `mix-blend-mode` 提升视觉效果

## 🎬 动画效果

### particle-fade
粒子淡出并缩小，0.8 秒

### particle-float
粒子向上飘浮并消失

## 🚀 未来扩展

可以考虑添加：
- 粒子轨迹效果
- 颜色渐变粒子
- 粒子碰撞检测
- 3D 粒子效果
- 粒子跟随鼠标路径

## 📚 相关文档

- [交互式粒子文字](./INTERACTIVE_PARTICLES.md) - 详细的粒子文字实现
- [Hero 设计](./HERO_DESIGN.md) - Hero 区域设计文档
- [按钮组件](../components/ui/Button.tsx) - 按钮组件源码

---

**实现状态**：✅ 完成
**灵感来源**：Vercel Ship 2024
**最后更新**：2025-10-14

