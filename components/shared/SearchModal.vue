<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { usePagefind, type SearchResult } from "~/composables/usePagefind";
import { formatDate } from "~/utils/format-date";

const open = ref(false);
const query = ref("");
const results = ref<SearchResult[]>([]);
const total = ref(0);
const offset = ref(0);
const loading = ref(false);
const focusedIndex = ref(-1);
const PAGE_SIZE = 10;

const { search, disabled } = usePagefind();

const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLUListElement | null>(null);

function reset() {
  query.value = "";
  results.value = [];
  total.value = 0;
  offset.value = 0;
  loading.value = false;
  focusedIndex.value = -1;
}

async function runSearch(append: boolean) {
  const q = query.value.trim();
  if (!q) {
    results.value = [];
    total.value = 0;
    offset.value = 0;
    return;
  }
  loading.value = true;
  try {
    const nextOffset = append ? results.value.length : 0;
    const res = await search(q, { limit: PAGE_SIZE, offset: nextOffset });
    if (append) {
      results.value = [...results.value, ...res.results];
    } else {
      results.value = res.results;
      focusedIndex.value = -1;
    }
    total.value = res.total;
    offset.value = nextOffset;
  } finally {
    loading.value = false;
  }
}

const debouncedSearch = useDebounceFn(() => runSearch(false), 150);

watch(query, () => {
  debouncedSearch();
});

const hasMore = computed(() => results.value.length < total.value);
const showEmptyResults = computed(
  () =>
    !loading.value &&
    query.value.trim().length > 0 &&
    results.value.length === 0 &&
    !disabled.value
);
const showIdle = computed(
  () =>
    !loading.value &&
    query.value.trim().length === 0 &&
    results.value.length === 0
);
const showDisabled = computed(
  () => disabled.value && query.value.trim().length > 0
);

function onModalUpdate(value: boolean) {
  open.value = value;
  if (!value) reset();
}

function isTypingTarget(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if ((el as HTMLElement).isContentEditable) return true;
  return false;
}

function onGlobalKeydown(event: KeyboardEvent) {
  if (open.value) return;
  if (isTypingTarget(document.activeElement)) return;
  const isCmdK =
    (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
  const isSlash = event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;
  if (isCmdK || isSlash) {
    event.preventDefault();
    open.value = true;
    nextTick(() => inputRef.value?.focus());
  }
}

function onResultsKeydown(event: KeyboardEvent) {
  if (results.value.length === 0) return;
  if (event.key === "ArrowDown") {
    event.preventDefault();
    focusedIndex.value = Math.min(focusedIndex.value + 1, results.value.length - 1);
    focusRow(focusedIndex.value);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    if (focusedIndex.value <= 0) {
      focusedIndex.value = -1;
      inputRef.value?.focus();
    } else {
      focusedIndex.value -= 1;
      focusRow(focusedIndex.value);
    }
  } else if (event.key === "Enter" && focusedIndex.value >= 0) {
    const link = listRef.value?.querySelectorAll<HTMLAnchorElement>("a")[
      focusedIndex.value
    ];
    link?.click();
  }
}

function focusRow(index: number) {
  const link = listRef.value?.querySelectorAll<HTMLAnchorElement>("a")[index];
  link?.focus();
}

function openModal() {
  open.value = true;
  nextTick(() => inputRef.value?.focus());
}

defineExpose({ openModal });

onMounted(() => {
  window.addEventListener("keydown", onGlobalKeydown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onGlobalKeydown);
});
</script>

<template>
  <UModal
    :open="open"
    :ui="{ content: 'max-w-2xl' }"
    title="Search posts"
    :description="`Search across blog post titles, descriptions, and body content.`"
    @update:open="onModalUpdate"
  >
    <slot />

    <template #content>
      <div
        class="p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Search posts"
        @keydown="onResultsKeydown"
      >
        <div class="mb-6 flex items-center justify-between">
          <h3 class="font-bold text-2xl">Search</h3>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            aria-label="Close"
            @click="onModalUpdate(false)"
          />
        </div>

        <UInput
          ref="inputRef"
          v-model.trim="query"
          type="search"
          autocomplete="off"
          placeholder="Type to search..."
          icon="i-lucide-search"
          size="lg"
          class="w-full"
          autofocus
          aria-label="Search blog posts"
        />

        <div v-if="showIdle" class="mt-8 text-sm text-neutral-500">
          Type to search across all blog posts.
          <span class="block mt-2">
            Shortcut:
            <kbd class="px-1.5 py-0.5 text-xs rounded border border-neutral-300 dark:border-neutral-700">⌘K</kbd>
            or
            <kbd class="px-1.5 py-0.5 text-xs rounded border border-neutral-300 dark:border-neutral-700">/</kbd>
          </span>
        </div>

        <div
          v-if="loading"
          role="status"
          aria-live="polite"
          class="mt-4 flex items-center gap-2 text-sm text-neutral-500"
        >
          <UIcon name="i-lucide-loader-2" class="size-4 animate-spin" />
          Searching…
        </div>

        <div v-if="showEmptyResults" class="mt-8 text-sm text-neutral-600 dark:text-neutral-400">
          No posts matched
          <span class="font-medium">"{{ query }}"</span>.
          <button
            type="button"
            class="ml-2 underline cursor-pointer text-primary-600 dark:text-primary-400"
            @click="reset"
          >
            Clear
          </button>
        </div>

        <div v-if="showDisabled" class="mt-8 text-sm text-neutral-600 dark:text-neutral-400">
          Search is only available in production builds. Run
          <code class="px-1 rounded bg-neutral-100 dark:bg-neutral-800">pnpm build &amp;&amp; pnpm preview</code>
          to try it locally.
        </div>

        <div v-if="results.length > 0" class="mt-6">
          <p class="text-xs text-neutral-500 mb-3">
            <template v-if="results.length < total">
              Showing {{ results.length }} of {{ total }}
            </template>
            <template v-else>
              {{ total }} result{{ total === 1 ? "" : "s" }}
            </template>
          </p>

          <ul ref="listRef" role="listbox" class="space-y-4">
            <li v-for="(r, i) in results" :key="r.id" role="option" :aria-selected="focusedIndex === i">
              <NuxtLink
                :to="r.url"
                class="block p-3 -mx-3 rounded slick-hover focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                @click="onModalUpdate(false)"
              >
                <h4 class="text-base font-semibold text-primary-600 dark:text-primary-400">
                  {{ r.meta.title }}
                </h4>
                <p v-if="r.meta.date" class="text-xs text-neutral-500 mt-0.5">
                  {{ formatDate(r.meta.date) }}
                </p>
                <p
                  class="text-sm text-neutral-700 dark:text-neutral-300 mt-1 search-excerpt"
                  v-html="r.excerpt"
                />
              </NuxtLink>
            </li>
          </ul>

          <div v-if="hasMore" class="mt-6 flex justify-center">
            <UButton
              variant="outline"
              color="neutral"
              :loading="loading"
              :disabled="loading"
              @click="runSearch(true)"
            >
              Show more
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<style scoped>
.search-excerpt :deep(mark) {
  background-color: rgb(254 240 138);
  color: rgb(23 23 23);
  padding: 0 2px;
  border-radius: 2px;
}
:root.dark .search-excerpt :deep(mark) {
  background-color: rgb(133 77 14);
  color: rgb(254 252 232);
}
</style>
