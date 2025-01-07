<script setup lang="ts">

</script>

<template>
  <div class="relative w-full text-base">
    <div class="pl-3 absolute inset-y-0 left-0 flex items-center text-neutral-500 pointer-events-none">
      <UIcon
        name="i-heroicons-magnifying-glass"
        class="size-5"
      />
    </div>
    <input
      type="text"
      class="p-3 px-11 w-full border-b border-neutral-300 bg-white placeholder-neutral-500 truncate focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:ring-neutral-700"
      placeholder="Search library by name, framework or feature..."
    >
  </div>
</template>
