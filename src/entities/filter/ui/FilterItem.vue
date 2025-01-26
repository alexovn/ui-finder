<script setup lang="ts">
defineProps<{
  item: {
    label: string
    value: string
    icon: string | null
    _count: {
      libraries: number
    }
  }
}>()

const model = defineModel<string[]>({ default: () => [] })
</script>

<template>
  <label class="block w-full px-2.5 py-1.5 rounded-md cursor-pointer transition-colors text-base hover:bg-neutral-200/75 has-[:checked]:hover:bg-neutral-300 dark:hover:bg-neutral-700/40 dark:has-[:checked]:hover:bg-neutral-700/75 has-[:checked]:bg-neutral-200 has-[:checked]:text-dark dark:has-[:checked]:bg-neutral-700 dark:has-[:checked]:text-white has-[:focus]:ring-2 has-[:focus]:ring-inset has-[:focus]:ring-primary-500 dark:has-[:focus]:ring-primary-400">
    <input
      v-model="model"
      :value="item.value"
      type="checkbox"
      class="sr-only"
    >
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <UIcon
          v-if="item.icon"
          class="size-6"
          :name="item.icon"
        />

        <div>
          {{ item.label }}
        </div>
      </div>

      <span class="px-2.5 py-0.5 min-w-8 text-center rounded-full font-medium bg-neutral-100 dark:bg-neutral-700/40 border border-neutral-300 dark:border-neutral-500 text-neutral-600 dark:text-neutral-400 text-xs md:inline">
        {{ item._count?.libraries || 0 }}
      </span>
    </div>
  </label>
</template>
