<template>
    <div>
        delay
    </div>
</template>

<script setup>
import { useCreateTimer } from 'vue-anime'

const timer = useCreateTimer({
    delay: 2000,
    onUpdate: (self) => {
        console.log(self);
    }
})
</script>

<style></style>