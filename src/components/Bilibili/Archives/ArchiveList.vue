<template>
    <a-card class="bili_archives">
        <template #title>
            稿件列表
        </template>
        <template #extra>
            <icon-sync @click="onPageChange" />
        </template>
        <a-space direction="vertical" fill align="center">
            <a-list :max-height="530" :loading="listLoading">
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
            <a-pagination :total="total" v-model:current="pn" @change="onPageChange" showTotal/>
        </a-space>
    </a-card>    
</template>
    
<script setup>
import { onMounted, ref, watch } from 'vue'
import requests from '@/utils/requests'
const data = ref()
const pn = ref(1)
const ps = ref(10)
const total = ref(0)
const listLoading = ref(true)
const getArchiveList = (page)=>{
    requests.get('/api/bili_archives',{params: {'pn':page,'ps': 10}}).then(resp=>{
        data.value = resp.data.arc_audits;
        total.value = resp.data.page.count;
        listLoading.value = false
    }).catch(err=>{
        console.log(err);
    })
}
const bv_go = (bvid)=>{
    window.open('https://www.bilibili.com/video/'+bvid);
}
const onPageChange = ()=>{
    listLoading.value = true;
    getArchiveList(pn.value)
}
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