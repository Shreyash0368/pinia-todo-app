<template>
  <TaskForm v-if="userStore.user" />
  <main class="py-6 max-w-screen-2xl mx-auto">
    <div v-if="!userStore.user" class="w-full flex justify-center py-4">
      <button class="px-2 py-2 rounded bg-yellow-200" @click="handleLogin">
        Login
      </button>
    </div>
    <div v-else-if="userStore.loading" class="text-center py-2">
      <h1 class="text-xl font-semibold">Login in...</h1>
    </div>
    <div v-else>
      <div v-if="taskStore.loading" class="text-center py-2">
        <h1 class="text-xl font-semibold">Loading Tasks...</h1>
      </div>
      <div v-else>
        <FilterButtons @filter-change="handleFilterChange" />
        <CardList
          v-if="filter === 'fav'"
          :tasks="taskStore.getFavs"
          :count="taskStore.getFavCount"
        />
        <CardList
          v-else
          :tasks="taskStore.getAll"
          :count="taskStore.getCount"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { useUserStore } from "~/stores/userStore";
import { useTaskStore } from "~/stores/taskStore";

const userStore = useUserStore();
const taskStore = useTaskStore();
const filter = ref("all");

async function handleLogin() {
  await userStore.login();
  await taskStore.fetchTasks();
}

function handleFilterChange(newValue) {
  filter.value = newValue;
}

onMounted(async () => {
  userStore.initalizeApp();
});
</script>

<style scoped></style>
