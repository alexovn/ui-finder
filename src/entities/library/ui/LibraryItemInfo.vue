<script setup lang="ts">
import type { Library, LibraryFilter } from '../model/interfaces/library.interface'
import { mapFilters } from '@/entities/filter'
import formatCount from '@/shared/lib/utils/formatCount'

type statusColor = 'warning' | 'error'

const props = defineProps<{
  library: Library | null | undefined
  tagList: LibraryFilter[]
}>()

const emit = defineEmits<{
  close: []
}>()

const openModel = defineModel('open', {
  required: true,
  default: false,
})

function closePanel() {
  emit('close')
}

const {
  mapCategories,
  mapFrameworks,
  mapFeatures,
  mapComponents,
} = mapFilters()

const tagObj = computed(() => {
  return {
    category: props.library?.category ? mapCategories([props.library.category]) : [],
    frameworks: props.library?.frameworks ? mapFrameworks(props.library.frameworks) : [],
    features: props.library?.features ? mapFeatures(props.library.features) : [],
    components: props.library?.components ? mapComponents(props.library.components) : [],
  }
})

const tagStructuredList = computed(() => {
  return [
    {
      label: 'Category',
      data: tagObj.value.category,
    },
    {
      label: 'Frameworks',
      data: tagObj.value.frameworks,
    },
    {
      label: 'Features',
      data: tagObj.value.features,
    },
    {
      label: 'Components',
      data: tagObj.value.components,
    },
  ]
})

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

const statusList = computed(() => {
  return [
    {
      label: 'Archived',
      value: props.library?.archived,
      color: 'warning' as statusColor,
    },
    {
      label: 'Disabled',
      value: props.library?.disabled,
      color: 'error' as statusColor,
    },
  ]
})

const filteredStatusList = computed(() => {
  return statusList.value.filter(status => status.value) || []
})

const transformedDescription = computed(() => {
  return props.library?.description ? props.library.description.replace(/(\.)$/g, '') : null
})
</script>

<template>
  <USlideover
    v-model:open="openModel"
    side="right"
    :ui="{
      overlay: 'bg-neutral-200/75 dark:bg-neutral-800/75',
      content: 'dark:bg-neutral-900',
    }"
  >
    <template #content>
      <div class="flex flex-col h-full">
        <div class="px-4 py-2 min-h-(--header-height) flex justify-between items-center sticky top-0 z-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
          <NuxtLink
            class="group"
            :to="library?.url"
            target="_blank"
          >
            <div class="flex gap-2">
              <div class="flex items-center gap-3">
                <div class="max-w-48 text-xl truncate">
                  {{ library?.name }}
                </div>

                <div class="size-8 flex items-center justify-center bg-neutral-300/25 dark:bg-neutral-700/35 rounded-md">
                  <div class="size-5 flex items-center justify-center">
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
              </div>

              <UIcon
                class="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
                name="i-lucide:arrow-up-right"
              />
            </div>
          </NuxtLink>

          <UButton
            variant="ghost"
            color="neutral"
            icon="i-heroicons-x-mark"
            aria-label="Close panel"
            @click="closePanel"
          />
        </div>

        <div class="p-4 pb-5 h-full flex flex-col gap-5 overflow-y-auto overflow-x-hidden">
          <div
            v-if="filteredStatusList.length"
            class="flex items-center gap-1"
          >
            <UBadge
              v-for="item in filteredStatusList"
              :key="item.label"
              :color="item.color"
              :label="item.label"
              variant="outline"
              :ui="{
                base: 'rounded-full',
              }"
            />
          </div>

          <div
            v-if="library?.description"
            class="flex flex-col gap-2"
          >
            <h4>
              Description
            </h4>

            <div class="text-sm">
              {{ transformedDescription }}
            </div>
          </div>

          <div
            v-if="starsCount || downloadsCount"
            class="flex items-center gap-1.5"
          >
            <UButton
              v-if="starsCount"
              variant="subtle"
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
              variant="subtle"
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

          <div
            v-for="item in tagStructuredList"
            :key="item.label"
            class="flex flex-col gap-2"
          >
            <h4>
              {{ item.label }}
            </h4>

            <div class="flex items-center flex-wrap gap-1">
              <UBadge
                v-for="item$ in item.data"
                :key="item$.value"
                :label="item$.name"
                :icon="item$.icon || undefined"
                variant="outline"
                :ui="{
                  base: 'rounded-full',
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </USlideover>
</template>
