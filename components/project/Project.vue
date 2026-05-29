<script setup>
defineProps(["project"]);
</script>

<template>
  <UCard :ui="{ root: 'h-full', body: 'p-6 flex flex-col h-full' }">
    <div class="grow">
      <p class="text-neutral-900 dark:text-neutral-100 text-base sm:text-lg font-medium mb-2">
        {{ project.title }}
      </p>
      <p class="text-neutral-700 dark:text-neutral-300 opacity-80 text-sm sm:text-base">
        {{ project.description || "" }}
      </p>

      <div class="flex grow flex-wrap gap-2 mt-3">
        <UBadge
          v-for="(tag, _index) in project.tags"
          :key="_index"
          color="neutral"
          variant="subtle"
          size="sm"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>

    <div class="flex gap-2 mt-6">
      <UButton
        v-if="project.github"
        :to="project.github"
        target="_blank"
        rel="noopener"
        color="neutral"
        variant="outline"
        icon="i-simple-icons-github"
        :ui="{ base: 'rounded-full active:scale-[0.98] transition-transform' }"
      >
        Github
      </UButton>
      <UButton
        v-if="project.preview"
        :to="project.preview"
        target="_blank"
        rel="noopener"
        color="success"
        variant="solid"
        icon="i-lucide-external-link"
        :ui="{ base: 'rounded-full active:scale-[0.98] transition-transform' }"
      >
        Preview
      </UButton>
    </div>
  </UCard>
</template>
