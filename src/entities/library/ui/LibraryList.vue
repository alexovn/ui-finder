<script setup lang="ts">
import type { Library } from '@/entities/library'
import { LibraryItem } from '@/entities/library'

defineProps<{
  libraries: Library[]
}>()
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    <LibraryItem
      v-for="library in libraries"
      :key="library.name"
      :library
    />
  </div>
</template>
