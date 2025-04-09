# vue-anime

A Vue3/Nuxt animation library inspired by Anime.js.

## 🚀 Project Status

The project is currently in initial setup phase. We're working on establishing the foundation before implementing core features.

### Current Progress
- ✅ Project structure and configuration
- ✅ Development environment setup
- ✅ Core architecture design
- ⏳ Core animation engine (not started)
- ⏳ Vue integration layer (not started)
- ⏳ Documentation (not started)

## Features

- 🚀 **High Performance** - Optimized for smooth animations
- 🔄 **Reactive** - Seamlessly works with Vue's reactivity system
- 🧩 **Composable** - Flexible API with composables, directives, and components
- 🎨 **Rich Animation Options** - Easings, timelines, springs, and more
- 📱 **SSR Compatible** - Works with Nuxt and server-side rendering
- 🪶 **Lightweight** - Small bundle size, no dependencies other than Vue

## Installation

```bash
# npm
npm install vue-anime

# yarn
yarn add vue-anime

# pnpm
pnpm add vue-anime
```

## Quick Start

```js
// In your main.js/ts
import { createApp } from 'vue'
import App from './App.vue'
import { vue-animePlugin } from 'vue-anime'

const app = createApp(App)
app.use(vue-animePlugin)
app.mount('#app')
```

```vue
<!-- In your component -->
<script setup>
import { ref } from 'vue'
import { useAnimate } from 'vue-anime'

const element = ref(null)

const { play, pause } = useAnimate(element, {
  translateX: 100,
  rotate: 360,
  duration: 1000,
  easing: 'easeInOutQuad'
})
</script>

<template>
  <div ref="element">Animated element</div>
  <button @click="play">Play</button>
  <button @click="pause">Pause</button>
</template>
```

## Core Concepts

- **Animation** - Animate a target with properties, duration, easing, etc.
- **Timeline** - Sequence multiple animations with precise timing control
- **Spring** - Physics-based animations with natural motion
- **Easing** - Various easing functions for different animation styles

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build the library
pnpm build

# Run tests
pnpm test
```

## Contributing

We welcome contributions! Please check out our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## Documentation

Detailed documentation is being developed. You can find the latest updates in the `docs` directory.

## License

MIT 