<template>
  <header class="bg-gray-200 pt-8 pb-2 flex justify-center">
    <div class="relative">
      <img
        src="../assets/logo/Pinialogo.svg"
        alt="pinia logo"
        class="absolute bottom-0.5 w-12 h-12 -rotate-12"
      />
      <h1 class="text-slate-600 font-bold text-3xl rotate-3 ml-12">
        Pinia Tasks
      </h1>
    </div>
  </header>
  <slot />
</template>
