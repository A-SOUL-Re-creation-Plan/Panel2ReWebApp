<!-- todo 边栏改为从路由动态读取信息而不是写死 -->
<template>
    <a-menu>
      <RouterLink to='/'>
        <a-menu-item key="0">
          <template #icon>
            <icon-home />
          </template>
          主页
        </a-menu-item>
      </RouterLink>
      <RouterLink to='/groups/video'>
        <a-menu-item key="1">
          <template #icon>
            <icon-video-camera />
          </template>
          录播/切片小组
        </a-menu-item>
      </RouterLink>
      <RouterLink to='/groups/cover'>
        <a-menu-item key="2">
          <template #icon>
            <icon-image />
          </template>
          封面组
        </a-menu-item>
      </RouterLink>
      <RouterLink to='/tools'>
        <a-menu-item key="3">
          <template #icon>
            <icon-tool />
          </template>
          小工具
        </a-menu-item>
      </RouterLink>
    </a-menu>
    
</template>
    
<script setup>
import { RouterLink } from 'vue-router';

</script>

    
<style scoped>

</style>