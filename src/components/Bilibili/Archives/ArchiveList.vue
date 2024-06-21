<template>
    <a-card class="bili_archives" :loading="listLoading">
        <template #title>
            稿件列表 第{{ pn }}/{{ page_n }}页，共计{{ total }}个稿件
        </template>
        <template #extra>
            <a-button @click="pn--">上一页</a-button>
            <a-button @click="pn++">下一页</a-button>
        </template>
        <a-list :max-height="530">
            <a-list-item v-for="i in data" class="bili_archive_item">
                <a-row :gutter="20">
                    <a-col :span="6">
                        <div class="bili_archive_cover" @click="bv_go(i.Archive.bvid)" >
                            <img :src="i.Archive.cover" referrerPolicy="no-referrer" />
                        </div>
                    </a-col>
                    <a-col :span="18" :div="true" class="bili_archive_info">
                        <div class="bili_archive_title" @click="bv_go(i.Archive.bvid)">
                            {{ i.Archive.title }}
                        </div>
                        <div class="bili_archive_info_status">
                            <span @click="bv_go(i.Archive.bvid)" >{{ i.Archive.bvid }}</span> - {{ i.Archive.state_desc }}
                        </div>
                        
                    </a-col>
                </a-row>
                
            </a-list-item>
        </a-list>
    </a-card>    
</template>
    
<script setup>
import { onMounted, ref, watch } from 'vue'
import requests from '@/utils/requests'
const data = ref()
const page_n = ref()
const pn = ref(1)
const ps = ref(10)
const total = ref()
const listLoading = ref(true)
const getArchiveList = (page)=>{
    requests.get('/api/bili_archives',{params: {'pn':page,'ps': 10}}).then(resp=>{
        data.value = resp.data.arc_audits;
        total.value = resp.data.page.count;
        page_n.value = parseInt(total.value / ps.value);
        if(total.value%ps.value!=0){
            page_n.value++;
        }
        listLoading.value = false
    }).catch(err=>{
        console.log(err);
    })
}
const bv_go = (bvid)=>{
    window.open('https://www.bilibili.com/video/'+bvid);
}
watch(pn,()=>{
    listLoading.value = true
    getArchiveList(pn.value)
})
onMounted(()=>{
    getArchiveList(pn.value)
})

</script>

    
<style scoped>
.bili_archives{
    max-width: 100%;
}
.bili_archives_header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center
}
.bili_archive_cover{
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: center;
    align-items: center;
}
.bili_archive_cover > img{
    width: 100%;
}
.bili_archive_info{
    height: 100px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.bili_archive_info_title{
    font-size: larger;
}
.bili_archive_info_status{
    font-size: small;
    color: rgb(var(--gray-7));
}
</style>