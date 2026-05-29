<script setup lang="ts">
const { locale, locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const otherLocale = computed<"en" | "fr">(() =>
  locale.value === "fr" ? "en" : "fr"
);

const targetPath = computed(() => {
  const path = switchLocalePath(otherLocale.value);
  if (path) return path;
  return otherLocale.value === "fr" ? "/fr/" : "/";
});

const label = computed(() =>
  otherLocale.value === "fr" ? "FR" : "EN"
);
</script>

<template>
  <NuxtLink
    :to="targetPath"
    :aria-label="t('site.switchLanguage')"
    class="px-2 py-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
  >
    {{ label }}
  </NuxtLink>
</template>
