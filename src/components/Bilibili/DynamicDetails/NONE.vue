<script setup>
import dateFormatter from '@/utils/dateFormatter'
const props = defineProps(['data'])

const data = props.data.modules.module_dynamic.major.none

</script>

<template>
    <a-card :bordered="false">
        <b style="color: gray;">{{ data.tips }}</b>
    </a-card>
</template>

<style>

</style>