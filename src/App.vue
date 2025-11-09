<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<template>
  <main>
    <h1>Watchlist - Frontend (Milestone 2)</h1>
    <!-- Übergibt items an Unterkomponente -->
    <ItemList :items="items" />
    <hr>
    <button @click="loadFromBackend">Load from backend</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </main>
</template>

<script>
import { ref } from 'vue'
import ItemList from './components/ItemList.vue'

export default {
  components: { ItemList },
  setup() {
    const items = ref([

      { id: 1, title: 'Movie: The Matrix' },
      { id: 2, title: 'Series: Dark' },
    ])
    const error = ref(null)

    async function loadFromBackend() {
      error.value = null
      try {
        const res = await fetch('http://localhost:8080/api/watchlist')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()

        items.value = data
      } catch (e) {
        error.value = 'Fehler beim Laden vom Backend: ' + e.message
      }
    }

    return { items, loadFromBackend, error }
  }
}
</script>

