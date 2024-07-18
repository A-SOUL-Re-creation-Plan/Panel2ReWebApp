<script setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { checkUserAccessToken } from '@/utils/requests/uat_refresher';
import { post_uat as post } from '@/utils/requests/uat_proxy';
import LarkImgParser_Log from '@/components/Lark/LarkImgParser_Log.vue'
import { Notification } from '@arco-design/web-vue';
const user = useUserStore()
const headers = {
    "Panel2Re-Authorization": user.token
}
const uploadTarget = '/api/lark_calendar_parse/img'
const beforeUpload = async function(){
    await checkUserAccessToken()
    return true
}
const imgUploadSuccess = (f)=>{
    HuaTuoML.value = f.response.data.uuid
}
const HuaTuoML = ref()
const linkInputVisible = ref(false)
const inputImgLinkShow = ()=>{
    linkInputVisible.value = true;
}
const inputImgLinkCancel = ()=>{
    linkInputVisible.value = false;
}
const inputImgLink = ref({})
const inputImgLinkOKLoading = ref(false)
const inputImgLinkOK = ()=>{
    post('/api/lark_calendar_parse/link',inputImgLink.value).then(resp=>{
        if(resp.data.code==200){
            HuaTuoML.value = resp.data.data.uuid;
            inputImgLinkCancel();
            return true;
        }
    }).catch(e=>{
        Notification.warning({content: e.response.data.msg});
        linkInputVisible.value = false;
        return true;
    })
}
</script>

<template>
    <a-card title="飞书日程识别">
        <a-space direction="vertical">
            <a-space direction="vertical" v-if="!HuaTuoML">
                <span>建议上传分辨率为 3000x2000 的官方日程表图片原图，小于此分辨率可能识别出错。</span>
                <a-upload
                    draggable
                    :action=uploadTarget
                    :auto-upload="true"
                    accept="image/jpeg,image/png"
                    :limit="1"
                    :headers=headers
                    :on-before-upload=beforeUpload
                    @success="imgUploadSuccess"
                    :ok-loading="false"
                />
                <a-button @click="inputImgLinkShow">输入图片直链</a-button>
            </a-space>
            <LarkImgParser_Log :data="HuaTuoML" v-if="HuaTuoML"/>
        </a-space>
    </a-card>
    <a-modal :visible="linkInputVisible" title="日程图片直链输入" @cancel="inputImgLinkCancel" @before-ok="inputImgLinkOK">
        <a-form :model="inputImgLink">
            <a-form-item field="href" label="直链地址">
                <a-input v-model="inputImgLink.href" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<style scoped>

</style>