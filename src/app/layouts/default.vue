<script setup lang="ts">
import { TheHeader } from '@/widgets'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="max-lg:flex max-lg:flex-col grow">
      <slot />
    </main>
  </div>
</template>
