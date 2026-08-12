<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { createScene } from './three/scene'

const selectedFlavour = ref('vanilla')
const selectedTopping = ref('rainbow')

const flavourPrices = {
    vanilla: 3.50,
    chocolate: 4.00,
    strawberry: 3.75
}

const toppingPrices = {
    rainbow: 0.50,
    chocolate: 0.75,
    blue: 0.50
}

const totalPrice = computed(() => {
    return (
        flavourPrices[selectedFlavour.value] +
        toppingPrices[selectedTopping.value]
    )
})

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
        <div class="price">
          <h2>Your ice cream</h2>
          <p>
              Total:
              <strong>€{{ totalPrice.toFixed(2) }}</strong>
          </p>
      </div>
    </main>
</template>