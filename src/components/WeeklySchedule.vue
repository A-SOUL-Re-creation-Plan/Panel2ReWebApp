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
    }).catch(err=>{
        weekly_schedule.value=''
    })
    console.log(weekly_schedule.value)
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