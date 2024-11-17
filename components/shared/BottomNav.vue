<template>
  <div class="md:hidden">
    <div
      class="block fixed inset-x-0 bottom-0 z-10 border-t border-dark-low bg-green px-2"
    >
      <div id="tabs" class="flex justify-between w-full my-1 text-dark">
        <ul
          class="flex w-full justify-between sm:justify-around items-center space-x-6 sm:space-x-8 px-8"
        >
          <li>
            <nuxt-link
              to="/blog"
              active-class="bg-white bg-opacity-30"
              class="flex flex-col py-2 px-3 items-center hover:bg-white hover:bg-opacity-40 cursor-pointer rounded-sm"
            >
              <span class="mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-5 h-5"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm16 7l-3.536 3.536-1.414-1.415L17.172 12 15.05 9.879l1.414-1.415L20 12zM6.828 12l2.122 2.121-1.414 1.415L4 12l3.536-3.536L8.95 9.88 6.828 12zm4.416 5H9.116l3.64-10h2.128l-3.64 10z"
                  />
                </svg>
              </span>
              <p class="text-xs">Blog</p>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link
              to="/topics"
              active-class="exact-navigation"
              class="flex px-4 items-center py-2 font-medium slick-hover-blue cursor-pointer rounded-sm"
            >
              <span class="mr-2">
                <svg
                  fill="currentColor"
                  class="w-6 h-6"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 511.977 511.977"
                >
                  <g>
                    <g>
                      <g>
                        <path
                          fill="none"
                          d="M327.113,76.48c-16.64,16.64-16.64,43.627,0,60.373c8,8,18.88,12.48,30.187,12.48c23.573,0,42.667-19.093,42.667-42.667
                          c0-11.307-4.48-22.187-12.48-30.187C371.379,60.373,343.219,60.373,327.113,76.48z M372.979,121.28
                          c-0.213,0.213-0.32,0.32-0.533,0.533c-8.427,8.107-21.76,8.107-30.187,0c-8.427-8.427-8.427-21.867,0-30.187
                          c8.213-8.427,21.653-8.747,30.187-0.533S381.193,112.747,372.979,121.28z"
                        />
                        <path
                          fill="currentColor"
                          d="M495.433,139.627L453.299,15.36v-4.693C453.299,4.8,448.5,0,442.633,0h-139.84c-2.88,0-5.547,1.173-7.573,3.093
                          L26.313,272.213c-13.76,14.4-13.76,37.013,0,51.413L130.42,427.093c3.947,3.84,8.64,6.72,13.867,8.427
                          c0.533,3.307,2.56,6.187,5.547,7.68l131.733,65.173c17.28,8.533,38.293,1.387,46.827-15.893c0.107-0.107,0.107-0.213,0.213-0.427
                          l0.533-1.067l113.493,10.347c16.107,0,32-15.253,32-30.933V192c-0.107-0.533-0.213-1.067-0.32-1.707l20.587-42.667
                          C496.18,145.173,496.286,142.187,495.433,139.627z M145.459,411.947L41.353,308.48c-5.44-5.973-5.44-15.147,0-21.12
                          L307.166,21.333h124.8v126.4L165.619,411.947C159.966,417.387,151.113,417.387,145.459,411.947z M453.299,470.4
                          c0,3.307-5.653,9.6-9.707,9.6l-104.64-9.493l114.347-236.693V470.4z M309.406,482.773c-1.6,3.413-4.48,5.973-8,7.147
                          c-3.413,1.173-7.147,0.96-10.347-0.64l-116.16-57.6c2.133-1.387,4.053-2.88,5.76-4.693l269.44-267.307
                          c2.027-2.027,3.2-4.693,3.2-7.573V81.813l20.48,60.48L309.406,482.773z"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <p class="text-sm">Topics</p>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link
              active-class="bg-white bg-opacity-30"
              to="/projects"
              class="flex flex-col py-2 px-3 items-center hover:bg-white hover:bg-opacity-40 cursor-pointer rounded-sm"
            >
              <span class="mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-5 h-5"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M7.105 15.21A3.001 3.001 0 1 1 5 15.17V8.83a3.001 3.001 0 1 1 2 0V12c.836-.628 1.874-1 3-1h4a3.001 3.001 0 0 0 2.895-2.21 3.001 3.001 0 1 1 2.032.064A5.001 5.001 0 0 1 14 13h-4a3.001 3.001 0 0 0-2.895 2.21zM6 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM6 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                  />
                </svg>
              </span>
              <p class="text-xs">Projects</p>
            </nuxt-link>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>
