<script setup>
import { ref } from "vue";
import SharedSearchModal from "~/components/shared/SearchModal.vue";
import LocaleToggle from "~/components/shared/LocaleToggle.vue";

const { t } = useI18n();
const mobileNavOpen = ref(false);

const STUDIO_URL = "https://yaovi-studio.mychariow.co";
const searchModalRef = ref(null);

const { current: themeCurrent, toggle: toggleColorMode } = useThemeTransition();

const navLinks = computed(() => [
  { to: "/blog", label: t("header.blog"), icon: "i-lucide-book-open" },
  { to: "/topics", label: t("header.topics"), icon: "i-lucide-tag" },
  { to: "/projects", label: t("header.projects"), icon: "i-lucide-folder-git-2" },
  { to: "/talks", label: t("header.talks"), icon: "i-lucide-presentation" },
  { to: "/teaching", label: t("header.teaching"), icon: "i-lucide-graduation-cap" },
  { to: "/about", label: t("header.about"), icon: "i-lucide-user" },
]);

function openSearch() {
  searchModalRef.value?.openModal();
}
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
        <UButton
          :to="STUDIO_URL"
          target="_blank"
          rel="noopener"
          external
          color="primary"
          variant="solid"
          icon="i-lucide-store"
          size="sm"
          class="hidden md:inline-flex font-semibold"
          :aria-label="t('header.studioAria')"
        >
          {{ t('header.studio') }}
        </UButton>

        <LocaleToggle />

        <ClientOnly>
          <UButton
            color="neutral"
            variant="ghost"
            :aria-label="t('header.toggleTheme')"
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
          :aria-label="t('header.search')"
          aria-keyshortcuts="Meta+K Control+K /"
          @click="openSearch"
        >
          <span class="flex space-x-2 items-center px-2">
            <span class="text-sm font-medium">{{ t('header.search') }}</span>
            <UIcon name="i-lucide-search" class="size-5" />
            <kbd class="hidden lg:inline-flex items-center px-1.5 py-0.5 text-xs rounded border border-neutral-300 dark:border-neutral-700 text-neutral-500">⌘K</kbd>
          </span>
        </button>

        <UButton
          class="md:hidden"
          icon="i-lucide-search"
          color="neutral"
          variant="ghost"
          :aria-label="t('header.search')"
          @click="openSearch"
        />

        <UButton
          class="md:hidden"
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          :aria-label="t('header.openMenu')"
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
              :aria-label="t('header.closeMenu')"
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
            :to="STUDIO_URL"
            target="_blank"
            rel="noopener"
            external
            block
            color="primary"
            variant="solid"
            icon="i-lucide-store"
            class="font-semibold"
            :aria-label="t('header.studioAria')"
            @click="mobileNavOpen = false"
          >
            {{ t('header.studio') }}
          </UButton>
          <UButton
            block
            color="neutral"
            variant="outline"
            icon="i-lucide-search"
            @click="
              mobileNavOpen = false;
              openSearch();
            "
          >
            {{ t('header.search') }}
          </UButton>
        </div>
      </template>
    </USlideover>

    <SharedSearchModal ref="searchModalRef" />
  </nav>
</template>
