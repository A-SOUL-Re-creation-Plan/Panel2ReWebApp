<template>
    <a-layout id="index" v-if="user.id!=''">
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
import DynamicsList2Re from '@/components/Bilibili/DynamicList2Re.vue'
import WeeklySchedule from '@/components/WeeklySchedule.vue'

import { useUserStore } from '@/stores/user';
import { Message } from '@arco-design/web-vue';
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
const user = storeToRefs(useUserStore());
onMounted(()=>{
    if(user.id.value==''){
        Message.error('请先登录。');
        useRouter().replace('/user/login');
    }
});
</script>

    
<style>
    #index{
        margin: 15px 15px;
    }
    #index>.arco-row>.arco-col > *{
        margin-bottom: 15px;
    }
</style>
    