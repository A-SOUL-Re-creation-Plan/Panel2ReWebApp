<script setup>
import requests from '@/utils/requests'
import { onMounted, ref } from 'vue';
const data = ref([])
const getLarkCalendar = ()=>{
    requests.get('/api/lark_calendar_list').then(resp=>{
        data.value = resp.data
    }).catch(e=>{
        console.log(e)
    })
}
onMounted(()=>{
    getLarkCalendar();
})
</script>

<template>
<a-card title="飞书日程 (beta)">
    <!-- todo -->
</a-card>
</template>

<style scoped>

</style>