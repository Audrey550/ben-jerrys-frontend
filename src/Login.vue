<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const emit = defineEmits(['login'])

function login() {
    if (username.value === 'admin' && password.value === 'admin123') {
        emit('login')
    } else {
        alert('Invalid username or password')
    }
}
</script>

<template>
    <section class="login">
        <h1>Ben & Jerry's Admin 🍦</h1>

        <h2>Admin login</h2>

        <form @submit.prevent="login">
            <label for="username">
                Username
            </label>

            <input
                id="username"
                v-model="username"
                type="text"
                required
            >

            <label for="password">
                Password
            </label>

            <input
                id="password"
                v-model="password"
                type="password"
                required
            >

            <button type="submit">
                Login
            </button>
        </form>
    </section>
</template>