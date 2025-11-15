<script setup lang="ts">
import type { Library, LibraryFilter } from '../model/interfaces/library.interface'
import type { FilterType } from '@/entities/filter'
import { mapFilters, useFiltersStore } from '@/entities/filter'
import formatCount from '@/shared/lib/utils/formatCount'
import LibraryItemInfo from './LibraryItemInfo.vue'

const props = defineProps<{
  library: Library | null | undefined
}>()

const emit = defineEmits<{
  onUpdateFilter: []
}>()

const filtersStore = useFiltersStore()

const isLibraryItemInfoOpened = ref(false)
function openLibraryItemInfo() {
  isLibraryItemInfoOpened.value = true
}
function closeLibraryItemInfo() {
  isLibraryItemInfoOpened.value = false
}

const starsCount = computed(() => {
  if (!props.library?.starsCount)
    return null

  return formatCount(props.library?.starsCount)
})

const downloadsCount = computed(() => {
  if (!props.library?.downloadsCount)
    return null

  return formatCount(props.library?.downloadsCount)
})

const {
  mapCategories,
  mapFrameworks,
  mapFeatures,
} = mapFilters()

const tagList = computed(() => {
  let frameworks: LibraryFilter[] = []
  let features: LibraryFilter[] = []
  let categories: LibraryFilter[] = []

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

function handleUpdateFilter(filterType: FilterType, filters: string | string[]) {
  emit('onUpdateFilter')
  filtersStore.updateFilter(filterType, filters)
}
</script>

<template>
  <div class="p-2.5 flex flex-col gap-3 min-h-56 will-change-auto border border-neutral-200 transition-colors hover:bg-neutral-200/25 dark:border-neutral-800 rounded-md dark:hover:bg-neutral-700/20 md:p-4">
    <div class="px-2.5 flex items-start justify-between gap-2 flex-1 md:gap-8">
      <NuxtLink
        v-if="library?.url"
        class="group flex flex-col gap-2 min-w-[120px]"
        :to="library.url"
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
        <label
          v-for="tag in tagList"
          :key="tag.value"
          class="cursor-pointer"
        >
          <input
            v-model="filtersStore.state[tag.type]"
            :value="tag.value"
            type="checkbox"
            class="sr-only peer"
            @update:model-value="handleUpdateFilter(tag.type, $event)"
          >
          <UBadge
            :label="tag.name"
            :icon="tag.icon || undefined"
            variant="outline"
            :ui="{
              base: 'rounded-full hover:bg-neutral-200/75 peer-checked:hover:bg-neutral-300 dark:hover:bg-neutral-700/40 dark:peer-checked:hover:bg-neutral-700/75 peer-checked:bg-neutral-200 peer-checked:text-dark dark:peer-checked:bg-neutral-700 dark:peer-checked:text-white peer-focus:bg-neutral-300 dark:peer-focus:bg-neutral-700/40',
            }"
          />
        </label>
      </div>
    </div>

    <div class="flex items-center justify-between gap-8">
      <div
        v-if="starsCount || downloadsCount"
        class="flex items-center gap-1"
      >
        <UButton
          v-if="starsCount"
          variant="ghost"
          color="neutral"
          leading-icon="i-octicon:star-24"
          :label="`${starsCount}`"
          class="group"
          :to="library?.githubUrl"
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
          v-if="downloadsCount"
          variant="ghost"
          color="neutral"
          leading-icon="i-lucide:download"
          :label="`${downloadsCount}`"
          class="group"
          :to="library?.npmUrl"
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

      <div class="flex flex-1 justify-end">
        <UButton
          variant="ghost"
          color="neutral"
          leading-icon="i-lucide:circle-plus"
          @click="openLibraryItemInfo"
        />

        <LibraryItemInfo
          v-model:open="isLibraryItemInfoOpened"
          :library
          :tag-list
          @close="closeLibraryItemInfo"
        />
      </div>
    </div>
  </div>
</template>
