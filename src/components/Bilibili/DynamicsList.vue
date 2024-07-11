<template>
    <a-card title="哔哩哔哩动态">
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
            动态查看{{ drawer_uid }}
        </template>
        <a-list
            :bordered="false"
            :loading="!drawer_info.length"
            v-infinite-scroll="dynamicScrollMonitor"
            :infinite-scroll-disabled="has_more"
            infinite-scroll-watch-disabled="has_more"
        >
            <a-list-item v-for="i in drawer_info">
                <DynamicDetail :content="i"/>
            </a-list-item>
            <template #scroll-loading>
                <div v-if="!has_more">暂无更多</div>
                <a-spin v-else />
            </template>
        </a-list>
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

var offset = ""
var has_more = false
const busyFetchDynamic = ref(false)

function getList(){
    requests.get('/api/bili_dynamic',{baseURL: baseURL}).then(res=>{
        d_data.value=res.data
    }).catch(err=>{
        d_data.value=''
    })
}
function getUserInfo(uid){
    var params = {
        'uid': uid,
        "offset": offset
    }
    requests.get('/api/bili_dynamics',{baseURL: baseURL,params: params}).then(res=>{
        drawer_info.value = res.data.items
        offset = res.data.offset  
        has_more = res.data.has_more
    }).catch(err=>{
        drawer_info.value = err
    })
}
function showDrawer(uid){
    drawer_info.value = {}
    getUserInfo(uid);
    bili_dynamic_viewer_visible.value = true
    drawer_uid.value=uid
}
const dynamicScrollMonitor = ()=>{
    if(drawer_info.value.length){
        console.log("Reached")
        var params = {
            'uid': drawer_uid.value,
            "offset": offset
        }
        requests.get('/api/bili_dynamics',{baseURL: baseURL,params: params}).then(res=>{
            res.data.items.forEach(d => {
                drawer_info.value.push(d)
            });
            offset = res.data.offset  
            has_more = res.data.has_more
        })
    }
}
onMounted(()=>{
    getList();
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