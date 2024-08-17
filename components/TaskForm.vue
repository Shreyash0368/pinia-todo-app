<template>
  <nav class="bg-gray-200">
    <form @submit.prevent="handleSubmit" class="flex justify-center gap-3 py-3">
      <input
        type="text"
        placeholder="I want to..."
        v-model="newTask"
        class="py-2 px-2 rounded w-72"
      />
      <button class="bg-yellow-300 px-3 py-1 text-gray-700 rounded">Add</button>
    </form>
  </nav>
</template>

<script setup>

const taskStore = useTaskStore();
const newTask = ref("");


async function handleSubmit() {
  if (!newTask.value) return;
  await taskStore.addTask(newTask.value);
  newTask.value = "";
}
</script>

