<script setup>
import { META_DESCRIPTION, META_IMAGE } from "~/utils/config";

const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);

const query = {
  limit: 4,
  sort: { date: -1 },
  only: ["title", "description", "tags", "_path", "date"]
};

useSeoMeta({
  title: "Welcome - Denis AKPAGNONITE",
  description: META_DESCRIPTION,

  ogTitle: "Welcome - Denis AKPAGNONITE",
  ogDescription: META_DESCRIPTION,
  ogImage: META_IMAGE,
  ogUrl: "https://denisakp.me",

  twitterCard: "summary_large_image",
  twitterTitle: "Welcome - Denis AKPAGNONITE",
  twitterDescription: META_DESCRIPTION,
  twitterImage: META_IMAGE
});
</script>

<template>
  <div class="page-bg">
    <div class="container">
      <div>
        <h2 class="text-3xl">Available topics</h2>
        <Topics :topics="navigation" />
      </div>

      <div class="mt-8">
        <h3 class="text-2xl">My last posts</h3>
        <section class="space-y-4 mt-8">
          <ContentList :query="query">
            <template v-slot="{ list }">
              <Post v-for="(post, index) in list" :key="index" :post="post" />
            </template>

            <template #not-found>
              <br /><br /><br /><br />
              <p class="text-4xl text-center">Sorry ! I'm not yet inspired 😮‍💨 </p>
            </template>

            <template #empty>
              <p>No articles yet</p>
            </template>
          </ContentList>
        </section>
      </div>
    </div>
  </div>
</template>
