<script setup>
import { onMounted } from 'vue'
import { createScene } from './three/scene'

onMounted(() => {
    const container = document.getElementById('three-container')

    createScene(container)
})
</script>

<template>
    <main>
        <h1>Ben & Jerry's Custom Ice Cream</h1>

        <div id="three-container"></div>
    </main>
</template>