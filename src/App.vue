<script setup>
import Main from '@/views/Main.vue';
const appName = import.meta.env.VITE_APP_NAME;
const dev = import.meta.env.DEV;
// console.log(import.meta.env)
document.title = appName;
</script>

<template>
  <div id="mainlayout">
    <Main/>
  </div>
</template>

<style>
  #mainlayout, body, html {
    height: 100vh;
    max-height: 100vh;
  }
  .arco-layout{
    height: inherit;
    max-height: inherit;
  }
</style>
