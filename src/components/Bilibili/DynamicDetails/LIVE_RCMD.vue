<script setup>
import { ref } from 'vue'
import dateFormatter from '@/utils/dateFormatter'
const props = defineProps(['data'])
const data = ref(JSON.parse(props.data.modules.module_dynamic.major.live_rcmd.content).live_play_info)
function go(url){
    window.open('javascript:window.name;', '<script>location.replace("https:'+url+'")<\/script>');
}
const live_start_time = dateFormatter(new Date(data.value.live_start_time*1000))
</script>

<template>
    <a-card :bordered="false">
        <template #cover>
            <img :src="data.cover" referrerPolicy="no-referrer" @click="go(data.link)"/>
        </template>
        <template #title>
            直播标题： {{ data.title }}
        </template>
        <template #actions>
            <span>开始于：{{ live_start_time }}</span>
            <span class="icon-hover" @click="go(data.link)"> <IconShareInternal /> 进入直播间 </span>
        </template>
    </a-card>
</template>

<style>

</style>