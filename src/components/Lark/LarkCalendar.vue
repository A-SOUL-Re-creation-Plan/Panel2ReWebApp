<script setup>
import { get_uat as get } from '@/utils/requests/uat_proxy'
import FullCalendar from '@fullcalendar/vue3'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { onMounted, ref } from 'vue';
import IntroGen from '@/utils/groups/video/IntroGeneratorLark';
const lark_cal = ref([])
const calendarLoading = ref(true)
const IntroModalVisible = ref(false)
const IntroModalLR = ref("")
const IntroModalContent = ref("")
const IntroModalHide = ()=>{
    IntroModalVisible.value = false;
}
const IntroModalLRCopy = () => {
    navigator.clipboard.writeText(IntroModalLR.value)
}
const IntroModalContentCopy = () => {
    navigator.clipboard.writeText(IntroModalContent.value)
    IntroModalHide()
}
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
        IntroModalVisible.value = true;
        let t = info.event
        IntroModalLR.value = info.event.url
        IntroModalContent.value = IntroGen(t)
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
<a-modal
    :visible="IntroModalVisible"
    title="简介生成"
    ok-text="复制"
    :mask-closable="true"
    title-align="center"
    status="info"
    @cancel="IntroModalHide"
    :simple="true"
    :modal-style='{"white-space": "pre-wrap"}'
>
    <div><b>当日直播间</b></div>
    <div>{{ IntroModalLR }}</div>
    <div><b>简介</b></div>
    <div>{{ IntroModalContent }}</div>
    <template #footer>
        <a-button @click="IntroModalLRCopy">复制直播间地址</a-button>
        <a-button @click="IntroModalContentCopy" type="primary">复制简介</a-button>
    </template>
</a-modal>
</template>

<style scoped>

</style>