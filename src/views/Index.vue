<template>
    <a-layout class="index">
        <a-row :gutter="{md: 20}">
            <a-col id="index_a" :lg="11" :sm="24">
                <DynamicsList/>
            </a-col>
            <a-col id="index_b" :lg="13" :sm="24">
                <!-- <LarkCalendar/> -->
                <DynamicsList2Re/>
            </a-col>
        </a-row>
    </a-layout>
</template>
    
<script setup>
import DynamicsList from '@/components/Bilibili/DynamicsList.vue'
import DynamicsList2Re from '@/components/Bilibili/DynamicList2Re.vue'
// import LarkCalendar from '@/components/Lark/LarkCalendar.vue'
</script>

    
<style>
    .index>.arco-row>.arco-col > *{
        margin-bottom: 15px;
    }
</style>
    