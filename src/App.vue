<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import ItemList from './components/ItemList.vue'

// Immer das Render-Backend nutzen:
const API_URL = 'https://watchlist-vuih.onrender.com'

const items = ref([])
const error = ref(null)
const newTitle = ref('')

// GET
const loadFromBackend = async () => {
  error.value = null
  const endpoint = `${API_URL}/api/watchlist`

  try {
    const response = await fetch(endpoint, { method: 'GET' })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    items.value = result
  } catch (err) {
    console.error('error', err)
    error.value = `Fehler beim Laden: ${err.message}`
  }
}

// POST
const saveToBackend = async () => {
  error.value = null
  const endpoint = `${API_URL}/api/watchlist`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle.value,
        // Backend setzt type, finished, rating default
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const savedItem = await response.json()
    items.value.push(savedItem)
    newTitle.value = ''
  } catch (err) {
    console.error('error', err)
    error.value = `Fehler beim Speichern: ${err.message}`
  }
}
</script>

<template>
  <HelloWorld msg="Vite + Vue" />

  <section>
    <input
        v-model="newTitle"
        placeholder="Neuen Eintrag eingeben"
    />
    <button @click="saveToBackend">
      Speichern
    </button>
  </section>

  <main>
    <h1>Watchlist - Frontend</h1>
    <ItemList :items="items" />
    <hr />
    <button @click="loadFromBackend">Load from backend</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </main>
</template>
