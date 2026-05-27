<script setup>
const props = defineProps(["links"]);

const flattenLinks = (links) => {
  return links
    .map((link) => {
      let _link = [link];
      if (link.children) {
        let flattened = flattenLinks(link.children);
        _link = [link, ...flattened];
      }
      return _link;
    })
    .flat(1);
};
</script>

<template>
  <div class="mt-2 mx-48 md:mt-8  p-2 toc">
    <p class="text-base lg:text-2xl font-medium mb-2">Summary</p>
    <template v-for="(link, index) of flattenLinks(props.links)" :key="index">
      <li :class="`toc-deep-${link.depth}`">
        <NuxtLink
          :to="'#' + link.id"
          class="flex"
          exact-active-class="text-error-600 dark:text-error-400"
        >
          <UIcon name="i-lucide-chevron-right" class="size-5 mr-1" />
          {{ link.text }}
        </NuxtLink>
      </li>
    </template>
  </div>
</template>
