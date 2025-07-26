<script setup lang="ts">
import type { Library } from '../model/interfaces/library.interface'
import { mapFilters } from '@/entities/filter'
import formatCount from '@/shared/lib/utils/formatCount'

interface Filter {
  id: number
  name: string
  value: string
  icon: string | null
}

const props = defineProps<{
  library: Library | null
}>()

const githubStarsCount = computed(() => {
  if (!props.library?.githubStars)
    return null

  return formatCount(props.library?.githubStars)
})

const npmDownloadsCount = computed(() => {
  if (!props.library?.npmDownloads)
    return null

  return formatCount(props.library?.npmDownloads)
})

const {
  mapCategories,
  mapFrameworks,
  mapFeatures,
} = mapFilters()

const badges = computed(() => {
  let frameworks: Filter[] = []
  let features: Filter[] = []
  let categories: Filter[] = []

  if (props.library?.frameworks) {
    frameworks = mapFrameworks(props.library.frameworks)
  }

  if (props.library?.features) {
    features = mapFeatures(props.library.features)
  }

  if (props.library?.category) {
    categories = mapCategories([props.library.category])
  }

  return [
    ...categories,
    ...frameworks,
    ...features,
  ]
})
</script>

<template>
  <div class="p-2.5 flex flex-col gap-3 min-h-56 border border-neutral-200 transition-colors hover:bg-neutral-200/25 dark:border-neutral-800 rounded-md dark:hover:bg-neutral-700/40 md:p-4">
    <div class="px-2.5 flex items-start justify-between gap-2 flex-1 md:gap-8">
      <NuxtLink
        v-if="library?.link"
        class="group flex flex-col gap-2 min-w-[120px]"
        :to="library.link"
        target="_blank"
        external
      >
        <div class="size-20 flex items-center justify-center bg-neutral-300/25 dark:bg-neutral-700/35 rounded-md">
          <div class="size-14 flex items-center justify-center">
            <img
              v-if="library?.img"
              :src="library.img"
              :alt="library?.name"
              class="object-cover drop-shadow-lg"
            >
            <UIcon
              v-else
              name="i-bxs:component"
              class="size-full text-neutral-300 dark:text-neutral-700"
            />
          </div>
        </div>

        <div class="flex gap-1.5 text-sm md:text-base">
          <div>
            {{ library?.name }}
          </div>
          <UIcon
            class="size-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
            name="i-lucide:arrow-up-right"
          />
        </div>
      </NuxtLink>

      <div class="flex justify-end items-end content-start flex-wrap gap-1">
        <UBadge
          v-for="item in badges"
          :key="item.value"
          :label="item.name"
          :icon="item.icon || undefined"
          variant="outline"
          :ui="{
            base: 'rounded-full',
          }"
        />
      </div>
    </div>

    <div
      v-if="githubStarsCount || npmDownloadsCount"
      class="flex items-center gap-1"
    >
      <UButton
        v-if="githubStarsCount"
        variant="ghost"
        color="neutral"
        leading-icon="i-octicon:star-24"
        :label="`${githubStarsCount}`"
        class="group"
        :to="library?.githubRepo"
        target="_blank"
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
        v-if="npmDownloadsCount"
        variant="ghost"
        color="neutral"
        leading-icon="i-lucide:download"
        :label="`${npmDownloadsCount}`"
        class="group"
        :to="library?.npmPackage"
        target="_blank"
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
