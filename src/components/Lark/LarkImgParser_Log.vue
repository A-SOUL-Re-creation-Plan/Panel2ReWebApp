<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import requests from '@/utils/requests'
const props = defineProps(['data'])

const HuaTuoMLLog = ref([])
const HuaTuoML_Result = ref()
const fetchHuaTuoMLLog = ()=>{
    requests.get('/api/lark_calendar_parse/status',{params: {'uuid': props.data}}).then(resp=>{
        HuaTuoMLLog.value = resp.data.messages
        if(resp.data.status != 'success'){
            setTimeout(() => {
                fetchHuaTuoMLLog()
            }, 1000);
        }else{
            requests.get('/api/lark_calendar_parse/output',{params: {'uuid': props.data}}).then(resp=>{
                HuaTuoML_Result.value = resp.data.data
            })
        }
    }).catch(e=>{
        console.log(e)
    })
}
onMounted(()=>{
    fetchHuaTuoMLLog()
})
</script>

<template>
    <a-space direction="vertical">
        <span>Task UUID: {{ props.data }}</span>
        <template v-for="log in HuaTuoMLLog">
            <span>{{ log }}</span>
        </template>
        <a-image width="100%" v-if="HuaTuoML_Result" :src="'data:image/jpeg;base64,'+HuaTuoML_Result" />
    </a-space>
</template>

<style scpoed>
.HuaTuoML_OutputImg{
    width: 100%;
}

</style>