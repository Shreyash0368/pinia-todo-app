<template>
  <div
    v-if="isOpen"
    class="fixed top-1/4 lg:top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-full h-2/5 md:w-96 md:h-48 px-4 bg-slate-100 flex flex-col justify-evenly rounded-md border"
  >
    <h1 class="text-center font-bold text-xl">Edit Modal</h1>
    <input
      type="text"
      placeholder="I want to..."
      v-model="newMessage"
      class="py-2 px-5 rounded w-full"
    />
    <div class="w-full flex justify-between px-2 my-2">
      <button
        class="px-3 py-1 rounded shadow-sm bg-red-600 text-white"
        @click="handleModalClose"
      >
        Close
      </button>
      <button
        class="bg-yellow-300 shadow-sm px-3 py-1 rounded"
        @click="handleSubmit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
const newMessage = ref("");

const { isOpen, closeModal, setId, updateId } = useModal();

function handleModalClose() {
  closeModal();
  setId();
}

async function handleSubmit() {
  await useTaskStore().updateTask(updateId.value, newMessage.value);
  newMessage.value = "";
  closeModal();
  setId()
}
</script>
