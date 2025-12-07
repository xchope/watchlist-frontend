<script setup>
import { ref } from 'vue'

const emit = defineEmits(['save'])

const title = ref('')
const type = ref('movie')
const rating = ref(5)          // Startwert mittig
const finished = ref(false)
const error = ref('')

const submit = () => {
  error.value = ''

  // Titel darf nicht leer sein
  if (!title.value.trim()) {
    error.value = 'Titel darf nicht leer sein.'
    return
  }

  // Rating zwischen 1 und 10 (Frontend-Validierung)
  const numericRating = Number(rating.value)
  if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 10) {
    error.value = 'Bitte eine Bewertung zwischen 1 und 10 eingeben.'
    return
  }

  emit('save', {
    title: title.value.trim(),
    type: type.value,
    rating: numericRating,
    finished: finished.value
  })

  // Felder zurücksetzen
  title.value = ''
  type.value = 'movie'
  rating.value = 5
  finished.value = false
}
</script>

<template>
  <form @submit.prevent="submit" class="watchitem-form">
    <input
        v-model="title"
        placeholder="Titel"
    />
    <select v-model="type">
      <option value="movie">Film</option>
      <option value="series">Serie</option>
    </select>
    <input
        type="number"
        v-model="rating"
        min="1"
        max="10"
        placeholder="Rating (1-10)"
    />
    <label>
      <input type="checkbox" v-model="finished" />
      Gesehen
    </label>
    <button type="submit">Speichern</button>

    <p v-if="error" class="form-error">{{ error }}</p>
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

.form-error {
  width: 100%;
  margin-top: 0.3rem;
  color: #c00;
  font-size: 0.9rem;
}
</style>

