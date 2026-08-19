<script setup>
import { onMounted, ref } from 'vue'

const orders = ref([])

async function fetchOrders() {
    const response = await fetch('http://localhost:3000/api/orders')
    const data = await response.json()

    orders.value = data.orders
}

async function updateStatus(order, newStatus) {
    const response = await fetch(
        `http://localhost:3000/api/orders/${order.id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: newStatus
            })
        }
    )

    const updatedOrder = await response.json()

    order.status = updatedOrder.status
}

onMounted(() => {
    fetchOrders()
})
</script>

<template>
    <main class="admin">
        <h1>Ben & Jerry's Admin 🍦</h1>

        <h2>Orders</h2>

        <div
    v-for="order in orders"
    :key="order._id"
    class="admin-order"
>
    <div>
        <strong>Order #{{ order.id }}</strong>
        <p>{{ order.customer.name }}</p>
    </div>

    <div>
        <strong>€{{ order.totalPrice.toFixed(2) }}</strong>

        <select
            :value="order.status"
            @change="updateStatus(order, $event.target.value)"
        >
            <option value="to_process">
                To process
            </option>

            <option value="shipped">
                Shipped
            </option>

            <option value="cancelled">
                Cancelled
            </option>
        </select>
    </div>
</div>
    </main>
</template>