<script setup>
const navigation = await fetchContentNavigation();
const topics = navigation.filter((item) => item._path !== "/hello-world");

useSeoMeta({
  title: "Topics",
  description: "Your one-stop destination for all things software engineering, Cloud DevOps, AI, and cyber security",

  ogTitle: "Topics - Dev Life",
  ogDescription: "Your one-stop destination for all things software engineering, Cloud DevOps, AI, and cyber securityn",
  ogImage:
      "https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g",
  ogUrl: "https://denisakp.me/topics",

  twitterCard: "summary_large_image",
  twitterTitle: "Topics - Dev Life",
  twitterDescription: "Your one-stop destination for all things software engineering, Cloud DevOps, AI, and cyber security",
  twitterImage:
      "https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g",
});
</script>

<template>
  <div class="page-bg">
    <div class="container">
      <h1 class="text-3xl capitalize">
        Available Subjects: {{ topics.length }}
      </h1>
      <Topics :topics="topics"/>
    </div>
  </div>
</template>
