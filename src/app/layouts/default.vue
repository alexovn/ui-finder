<script setup lang="ts">
import { TheHeader } from '@/widgets'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="px-6 pt-10 pb-5 mx-auto w-full lg:max-w-screen-2xl grow">
      <slot />
    </div>
  </div>
</template>
