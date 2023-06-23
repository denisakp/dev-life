<template>
  <footer
      class=" flex items-center justify-center p-4 bg-white rounded-lg shadow md:flex md:items-center md:p-6  dark:bg-dark-high border-b border-dark-low dark:border-dark">
    <span class="text-sm text-gray-500 items-center sm:text-center dark:text-gray-400">
      © {{ new Date().getUTCFullYear() }} - <NuxtLink to="/" class="hover-underline"> Denis AKPAGNONITE 😎  </NuxtLink>
    </span>
  </footer>
</template>
