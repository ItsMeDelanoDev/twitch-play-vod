<template>
  <section>
    <h2 class="text-lg sm:text-xl font-bold">
      What about these <span class="text-yellow-500 underline">{{ vods.length }}</span> latest VODS by <a
        :href="`https://www.twitch.tv/${vods[0].user_login}`"
        target="_blank"
        rel="noopener noreferrer"
        class="text-yellow-500"
      >{{ vods[0].user_name }}</a>
    </h2>
    <div class="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <Vod
        v-for="vod of vods"
        :key="vod.id"
        :vod="vod"
      />
    </div>
  </section>
</template>

<script setup>
import Vod from "./Vod.vue";

defineProps({
  vods: {
    type: Array,
    required: true
  }
})
</script>

