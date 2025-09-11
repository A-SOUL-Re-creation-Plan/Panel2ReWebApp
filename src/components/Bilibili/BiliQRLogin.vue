<script setup>
import { Modal } from '@arco-design/web-vue';
import { ref } from 'vue';
import requests from '@/utils/requests';
import QRCode from 'qrcode';
import formatDate_ZeroFill from '@/utils/dateFormatter';
// const button_loading = ref(false);
const qr_message = ref("")
const qr_src = ref()
const qr_current = ref(1)
const qr_status = ref('process')
const qr_gen_time = ref()
const qr_timeout_time = ref()
const button_click = () => {
    // button_loading.value = true;
    qr_current.value = 2;
    requests.get('/bili/qrcode/fetch').then((resp) => {
        // QRCode.toCanvas(document.getElementById('qr_area'), qr_url.value, err => {if(err) console.error(err)});
        QRCode.toDataURL(resp.data.data.url).then(url => qr_src.value = url);
        qr_gen_time.value = formatDate_ZeroFill(resp.data.data.time);
        qr_timeout_time.value = formatDate_ZeroFill(resp.data.data.time + (180 * 1000));
        qr_check(resp.data.data.qrcode_key);
    }).catch(err => console.log(err));
}
const qr_check = (key) => {
    requests('/bili/qrcode/pool', {params: {'key': key}}).then(resp => {
        let data = resp.data.data;
        qr_message.value = data.message;
        if (data.code == 0){
            qr_current.value = 3;
            Modal.success({
                title: "Cookie 信息",
                content: resp.data.data.cookies,
                modalStyle:{'overflow-wrap': 'break-word'},
                onClose: ()=>{
                    navigator.clipboard.writeText(resp.data.data.cookies)
                }
            })
            // button_loading.value = false;
            qr_src.value = undefined;
            qr_message.value = undefined;
            return;
        }
        else if (data.code == 86038){
            qr_status.value = "error"
            Modal.error({
                title: "二维码已失效",
                content: "请重新生成"
            })
            // button_loading.value = false;
            qr_src.value = undefined;
            qr_message.value = undefined;
            return;
        }
        else {
            setTimeout(() => qr_check(key), 1000);
        }
    }).catch(err => console.error(err));
}
</script>
<template>
<a-card id="bili_qr">
    <a-steps type="navigation" v-model:current="qr_current" :status="qr_status">
        <a-step>初始化</a-step>
        <a-step>扫描</a-step>
        <a-step>结果</a-step>
    </a-steps>
    <div id="bili_qr_content" :style="{ height: '500px' }">
        <a-space direction="vertical" align="center" v-if="qr_current == 1">
            <span>使用 Android/iOS/iPadOS 哔哩哔哩客户端扫描登录</span>
            <a-button type="primary" @click="button_click">生成二维码</a-button>
        </a-space>
        <a-space direction="vertical" align="center" v-if="qr_current == 2">
            <a-image width="150px" v-if="qr_src" :src="qr_src"></a-image>
            <span>生成时间：{{ qr_gen_time }}</span>
            <span>预计过期时间：{{ qr_timeout_time }}</span>
            <span v-if="qr_message" style="color: #fc966e;">{{ qr_message }}</span>
            <a-space direction="vertical" v-if="qr_status == 'error'">
                <a-result status="error" title="获取失败">
                    <template #subtitle>
                        二维码已过期
                    </template>
                    <template #extra>
                        <a-space>
                            <a-button type="primary" @click="button_click" v-if="qr_status == 'error'">重新获取</a-button>
                        </a-space>
                    </template>
                </a-result>
            </a-space>
        </a-space>
        <a-space direction="vertical" align="center" v-if="qr_current == 3">
            <a-result status="success" title="获取成功" >
                <template #subtitle>
                    Cookie获取成功
                </template>
            </a-result>
        </a-space>
    </div>
</a-card>
</template>

<style>
#bili_qr{
    height: 100%;
}
#bili_qr_content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
</style>