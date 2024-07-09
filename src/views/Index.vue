<template>
    <a-layout class="index">
        <a-row :gutter="20">
            <a-col id="index_a" :span="11">
                <DynamicsList/>
            </a-col>
            <a-col id="index_b" :span="13">
                <LarkCalendar/>
                <DynamicsList2Re/>
            </a-col>
        </a-row>
    </a-layout>
</template>
    
<script setup>
import DynamicsList from '@/components/Bilibili/DynamicsList.vue'
import DynamicsList2Re from '@/components/Bilibili/DynamicList2Re.vue'
import LarkCalendar from '@/components/Lark/LarkCalendar.vue'
</script>

    
<style>
    .index>.arco-row>.arco-col > *{
        margin-bottom: 15px;
    }
</style>
    