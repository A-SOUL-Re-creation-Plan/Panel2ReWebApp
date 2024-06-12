<script setup>
import { onBeforeMount } from 'vue';

const props = defineProps(['data'])


const dynamic_id = props.data.id_str
const data = props.data.modules.module_dynamic.desc
const imgs = props.data.modules.module_dynamic.major.draw.items
function go(url){
    window.open('javascript:window.name;', '<script>location.replace("'+url+'")<\/script>');
}
</script>

<template>
    <a-card :bordered="false">
        <div class="bili_dynamic_normal" v-html="data.text" @click="go('https://www.bilibili.com/opus/'+dynamic_id)"/>
        <br/>
        <div class="bili_dynamic_drawimg">
            <span class="bili_dynamic_drawimg_tips">
                单击图片查看原图
            </span>
            <a-row :gutter="10">
                <a-col :span="8" v-for="i in imgs">
                    <img :src="i.src" width="100%" @click="go(i.src)" class="bili_dynamic_drawimg_items" referrerPolicy="no-referrer"/>
                </a-col>
            </a-row>
        </div>
    </a-card>
</template>

<style>
    .bili_dynamic_drawimg_items{
        aspect-ratio: 1
    }
    .bili_dynamic_drawimg_tips{
        font-size: 10px;
        color: gray;
    }
</style>