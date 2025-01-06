<script setup lang="ts">
import { TheHeader } from '@/widgets'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="grow">
      <slot />
    </main>
  </div>
</template>
