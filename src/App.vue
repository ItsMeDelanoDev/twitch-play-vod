<template>
  <router-view />
</template>

<script setup>
import useTwitchAuth from "./composables/useTwitch.js";

const twitchAuth = useTwitchAuth()
twitchAuth.login()
</script>
