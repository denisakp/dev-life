<script setup>
import Header from "~/components/shared/Header.vue";
import Bottom from "~/components/shared/Bottom.vue";
import Footer from "~/components/shared/Footer.vue";

import '@/assets/styles/main.css';
import '@/assets/styles/typography.css';
import  '@/assets/styles/content.scss';
</script>

<template>
  <div class="w-full bg-white dark:bg-dark-high text-dark-high dark:text-white" :class="$colorMode.preference === 'dark' ? 'dark' : ''">
    <Header />
    <div class="pt-20 md:pt-24 min-h-screen">
      <NuxtPage />
    </div>
    <Bottom />
    <Footer />
  </div>
</template>


