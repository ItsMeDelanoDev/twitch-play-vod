<template>
  <a
    :href="`https://www.twitch.tv/videos/${vod.id}`"
    target="_blank"
    rel="noopener noreferrer"
    class="relative rounded overflow-clip"
    @mouseover="show = true"
    @mouseleave="show = false"
  >
    <img
      class="block w-full h-full"
      :src="imageUrl"
      :alt="vod.title"
    >
    <div
      v-if="show"
      class="absolute bottom-0 inset-x-0 flex p-2 bg-slate-900 opacity-90 text-xs"
    >
      <p>
        {{ vod.title }}
      </p>
    </div>
  </a>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  vod: {
    type: Object,
    required: true
  }
})
const width = "1280"
const height = "720"
const imageUrl = props.vod.thumbnail_url.replace('%{height}', height).replace('%{width}', width)

const show = ref(false)
</script>
