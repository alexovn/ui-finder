<script setup lang="ts">
useSeoMeta({
  title: 'UI Finder | The One-Stop Solution for Finding UI Libraries',
  ogTitle: 'UI Finder | The One-Stop Solution for Finding UI Libraries',
  description: 'UI Finder is a powerful tool that helps developers quickly discover the best UI libraries for their framework. Save time by filtering, sorting, and finding up-to-date, high-quality UI solutions in seconds. No more endless web searches—just the right libraries at your fingertips!',
  ogDescription: 'UI Finder is a powerful tool that helps developers quickly discover the best UI libraries for their framework. Save time by filtering, sorting, and finding up-to-date, high-quality UI solutions in seconds. No more endless web searches—just the right libraries at your fingertips!',
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
