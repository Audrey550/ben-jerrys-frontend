<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { createScene } from './three/scene'
import Login from './Login.vue'
import Admin from './Admin.vue'

const selectedFlavour = ref('vanilla')
const selectedTopping = ref('rainbow')

const customerName = ref('')
const customerAddress = ref('')
const orderSuccess = ref(false)
const showLogin = ref(false)
const isAdmin = ref(false)

const flavourPrices = {
    vanilla: 3.50,
    chocolate: 4.00,
    strawberry: 3.75
}

const flavourNames = {
    vanilla: 'Vanilla',
    chocolate: 'Chocolate',
    strawberry: 'Strawberry'
}

const toppingNames = {
    rainbow: 'Rainbow',
    chocolate: 'Chocolate',
    blue: 'Blue'
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
     if (!customerName.value.trim() || !customerAddress.value.trim()) {
        return
    }
    orderSuccess.value = false

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

    orderSuccess.value = true
}

function handleLogin() {
    isAdmin.value = true
    showLogin.value = false
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
    <Login
    v-if="showLogin && !isAdmin"
    @login="handleLogin"
    />

    <Admin
        v-else-if="isAdmin"
    />

    <main v-else>
        <h1>Ben & Jerry's Custom Ice Cream</h1>
        <button @click="showLogin = true">
            Admin
        </button>

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
              <strong>{{ flavourNames[selectedFlavour] }}</strong>
          </div>

          <div class="summary-item">
              <span>Topping</span>
              <strong>{{ toppingNames[selectedTopping] }}</strong>
          </div>

          <div class="summary-total">
              <span>Total</span>
              <strong>€{{ totalPrice.toFixed(2) }}</strong>
          </div>
      </section>

      
        <div v-if="orderSuccess" class="order-success">
            🍦Order placed successfully!
        </div>

        <form class="customer-form" @submit.prevent="createOrder">            <h2>Your details</h2>

            <label for="customer-name">
                Name
            </label>

            <input
                id="customer-name"
                v-model="customerName"
                type="text"
                placeholder="Your name"
                required
            >

            <label for="customer-address">
                Address
            </label>

            <input
                id="customer-address"
                v-model="customerAddress"
                type="text"
                placeholder="Your address"
                required
            >

            <button
                class="place-order-button"
                type="submit"
            >
                Place order
            </button>
        </form>
    </main>
</template>