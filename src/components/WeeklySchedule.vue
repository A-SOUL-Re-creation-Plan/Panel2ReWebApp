<script setup>
import FullCalendar from '@fullcalendar/vue3'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { ref, reactive, onMounted } from 'vue'
import requests from '@/utils/requests'
const weekly_schedule = ref([]) 
async function getSchedules(){
    requests.get('/api/weekly_schedule').then(resp=>{
        weekly_schedule.value=resp.data.data
        for(let i=0;i<weekly_schedule.value.length;i++){
            calendarOptions.events.push(weekly_schedule.value[i])
        }
        // console.log(weekly_schedule.value)
    }).catch(err=>{
        weekly_schedule.value={'msg': "failed"}
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
}
onMounted(()=>{
    getSchedules()
})
</script>

<template>
<a-card hoverable title="直播日程表">
    <FullCalendar :options="calendarOptions"/>
</a-card>
</template>

<style scoped>

</style>