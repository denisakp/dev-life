<script setup>
import {useRoute} from "nuxt/app";
import PrevNext from "~/components/PrevNext";
import Toc from "~/components/Toc.vue";

const {path} = useRoute();
const reviewedPath = path.replace("/blog", '');

const article = await queryContent().where({_path: reviewedPath}).findOne();
const surround = await queryContent('/').only(['_path', 'title', 'slug', 'topics', 'img']).sort({date: 1}).findSurround(reviewedPath);
const [prev, next] = surround;

useSeoMeta({
  title: article.title,
  description: article.description,

  ogTitle: article.title + ' - Dev Life',
  ogDescription: article.description,
  ogImage: article.img,
  ogUrl: 'https://denisakp.me' + path,

  twitterCard: 'summary_large_image',
  twitterTitle: article.title + ' - Dev Life',
  twitterDescription: article.description,
  twitterImage: article.img,
})

</script>

<template>
  <div>
    <div class="page-bg">
      <div class="container">
        <div class="w-full">
          <div class="img-cont h-72 mb-12">
            <nuxt-img :src="article.img" :alt="article.title" class=" rounded-2xl"/>
          </div>
          <h3 class="my-2 dark-text">{{ article.title }}</h3>
          <p class="mt-2 mb-4 md:mb-8 dark-text">{{ article.description }}</p>
        </div>

        <!-- Toc Component -->
        <Toc :links="article.body.toc.links"/>

        <div class="w-full">
          <content-renderer :value="article" class="nuxt-content">

            <template #empty>
              <p>No content found.</p>
            </template>
          </content-renderer>
        </div>

        <!-- PrevNext Component -->
        <PrevNext :prev="prev" :next="next"/>
        <br/>
        <br/>

        <div class="w-full giscus"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-cont img {
  @apply h-full w-full object-cover;
}
</style>
