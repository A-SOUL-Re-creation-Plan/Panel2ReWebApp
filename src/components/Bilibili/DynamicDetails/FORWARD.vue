<script setup>
import DynamicDetail from '@/components/Bilibili/DynamicDetail.vue'
const props = defineProps(['data'])
console.log(props.data)
const data = props.data.modules.module_dynamic.desc
const orig = props.data.orig
</script>

<template>
    <a-card :bordered="false">
        <div class="bili_dynamic_normal" v-html="data.text"/>
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