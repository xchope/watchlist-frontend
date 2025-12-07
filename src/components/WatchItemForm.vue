<script setup>
import { ref } from 'vue'

const emit = defineEmits(['save'])

const title = ref('')
const type = ref('movie')
const rating = ref(0)
const finished = ref(false)

const submit = () => {
  if (!title.value.trim()) {
    return
  }
  emit('save', {
    title: title.value,
    type: type.value,
    rating: Number(rating.value),
    finished: finished.value
  })
  title.value = ''
  type.value = 'movie'
  rating.value = 0
  finished.value = false
}
</script>

<template>
  <form @submit.prevent="submit" class="watchitem-form">
    <input
        v-model="title"
        placeholder="Titel"
        required
    />
    <select v-model="type">
      <option value="movie">Film</option>
      <option value="series">Serie</option>
    </select>
    <input
        type="number"
        v-model="rating"
        min="0"
        max="10"
        placeholder="Rating (0-10)"
    />
    <label>
      <input type="checkbox" v-model="finished" />
      Gesehen
    </label>
    <button type="submit">Speichern</button>
  </form>
</template>

<style scoped>
.watchitem-form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

input, select {
  padding: 0.3rem 0.4rem;
}

button {
  padding: 0.3rem 0.6rem;
}
</style>
