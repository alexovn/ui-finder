<script setup lang="ts">
import type { Library } from '@/entities/library'

defineProps<{
  library?: Library
}>()
</script>

<template>
  <div class="p-4 flex flex-col gap-3 min-h-56 border border-neutral-200 transition-colors hover:bg-neutral-200/25 dark:border-neutral-800 rounded-md dark:hover:bg-neutral-700/40">
    <div class="px-2.5 flex items-start justify-between gap-16 flex-1">
      <NuxtLink
        class="group flex flex-col gap-1 shrink-0"
        :to="library?.link"
        external
      >
        <div class="size-14 flex items-center justify-center">
          <img
            :src="library?.img"
            :alt="library?.name"
            class="object-cover drop-shadow-lg"
          >
        </div>
        <div class="flex gap-1.5">
          <div>
            {{ library?.name }}
          </div>
          <UIcon
            class="size-3.5 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
            name="i-lucide:arrow-up-right"
          />
        </div>
      </NuxtLink>

      <div class="flex items-end content-start flex-wrap gap-1">
        <UBadge
          v-for="item in library?.badges"
          :key="item.value"
          :label="item.label"
          :icon="item.icon"
          variant="outline"
          :ui="{
            rounded: 'rounded-full',
          }"
        />
      </div>
    </div>

    <div class="flex items-center gap-1">
      <UButton
        variant="ghost"
        color="white"
        leading-icon="i-octicon:star-24"
        :label="`${library?.github.starCount} stars`"
        class="group"
        :to="library?.github.link"
        external
      >
        <template #trailing>
          <UIcon
            class="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
            name="i-lucide:arrow-up-right"
          />
        </template>
      </UButton>

      <UButton
        variant="ghost"
        color="white"
        leading-icon="i-lucide:download"
        :label="`${library?.npm.downloadCount} downloads`"
        class="group"
        :to="library?.npm.link"
        external
      >
        <template #trailing>
          <UIcon
            class="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
            name="i-lucide:arrow-up-right"
          />
        </template>
      </UButton>
    </div>
  </div>
</template>
