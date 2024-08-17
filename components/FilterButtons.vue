<template>
  <div class="w-full py-2 flex gap-3 justify-center mb-3">
    <button
      class="px-2 py-1 rounded shadow-sm bg-yellow-200"
      @click="filter = 'all'"
    >
      All
    </button>
    <button
      class="px-2 py-1 bg-yellow-200 rounded shadow-sm"
      @click="filter = 'fav'"
    >
      Favourites
    </button>
  </div>
</template>

<script setup>
const filter = ref('all')
const emit = defineEmits(['filterChange']);

watch(filter, (newValue) => {
  emit('filterChange', newValue);
} )
</script>
