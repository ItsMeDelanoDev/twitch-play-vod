<template>
  <div class="flex flex-col min-h-full">
    <div class="bg-slate-800 pb-32">
      <NavBar />
    </div>

    <main class="-mt-20">
      <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-slate-700 rounded-lg shadow px-5 py-6 sm:px-6">
          <AuthenticateWithTwitch v-if="!twitch.isAuthenticated.value" />
          <div
            v-else
            class="text-white"
          >
            <form
              @submit="searchVod"
              @submit.prevent
            >
              <div class="flex flex-col sm:flex-row space-x-0 space-y-3 sm:space-x-4 sm:space-y-0 text-slate-800">
                <div>
                  <label
                    class="block text-sm font-medium text-white"
                    for="channel"
                  >
                    Channel name
                  </label>
                  <input
                    id="channel"
                    v-model="channelModel"
                    class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                    type="text"
                    placeholder="channel"
                  >
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-white"
                    for="datetime"
                  >
                    Datetime
                  </label>
                  <input
                    id="datetime"
                    v-model="dateTimeModel"
                    class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                    type="datetime-local"
                    step="1"
                  >
                </div>
                <div class="flex flex-col sm:flex-row">
                  <button
                    :disabled="!channelModel"
                    type="submit"
                    class="mt-3 sm:mt-5 flex p-2 justify-center items-center text-white font-bold bg-slate-600 hover:bg-slate-800 transition-colors rounded hover:disabled:cursor-not-allowed"
                  >
                    Search VOD
                  </button>
                </div>
              </div>
            </form>

            <div
              class="mt-10"
            >
              <h2
                v-if="noResults"
                class="text-xl font-bold"
              >
                No results found
              </h2>

              <div v-if="foundVod.id">
                <h2 class="text-xl font-bold">
                  Found VOD matching selected timespan
                </h2>
                <div class="mt-2">
                  <VodPlayer :vod="foundVod" />
                </div>
              </div>
            </div>

            <VodList
              v-if="videos.length > 0"
              class="mt-10"
              :vods="videos"
            />
          </div>
        </div>
      </div>
    </main>

    <footer class="flex space-x-6 mt-auto p-3 font-bold transition-colors">
      <a
        href="https://www.twitch.tv/security_live/"
        target="_blank"
        class="ml-auto text-yellow-600 hover:text-gray-500"
      >Credits to Security Live</a>

      <a
        class="text-yellow-600 hover:text-gray-500"
        target="_blank"
        href="https://github.com/johnebgood/twitch-play-vod"
      >
        Original Github
      </a>
    </footer>
  </div>
</template>

<script setup>
import {ref} from "vue";
import NavBar from "../components/NavBar.vue";
import AuthenticateWithTwitch from "../components/AuthenticateWithTwitch.vue";
import useTwitch from "../composables/useTwitch.js";
import VodList from "../components/VodList.vue";
import VodPlayer from "../components/VodPlayer.vue";

const twitch = useTwitch()

const channelModel = ref('')
const dateTimeModel = ref('')

const noResults = ref();
const videos = ref([]);
const foundVod = ref({});

const searchVod = async () => {
  noResults.value = true
  const channel = channelModel.value
  if (!channel) {
    return
  }

  videos.value = await twitch.getVideosByChannel(channel)
  if (videos.value.length === 0) {
    return
  }

  const foundVideo = videos.value.find((video) => {
    const { created_at, duration } = video

    const seconds = durationStringToSeconds(duration)
    if (seconds === 0) return false

    const createdEpoch = new Date(created_at).getTime() / 1000;
    const pickedEpoch = new Date(dateTimeModel.value).getTime() / 1000;
    video.timeToStart = secondsToDurationString(pickedEpoch - createdEpoch)

    const endedEpoch = createdEpoch + seconds;
    return pickedEpoch > createdEpoch && pickedEpoch < endedEpoch
  })

  videos.value = videos.value.splice(1)

  if (!foundVideo) {
    noResults.value = false
    return
  }

  foundVod.value = foundVideo
}

const durationStringToSeconds = (duration) => {
  const durationHours = duration.match(/(\d+)h/) || 0;
  const durationMinutes = duration.match(/(\d+)m/) || 0;
  const durationSeconds = duration.match(/m(\d+)s/) || 0;

  let seconds = 0
  seconds += parseInt(durationHours[1]) * 3600;
  seconds += parseInt(durationMinutes[1]) * 60;
  seconds += parseInt(durationSeconds[1]);
  return seconds
}

const secondsToDurationString = (offset) => {
  const hours = Math.floor(offset / 3600);
  const minutes =  Math.floor((offset - (hours * 3600)) / 60)
  const seconds =  Math.floor(offset - ((hours * 3600) + (minutes * 60)))

  return `${hours}h${minutes}m${seconds}s`
}
</script>
