<script setup>
const topics = await queryContent('/').only('topics').find();

useSeoMeta({
  title: 'Topics me',
  description: 'Topics page Description',

  ogTitle: 'Topics - Dev Life',
  ogDescription: 'Topics page description',
  ogImage: 'https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g',
  ogUrl: 'https://denisakp.me/topics',

  twitterCard: 'summary_large_image',
  twitterTitle: 'Topics - Dev Life',
  twitterDescription: 'Topics page Description',
  twitterImage: 'https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g'
})
</script>

<template>
  <div class="page-bg">
    <div class="container">
      <h3>LES SUJETS {{ topics.length }} </h3>
    </div>
  </div>
</template>
