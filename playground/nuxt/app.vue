<template>
  <div>
    <h1>Nuxt Animation Playground</h1>
    <button @click="handleClick">Animate</button>
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  const animation = useAnimation({
    duration: 1000,
    easing: 'easeInOutQuad'
  });
  animation.play();
};
</script> 