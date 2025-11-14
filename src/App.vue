<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import ItemList from './components/ItemList.vue'

const items = ref([
  { id: 1, title: 'Movie: The Matrix' },
  { id: 2, title: 'Series: Dark' },
])
const error = ref(null)


const loadFromBackend = async () => {
  error.value = null
  const endpoint = 'http://localhost:8080/api/watchlist';

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
