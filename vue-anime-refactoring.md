# Vue Anime - 重构和优化建议

## 核心功能实现问题

### 1. 缺少 Anime.js 依赖

- **问题**: 根据 `packages/anime/package.json` 文件，项目缺少核心依赖 `animejs` 和 `@types/animejs`
- **建议**: 在 package.json 中添加以下依赖:

  ```json
  "dependencies": {
    "animejs": "^3.2.1",
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@types/animejs": "^3.1.7",
    // 其他已有依赖...
  }
  ```

### 2. 核心 API 未实现

- **问题**: 目前 `index.ts` 中只有一个空壳函数，没有实际功能
- **建议**: 根据 ROADMAP.md 中的计划实现 `useAnime` 组合式 API，提供完整的动画控制功能

### 3. 类型定义不完整

- **问题**: 缺少针对 anime.js 选项和返回值的完整类型定义
- **建议**: 创建完整的 TypeScript 类型定义文件，确保 API 类型安全

## 架构优化

### 1. 项目结构重组

- **问题**: 当前结构过于简单，没有合理组织代码
- **建议**: 调整项目结构如下:

  ```
  src/
  ├── composables/
  │   ├── useAnime.ts
  │   ├── useAnimeTimeline.ts
  │   └── index.ts
  ├── components/
  │   ├── Anime.vue
  │   ├── AnimeGroup.vue
  │   └── index.ts
  ├── directives/
  │   ├── vAnime.ts
  │   └── index.ts
  ├── types/
  │   ├── anime.ts
  │   └── index.ts
  ├── utils/
  │   ├── defaults.ts
  │   ├── helpers.ts
  │   └── index.ts
  └── index.ts
  ```

### 2. 导出策略优化

- **问题**: 当前导出策略不支持按需引入
- **建议**: 调整导出结构以支持 tree-shaking 和按需引入:

  ```typescript
  export * from './components'
  // src/index.ts
  export * from './composables'
  export * from './directives'
  export * from './types'
  ```

## 功能需求

### 1. 实现 useAnime 组合式 API

- **需求**: 实现基础的 useAnime 组合式 API，支持:
  - 接受目标元素 (Vue ref、选择器字符串等)
  - 支持动画选项配置
  - 返回动画控制方法 (play, pause, restart, seek 等)
  - 处理响应式选项 (在选项变化时重新创建动画)
  - 与 Vue 生命周期集成

### 2. 实现 Anime 组件

- **需求**: 创建 Anime.vue 组件，允许通过组件 API 控制动画:

  ```html
  <Anime :targets="el" :duration="1000" :translateX="250">
    <div ref="el">Element to animate</div>
  </Anime>
  ```

### 3. 实现 v-anime 指令

- **需求**: 创建 v-anime 指令，允许直接在元素上应用动画:

  ```html
  <div v-anime="{ translateX: 250, duration: 1000 }">Animated element</div>
  ```

### 4. 时间线支持

- **需求**: 实现 useAnimeTimeline 组合式 API 和相应组件，支持复杂的动画时间线

## 性能优化

### 1. 按需加载

- **问题**: 当前未设置按需加载策略
- **建议**: 确保库支持按需加载，减小打包体积

### 2. 动画性能优化

- **需求**: 确保动画使用 transform 和 opacity 等高性能属性
- **建议**: 添加性能优化指南和默认设置

## 文档和示例

### 1. 缺少文档

- **问题**: 项目缺少使用文档
- **建议**: 创建全面的文档，包括:
  - 安装指南
  - API 参考
  - 示例和最佳实践
  - 性能优化建议

### 2. 示例不足

- **问题**: 当前 playground 中几乎没有示例
- **建议**: 创建多个示例，覆盖各种使用场景:
  - 基础动画示例
  - 时间线动画
  - 列表动画
  - SVG 动画
  - 路由转场动画

## 测试

### 1. 缺少测试

- **问题**: 项目没有任何测试
- **建议**: 添加单元测试和集成测试:
  - 为 composables 添加单元测试
  - 为组件添加组件测试
  - 添加 E2E 测试确保库在真实环境中工作

## 兼容性和集成

### 1. 与 Vue Router 集成

- **需求**: 提供与 Vue Router 集成的页面转场动画解决方案

### 2. 与 Vue Transition/TransitionGroup 的集成

- **需求**: 提供与 Vue 内置过渡组件的集成支持

## 未来展望

### 1. 物理弹簧动画

- **需求**: 增加弹簧物理效果支持

### 2. 手势交互

- **需求**: 添加与用户手势交互的动画支持

### 3. SVG 特定工具

- **需求**: 为 SVG 动画提供特定的辅助函数和组件

### 4. 3D 变换支持

- **需求**: 提供更好的 3D 变换和效果支持
