<script setup>
import ContactDetail from "~/components/about/ContactDetail.vue";
import skills from "~/data/skills";

useSeoMeta({
  title: "About me",
  description: "your one-stop destination for all things software engineering, Cloud DevOps, AI, and cyber security",

  ogTitle: "About me - Dev Life",
  ogDescription:
      "your one-stop destination for all things software engineering, Cloud DevOps, AI, and cyber security",
  ogImage:
      "https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g",
  ogUrl: "https://denisakp.me/about",

  twitterCard: "summary_large_image",
  twitterTitle: "About me - Dev Life",
  twitterDescription:
      "your one-stop destination for all things software engineering, Cloud DevOps, AI, and cyber security",
  twitterImage:
      "https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g",
});
</script>

<template>
  <div class="page-bg">
    <div class="container">
      <!-- Presentation -->
      <div class="flex flex-col md:flex-row items-center">
        <div class="mt-8 md:ml-8 md:mt-0 text-sm md:text-base">
          <h3 class="text-center my-4 text-3xl">👋 Nice to meet you</h3>
          <!--
          <nuxt-img
            src="https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/re0wsg6outld6cbolnnv"
            class="h-full w-full"
            alt="profile"
          />
          -->

          <p class="mt-8 text-3xl">
            I'm <span class="hightlighted">Denis AKPAGNONITE</span> (denisakp) A.K.A <span
              class="hightlighted">Nine October</span>.
          </p>

          <p class="mt-6">I'm a final-year student pursuing a degree in Software Engineering. My passions include
            Cloud/DevOps environments and IT automation. I'm also an Open Source advocate, and my will to always improve
            has helped me to understand the ideas,methods,procedures and developing technology in this ever changing
            area.
          </p>

          <br/>

          <h4 class="mt-4 font-medium text-3xl">Academic background</h4>

          <ul class="mt-4 list-disc ml-4 md:ml-6">
            <li>BSc Software Engineering (3 years), in Lomé, Togo 🇹🇬 </li>
            <li>
              Engineer's Degree, Data Science and Software Development track (in
              progress), in Casablanca, Morocco 🇲🇦 
            </li>
          </ul>

          <br/>
          <h4 class="mt-4 font-medium text-3xl">Mentions</h4>

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
      </div>

      <!-- Contact -->
      <ContactDetail/>

      <!-- GITHUB Stats -->
      <div
          class="mt-12 md:mt-16 flex flex-col md:flex-row md:justify-between space-y-4 md:space-x-20"
      >
        <div class="md:w-1/2">
          <h4 class="my-4 text-3xl">Github Stats</h4>
          <a href="https://github.com/denisakp" target="_blank">
            <img
                src="https://github-readme-stats.vercel.app/api?username=denisakp&&show_icons=true&title_color=0c1518&icon_color=0c1518&text_color=0c1518&bg_color=15DB95"
                alt="profile"
            />
          </a>
        </div>

        <div class="md:w-1/2">
          <h4 class="my-3 text-3xl">Digital Badges</h4>
          <div class="flex space-x-2">
            <a href="https://www.credly.com/badges/1a490efa-6214-427a-964a-eca1e6898685/public_url" target="_blank">
              <img
                  src="https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/badges/hsop7pe6u1o7gk5ltxmh"
                  class="h-28 md:h-32 lg:h-44"
                  alt="aws clf c-02"
              >
            </a>
          </div>
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
