<script setup>
import { introGen, LiveRoomList, LiveRoomListDict, LiveTypeDict } from '@/utils/groups/video/IntroGeneratorLegacy';
import { reactive, ref } from 'vue';
const roomSelected = ref(1)     //糊的相当草率

const introInfo = reactive({
    'live_type': '',
    'live_title': '',
    'date': new Date()
})
const onRoomSelectedChange = ()=>{
    introInfo.live_type = ''
}
const resultVisible = ref(false)
const IntroCopy = (text) => {
    navigator.clipboard.writeText(text)
}
</script>

<template>
    <a-card title="简介生成器">
        <a-row class="intro_part">
            <a-col :span="4" class="intro_desc">
                <label>
                    当日直播间：
                </label>
            </a-col>
            <a-col :span="20">
                <a-select placeholder="当日直播间" v-model:model-value="roomSelected" @change="onRoomSelectedChange">
                    <a-option v-for="(item, index) in LiveRoomListDict" :label="item" :value="index" :disabled="item.includes('向晚')" />
                </a-select>
            </a-col>
        </a-row>
        <a-row class="intro_part">
            <a-col :span="4" class="intro_desc">
                <label>
                    直播类型：
                </label>
            </a-col>
            <a-col :span="20">
                <a-select placeholder="直播类型" v-model:model-value="introInfo.live_type">
                    <template v-for="i in LiveTypeDict">
                        <a-option v-if="i.includes(LiveRoomListDict[roomSelected]) && !i.includes('向晚')" :label="i" :value="i" />
                        <a-option v-if="i.includes('A-SOUL')" :label="i" :value="i" />
                    </template>
                    <a-option>特别节目/其他</a-option>
                </a-select>
            </a-col>
        </a-row>
        <a-row class="intro_part">
            <a-col :span="4" class="intro_desc">
                <label>
                    直播标题：
                </label>
            </a-col>
            <a-col :span="20">
                <a-input placeholder="直播标题" :allow-clear="true" v-model:model-value="introInfo.live_title" />
            </a-col>
        </a-row>
        <a-row class="intro_part">
            <a-col :span="4" class="intro_desc">
                <label>
                    直播日期：
                </label>
            </a-col>
            <a-col :span="20">
                <a-date-picker style="width: 100%" v-model="introInfo.date"/>
            </a-col>
        </a-row>
        <a-button @click="resultVisible=true">生成简介</a-button>
    </a-card>
    <a-modal v-model:visible="resultVisible" title="简介生成结果" :hide-cancel="true" :simple="true" :modal-style='{"white-space": "pre-wrap"}'>
        <div><b>当日直播间（转载）</b></div>
        <div>{{ LiveRoomList(roomSelected) }}</div>
        <div><b>简介</b></div>
        <div>{{ introGen(introInfo) }}</div>
        <template #footer>
            <a-button @click="IntroCopy(LiveRoomList(roomSelected));resultVisible=false">复制转载地址</a-button>
            <a-button @click="IntroCopy(introGen(introInfo));resultVisible=false" type="primary">复制简介</a-button>
        </template>
    </a-modal>
</template>

<style scoped>
.intro_desc{
    line-height: 32px;
}
.intro_part{
    margin-bottom: 16px;
}
</style>