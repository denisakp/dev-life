<script setup>
import { useRoute } from "nuxt/app";
import PrevNext from "~/components/PrevNext";
import Toc from "~/components/Toc.vue";

const { path } = useRoute();

const reviewedPath = path.replace("/blog", "");

const article = await queryContent().where({ _path: reviewedPath }).findOne();

const [prev, next] = await queryContent()
  .only(["_path", "title"])
  .findSurround(reviewedPath);

useSeoMeta({
  title: article.title,
  description: article.description,
  ogTitle: article.title + " - Denis AKPAGNONITE",
  ogDescription: article.description,
  ogImage: article.img,
  ogUrl: "https://denisakp.me" + path,
  twitterCard: "summary_large_image",
  twitterTitle: article.title + " - Denis AKPAGNONITE",
  twitterDescription: article.description,
  twitterImage: article.img
});

useHead({
  script: [
    {
      src: "//dev-life-1.disqus.com/count.js",
      async: true,
      id: "dsq-count-scr",
      body: true
    },
    {
      children: `
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://dev-life-1.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
      `
    }
  ]
});
</script>

<template>
  <div class="page-bg">
    <div class="container">
      <div class="w-full">
        <div class="img-cont mb-12">
          <nuxt-img
            :src="article.img"
            :alt="article.title"
          />
        </div>
        <h3 class="text-5xl my-2 dark-text">{{ article.title }}</h3>
        <p class="pt-4 mt-2 mb-4 md:mb-8 dark-text">
          {{ article.description }}
        </p>
      </div>

      <!-- Toc Component -->
      <Toc :links="article.body.toc.links" />

      <div class="w-full">
        <content-renderer :value="article">
          <template #empty>
            <p>No content found.</p>
          </template>
        </content-renderer>
      </div>

      <!-- PrevNext Component -->
      <PrevNext :prev="prev" :next="next" />
      <br />
      <br />

      <div id="disqus_thread" class="w-full"></div>
    </div>
  </div>
</template>

<style scoped>
.img-cont img {
  @apply h-72 w-full object-cover;
}
</style>
