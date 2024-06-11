<template>
    <a-card title="哔哩哔哩动态">
        <template #extra>
            <a-link @click="getList({'refresh':1})"><icon-sync /></a-link>
        </template>
        <a-row :gutter="15">
            <a-empty v-if="d_data==''"/>
            <a-col class="bili_dynamic" v-for="i in d_data" :span="12" :key="i.id" v-else>
                <a-card class="bili_dynamic_item" hoverable @click="showDrawer(i.bili_uid)">
                    <a-space size="large">
                        <a-avatar :size="54">
                            <img :src="i.avatar" height="inherit" referrerPolicy="no-referrer"/>
                        </a-avatar>
                        {{ i.name }}
                    </a-space>
                </a-card>
            </a-col>
        </a-row>
    </a-card>
    <a-drawer
        :visible="bili_dynamic_viewer_visible"
        @ok="bili_dynamic_viewer_visible=false"
        @cancel="bili_dynamic_viewer_visible=false"
        width="650px"
        class="bili_dynamics_drawer"
    >
        <template #title>
            动态查看（近期）{{ drawer_uid }}
        </template>
        <a-card>
            <a-list :bordered="false" :loading="!drawer_info.length">
                <a-list-item v-for="i in drawer_info">
                    <DynamicDetail :content="i"/>
                </a-list-item>
            </a-list>
        </a-card>
    </a-drawer>
</template>
    
<script setup>
import { ref, onMounted } from 'vue';
import DynamicDetail from './DynamicDetail.vue';
import requests from '@/utils/requests';
const baseURL = import.meta.env.VITE_APP_API_BASE;
const d_data = ref()
const bili_dynamic_viewer_visible = ref(false)
const drawer_uid = ref(2)
const drawer_info = ref({})
function getList(args){
    const params = args
    requests.get('/api/bili_dynamic',{baseURL: baseURL,params: params}).then(res=>{
        d_data.value=res.data
    }).catch(err=>{
        d_data.value=err.code
    })
}
function getUserInfo(uid){
    var params = {
        'uid': uid,
    }
    requests.get('/api/bili_dynamics',{baseURL: baseURL,params: params}).then(res=>{
        drawer_info.value = res.data
    }).catch(err=>{
        drawer_info.value = err
    })
}
function showDrawer(uid){
    drawer_info.value = {}
    getUserInfo(uid);
    bili_dynamic_viewer_visible.value=true
    drawer_uid.value=uid
}
onMounted(()=>{
    getList({});
});
</script>

    
<style scoped>
    .bili_dynamic{
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .bili_dynamic_item{
        cursor: pointer;
    }
</style>