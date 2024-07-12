<script setup>
import { Modal } from '@arco-design/web-vue';
import { ref } from 'vue';
import requests from '@/utils/requests';
import QRCode from 'qrcode';
const button_loading = ref(false);
const qr_message = ref("")
const qr_src = ref()
const button_click = () => {
    button_loading.value = true;
    requests.get('api/bili_qrcode').then((resp) => {
        // QRCode.toCanvas(document.getElementById('qr_area'), qr_url.value, err => {if(err) console.error(err)});
        QRCode.toDataURL(resp.data.data.url).then(url => qr_src.value = url);
        qr_check(resp.data.data.qrcode_key);
    }).catch(err => console.log(err));
}
const qr_check = (key) => {
    requests('api/bili_qrpool', {params: {'key': key}}).then(resp => {
        let data = resp.data.raw_data.data;
        qr_message.value = data.message;
        if (data.code == 0){
            Modal.success({
                title: "Cookie 信息",
                content: resp.data.cookies,
                modalStyle:{'overflow-wrap': 'break-word'}
            })
            button_loading.value = false;
            qr_src.value = undefined;
            return;
        }
        else if (data.code == 86038){
            Modal.error({
                title: "二维码已失效",
                content: "请重新生成"
            })
            button_loading.value = false;
            qr_src.value = undefined;
            return;
        }
        else {
            setTimeout(() => qr_check(key), 1000);
        }
    }).catch(err => console.error(err));
}
</script>
<template>
<a-card>
    <a-space direction="vertical">
        <span>点击生成二维码使用移动端bili扫描登录</span>
        <a-button type="primary" :loading="button_loading" @click="button_click">生成二维码</a-button>
        <a-image width="100%" v-if="qr_src" :src="qr_src"></a-image>
        <span>{{ qr_message }}</span>
    </a-space>
</a-card>
</template>