<template>
  <div class="py-4 px-[1.625rem] flex flex-col min-h-56 border border-neutral-200 transition-colors hover:bg-neutral-200/25 dark:border-neutral-800 rounded-md dark:hover:bg-neutral-700/40">
    <div class="flex flex-col grow gap-3 animate-pulse">
      <div class="flex items-start justify-between gap-16 flex-1">
        <div class="group flex flex-col gap-2 shrink-0">
          <div class="size-20 flex items-center justify-center bg-neutral-300/25 dark:bg-neutral-700/35 rounded-md">
            <div class="size-14 flex items-center justify-center">
              <UIcon
                name="i-bxs:component"
                class="size-full text-neutral-300 dark:text-neutral-700"
              />
            </div>
          </div>

          <div class="w-32 h-6 rounded-md bg-neutral-300/25 dark:bg-neutral-700/35" />
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div class="w-24 h-8 rounded-md bg-neutral-300/25 dark:bg-neutral-700/35" />
        <div class="w-24 h-8 rounded-md bg-neutral-300/25 dark:bg-neutral-700/35" />
      </div>
    </div>
  </div>
</template>
