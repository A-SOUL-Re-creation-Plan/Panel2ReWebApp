<script setup>
import FullCalendar from '@fullcalendar/vue3'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { ref, reactive, onMounted } from 'vue'
import { Modal } from '@arco-design/web-vue'
import requests from '@/utils/requests'
import IntroGenerator from '@/utils/groups/video/IntroGenerator'
const weekly_schedule = ref([]) 
async function getSchedules(){
    requests.get('/api/weekly_schedule').then(resp=>{
        weekly_schedule.value=resp.data.data
        for(let i=0;i<weekly_schedule.value.length;i++){
            calendarOptions.events.push(weekly_schedule.value[i])
        }
    }).catch(err=>{
        weekly_schedule.value=''
    })
}
const calendarOptions = {
    plugins: [ interactionPlugin, listPlugin ],
    initialView: 'listWeek',
    locale: 'zh-cn',
    timeZone: 'Asia/Shanghai',
    events: weekly_schedule.value,
    headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: ''
    },
    contentHeight: 335,
    firstDay: 1,
    eventClick:(info)=>{
        info.jsEvent.preventDefault();
        let t = info.event
        Modal.info({
            title: '简介生成',
            content: IntroGenerator(t),
            modalStyle:{
                whiteSpace: "pre-wrap"
            },
            hideCancel: true,
            okText: '复制',
            onOk: navigator.clipboard.writeText(IntroGenerator(t))
        })
        
    }
}
onMounted(()=>{
    getSchedules()
})
</script>

<template>
<a-card hoverable title="直播日程表">
    <a-empty v-if="!weekly_schedule.length"/>
    <FullCalendar :options="calendarOptions" v-else/>
</a-card>
</template>

<style scoped>

</style>