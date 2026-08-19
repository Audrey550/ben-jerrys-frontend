<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { createScene } from './three/scene'

const selectedFlavour = ref('vanilla')
const selectedTopping = ref('rainbow')

const customerName = ref('')
const customerAddress = ref('')

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

async function createOrder() {
    const order = {
        customer: {
            name: customerName.value,
            address: customerAddress.value
        },

        iceCream: {
            flavor: selectedFlavour.value,
            topping: selectedTopping.value
        },

        totalPrice: totalPrice.value,
    }

    const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })

    const data = await response.json()

    console.log('Order:', data)
}

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

      <section class="order-summary">

          <h2>Your ice cream 🍦</h2>

          <div class="summary-item">
              <span>Flavour</span>
              <strong>{{ selectedFlavour }}</strong>
          </div>

          <div class="summary-item">
              <span>Topping</span>
              <strong>{{ selectedTopping }}</strong>
          </div>

          <div class="summary-total">
              <span>Total</span>
              <strong>€{{ totalPrice.toFixed(2) }}</strong>
          </div>

          <button class="order-button">
              Order ice cream
          </button>
      </section>

      <section class="customer-form">
            <h2>Your details</h2>

            <label for="customer-name">
                Name
            </label>

            <input
                id="customer-name"
                v-model="customerName"
                type="text"
                placeholder="Your name"
            >

            <label for="customer-address">
                Address
            </label>

            <input
                id="customer-address"
                v-model="customerAddress"
                type="text"
                placeholder="Your address"
            >

          <button class="place-order-button"
              @click="createOrder"
          >
              Place order
          </button>
      </section>
    </main>
</template>