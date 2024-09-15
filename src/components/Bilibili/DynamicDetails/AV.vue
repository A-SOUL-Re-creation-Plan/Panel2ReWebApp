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
        <div class="bili_dynamic_title">
            {{ data.title }}
        </div>
        <template #actions>
            <span class="icon-hover" @click="go(data.bvid)"> <IconShareInternal /> 观看视频 </span>
        </template>
        <div>
            <img :src="data.cover"  referrerPolicy="no-referrer" @click="go(data.bvid)" style="object-fit: cover;width: 100%;"/>
        </div>
        <div v-html="data.desc" @click="go(data.bvid)"/>
    </a-card>
</template>

<style scoped>
.bili_av_title{
    color: #000000;
    font-weight: bold;
    font-size: medium;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: lightgray 1px solid;
}
</style>