# vue-anime

A Vue3/Nuxt animation library inspired by Anime.js.

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

## Documentation

Detailed documentation is coming soon!

## License

MIT 