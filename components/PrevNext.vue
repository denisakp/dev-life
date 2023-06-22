<script setup>
defineProps(["prev", "next"])
</script>

<template>
  <div
      class="mt-6 md:mt-12 mx-4 flex flex-col md:flex-row  justify-end  space-y-4 md:space-x-4 md:space-y-0"
      :class="{
            'justify-between': prev!== null && next !== null,
            'justify-start': prev!== null && next === null
           }"
  >

    <NuxtLink v-if="prev" :to="`/blog${prev._path}`" class="slick-border slick-hover px-4 py-4 cursor-pointer text-sm">
      <div class="flex flex-row flex-nowrap items-center space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 dark-text">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path fill="currentColor" d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/>
        </svg>
        <div>
          <p class="dark-text text-xs">Précedent</p>
          <p class="darker-text">{{ prev.title }}</p>
        </div>
      </div>
    </NuxtLink>

    <NuxtLink v-if="next" :to="`/blog${next._path}`" class="slick-border slick-hover px-4 py-4 cursor-pointer text-sm">
      <div class="flex flex-row flex-nowrap items-center space-x-4">
        <div>
          <p class="dark-text text-xs">Prochain</p>
          <p class="darker-text">{{ next.title }}</p>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 dark-text">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path fill="currentColor" d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
        </svg>
      </div>
    </NuxtLink>

  </div>
</template>
