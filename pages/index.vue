<script setup lang="ts">
import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import AppHeader from '~/components/AppHeader.vue';

const formMessage = ref('there you go')
const state = reactive({messages: []})

let socket: Socket | undefined

const sendMessage = () => {
  socket?.emit('message-channel', formMessage.value)
}

const sendMessageViaApi = async () => {
  socket?.emit('message-channel', formMessage.value)
  await $fetch('/api/test-message', {
    method: 'POST',
    body: { message: formMessage.value },
  })
}

onMounted(async () => {
  socket = io(`${location.protocol === 'https:' ? 'wss://' : 'ws://' }${location.host}`)

  socket.on('message-channel', (messageValue: string) => {
    try {
      console.log('Frontend received: ', messageValue)
      state.messages.push(messageValue)
    } catch (e) { console.error(e) }
  })
})

onUnmounted(() => {
  socket?.disconnect()
})
</script>

<template>
  <div>
      <AppHeader/>
    <ul>
      <li v-for="message of state.messages" :key="message">
        {{ message}}
      </li>
    </ul>
    <form @submit.prevent="sendMessage">
      <input v-model="formMessage" />
      <button>Send message</button>
      <button type="button" @click="sendMessageViaApi()">Send via api</button>
    </form>
  </div>
</template>