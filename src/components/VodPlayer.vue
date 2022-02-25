<template>
  <div
    ref="player"
    class="w-full aspect-video rounded-t overflow-clip"
  />

  <div class="bg-slate-900 flex p-3 items-center rounded-b">
    <a
      class="text-yellow-600"
      :href="link"
      target="_blank"
      rel="noopener noreferrer"
    >{{ link }}</a>

    <button
      class="flex p-2 ml-auto text-white bg-slate-600 hover:bg-slate-800 transition-colors rounded"
      @click="toClipboard"
    >
      <ClipboardIcon class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";

import {ClipboardIcon} from '@heroicons/vue/outline'

const props = defineProps({
  vod: {
    type: Object,
    required: true
  }
})

const player = ref(null)
onMounted(() => {
  setPlayer(props.vod)
})
watch(() => props.vod, (vod) => { setPlayer(vod) }, { deep: true } )

const setPlayer = (vod) => {
  const options = {
    width: '100%',
    height: '100%',
    video: vod.id,
    time: vod.timeToStart
  };

  player.value.innerHTML = ''
  new window.Twitch.Player(player.value, options);
}

const link = computed(() => `https://www.twitch.tv/videos/${props.vod.id}?t${props.vod.timeToStart}`)
const toClipboard = () => {
  navigator.clipboard.writeText(link.value)
  alert('Link copied to clipboard');
}

</script>
