<template>
  <li 
    class="bg-white rounded shadow-sm w-3/5 py-4 px-2 mx-auto flex justify-between"
  >
    <span>{{ task.message }}</span>
    <span class="flex gap-3">
      <Icon
        name="uil:heart"
        mode="svg"
        size="2.5em"
        :class="{ 'text-red-500': task.isFav }"
        class="hover:cursor-pointer hover:bg-slate-200 p-2 rounded-full"
        @click="taskStore.toggleFavourite(task._id)"
      />
      <Icon
        name="uil:trash"
        mode="svg"
        size="2.5em"
        @click="taskStore.deleteTask(task._id)"
        class="hover:cursor-pointer hover:bg-slate-200 p-2 rounded-full"
      />
    </span>
  </li>
</template>

<script setup>
const { task } = defineProps(["task"]);

const taskStore = useTaskStore();
</script>

<style lang="scss" scoped></style>
