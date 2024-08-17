<template>
  <ul class="grid grid-cols-1 gap-3 w-full">
    <TaskCard v-for="task in tasks" :task="task" :key="task._id" />
  </ul>
</template>

<script setup>
const { tasks, count } = defineProps(["tasks", "count"]);
</script>
