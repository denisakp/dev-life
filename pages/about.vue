<script setup>

import skills from "~/data/skills";
import badges from "~/data/badges";
import { META_DESCRIPTION, META_IMAGE } from "~/utils/config";

useSeoMeta({
  title: "About me - DENIS AKPAGNONITE",
  description: META_DESCRIPTION,

  ogTitle: "About me - Denis AKPAGNONITE",
  ogDescription: META_DESCRIPTION,
  ogImage: META_IMAGE,
  ogUrl: "https://denisakp.me/about",

  twitterCard: "summary_large_image",
  twitterTitle: "About me - Denis AKPAGNONITE",
  twitterDescription: META_DESCRIPTION,
  twitterImage: META_IMAGE
});
</script>

<template>
  <div class="page-bg">
    <div class="container">
      <!-- Presentation -->
      <div class="mt-12 md:mt-16 text-sm md:text-base">
        <h3 class="text-center my-4 text-3xl">👋 Nice to meet you</h3>

        <p class="text-3xl">
          I'm <span class="hightlighted">Denis AKPAGNONITE</span>
        </p>

        <p class="mt-5">I'm a
          <span class="font-bold"> Software Engineer </span> specializing in <span class="font-bold">DevOps & Cloud Native ⎈ technologies.</span>
          I have experience designing and automating scalable web apps and infrastructure.</p>

        <p class="mt-5">
          <span class="font-bold">More than just a DevOps & Cloud Native Engineer, I'm a digital craftsman.</span>
          I pour my expertise and passion into every project, building high-performing, elegant, and secure websites
          and web applications.
        </p>

        <p class="mt-5">
          <span class="font-bold">Open source is a core value for me</span>. I'm an aspiring contributor to
          open-source projects and always on the
          lookout for new ways to share my knowledge and support the community. I recently discovered the power of
          open source through my participation in the first cohort of the <span class="hightlighted">All In Africa
            program by GitHub</span>. This experience ignited my passion for contributing and being part of this
          collaborative movement.
        </p>

        <p class="mt-5">
          In a nutshell, I'm a <span class="font-bold">passionate web artisan</span>, a <span class="hightlighted">DevOps
             & Cloud Native expert</span>, and an enthusiastic advocate for <span class="font-medium">open source</span>.
          I'm constantly seeking new challenges and eager to bring my skills and experience to design, build, develop,
          test, deploy and maintain real world projects.
        </p>

        <h4 class="mt-8 font-medium text-3xl">Academic background</h4>

        <ul class="mt-4 list-disc ml-4 md:ml-6">
          <li>BSc Software Engineering (3 years), in Lomé - Togo 🇹🇬 </li>
          <li>
            MEng, Software Engineering track (in
            progress), in Casablanca, Morocco 🇲🇦 
          </li>
        </ul>

        <h4 class="mt-8 font-medium text-3xl">Mentions</h4>

        <p class="mt-4">
          I took over the
          <NuxtLink target="_blank" to="https://loopbin.dev"
          ><span class="hightlighted">Loopbin</span></NuxtLink
          >
          project initially created by
          <span class="hightlighted">Ayao Corneille ALLOGBALO</span> which I
          simply customized because I suck when it comes to the UI.
        </p>
      </div>

      <!-- GITHUB Stats -->
      <div class="mt-12 md:mt-16">
        <h4 class="my-3 text-3xl">Digital Badges</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          <a v-for="(badge, index) in badges" :key="index" :href="badge.href" target="_blank">
            <img :src="badge.src" :alt="badge.alt" class="h-28 md:h-32 lg:h-44">
          </a>
        </div>
      </div>


      <!--Technical skills -->
      <div class="mt-12 md:mt-16">
        <h4 class="text-3xl">Technical skills</h4>

        <div class="my-4">
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="w-full slick-border rounded-sm p-2 mb-5"
          >
            <p class="mx-2 text-gray-600">{{ skill.title }}</p>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
            >
              <div
                v-for="(item, _index) in skill.techs"
                :key="_index"
                class="p-2 w-full"
              >
                <div
                  class="h-full flex items-center slick-border rounded-sm hover:shadow-sm cursor-pointer"
                >
                  <div class="bg-dark-low m-2 p-2 mr-4 rounded-sm">
                    <img
                      class="mx-auto h-6 w-6 md:h-8 md:w-8 flex-shrink-0"
                      :src="item.image"
                      alt="technology logo"
                    />
                  </div>
                  <div class="flex-grow py-2 pr-2">
                    <p class="darker-text text-sm font-medium">
                      {{ item.name }}
                    </p>
                    <p class="dark-text text-xs">
                      {{ item.description || "" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
