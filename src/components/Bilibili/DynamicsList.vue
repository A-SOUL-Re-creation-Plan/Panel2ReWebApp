<template>
    <a-card title="哔哩哔哩动态">
        <a-row :gutter="15">
            <a-empty v-if="d_data==''"/>
            <a-col class="bili_dynamic" v-for="i in d_data" :xl="12" :sm="24" :key="i.id" v-else>
                <a-card class="bili_dynamic_item" hoverable @click="showDrawer(i.mid)">
                    <a-space size="large">
                        <a-avatar :size="54">
                            <img :src="i.face" height="inherit" referrerPolicy="no-referrer" crossorigin="anonymous"/>
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
        class="bili_dynamics_drawer"
        :width="drawer_width"
        popup-container="#content"
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
const drawer_width = ref("45%")

var offset = ""
var has_more = false

function getList(){
    requests.get('/bili/dynamic').then(res=>{
        d_data.value=res.data.data
    }).catch(err=>{
        d_data.value=[]
    })
}
function getUserInfo(uid){
    var params = {
        'uid': uid,
        "offset": offset
    }
    requests.get('/bili/dynamics',{params: params}).then(res=>{
        drawer_info.value = res.data.data.items
        offset = res.data.data.offset  
        has_more = res.data.data.has_more
    }).catch(err=>{
        drawer_info.value = err
    })
}
function showDrawer(uid){
    drawer_info.value = {}
    offset = ""
    getUserInfo(uid);
    bili_dynamic_viewer_visible.value = true
    drawer_uid.value=uid
}
const dynamicScrollMonitor = ()=>{
    if(drawer_info.value.length && has_more == true){
        console.log("Reached")
        var params = {
            'uid': drawer_uid.value,
            "offset": offset
        }
        requests.get('/bili/dynamics',{baseURL: baseURL,params: params}).then(res=>{
            res.data.data.items.forEach(d => {
                drawer_info.value.push(d)
            });
            offset = res.data.data.offset
            has_more = res.data.data.has_more
        })
    }else{
        console.log("No more dynamic")
    }
}
const getWindowWidth = ()=>{
    if(window.innerWidth <= 864){
        drawer_width.value = "100%"
    }else{
        drawer_width.value = "45%"
    }
}
onMounted(()=>{
    getList();
    getWindowWidth();
    window.addEventListener('resize',getWindowWidth)
});
</script>

    
<style>
    .bili_dynamic{
        margin-top: 5px;
        margin-bottom: 5px;
        width: 100%;
    }
    .bili_dynamic_item{
        cursor: pointer;
        width: 100%;
    }
    .bili_dynamics_drawer{
        height: 100%;
    }
</style>