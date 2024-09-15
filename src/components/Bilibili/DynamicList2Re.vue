<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import DynamicDetail from './DynamicDetail.vue';
import requests from '@/utils/requests';
const baseURL = import.meta.env.VITE_APP_API_BASE;
const Re_info = ref({})
const Re_Loading = ref(true)

function refresh2ReDynamics(){
    Re_Loading.value=true;
    Re_info.value={}
    var params = {
        'uid': 547510303,
    }
    requests.get('/api/bili_dynamics',{baseURL: baseURL,params: params}).then(res=>{
        Re_info.value = res.data.items
        Re_Loading.value=false;

    }).catch(err=>{ 
        Re_info.value = err
        Re_Loading.value=false;
    })
}
onMounted(()=>{
    refresh2ReDynamics();
});
</script>

<template>
    <a-card class="bili_dynamics_2re">
        <template #title>
            二创计画动态
        </template>
        <template #extra>
            <a-link @click="refresh2ReDynamics()"><icon-sync /></a-link>
        </template>
        <div class="bili_dynamics_list">
            <a-list :bordered="false" :loading="Re_Loading" max-height="650px">
                <template v-for="i in Re_info">
                    <a-list-item v-if="!i.modules.module_tag" class="bili_dynamics_list_item">
                        <DynamicDetail :content="i"/>
                    </a-list-item>
                </template>
            </a-list>
        </div>
        
    </a-card>
    
</template>

<style>
    .bili_dynamics_list > *{
        width: 100%;
    }
</style>