<script setup lang="ts">
defineProps<{
  posts: Array<{
    path: string;
    title: string;
    description?: string;
    date?: string;
    tags?: string[];
  }>;
}>();
</script>

<template>
  <section v-if="posts.length" class="mt-12 mb-6">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 mb-4">
      Related posts
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Post v-for="post in posts" :key="post.path" :post="post" />
    </div>
  </section>
</template>
