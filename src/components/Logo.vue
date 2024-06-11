<template>
  <img src="@/assets/logo.png" :height="size.height" :width="size.width"/>
</template>
    
<script setup>
import { defineProps } from 'vue'
const size=defineProps(['height','width'])

</script>
    
<style scoped>

</style>
    