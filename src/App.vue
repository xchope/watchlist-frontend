<script setup>
import { ref, onMounted, computed } from 'vue'
import ItemList from './components/ItemList.vue'
import WatchItemForm from './components/WatchItemForm.vue'

const API_URL = 'https://watchlist-vuih.onrender.com'

const items = ref([])
const error = ref(null)
const loading = ref(false)
const showOnlyOpen = ref(false)   // Filter-Flag

const loadFromBackend = async () => {
  error.value = null
  loading.value = true
  const endpoint = `${API_URL}/api/watchlist`

  try {
    const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    items.value = result
  } catch (err) {
    console.error(err)
    error.value = `Fehler beim Laden: ${err.message}`
  } finally {
    loading.value = false
  }
}

const saveToBackend = async (newItem) => {
  error.value = null
  const endpoint = `${API_URL}/api/watchlist`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const savedItem = await response.json()
    items.value.push(savedItem)
  } catch (err) {
    console.error(err)
    error.value = `Fehler beim Speichern: ${err.message}`
  }
}

const deleteItem = async (id) => {
  error.value = null
  const endpoint = `${API_URL}/api/watchlist/${id}`

  try {
    const response = await fetch(endpoint, { method: 'DELETE' })
    if (!response.ok && response.status !== 204) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    items.value = items.value.filter(item => item.id !== id)
  } catch (err) {
    console.error(err)
    error.value = `Fehler beim Löschen: ${err.message}`
  }
}

// computed für Filter: nur ungesehene, wenn Checkbox aktiv
const filteredItems = computed(() => {
  if (!showOnlyOpen.value) {
    return items.value
  }
  return items.value.filter(item => !item.finished)
})

onMounted(() => {
  loadFromBackend()
})
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="logo-circle">🎬</div>
      <div>
        <h1>Watchlist</h1>
        <p>Verwalte deine Filme & Serien</p>
      </div>
    </header>

    <main>
      <section class="form-section">
        <h2>Neuen Eintrag hinzufügen</h2>
        <WatchItemForm @save="saveToBackend" />
      </section>

      <section class="list-section">
        <div class="toolbar">
          <button @click="loadFromBackend">Neu laden</button>
          <label class="filter">
            <input type="checkbox" v-model="showOnlyOpen" />
            Nur ungesehene anzeigen
          </label>
          <span v-if="loading">Lade...</span>
        </div>

        <ItemList :items="filteredItems" @delete-item="deleteItem" />
      </section>

      <p v-if="error" class="error">{{ error }}</p>
    </main>
  </div>
</template>


<style scoped>
:global(body) {
  margin: 0;
  background: linear-gradient(135deg, #0f172a, #020617);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.app {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem 2.5rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25);
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.logo-circle {
  width: 52px;
  height: 52px;
  border-radius: 999px;
  background: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: #f9fafb;
}

h1 {
  margin: 0;
}

header p {
  margin: 0.2rem 0 0;
  color: #4b5563;
}

.form-section,
.list-section {
  margin-bottom: 2rem;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.filter {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
}


button {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: #111827;
  color: #f9fafb;
  font-size: 0.9rem;
}

button:hover {
  background: #1f2937;
}

.error {
  color: #dc2626;
  font-weight: 500;
}
</style>
