<template>
    <a-card class="bili_archives">
        <template #title>
            稿件列表
        </template>
        <template #extra>
            <icon-sync @click="onPageChange" />
        </template>
        <a-space direction="vertical" fill>
            <a-select defaultValue="pubed,not_pubed,is_pubing" :style="{width:'300px'}" placeholder="稿件类别..." v-model:model-value="status" @change="onPageSizeFilterChange">
                <a-option value="pubed,not_pubed,is_pubing" label="全部稿件"/>
                <a-option value="pubed" label="通过"/>
                <a-option value="not_pubed" label="未通过"/>
                <a-option value="is_pubing" label="处理中"/>
            </a-select>
            <a-list :max-height="530" :loading="listLoading">
                <a-list-item v-for="i in data" class="bili_archive_item">
                    <a-row :gutter="20">
                        <a-col :span="7">
                            <div class="bili_archive_cover" @click="go(i.cover)" >
                                <img :src="i.cover" referrerPolicy="no-referrer" />
                            </div>
                        </a-col>
                        <a-col :span="17" :div="true" class="bili_archive_info">
                            <div class="bili_archive_title" @click="go('https://bilibili.com/video/'+i.bvid)">
                                {{ i.title }}
                            </div>
                            <div v-if="!(i.state_panel in [0, 1])">
                                <span style="color: rgb(var(--orange-7));font-size: medium;" @click="problemClick(i)">
                                    <IconExclamationCircle/>
                                    {{ i.state_desc }}
                                    : <u>详情</u>
                                </span>
                            </div>
                            <div class="bili_archive_info_status">
                                <span>
                                    {{ formatDate(new Date(i.ctime*1000)) }}
                                </span>
                                 - 
                                <span @click="BvidClick(i.bvid)">{{ i.bvid }}</span>
                                 - 
                                <span v-bind:class="{'bili_archive_info_highlight': !(i.state_panel in [0, 1]) }">{{ i.state_desc }}</span>
                                 - code:
                                <span>{{ i.state }}</span>
                            </div>
                        </a-col>
                    </a-row>
                </a-list-item>
            </a-list>
            <a-pagination
                :total="total"
                v-model:current="pn"
                v-model:page-size="ps"
                @change="onPageChange"
                @page-size-change="onPageSizeFilterChange"
                showTotal
                show-page-size
            />
        </a-space>
    </a-card>    
</template>
    
<script setup>
import { onMounted, ref, watch } from 'vue'
import requests from '@/utils/requests'
import formatDate from '@/utils/dateFormatter';
import { Message, Modal } from '@arco-design/web-vue';
const data = ref()
const pn = ref(1)
const ps = ref(10)
const status = ref("pubed,not_pubed,is_pubing")
const total = ref(0)
const listLoading = ref(true)
const getArchiveList = ()=>{
    requests.get('/api/bili_archives',{params: {'pn':pn.value,'ps': ps.value, 'status': status.value}}).then(resp=>{
        data.value = resp.data.items;
        total.value = resp.data.page.count;
        listLoading.value = false
    }).catch(err=>{
        console.log(err);
    })
}
const onPageChange = ()=>{
    listLoading.value = true;
    getArchiveList()
}
const onPageSizeFilterChange = ()=>{
    pn.value=1;
    listLoading.value = true;
    getArchiveList();
}
const go = (url)=>{
    window.open('javascript:window.name;', '<script>location.replace("'+url+'")<\/script>')
}
onMounted(()=>{
    getArchiveList()
})
const BvidClick = (bvid)=>{
    navigator.clipboard.writeText(bvid)
    Message.info("已复制BV号到剪切板")
}
const problemClick = (info)=>{
    if (info.state_panel == 4) {
        requests.get('/api/bili_xcode_msg', {params: {'bvid': info.bvid}}).then(resp=>{
            Modal.info({
                title: '稿件诊断',
                content: resp.data.msg,
                hideCancel: true,
            })
        }).catch(e=>{
            console.error(e)
        })
    }else{
        Modal.info({
            title: (info.problem_description_title.length < 2) ? '稿件问题' : info.problem_description_title,
            content: info.reject_reason + '\n' + info.problem_description + '\n\n' + info.modify_advise,
            hideCancel: true,
            modalStyle: {
                whiteSpace: "pre-wrap"
            }
        })
    }
}

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
    width: 90%;
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
.bili_archive_info_highlight{
    color: rgb(var(--orange-6));
}
</style>