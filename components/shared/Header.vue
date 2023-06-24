<script setup>
import SwitchTheme from './SwitchTheme.vue';

const query = ref('')
const posts = ref([])

const modalState = ref(false)
const searchModal = () => modalState.value = !modalState.value

watch(query, async (newValue) => {
  if (!newValue || query.value.length < 4) {
    posts.value = []
    return
  }

  const articles = await queryContent()
      .where({_draft: false})
      .only(['_path', 'title', 'slug', 'description', 'date', 'tags'])
      .sort({date: -1})
      .limit(25)
      .find()

  for (const article of articles) {
    if (article.title.toLowerCase().includes(newValue.toLowerCase())) {
      posts.value.push(article)
    }
  }

})
</script>

<template>
  <nav
      class="fixed flex w-full bg-white dark:bg-dark-high items-center justify-between flex-wrap top-0 animated mx-auto py-2 md:py-3 h-auto border-b border-dark-low dark:border-dark z-10">
    <div class="container flex items-center justify-between text-dark dark:text-dark-low">
      <nuxt-link to="/">
        <nuxt-img
            src="https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g"
            class="h-8 w-18 md:h-10 md:w-18" alt="denisakp logo"
            format="webp"/>
      </nuxt-link>

      <div class="hidden md:flex flex-1 w-full mx-auto justify-center">
        <ul class="flex justify-center items-center space-x-6">
          <li>
            <nuxt-link
                to="/blog"
                active-class="exact-navigation"
                class="flex px-4 items-center py-2 font-medium slick-hover-blue cursor-pointer rounded-sm"
            >
              <span class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path
                      fill="currentColor"
                      d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm16 7l-3.536 3.536-1.414-1.415L17.172 12 15.05 9.879l1.414-1.415L20 12zM6.828 12l2.122 2.121-1.414 1.415L4 12l3.536-3.536L8.95 9.88 6.828 12zm4.416 5H9.116l3.64-10h2.128l-3.64 10z"
                  />
                </svg>
              </span>
              <p class="text-sm">Blog</p>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link
                to="/projects"
                exact-active-class="exact-navigation"
                class="flex px-4 items-center py-2 font-medium slick-hover-blue cursor-pointer rounded-sm"
            >
              <span class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path
                      fill="currentColor"
                      d="M7.105 15.21A3.001 3.001 0 1 1 5 15.17V8.83a3.001 3.001 0 1 1 2 0V12c.836-.628 1.874-1 3-1h4a3.001 3.001 0 0 0 2.895-2.21 3.001 3.001 0 1 1 2.032.064A5.001 5.001 0 0 1 14 13h-4a3.001 3.001 0 0 0-2.895 2.21zM6 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM6 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                  />
                </svg>
              </span>
              <p class="text-sm">Projets</p>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link
                to="/about"
                active-class="exact-navigation"
                class="flex px-4 items-center py-2 font-medium slick-hover-blue cursor-pointer rounded-sm"
            >
              <span class="mr-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="w-6 h-6"
                >
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path
                      fill="currentColor"
                      d="M15 4H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992zm9 8.508a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM7.527 17a4.5 4.5 0 0 1 8.946 0H7.527z"
                  />
                </svg>
              </span>
              <p class="text-sm">A Propos</p>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <div class="flex justify-center items-center space-x-2 md:space-x-4">

        <button type="button" class="flex items-center p-2 cursor-pointer slick-hover rounded-full slick-border"
                @click="searchModal">
          <span class="flex space-x-2 items-center  px-2">
            <p class="text-sm font-medium">Recherche</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 ">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path fill="currentColor"
                    d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
            </svg>
          </span>
        </button>

        <SwitchTheme/>
      </div>
    </div>

    <Transition name="slide-in-up">
      <div v-if="modalState" role="dialog"
           class="flex w-full fixed z-50 left-0 top-0 h-screen bg-light-dark antialiased overflow-auto">
        <div class="md:w-2/3 mx-auto">
          <div class="relative h-full md:h-auto w-full">
            <div class="w-full px-8 py-4 md:px-16 md:py-8 h-full md:h-auto">
              <div class="text-lg mb-5">
                <div class="mt-4">
                  <div class="mb-4">
                    <div class="mb-8 flex space-x-4 items-center justify-between dark-text">
                      <h3 class="font-bold text-2xl">Recherche</h3>
                      <div class="cursor-pointer slick-hover p-2 rounded-full" @click="searchModal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8">
                          <path fill="none" d="M0 0h24v24H0z"/>
                          <path fill="currentColor"
                                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"/>
                        </svg>
                      </div>
                    </div>

                    <input
                        id="modal_search_input"
                        autofocus
                        v-model.trim="query"
                        type="search"
                        autocomplete="off"
                        placeholder="Recherche"
                        class="slick-border px-6 py-3 md:py-4 w-full shadow-sm border-dark bg-light-dark-low"
                    />
                    <p class="mt-2 text-xs md:text-sm dark-text">
                      Recherchez les posts par titre ou description
                    </p>
                  </div>
                </div>
              </div>

              <div class="">
                <section class="space-y-4 mt-8">
                  <Post v-for="post in posts" :key="post._path" :post="post"/>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
