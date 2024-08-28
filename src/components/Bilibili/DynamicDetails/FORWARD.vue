<script setup>
import DynamicDetail from '@/components/Bilibili/DynamicDetail.vue'
const props = defineProps(['data'])
const data = props.data.modules.module_dynamic.desc
const orig = props.data.orig
const dynamic_id = props.data.id_str
function go(url){
    window.open('javascript:window.name;', '<script>location.replace("'+url+'")<\/script>');
}
</script>

<template>
    <a-card :bordered="false">
        <div class="bili_dynamic_normal" v-html="data.text" @click="go('https://www.bilibili.com/opus/'+dynamic_id)"/>
        <span class="bili_dynamic_forwardflag">Forward from:</span>
        <DynamicDetail :content="orig"/>
    </a-card>
</template>

<style scoped>
    .bili_dynamic_forwardflag{
        line-height: 25px;
        font-size: smaller;
        color: rgb(var(--gray-7))
    }
</style>