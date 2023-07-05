<script setup>

const props = defineProps(['links'])

const flattenLinks = (links) => {
  return links.map((link) => {
    let _link = [link]
    if (link.children) {
      let flattened = flattenLinks(link.children);
      _link = [link, ...flattened]
    }
    return _link
  }).flat(1)
}
</script>

<template>
  <div class="h-auto p-4 toc">
    <p class="text-base lg:text-2xl font-medium mb-2">Sommaire</p>
    <template v-for="(link, index) of flattenLinks(props.links)" :key="index">
      <li :class="`toc-deep-${link.depth}`">
        <NuxtLink :to="'#' + link.id" class="flex" exact-active-class="text-red">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 items-center mr-1">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path fill="currentColor" d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
          </svg>
        </span>
          {{ link.text }}
        </NuxtLink>
      </li>
    </template>
  </div>
</template>
