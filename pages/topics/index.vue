<script setup>
import { META_DESCRIPTION, META_IMAGE } from "~/utils/config";

const navigation = await fetchContentNavigation();
const topics = navigation.filter((item) => item._path !== "/hello-world");

useSeoMeta({
  title: "Topics - Denis AKPAGNONITE",
  description: META_DESCRIPTION,

  ogTitle: "Topics - Denis AKPAGNONITE",
  ogDescription: META_DESCRIPTION,
  ogImage: META_IMAGE,
  ogUrl: "https://denisakp.me/topics",

  twitterCard: "summary_large_image",
  twitterTitle: "Topics - Denis AKPAGNONITE",
  twitterDescription: META_DESCRIPTION,
  twitterImage: META_IMAGE
});
</script>

<template>
  <div class="page-bg">
    <div class="container">
      <h1 class="text-3xl capitalize">
        Available Subjects: {{ topics.length }}
      </h1>
      <Topics :topics="topics" />
    </div>
  </div>
</template>
