<script setup>
import { onMounted, ref, watch } from 'vue'
import { createScene } from './three/scene'

const selectedFlavour = ref('vanilla')
const selectedTopping = ref('rainbow')

let iceCreamScene = null

onMounted(() => {
    const container = document.getElementById('three-container')

    iceCreamScene = createScene(container)

    iceCreamScene.setFlavour(selectedFlavour.value)
    iceCreamScene.setTopping(selectedTopping.value)
})

watch(selectedFlavour, (newFlavour) => {
    if (iceCreamScene) {
        iceCreamScene.setFlavour(newFlavour)
    }
})

watch(selectedTopping, (newTopping) => {
    if (iceCreamScene) {
        iceCreamScene.setTopping(newTopping)
    }
})
</script>

<template>
    <main>
        <h1>Ben & Jerry's Custom Ice Cream</h1>

        <div id="three-container"></div>

        <section class="customizer">

            <h2>Choose your flavour</h2>

            <div class="options">

                <button
                    @click="selectedFlavour = 'vanilla'"
                    :class="{ active: selectedFlavour === 'vanilla' }"
                >
                    🍦 Vanilla
                </button>

                <button
                    @click="selectedFlavour = 'chocolate'"
                    :class="{ active: selectedFlavour === 'chocolate' }"
                >
                    🍫 Chocolate
                </button>

                <button
                    @click="selectedFlavour = 'strawberry'"
                    :class="{ active: selectedFlavour === 'strawberry' }"
                >
                    🍓 Strawberry
                </button>

            </div>


            <h2>Choose your topping</h2>

            <div class="options">

                <button
                    @click="selectedTopping = 'rainbow'"
                    :class="{ active: selectedTopping === 'rainbow' }"
                >
                    🌈 Rainbow
                </button>

                <button
                    @click="selectedTopping = 'chocolate'"
                    :class="{ active: selectedTopping === 'chocolate' }"
                >
                    🍫 Chocolate
                </button>

                <button
                    @click="selectedTopping = 'blue'"
                    :class="{ active: selectedTopping === 'blue' }"
                >
                    💙 Blue
                </button>

            </div>

        </section>
    </main>
</template>