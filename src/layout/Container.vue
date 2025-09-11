<template>
  <div id="route_container_fs" v-if="route.meta.fs">
    <RouterView />
  </div>
  <div id="route_container" v-else>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped>
#route_container {
  display: flex;
  overflow-x: hidden;
  padding: 15px 15px 15px 15px;
  min-height: calc(100% - 30px);
  max-height: calc(100% - 30px);
  scrollbar-width: thin;
}
#route_container_fs {
  display: flex;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
}
</style>
