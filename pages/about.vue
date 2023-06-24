<script setup>
import ContactDetail from "~/components/about/ContactDetail.vue";
import skills from "~/data/skills";

useSeoMeta({
  title: 'About me',
  description: 'About page Description',

  ogTitle: 'About me - Dev Life',
  ogDescription: 'Home page description',
  ogImage: 'https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g',
  ogUrl: 'https://denisakp.me/about',

  twitterCard: 'summary_large_image',
  twitterTitle: 'About me - Dev Life',
  twitterDescription: 'About me page Description',
  twitterImage: 'https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g'
})
</script>

<template>
  <div class="page-bg">
    <div class="container">
      <!-- Présentation -->
      <div class="flex flex-col md:flex-row items-center">

        <div class="mt-8 md:ml-8 md:mt-0 text-sm md:text-base">
          <h3 class="text-center my-4"> 👋 Hello World</h3>
          <nuxt-img
              src="https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/re0wsg6outld6cbolnnv"
              class="h-full w-full" alt="profile"/>

          <p class="mt-8">
            Je m'appelle <span class="hightlighted">Denis D. Yaovi AKPAGNONITE</span>, Ingénieur Informatique en
            dernière année de formation en cycle d'ingénieur d'Etat marocain, parcours Sciences de Données
            et Développement Informatique. Je suis passionné par la conception, développement et maintenance de Backend,
            le Cloud/DevOps et l'application de l'Intelligence Artificielle dans le domaine de la Cybersécurité.
          </p>

          <br/>

          <p>Voici quelques trucs en plus que vous devrez savoir sur moi: </p>

          <ul class="mt-4 list-disc ml-4 md:ml-6">
            <li>
              <p class="mt-4">Je préfère Linux à Windows, même si actuellement j'opère avec un Mac Book Pro M1 de
                2022 </p>
            </li>

            <li>
              <p class="mt-4">Je préfère le Backend au Frontend</p>
            </li>

            <li>
              <p class="mt-4">
                Sécurité, Évolutivité, Performance, Gestion des erreurs, des Logs, Tests, et Monitoring sont mes 7
                points de Chakra
              </p>
            </li>

            <li>
              <p class="mt-4">J'ai horreur des personnes qui font des push sur la branche main  🙄 </p>
            </li>

            <li>
              <p class="mt-4">J'ai horreur des RH qui demandent 5 années d'expériences pour un poste de Junior</p>
            </li>

          </ul>

          <br>

          <h6 class="mt-4 font-medium">Parcours universitaire</h6>
          <ul class="mt-4 list-disc ml-4 md:ml-6">
            <li>Licence informatique (BAC+3), parcours Informatique Réseau et Télécoms, spécialité Architecture des
              logiciels (ESGIS Togo) 🇹🇬 
            </li>
            <li>Cycle d'ingénieur d'Etat marocain, spécialité Sciences de Données & Développement Informatique (en
              cours) 🇲🇦 
            </li>
          </ul>

          <br>
          <h6 class="mt-4 font-medium">Mentions</h6>
          <p>
            J'ai repris le projet
            <NuxtLink target="_blank" to="https://loopbin.dev"><span class="hightlighted">Loopbin</span></NuxtLink>
            initialement créé <span class="hightlighted">Ayao Corneille ALLOGBALO</span> que j'ai à peine customiser
            parce que les feuilles de style CSS ne sont pas du tout mon fort.
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

      <!--Compétences -->
      <div class="mt-12 md:mt-16">
        <h4>Mes compétences techniques</h4>

        <div class="my-4">
          <div
              v-for="skill in skills"
              :key="skill.title"
              class="w-full slick-border rounded-sm p-2 mb-5"
          >
            <p class="mx-2 text-gray-600">{{ skill.title }}</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              <div
                  v-for="item in skill.techs"
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

