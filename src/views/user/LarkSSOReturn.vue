<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import requests from '@/utils/requests'
const user_p = useUserStore()
const user = storeToRefs(user_p)
const route = useRoute()
const router = useRouter()
const code = route.query.code
const info = ref("")
const GetUserInfo = () => {
    requests.get('/lark_identity',{params:{'code':code}}).then((resp)=>{
        if(resp.data.code==0){
            user.id.value = resp.data.data.open_id
            user.avatar.value = resp.data.data.avatar
            user.name.value = resp.data.data.name
            user.refresh_token.value = resp.data.data.refresh_token
            user.token.value = resp.data.data.user_access_token
            user.rt_expires.value = resp.data.data.rt_expires_at
            user.at_expires.value = resp.data.data.at_expires_at
        }
        info.value = "登录成功。欢迎："+user.name.value
        setTimeout(() => {
            router.push('/')
        }, 1500);
    }).catch((e)=>{
        info.value = "网络错误，请重试\n"+e.code
        setTimeout(() => {
            user_p.reset()
            router.push('/')
        }, 3500);
    })
}
onMounted(()=>{
    GetUserInfo();
})
</script>

<template>
    <div class="larkSSO_result">
        <a-space direction="vertical" align="center">
            <!-- <span>回传码: {{ code }}</span> -->
            <span style="font-size: larger;">{{ info }}</span>
            <a-spin dot v-if="!info"/>
        </a-space>
    </div>
</template>

<style scoped>
.larkSSO_result{
    display:flex;
    justify-self: center;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}
</style>