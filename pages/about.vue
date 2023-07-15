<script setup>
import ContactDetail from "~/components/about/ContactDetail.vue";
import skills from "~/data/skills";

useSeoMeta({
  title: "About me",
  description: "About page Description",

  ogTitle: "About me - Dev Life",
  ogDescription: "Home page description",
  ogImage:
    "https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g",
  ogUrl: "https://denisakp.me/about",

  twitterCard: "summary_large_image",
  twitterTitle: "About me - Dev Life",
  twitterDescription: "About me page Description",
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
          <h3 class="text-center my-4 text-3xl">👋 Hi There</h3>
          <nuxt-img
            src="https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/re0wsg6outld6cbolnnv"
            class="h-full w-full"
            alt="profile"
          />

          <p class="mt-8">
            I'm <span class="hightlighted">Denis AKPAGNONITE</span>, and I'm
            currently attending an Engineer's degree, Data Science and Software
            Development track, in Casablanca (Morocco). I'm passionate about
            Backend designing, developing, and maintaining; Cloud/DevOps, and
            the application of Artificial Intelligence in Cybersecurity.
          </p>

          <br />

          <p>Here are a few more things you need to know about me:</p>

          <ul class="mt-4 list-disc ml-4 md:ml-6">
            <li>
              <p class="mt-4">
                I prefer Linux to Windows, although I currently work with a 2022
                Mac Book Pro M1
              </p>
            </li>

            <li>
              <p class="mt-4">
                I'm more comfortable with the backend than the frontend
              </p>
            </li>

            <li>
              <p class="mt-4">
                Security; Scalability; Performance; Errors, Logs, and Tests
                Management; and Monitoring are my 7 Chakra points
              </p>
            </li>

            <li>
              <p class="mt-4">I hate people who push on the main branch  🙄 </p>
            </li>

            <li>
              <p class="mt-4">I think Light theme attracts bugs 🤣 </p>
            </li>
          </ul>

          <br />

          <h4 class="mt-4 font-medium text-3xl">Academic background</h4>
          <ul class="mt-4 list-disc ml-4 md:ml-6">
            <li>BSc Software Engineering (3 years), in lomé (Togo) 🇹🇬 </li>
            <li>
              Engineer's degree, Data Science and Software Development track (in
              progress), in Casablanca (Morocco) 🇲🇦 
            </li>
          </ul>

          <br />
          <h4 class="mt-4 font-medium text-3xl">Mentions</h4>
          <p>
            I took over the
            <NuxtLink target="_blank" to="https://loopbin.dev"
              ><span class="hightlighted">Loopbin</span></NuxtLink
            >
            project initially created by
            <span class="hightlighted">Ayao Corneille ALLOGBALO</span> which I
            simply customized because I suck when it comes to the UI
          </p>
        </div>
      </div>

      <!-- Contact -->
      <ContactDetail />

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
