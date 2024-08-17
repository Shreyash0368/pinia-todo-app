<template>
  <TaskForm />
  <main class="py-6 max-w-screen-2xl mx-auto">   
    <div>
      <div v-if="taskStore.loading" class="text-center py-2">
        <h1 class="text-xl font-semibold">Loading Tasks...</h1>
      </div>
      <div v-else>
        <Modal />
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
import { useTaskStore } from "~/stores/taskStore";
const {loginApiKey} = useRealmApp()

const taskStore = useTaskStore();
const filter = ref("all");

function handleFilterChange(newValue) {
  filter.value = newValue;
}

onMounted(async () => {
  await loginApiKey();
  await taskStore.fetchTasks();
});
</script>

<style scoped></style>
