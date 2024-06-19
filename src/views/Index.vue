<template>
    <a-layout id="index">
        <a-row :gutter="20">
            <a-col id="index_a" :span="11">
                <DynamicsList/>
            </a-col>
            <a-col id="index_b" :span="13">
                <WeeklySchedule/>
                <!-- <DynamicsList2Re/> -->
            </a-col>
        </a-row>
    </a-layout>
</template>
    
<script setup>
import DynamicsList from '@/components/Bilibili/DynamicsList.vue'
// import DynamicsList2Re from '@/components/Bilibili/DynamicList2Re.vue'
import WeeklySchedule from '@/components/WeeklySchedule.vue'
</script>

    
<style>
    #index>.arco-row>.arco-col > *{
        margin-bottom: 15px;
    }
</style>
    