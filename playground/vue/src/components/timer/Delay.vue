<template>
    <div>
        delay
    </div>
</template>

<script setup>
import { useCreateTimer } from 'vue-anime'

const timer = useCreateTimer({
    delay: 2000,
    onBegin: (self) => {
        console.log('----onBegin----');
        
        console.log(self);
    }
})

</script>

<style></style>