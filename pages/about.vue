<script setup>
import ContactDetail from "~/components/about/ContactDetail.vue";
import technos from "../data/technos";
</script>

<template>
  <div class="page-bg">
    <div class="container">
      <!-- Présentation -->
      <div class="flex flex-col md:flex-row items-center">
        <div class="mt-8 md:ml-8 md:mt-0 text-sm md:text-base">
          <h3 class="text-center">Hello 👋 World</h3>
          <br><br>

          <!-- <img class="object-fill h-96 w-full" src="" alt="profile"/> -->

          <p class="mt-8">
            Je m'appelle <span class="hightlighted">Denis AKPAGNONITE</span> et je suis actuellement en deuxième année
            du cycle ingénieur, spécialité Sciences de Données &
            Développement Informatique dans la ville de Casablanca au Maroc. </p>

          <br/>

          <p> Parce que pour moi, le métier idéal serait: <span class="hightlighted">Ingénieur DevSecOps</span> au sein
            d'une ESN telle que OVH, SFEIR, Capgemini, CGI, ATOS....,
            voici les sujets auxquels je porte un intérêt particulier: </p>

          <ul class="mt-4 list-disc ml-4 md:ml-6">
            <li>
              <p class="mt-4">la philosophie du DevOPS</p>
            </li>

            <li>
              <p class="mt-4">les infrastructures cloud</p>
            </li>

            <li>
              <p class="mt-4">les systèmes distribuées et parallèles</p>
            </li>

            <li>
              <p class="mt-4">les solutions de cloud identity and access management (IAM)</p>
            </li>

            <li>
              <p class="mt-4">le Quality assurance, notamment l'automatisation des tests de sécurité et fonctionnels de
                logiciels </p>
            </li>

            <li>
              <p class="mt-4">la data science</p>
            </li>
          </ul>

          <br>

          <h6 class="mt-4 font-medium">Parcours universitaire</h6>
          <ul class="mt-4 list-disc ml-4 md:ml-6">
            <li>Licence informatique (BAC+3), spécialité Architecture des logiciels (ESGIS Togo) 🇹🇬 </li>
            <li>Master (BAC+5 Ingénierie), spécialité Sciences de Données & Développement Informatique (en cours) 🇲🇦 
            </li>
          </ul>

          <br>
          <h6 class="mt-4 font-medium">Mentions</h6>
          <p>
            Je me suis inspiré du projet <span class="hightlighted"> <a href="https://loopbin.dev" target="_blank">Loopbin</a></span>
            de Corneil Edi pour ce blog
          </p>

        </div>
      </div>

      <!-- Contact -->
      <ContactDetail/>

      <!-- Statistiques GITHUB -->
      <div class="mt-12 md:mt-16 flex flex-col md:flex-row md:justify-between  space-y-4 md:space-x-20">
        <div class="md:w-1/2">
          <h4 class="my-4">Profile Github</h4>
          <a href="https://github.com/denisakp" target="_blank">
            <img
                src="https://github-readme-stats.vercel.app/api?username=denisakp&&show_icons=true&title_color=0c1518&icon_color=0c1518&text_color=0c1518&bg_color=15DB95"
                alt="profile"
            />
          </a>
        </div>
      </div>

      <div class="mt-12 md:mt-16">
        <h4>Mes Badges & certifications</h4>
        <div class="mt-6 space-y-4 md:space-y-0 grid grid-cols-4 2xl:grid-cols-4 2xl:gap-4 md:grid-cols-4 md:gap-4">
          <a href="https://www.credly.com/badges/6b64fa0a-e2bc-418a-acd9-d7ed71c635e8" target="_blank">
            <nuxt-img src="https://res.cloudinary.com/dpdwhd6ka/image/upload/v1673275619/Blog/badges/image_fmqofw.png"
                      alt="ISC Candidate badge" class="h-28 md:h-32 lg:h-44"/>
          </a>

          <a href="https://api.badgr.io/public/assertions/22JPp_tsRTazEW65LiJPWA?identity__email=akpagnonited%40outlook.com"
             target="_blank">
            <nuxt-img
                src="https://res.cloudinary.com/dpdwhd6ka/image/upload/v1673274348/Blog/badges/assertion-22JPp_tsRTazEW65LiJPWA_n1wa4z.png"
                alt="ISC Candidate badge" class="h-28 md:h-32 lg:h-44"/>
          </a>

        </div>
      </div>

      <!--Compétences -->
      <div class="mt-12 md:mt-16">
        <h4>Mes Centres d'intérêts</h4>

        <div class="my-4">
          <div
              v-for="tech in technos"
              :key="tech.title"
              class="w-full slick-border rounded-sm p-2 mb-5"
          >
            <p class="mx-2 text-gray-600">{{ tech.title }}</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              <div
                  v-for="item in tech.techs"
                  :key="item.title"
                  class="p-2 w-full"
              >
                <div
                    class="h-full flex items-center slick-border rounded-sm hover:shadow-sm cursor-pointer"
                >
                  <div class="bg-dark-low m-2 p-2 mr-4 rounded-sm">
                    <img class="mx-auto h-6 w-6 md:h-8 md:w-8 flex-shrink-0" :src="item.image" alt="technology logo"/>
                  </div>
                  <div class="flex-grow py-2 pr-2">
                    <p class="darker-text text-sm font-medium">
                      {{ item.name }}
                    </p>
                    <p class="dark-text text-xs">
                      {{ item.description || '' }}
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

<style scoped>
.img-cont img {
  @apply max-w-full h-auto rounded-lg;
}
</style>
