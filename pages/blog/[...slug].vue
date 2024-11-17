<script setup>
import { useRoute } from "nuxt/app";

import Giscus from '@giscus/vue'
import 'giscus';

import PrevNext from "~/components/PrevNext";

const { path } = useRoute();

const reviewedPath = path.replace("/blog", "");

const article = await queryContent().where({ _path: reviewedPath }).findOne();

const [prev, next] = await queryContent()
  .only(['_path', 'title'])
  .findSurround(reviewedPath);

useSeoMeta({
  title: article.title,
  description: article.description,
  keywords: article.tags.toString(),

  ogTitle: article.title + " - Denis AKPAGNONITE",
  ogDescription: article.description,
  ogImage: article.img,
  ogUrl: "https://denisakp.me" + path,

  twitterCard: "summary_large_image",
  twitterTitle: article.title + " - Denis AKPAGNONITE",
  twitterDescription: article.description,
  twitterImage: article.img
});

</script>

<template>
  <div class="reading-area w-full">
    <div class="">
      <h3 class="text-3xl text-blue font-bold mt-0 my-2">{{ article.title }}</h3>
    </div>

    <div class="max-w-none lg:prose-lg prose">
      <content-renderer :value="article">
        <template #empty>
          <p>No content found.</p>
        </template>
      </content-renderer>
    </div>

    <!-- Comments -->
    <Giscus
      id="comments"
      repo="denisakp/dev-life"
      repoid="R_kgDOJyrfLg"
      category="Comments"
      categoryid="DIC_kwDOJyrfLs4CkWjU"
      mapping="title"
      reactionsenabled="1"
      emitmetadata="0"
      inputposition="bottom"
      theme="light"
      lang="en"
      loading="lazy"
      crossorigin="anonymous"
      />

    <!-- PrevNext Component -->
    <PrevNext :prev="prev" :next="next" />

  </div>
</template>
