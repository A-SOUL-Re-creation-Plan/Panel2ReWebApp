<script setup>
const props = defineProps(['data'])
const data = props.data.modules.module_dynamic.desc
const orig = props.data.orig
</script>

<template>
    <a-card :bordered="false">
        <div class="bili_dynamic_normal" v-html="data.text"/>
        Constructing
    </a-card>
</template>

<style>

</style>