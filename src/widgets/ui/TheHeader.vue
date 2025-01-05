<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

function toggleColorMode() {
  isDark.value = !isDark.value
}
</script>

<template>
  <header class="px-6 h-14 sticky top-0 flex justify-between items-center gap-5 border-b bg-white dark:bg-black">
    <NuxtLink
      class="flex items-center gap-2"
      to="/"
    >
      <div class="w-8 h-8 flex items-center justify-center shrink-0 rounded-lg bg-black dark:bg-white">
        <UIcon
          class="w-6 h-6 bg-white dark:bg-black"
          name="i-bxs:component"
        />
      </div>
      <div class="font-medium text-xl">
        UI Collection
      </div>
    </NuxtLink>

    <div class="flex items-center gap-2">
      <UButton
        to="https://github.com/alexovn"
        target="_blank"
        icon="i-mdi:github"
        variant="ghost"
        color="black"
      />

      <ClientOnly>
        <UButton
          class="w-8 h-8"
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          variant="ghost"
          aria-label="Theme switcher"
          color="black"
          @click="toggleColorMode"
        />
        <template #fallback>
          <div class="w-8 h-8" />
        </template>
      </ClientOnly>
    </div>
  </header>
</template>
