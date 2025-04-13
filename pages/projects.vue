<script setup>
import projects from "../data/projects";
import { META_DESCRIPTION, META_IMAGE, DEFAULT_PAGINATION_LIMIT } from "~/utils/config";
import Pagination from "~/components/shared/Pagination.vue";

const perPage = DEFAULT_PAGINATION_LIMIT;
const currentPage = ref(1);
const myProjects = ref(projects);

const totalProjects = ref(projects.length);
const totalPages = ref(Math.ceil(totalProjects.value / perPage));
const lastPageCount = ref( totalProjects.value % perPage !== 0
    ? totalProjects.value % perPage
    : totalProjects.value - perPage
);

let skipNumber = ref(
  currentPage.value === 1
    ? 0
    : currentPage.value === totalPages.value
      ? totalProjects.value - lastPageCount.value
      : (currentPage.value - 1) * perPage
);

let _projects = ref(myProjects.value.slice(skipNumber.value, perPage));

const onPageChanged = (page) => {
  currentPage.value = page;

  const skip =
    page === 1
      ? 0
      : page === totalPages.value
        ? totalProjects.value - lastPageCount.value
        : (page - 1) * perPage;

  _projects.value = myProjects.value.slice(skip, skip + perPage);
  window.scrollTo(0, 0);
};

onMounted(() => {
  window.scrollTo(0, 0);
});

useSeoMeta({
  title: "Projects",
  description: META_DESCRIPTION,

  ogTitle: "Projects - Denis AKPAGNONITE",
  ogDescription: META_DESCRIPTION,
  ogImage: META_IMAGE,
  ogUrl: "https://denisakp.me",

  twitterCard: "summary_large_image",
  twitterTitle: "Projects - Denis AKPAGNONITE",
  twitterDescription: META_DESCRIPTION,
  twitterImage: META_IMAGE
});
</script>

<template>
  <div class="container">
    <h4 class="text-3xl">Total projects ({{ totalProjects }})</h4>

    <div class="flex flex-wrap my-4">
      <div
        v-for="(project, index) in _projects"
        :key="index"
        class="p-2 lg:w-1/3 md:w-1/2 w-full"
      >
        <Project :project="project" />

      </div>
    </div>

    <Pagination
      :total="totalProjects"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      @page-changed="onPageChanged"
    />

  </div>
</template>
