<script setup>
import Main from '@/layout/Main.vue';
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
  @import url('https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&family=Noto+Sans+SC:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  * {
    font-family: "Roboto", "Noto Sans SC", "Noto Color Emoji", 'Microsoft YaHei', PingFang, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
  #mainlayout, body, html {
    height: 100vh;
    max-height: 100vh;
  }
  .arco-layout{
    height: inherit;
    max-height: inherit;
  }
</style>
