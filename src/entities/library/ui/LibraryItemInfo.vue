<script setup lang="ts">
import type { Library, LibraryFilter } from '../model/interfaces/library.interface'
import { mapFilters } from '@/entities/filter'
import formatCount from '@/shared/lib/utils/formatCount'

const props = defineProps<{
  library: Library | null | undefined
  tags: LibraryFilter[]
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
            :to="library?.link"
            target="_blank"
          >
            <div class="flex gap-2">
              <div class="flex items-center gap-3">
                <div class="max-w-40 text-xl truncate">
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
          <div class="flex flex-col gap-2">
            <h4>
              Description
            </h4>

            <div class="flex flex-col gap-3">
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae mollitia cupiditate atque autem, ratione reprehenderit, quisquam officiis omnis accusantium quis iusto placeat nemo illo consectetur, quia adipisci consequatur quae ut!
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
                :key="item$.id"
                :label="item$.name"
                :icon="item$.icon || undefined"
                variant="outline"
                :ui="{
                  base: 'rounded-full',
                }"
              />
            </div>
          </div>

          <!-- <div class="flex flex-col gap-2">
            <h4>
              Category
            </h4>

            <div class="flex items-center flex-wrap gap-1">
              <UBadge
                :label="tagObj.category?.name"
                :icon="tagObj.category?.icon || undefined"
                variant="outline"
                :ui="{
                  base: 'rounded-full',
                }"
              />
            </div>
          </div> -->

          <!-- <div class="flex flex-col gap-2">
            <h4>
              Frameworks
            </h4>

            <div class="flex items-center flex-wrap gap-1">
              <UBadge
                v-for="item in tagObj.frameworks"
                :key="item.id"
                :label="item.name"
                :icon="item.icon || undefined"
                variant="outline"
                :ui="{
                  base: 'rounded-full',
                }"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <h4>
              Features
            </h4>

            <div class="flex items-center flex-wrap gap-1">
              <UBadge
                v-for="tag in tagObj.features"
                :key="tag.id"
                :label="tag.name"
                :icon="tag.icon || undefined"
                variant="outline"
                :ui="{
                  base: 'rounded-full',
                }"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <h4>
              Components
            </h4>

            <div class="flex items-center flex-wrap gap-1">
              <UBadge
                v-for="tag in tagObj.components"
                :key="tag.id"
                :label="tag.name"
                :icon="tag.icon || undefined"
                variant="outline"
                :ui="{
                  base: 'rounded-full',
                }"
              />
            </div>
          </div> -->
        </div>
      </div>
    </template>
  </USlideover>
</template>
