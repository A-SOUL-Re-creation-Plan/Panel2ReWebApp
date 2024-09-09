<!-- todo 边栏改为从路由动态读取信息而不是写死 -->
<template>
    <a-menu>
      <a-sub-menu key="0">
        <template #icon><icon-apps /></template>
        <template #title>主页</template>
        <a-menu-item key="0-1"><RouterLink to='/'>主页</RouterLink></a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="1">
        <template #icon><icon-video-camera /></template>
        <template #title>录播切片组</template>
        <a-menu-item key="1-1"><RouterLink to='/groups/video'>主页</RouterLink></a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="2">
        <template #icon><icon-image /></template>
        <template #title>封面组</template>
        <a-menu-item key="2-1"><RouterLink to='/groups/cover'>主页</RouterLink></a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="3">
        <template #icon><icon-tool /></template>
        <template #title>小工具</template>
        <a-menu-item key="3-1"><RouterLink to='/groups/tools'>主页</RouterLink></a-menu-item>
      </a-sub-menu>
    </a-menu>
    
</template>
    
<script setup>
import { RouterLink } from 'vue-router';


</script>

    
<style scoped>

</style>