<script setup lang="ts">
import { TheHeader } from '@/widgets/layout'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="flex flex-col grow">
      <slot />
    </main>
  </div>
</template>
