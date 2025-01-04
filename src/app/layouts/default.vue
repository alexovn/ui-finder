<script setup lang="ts">
import { TheHeader, TheFooter } from '@/widgets';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="grow">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>