<template>
  <nav class="bg-slate-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="relative h-16 flex items-center justify-between">
        <div class="px-2 flex items-center lg:px-0 space-x-10">
          <div class="flex items-center flex-shrink-0">
            <img
              class="block h-8 w-8"
              src="../assets/logo.png"
              alt="VOD Seeker by Security Live"
            >

            <h1 class="ml-4 text-2xl text-white font-bold relative">
              Twitch VOD Seeker
            </h1>
          </div>
        </div>

        <div
          v-if="twitch.isAuthenticated && user"
          class="lg:block lg:ml-4"
        >
          <div class="flex items-center">
            <Menu
              as="div"
              class="ml-3 relative flex-shrink-0"
            >
              <div>
                <MenuButton class="bg-slate-600 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-600 focus:ring-white">
                  <span class="sr-only">Open user menu</span>
                  <img
                    v-if="user.profile_image_url"
                    class="rounded-full h-8 w-8"
                    :src="user.profile_image_url"
                    alt=""
                  >
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="origin-top-right absolute right-0 mt-2 whitespace-nowrap rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    <span class="block w-full py-2 px-4 text-sm text-gray-700 text-left">
                      Logged in as <span class="font-bold">{{ user.display_name }}</span>
                    </span>
                  </MenuItem>
                  <MenuItem
                    v-slot="{ active }"
                    class="border-t border-t-slate-200"
                  >
                    <button
                      class="block w-full py-2 px-4 text-sm text-gray-700 text-left"
                      @click="twitch.signOut()"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {useUserStore} from "../store/user.js";
import useTwitch from "../composables/useTwitch.js";

const user = useUserStore()
const twitch = useTwitch()
</script>
