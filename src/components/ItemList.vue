<template>
  <section>
    <h2>Items (Unterkomponente mit v-for)</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <strong>{{ item.title }}</strong>
        <small v-if="item.note"> — {{ item.note }}</small>
      </li>
    </ul>
    <p v-if="items.length === 0">Keine Einträge vorhanden.</p>
  </section>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
