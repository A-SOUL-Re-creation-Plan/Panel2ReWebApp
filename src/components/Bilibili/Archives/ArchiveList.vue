<template>
    <a-list class="bili_archives">
        <template #header>
            a
        </template>
        <a-list-item v-for="i in data" class="bili_archive_item">
            <a-row :gutter="20">
                <a-col :span="6">
                    <div class="bili_archive_cover">
                        <img :src="i.Archive.cover" referrerPolicy="no-referrer"/>
                    </div>
                </a-col>
                <a-col :span="18" :div="true" class="bili_archive_info">
                    <div class="bili_archive_title">
                        {{ i.Archive.title }}
                    </div>
                    <div class="bili_archive_info_status">
                        {{ i.Archive.bvid }} - {{ i.Archive.state_desc }}
                    </div>
                    
                </a-col>
            </a-row>
            
        </a-list-item>
    </a-list>    
</template>
    
<script setup>
import { onMounted, ref } from 'vue'
import requests from '@/utils/requests'
const data = ref()
onMounted(()=>{
    requests.get('/api/bili_archives').then(resp=>{
        data.value = resp.data
        console.log(resp.data)
    }).catch(err=>{
        console.log(err)
    })
})

</script>

    
<style scoped>
.bili_archives{
    max-width: 100%;
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