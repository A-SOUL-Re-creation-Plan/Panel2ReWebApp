<script setup>
import dateFormatter from '@/utils/dateFormatter'
const props = defineProps(['data'])
const data = props.data.modules.module_dynamic.major.archive

function go(bvid){
    let url = 'https://www.bilibili.com/video/'+bvid;
    window.open('javascript:window.name;', '<script>location.replace("'+url+'")<\/script>');
}
</script>

<template>
    <a-card :bordered="false">
        <template #cover> 
            <img :src="data.cover" referrerPolicy="no-referrer" @click="go(data.bvid)"/>
        </template>
        <template #title>
            {{ data.title }}
        </template>
        <template #actions>
            <span class="icon-hover" @click="go(data.bvid)"> <IconShareInternal /> 观看视频 </span>
        </template>
        <div v-html="data.desc" @click="go(data.bvid)"/>
    </a-card>
</template>

<style>

</style>