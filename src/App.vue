<template>
  <div class="flex flex-col w-full min-h-0 bg-gray-100">
    <nav class="bg-black">
      <div class="px-4 mx-auto max-w-9xl sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <a href="https://slipmat.io">
                <img
                  class="w-8 h-8"
                  src="https://slipmatmedia.b-cdn.net/img/favicons/apple-touch-icon.png"
                  alt="Slipmat logo"
                />
              </a>
            </div>
            <div
              class="relative flex items-center min-h-0 pl-2 my-2 text-2xl font-bold text-white no-underline lg:pl-3"
            >
              <a href="https://slipmat.io">Slipmat.io</a>
            </div>
            <div class="hidden md:block">
              <div class="flex items-baseline ml-10">
                <a
                  v-if="false"
                  href="#"
                  class="px-3 py-2 ml-4 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
                  >Discover</a
                >
                <a
                  v-if="false"
                  href="#"
                  class="px-3 py-2 ml-4 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
                  >Artists</a
                >
                <a
                  href="https://backstage.slipmat.io"
                  class="px-3 py-2 ml-4 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
                  >Backstage</a
                >

                <a
                  href="https://discord.gg/PCSwhkZ"
                  class="px-3 py-2 ml-4 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
                  >Chat</a
                >

                <a
                  href="https://blog.slipmat.io/"
                  class="px-3 py-2 ml-4 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
                  >Blog</a
                >

                <a
                  href="https://eventplanner.now.sh/"
                  class="px-3 py-2 ml-4 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
                  >EventPlanner</a
                >

                <a
                  v-if="false"
                  :href="djDashboardUrl"
                  class="px-3 py-2 ml-4 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
                  >DJ Dashboard</a
                >

                <a
                  v-if="false"
                  href="admin/"
                  class="px-3 py-2 ml-4 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
                  >Admin</a
                >
              </div>
            </div>
          </div>

          <div class="hidden md:block">
            <div class="flex items-center ml-4 md:ml-6">
              <a
                class="p-1 text-red-500 border-2 border-transparent rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                aria-label="Notifications"
                href="/backstage/"
                v-if="user.backstageNotifications || user.backstageMessages"
                title="You have notifications on Backstage"
              >
                <svg
                  class="w-6 h-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </a>

              <div class="relative flex flex-1 ml-3">
                <div
                  class="flex flex-row items-center justify-between flex-shrink-0"
                >
                  <div class="block mr-3 text-base text-slipmat-400">
                    Admin View
                  </div>

                  <a
                    class="block max-w-xs text-sm text-white rounded-full focus:outline-none focus:shadow-solid"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                    x-bind:aria-expanded="open"
                    href=""
                  >
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://media.slipmat.io/media/profile_photos/ccc7b1cd-c0dd-4fd8-86aa-f375de65ff98_1555553750.jpg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="flex -mr-2 md:hidden">
            <button
              class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              x-bind:aria-label="open ? 'Close main menu' : 'Main menu'"
              x-bind:aria-expanded="open"
              @click="open = !open"
            >
              <svg
                class="w-6 h-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  :class="{ 'inline-flex': !open }"
                  class="inline-flex"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  :class="{ hidden: !open, 'inline-flex': open }"
                  class="hidden"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="md:hidden" :class="{ hidden: !open }">
        <div class="px-2 pt-2 pb-3 sm:px-3">
          <span
            class="block px-3 py-2 text-base font-medium bg-gray-900 rounded-md text-slipmat-500 focus:outline-none focus:text-white focus:bg-gray-700"
            >Homepage</span
          >

          <a
            href="https://backstage.slipmat.io/"
            class="block px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
            >Backstage</a
          >

          <a
            href="https://discord.gg/PCSwhkZ"
            class="block px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
            >Chat</a
          >

          <a
            href="https://blog.slipmat.io/"
            class="block px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
            >Blog</a
          >

          <a
            href="https://eventplanner.now.sh/"
            class="block px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
            >EventPlanner</a
          >

          <a
            v-if="false"
            href="/dj/"
            class="block px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
            >DJ Dashboard</a
          >

          <a
            v-if="false"
            href="admin/"
            class="block px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-slipmat-500 hover:bg-gray-950 focus:outline-none focus:text-white focus:bg-gray-700"
            >Admin</a
          >
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div v-if="!isAnonymous && user" class="flex items-center px-5">
            <div class="flex-shrink-0">
              <a href="https://slipmat.io/account/">
                <img
                  class="w-10 h-10 rounded-full"
                  src="https://media.slipmat.io/media/profile_photos/ccc7b1cd-c0dd-4fd8-86aa-f375de65ff98_1555553750.jpg"
                  alt=""
                />
              </a>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">
                <a href="https://slipmat.io/account/">{{ user.username }}</a>
              </div>
              <div class="mt-1 text-sm font-medium leading-none text-gray-400">
                <a href="https://slipmat.io/account/">{{ user.email }}</a>
              </div>
            </div>
          </div>
          <div v-else class="flex items-center px-5">
            <a class="btn" href="https://slipmat.io/account/login/">Log In</a>
          </div>

          <div
            class="px-2 mt-3"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <a
              v-if="false"
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              role="menuitem"
              >Your Profile</a
            >
            <a
              v-if="false"
              href="#"
              class="block px-3 py-2 mt-1 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              role="menuitem"
              >Settings</a
            >
            <a
              v-if="false"
              href="#"
              class="block px-3 py-2 mt-1 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              role="menuitem"
              >Sign out</a
            >
          </div>
        </div>
      </div>
    </nav>
    <main class="w-full mx-auto max-w-9xl sm:py-6 sm:px-6 lg:px-8">
      <!-- Content -->
      <div
        v-if="!debug"
        class="p-6 mb-6 text-lg bg-green-300 border-4 border-green-600"
      >
        You are looking at an experimental version of Radio Script Builder - a
        tool for constructing radio show scripts. The initial data on this page
        is static development data. No changes are persisted, everything resets
        when you refresh the page. This is here only for expreimentation and
        gathering for ideas.
      </div>

      <router-view></router-view>

      <div class="pt-6 mt-8 ml-8 mr-8 prose border-t border-gray-800 md:mr-0">
        <h3>About</h3>

        <p>
          The idea behind this tool is to offer a realtime
          <strong> collaboration tool for building radio show scripts </strong>
          from pre-defined parts (like songs, jingles and talk sections).
        </p>

        <p>
          Building the show script with a tool like this instead with something
          like Google Docs has several benefits. This is actually designed for
          the task so it has bespoke functionality like automatic timestamps and
          easy editing and rearranging of sections. It can also easily be
          integrated to other parts of Slipmat ecosystem so the overall user
          experience will be much better.
        </p>

        <p>
          There's a
          <a
            href="https://backstage.slipmat.io/t/dj-feedback-wanted-show-script-building-tool/2706"
            >topic on Slipmat Backstage forum for discussing this tool</a
          >.
        </p>

        <p>TODO:</p>
        <ul>
          <li><s>Arrange items on the list by dragging</s></li>
          <li>Allow editing of items</li>
          <li>Lock items in time (ie. "news start exactly at 21:00" etc)</li>
          <li>Calculate remaining empty time to next segment or to show end</li>
        </ul>

        <p>Some further development ideas:</p>

        <ul>
          <li>Import playlists from Spotify / Tidal etc</li>
          <li>Import playlists from DJ software</li>
          <li>Add integrate Slipmat chat for event hosts</li>
          <li>
            Independent modes for editing and playing. In play mode the list
            would show controls like "Mark played", "Tweet" etc. (Ideally you
            could easily switch between the two to allow editing the script
            during the show if needed.)
          </li>
        </ul>

        <p>
          This experiment is open source and
          <a href="https://github.com/Uninen/program-generator-experiment"
            >available to study and poke over at GitHub</a
          >.
        </p>

        <h3>Changes</h3>

        <ul>
          <li>
            <strong>NEXT</strong>
            <ul>
              <li>
                New: tap tempo. Select any song and click tap tempo button in
                tempo for few times to add BPM to a song.
              </li>
              <li>
                New: added calculations for scripted and unscripted minutes +
                estimation of number of needed songs (based on given song
                average length)
              </li>
              <li>New: rows can now be selected and deleted</li>
              <li>New: added new section row type</li>
              <li>Enhancement: UI tweaks</li>
            </ul>
          </li>
          <li>
            <strong>2020-10-25 - 0.1 - First version</strong>
            <ul>
              <li>
                Basic demo with automatic starting time, rearranging w/
                drag&drop and adding of rows
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </main>
    <footer
      class="pt-8 pb-8 text-center text-white bg-black pb-8text-lg text-shadow"
    >
      <strong>Slipmat.io</strong> Radio Script Builder
      {{ version }}
      <br />
      <div class="text-base text-gray-100">
        Slipmat.io is a community for DJs and music lovers.
        <br />
        <!-- <span class="text-sm text-gray-400">Built on {{ buildTime }}</span> -->
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const user = 'uninen'
    const isDj = true
    const djDashboardUrl = '/dj/'
    const isAdmin = false
    const isAnonymous = false
    const debug = process.env.NODE_ENV === 'development'
    const open = ref(false)
    const version = '0.1a'

    return {
      user,
      isDj,
      isAdmin,
      isAnonymous,
      debug,
      open,
      version,
      djDashboardUrl,
    }
  },
})
</script>
