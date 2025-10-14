# Saturn 3D Component

## 概述

使用 Three.js 创建真实的 3D 土星效果，替换了原来的 2D CSS 渐变实现。

## 技术栈

- **Three.js**: 3D 图形库
- **@react-three/fiber**: React 的 Three.js 渲染器
- **@react-three/drei**: Three.js 辅助工具集

## 组件结构

### Saturn3D.tsx

位置：`components/ui/Saturn3D.tsx`

#### 主要特性

1. **真实 3D 球体**
   - 使用 Three.js Sphere geometry
   - 64x64 分段实现平滑表面
   - PBR 材质（金属度 0.3，粗糙度 0.4）

2. **三层光环系统**
   - 外环：半径 1.8，透明度 0.35
   - 中环：半径 2.1，透明度 0.25
   - 内环：半径 1.5，透明度 0.2
   - 所有光环倾斜 Math.PI/2.5 模拟土星特征

3. **光照系统**
   - 主光源：模拟太阳光（位置 [5,5,5]，强度 2）
   - 补光：蓝色调补光（位置 [-3,-3,-3]，强度 0.5）
   - 环境光：强度 0.3
   - 点光源：增强立体感（位置 [3,3,3]，强度 1.5）

4. **交互功能**
   - 自动旋转（速度 0.5）
   - 禁用缩放和平移
   - 限制视角范围（π/3 到 π/1.5）

## 集成

在 `JoinEcosystemSection.tsx` 中使用：

```tsx
import Saturn3D from '@/components/ui/Saturn3D'

// 在组件中
<Saturn3D />
```

## 性能优化

- Canvas 启用抗锯齿（antialias: true）
- 透明背景（alpha: true）
- 合理的几何体分段数（64）

## 自定义选项

可以通过修改以下参数调整效果：

- 球体大小：`args={[1, 64, 64]}` 的第一个参数
- 光环半径：`torusGeometry` 的 `args` 参数
- 旋转速度：`autoRotateSpeed` 属性
- 光源强度和位置：各个 `Light` 组件的属性

## 已知限制

- 需要 WebGL 支持
- 在低性能设备上可能影响性能
- React 18 与 React Three Fiber 有 peer dependency 警告（不影响功能）

