<script setup>
import Pagination from "~/components/shared/Pagination.vue";

const route = useRoute()
const pageQuery = route.query.page ? parseInt(route.query.page) : 1;

const perPage = ref(14);
const articlesCount = (await queryContent('/').find()).length;
const currentPage = ref(pageQuery);
const lastPage = Math.ceil(articlesCount / perPage.value);
const lastPageCount = articlesCount % perPage.value === 0 ? perPage.value : articlesCount % perPage.value;
const skipNumber = () => {
  return (currentPage.value === 1)
      ? 0
      : (currentPage.value === lastPage) ?
          articlesCount - lastPageCount :
          (currentPage.value - 1) * perPage.value
}

const {data: articles, refresh} = await useAsyncData("articles", () => {
  return queryContent('/').skip(skipNumber()).limit(perPage.value).sort({date: -1}).find()
});

onMounted(() => {
  refresh()
  window.scrollTo(0, 0)
})

useSeoMeta({
  title: 'Blog',
  description: 'Blog page Description',

  ogTitle: 'Blog - Dev Life',
  ogDescription: 'Blog page description',
  ogImage: 'https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g',
  ogUrl: 'https://denisakp.me',

  twitterCard: 'summary_large_image',
  twitterTitle: 'Blog - Dev Life',
  twitterDescription: 'Blog page Description',
  twitterImage: 'https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g'
})

</script>

<template>
  <div>
    <div class="page-bg">
      <div class="container">
        <h5> Articles ({{ articlesCount }})</h5>
        <div class="flex flex-wrap my-4">
          <div class="p-2 lg:w-1/2 w-full" v-for="(post, index) in articles" :key="index">
            <Post :post="post"/>
          </div>
        </div>
        <div class="w-full flex justify-center items-center">
          <Pagination :total="articlesCount" :per-page="perPage" :page-query="pageQuery"/>
        </div>
      </div>
    </div>
  </div>
</template>
