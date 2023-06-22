<script setup>
import loadTopic from "~/utils/load-topic";

const route = useRoute()
const slug = ref(route.params.slug[0]);

let techno = loadTopic(slug.value);
const posts = await queryContent('/').where({ 'topics': { $contains: slug.value }}).find()

const query = { where: { 'topics': { $contains: slug.value } }, limit: 10, sort: { date: -1 }, only: ['title', 'description', 'tags', '_path', 'date'] }
</script>

<template>
  <div>
    <div class="page-bg">
      <div v-if="techno" class="container">
        <section class="text-dark mb-12">
          <div class="h-full flex items-center slick-border p-2 rounded-sm">
            <div class="bg-dark-low p-4 mr-4 rounded-sm">
              <img
                  class="mx-auto h-16 w-16 lg:w-24 flex-shrink-0"
                  :src="techno.image"
                  :alt="techno.name + ' logo'"
              />
            </div>
            <div class="flex-grow">
              <h4 class="darker-text">
                {{ techno.name }}
              </h4>
              <p class="dark-text">
                {{ techno.description }}
              </p>
            </div>
          </div>
        </section>

        <h4 class="mb-4">Articles ({{ posts.length }})</h4>

        <section class="space-y-4">
          <ContentList :query="query">

            <template v-slot="{ list }">
              <Post v-for="(post, index) in list" :key="index" :post="post" />
            </template>

            <template #not-found>
              <br><br><br><br>
              <p class="text-4xl text-center">No articles yet 😮‍💨 </p>
            </template>

            <template #empty>
              <p>No articles yet</p>
            </template>
          </ContentList>
        </section>
      </div>
      <div v-else class="container">
        <section class="space-y-4">
          <p>Error 404</p>
        </section>
      </div>
    </div>
  </div>
</template>
