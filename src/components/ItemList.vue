<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['delete-item'])

const handleDelete = (id) => {
  emit('delete-item', id)
}
</script>

<template>
  <div>
    <h2>Aktuelle Watchlist</h2>
    <p v-if="items.length === 0">Noch keine Einträge.</p>

    <ul v-else class="item-list">
      <li v-for="item in items" :key="item.id" class="item">
        <div class="info">
          <strong>{{ item.title }}</strong>
          <span class="meta">
            [{{ item.type }}] – Bewertung: {{ item.rating }} –
            Status: {{ item.finished ? 'gesehen' : 'offen' }}
          </span>
        </div>
        <button @click="handleDelete(item.id)">Löschen</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 0.4rem 0;
}

.meta {
  font-size: 0.85rem;
  color: #555;
}
</style>
