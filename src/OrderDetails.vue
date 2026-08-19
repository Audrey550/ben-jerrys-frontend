<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
    orderId: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['back'])

const order = ref(null)

async function fetchOrder() {
    const response = await fetch(
        `http://localhost:3000/api/orders/${props.orderId}`
    )

    if (!response.ok) {
        console.error('Failed to fetch order')
        return
    }

    order.value = await response.json()
}

onMounted(() => {
    fetchOrder()
})
</script>

<template>
    <main class="order-details">

        <button @click="emit('back')">
            ← Back to orders
        </button>

        <div v-if="order">

            <h1>Order #{{ order.id }}</h1>

            <section>
                <h2>Customer</h2>

                <p>
                    <strong>Name:</strong>
                    {{ order.customer.name }}
                </p>

                <p>
                    <strong>Address:</strong>
                    {{ order.customer.address }}
                </p>
            </section>

            <section>
                <h2>Ice cream</h2>

                <p>
                    <strong>Flavour:</strong>
                    {{ order.iceCream.flavor }}
                </p>

                <p>
                    <strong>Topping:</strong>
                    {{ order.iceCream.topping }}
                </p>
            </section>

            <section>
                <h2>Order information</h2>

                <p>
                    <strong>Total:</strong>
                    €{{ order.totalPrice.toFixed(2) }}
                </p>

                <p>
                    <strong>Status:</strong>
                    {{ order.status }}
                </p>
            </section>

        </div>

        <p v-else>
            Loading order...
        </p>

    </main>
</template>