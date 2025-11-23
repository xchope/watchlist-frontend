<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import ItemList from './components/ItemList.vue'

const newTitle = ref('')

const saveToBackend = async () => {
  error.value = null

  const endpoint = 'http://localhost:8080/api/watchlist';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newTitle.value
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const savedItem = await response.json();

    items.value.push(savedItem);
    newTitle.value = '';

  } catch (err) {
    error.value = `Fehler beim Speichern: ${err.message}`;
  }
}


const items = ref([
  { id: 1, title: 'Movie: The Matrix' },
  { id: 2, title: 'Series: Dark' },
])
const error = ref(null)


const loadFromBackend = async () => {
  error.value = null
  const endpoint = 'https://watchlist-vuih.onrender.com/api/watchlist';

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(endpoint, requestOptions);
    if (!response.ok) {

      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();


    result.forEach(item => {
      items.value.push(item);
    });

  } catch (err) {
    console.error('error', err);
    error.value = `Fehler beim Laden: ${err.message}`;
  }
}


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
  <input
      v-model="newTitle"
      placeholder="Neuen Eintrag eingeben"
  />

  <button @click="saveToBackend">
    Speichern
  </button>

  <main>
    <h1>Watchlist - Frontend (Milestone 2)</h1>
    <ItemList :items="items" />
    <hr>
    <button @click="loadFromBackend">Load from backend</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </main>
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
