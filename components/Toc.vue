<script setup>
import { useIntersectionObserver } from "@vueuse/core";

const props = defineProps({
  links: { type: Array, default: () => [] },
});

const flattenLinks = (links) =>
  links
    .map((link) => {
      const flat = [link];
      if (link.children?.length) flat.push(...flattenLinks(link.children));
      return flat;
    })
    .flat();

const flatLinks = computed(() => flattenLinks(props.links ?? []));
const activeId = ref("");

let observers = [];

function setupObservers() {
  observers.forEach((s) => s.stop?.());
  observers = [];
  flatLinks.value.forEach((link) => {
    const el = document.getElementById(link.id);
    if (!el) return;
    const { stop } = useIntersectionObserver(
      el,
      ([entry]) => {
        if (entry?.isIntersecting) activeId.value = link.id;
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );
    observers.push({ stop });
  });
}

onMounted(() => {
  nextTick(setupObservers);
});

watch(flatLinks, () => nextTick(setupObservers), { deep: true });

onBeforeUnmount(() => observers.forEach((s) => s.stop?.()));

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}
</script>

<template>
  <nav class="toc" aria-label="Table of contents">
    <p class="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
      On this page
    </p>
    <ul class="space-y-1 text-sm border-l border-neutral-200 dark:border-neutral-800">
      <li
        v-for="link in flatLinks"
        :key="link.id"
        :class="`toc-deep-${link.depth}`"
      >
        <a
          :href="`#${link.id}`"
          class="block py-1 pl-3 -ml-px border-l-2 transition-colors"
          :class="
            activeId === link.id
              ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-medium'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          "
          :style="{ paddingLeft: `${(link.depth - 1) * 12 + 12}px` }"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
