<template>
  <div class="text-white">
    <div class="container flex justify-center">
      <a
        class="bg-purple-800 hover:bg-purple-900 transition-colors hover:cursor-pointer text-slate-100 font-bold p-3 rounded"
        :href="twitch.authUrl.value"
      >
        Authorize On Twitch
      </a>
    </div>
  </div>
</template>

<script setup>
import useTwitch from "../composables/useTwitch.js";
const twitch = useTwitch()
</script>
