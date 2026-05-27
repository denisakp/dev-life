<script setup>
const query = ref("");
const posts = ref([]);
const modalState = ref(false);
const mobileNavOpen = ref(false);

const searchModal = () => (modalState.value = !modalState.value);

const { current: themeCurrent, toggle: toggleColorMode } = useThemeTransition();

watch(query, async (newValue) => {
  if (!newValue || newValue.length < 4) {
    posts.value = [];
    return;
  }
  posts.value = await $fetch("/api/search", { query: { q: newValue } });
});

const navLinks = [
  { to: "/blog", label: "Blog", icon: "i-lucide-book-open" },
  { to: "/topics", label: "Topics", icon: "i-lucide-tag" },
  { to: "/projects", label: "Projects", icon: "i-lucide-folder-git-2" },
  { to: "/talks", label: "Talks", icon: "i-lucide-presentation" },
  { to: "/teaching", label: "Teaching", icon: "i-lucide-graduation-cap" },
  { to: "/about", label: "About", icon: "i-lucide-user" },
];
</script>

<template>
  <nav
    class="fixed flex w-full bg-white dark:bg-neutral-950 justify-between flex-wrap top-0 mx-auto py-2 md:py-3 h-auto border-b border-neutral-200 dark:border-neutral-800 z-10"
  >
    <div class="container flex items-center justify-between text-neutral-800 dark:text-neutral-200">
      <nuxt-link to="/">
        <div class="text-sm md:text-base text-primary-600 dark:text-primary-400 font-bold">
          &lt; Denis AKPAGNONITE /&gt;
        </div>
      </nuxt-link>

      <div class="hidden md:flex flex-1 w-full mx-auto justify-center">
        <ul class="flex justify-center items-center space-x-6">
          <li v-for="link in navLinks" :key="link.to">
            <nuxt-link
              :to="link.to"
              active-class="exact-navigation"
              class="flex px-4 items-center py-2 font-medium slick-hover-blue cursor-pointer rounded-sm"
            >
              <UIcon :name="link.icon" class="mr-2 size-5" />
              <span class="text-sm">{{ link.label }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <div class="flex justify-center items-center space-x-2 md:space-x-3">
        <ClientOnly>
          <UButton
            color="neutral"
            variant="ghost"
            :aria-label="`Switch to ${themeCurrent === 'dark' ? 'light' : 'dark'} mode`"
            class="focus-visible:ring-2 focus-visible:ring-primary-500"
            @click="toggleColorMode"
          >
            <Transition name="theme-toggle" mode="out-in">
              <UIcon
                :key="themeCurrent"
                :name="themeCurrent === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
                class="size-5"
              />
            </Transition>
          </UButton>
          <template #fallback>
            <div class="size-8" />
          </template>
        </ClientOnly>

        <button
          type="button"
          class="hidden md:flex items-center p-2 cursor-pointer slick-hover rounded-full slick-border"
          @click="searchModal"
        >
          <span class="flex space-x-2 items-center px-2">
            <span class="text-sm font-medium">Search posts</span>
            <UIcon name="i-lucide-search" class="size-5" />
          </span>
        </button>

        <UButton
          class="md:hidden"
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          aria-label="Open menu"
          @click="mobileNavOpen = true"
        />
      </div>
    </div>

    <USlideover v-model:open="mobileNavOpen" side="right" :ui="{ content: 'max-w-xs' }">
      <template #content>
        <div class="p-6 space-y-6">
          <div class="flex items-center justify-between">
            <span class="font-bold text-primary-600 dark:text-primary-400">Menu</span>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              aria-label="Close menu"
              @click="mobileNavOpen = false"
            />
          </div>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.to">
              <nuxt-link
                :to="link.to"
                active-class="exact-navigation"
                class="flex items-center gap-3 px-3 py-2 rounded-sm slick-hover-blue"
                @click="mobileNavOpen = false"
              >
                <UIcon :name="link.icon" class="size-5" />
                <span>{{ link.label }}</span>
              </nuxt-link>
            </li>
          </ul>
          <UButton
            block
            color="neutral"
            variant="outline"
            icon="i-lucide-search"
            @click="
              mobileNavOpen = false;
              searchModal();
            "
          >
            Search posts
          </UButton>
        </div>
      </template>
    </USlideover>

    <UModal v-model:open="modalState" :ui="{ content: 'max-w-2xl' }">
      <template #content>
        <div class="p-6 md:p-8">
          <div class="mb-8 flex items-center justify-between">
            <h3 class="font-bold text-2xl">Searching</h3>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              aria-label="Close"
              @click="searchModal"
            />
          </div>
          <UInput
            id="modal_search_input"
            v-model.trim="query"
            type="search"
            autocomplete="off"
            placeholder="Start typing your query here"
            icon="i-lucide-search"
            size="lg"
            class="w-full"
            autofocus
          />
          <p class="mt-2 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
            Search results
          </p>
          <section class="space-y-4 mt-8">
            <Post v-for="(post, index) in posts" :key="index" :post="post" />
          </section>
        </div>
      </template>
    </UModal>
  </nav>
</template>
