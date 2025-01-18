<script setup lang="ts">
defineProps<{
  item: {
    label: string
    value: string
    icon: string | null
  }
}>()

const model = defineModel({
  type: Array,
  default: () => [],
})
</script>

<template>
  <label class="block w-full px-2.5 py-1.5 rounded-md cursor-pointer transition-colors text-base hover:bg-neutral-200/75 has-[:checked]:hover:bg-neutral-300 dark:hover:bg-neutral-700/40 dark:has-[:checked]:hover:bg-neutral-700/75 has-[:checked]:bg-neutral-200 has-[:checked]:text-dark dark:has-[:checked]:bg-neutral-700 dark:has-[:checked]:text-white has-[:focus]:ring-2 has-[:focus]:ring-inset has-[:focus]:ring-primary-500 dark:has-[:focus]:ring-primary-400">
    <input
      v-model="model"
      :value="item.value"
      type="checkbox"
      class="sr-only"
    >
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
  </label>
</template>
