<script setup>
const props = defineProps(['data'])


const data = props.data.modules.module_dynamic.major.article

function go(url){
    window.open('javascript:window.name;', '<script>location.replace("'+url+'")<\/script>');
}
</script>

<template>

    <a-card :bordered="false">
        <template #cover v-for="i in data.covers"> 
            <img :src="i" referrerPolicy="no-referrer" @click="go(data.jump_url)"/>
        </template>
        <template #title>
            {{ data.title }}
        </template>
        <template #actions>
            <span @click="go(data.jump_url)"> <IconShareInternal /> 查看全文 </span>
        </template>
        <div v-html="data.desc+'...'" @click="go(data.jump_url)"></div>
    </a-card>
</template>

<style>
    .bili_dynamic_datetime{
        font-size: 12px
    }
</style>