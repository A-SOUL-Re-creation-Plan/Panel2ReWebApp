<script setup>
import { get_uat as get } from '@/utils/requests/uat_proxy'
import FullCalendar from '@fullcalendar/vue3'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { Modal } from '@arco-design/web-vue'
import { onMounted, ref } from 'vue';
import IntroGen from '@/utils/groups/video/IntroGeneratorLark';
const lark_cal = ref([])
const calendarLoading = ref(true)
// const getLarkCalendar = ()=>{
//     // requests.get('/api/lark_calendar_list').then(resp=>{
//     //     // lark_cal.value = resp.data
//     //     for(let i=0;i<resp.data.length;i++){
//     //         lark_cal.value.push(resp.data[i])
//     //     }
//     // }).catch(e=>{
//     //     console.log(e)
//     // })
// }
async function getLarkCalendar (){
    await get('/api/lark_calendar_list').then(resp=>{
        for(let i=0;i<resp.length;i++){
            lark_cal.value.push(resp[i])
        }
        calendarLoading.value = false;
    })
}
const calendarOptions = {
    plugins: [ interactionPlugin, listPlugin ],
    initialView: 'listWeek',
    locale: 'zh-cn',
    timeZone: 'Asia/Shanghai',
    events: lark_cal.value,
    headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: ''
    },
    contentHeight: 345,
    firstDay: 1,
    eventClick:(info)=>{
        info.jsEvent.preventDefault();
        let t = info.event
        let c = IntroGen(t)
        Modal.info({
            title: '简介生成',
            content: c,
            modalStyle:{
                whiteSpace: "pre-wrap"
            },
            hideCancel: true,
            okText: '复制',
            onOk: navigator.clipboard.writeText(c)
        })
    }
}
onMounted(()=>{
    getLarkCalendar();
})
</script>

<template>
<a-card title="飞书日程 (beta)" :loading="calendarLoading">
    <FullCalendar :options="calendarOptions"/>
</a-card>
</template>

<style scoped>

</style>