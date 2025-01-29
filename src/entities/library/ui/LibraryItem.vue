<script setup lang="ts">
import type { Library } from '@/entities/library'
import { mapFilters } from '@/entities/filter'
import { apiLibrary } from '@/entities/library'
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

const { getLibraryGithubData, getLibraryNpmData } = apiLibrary()

const libraryGithubData = ref<any>(null)
const repoName = computed(() => {
  if (!props.library?.githubLink)
    return ''

  return props.library.githubLink.replace(/^(https:\/\/github.com\/)/g, '')
})
const githubStarsCount = computed(() => {
  if (!libraryGithubData.value)
    return null

  return formatCount(libraryGithubData.value.stargazers_count)
})
async function handleGetLibraryGithubData() {
  if (!repoName.value)
    return null

  const res = await getLibraryGithubData(repoName.value)

  if ('error' in res)
    return null

  libraryGithubData.value = res

  return res
}

const libraryNpmData = ref<any>(null)
const packageName = computed(() => {
  if (!props.library?.npmLink)
    return ''

  return props.library.npmLink.replace(/^(https:\/\/www.npmjs.com\/package\/)/g, '')
})
const npmDownloadsCount = computed(() => {
  if (!libraryNpmData.value)
    return null

  return formatCount(libraryNpmData.value.downloads)
})
async function handleGetLibraryNpmData() {
  if (!packageName.value)
    return null

  const res = await getLibraryNpmData(packageName.value)

  if ('error' in res)
    return null

  libraryNpmData.value = res

  return res
}

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

onMounted(async () => {
  Promise.allSettled([
    await handleGetLibraryGithubData(),
    await handleGetLibraryNpmData(),
  ])
})
</script>

<template>
  <div class="p-4 flex flex-col gap-3 min-h-56 border border-neutral-200 transition-colors hover:bg-neutral-200/25 dark:border-neutral-800 rounded-md dark:hover:bg-neutral-700/40">
    <div class="px-2.5 flex items-start justify-between gap-16 flex-1">
      <NuxtLink
        v-if="library?.link"
        class="group flex flex-col gap-2"
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

        <div class="flex gap-1.5">
          <div>
            {{ library?.name }}
          </div>
          <UIcon
            class="size-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
            name="i-lucide:arrow-up-right"
          />
        </div>
      </NuxtLink>

      <div class="flex items-end content-start flex-wrap gap-1">
        <UBadge
          v-for="item in badges"
          :key="item.value"
          :label="item.name"
          :icon="item.icon || undefined"
          variant="outline"
          :ui="{
            rounded: 'rounded-full',
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
        color="white"
        leading-icon="i-octicon:star-24"
        :label="`${githubStarsCount}`"
        class="group"
        :to="library?.githubLink"
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
        color="white"
        leading-icon="i-lucide:download"
        :label="`${npmDownloadsCount}`"
        class="group"
        :to="library?.npmLink"
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
