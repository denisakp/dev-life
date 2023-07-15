<script setup>
const {data: navigation} = await useAsyncData("navigation", () =>
    fetchContentNavigation(),
);

const query = {
  limit: 5,
  sort: {date: -1},
  only: ["title", "description", "tags", "_path", "date"],
};

useSeoMeta({
  title: "Home",
  description: "Description",

  ogTitle: "Home - Dev Life",
  ogDescription: "Your one-stop destination for all things software engineering, Cloud DevOps, AI, and cyber security",
  ogImage:
      "https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g",
  ogUrl: "https://denisakp.me",

  twitterCard: "summary_large_image",
  twitterTitle: "Home - Dev Life",
  twitterDescription: "your one-stop destination for all things software engineering, Cloud DevOps, AI, and cyber security",
  twitterImage:
      "https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g",
});
</script>

<template>
  <div class="page-bg">
    <div class="container">
      <div>
        <h2 class="text-3xl">Available topics</h2>
        <Topics :topics="navigation"/>
      </div>

      <div class="mt-8">
        <h3 class="text-2xl">My last posts</h3>
        <section class="space-y-4 mt-8">
          <ContentList :query="query">
            <template v-slot="{ list }">
              <Post v-for="(post, index) in list" :key="index" :post="post"/>
            </template>

            <template #not-found>
              <br/><br/><br/><br/>
              <p class="text-4xl text-center">No articles found 🫣 </p>
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
