<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import requests from '@/utils/requests'
const user = storeToRefs(useUserStore())
const route = useRoute()
const router = useRouter()
const code = route.query.code
const info = ref("")
const GetUserInfo = () => {
    requests.get('/api/lark_identity',{params:{'code':code}}).then((resp)=>{
        info.value = resp.data
        if(info.value.code==0){
            user.id.value = info.value.data.open_id
            user.avatar.value = info.value.data.avatar
            user.name.value = info.value.data.name
            user.refresh_token.value = info.value.data.refresh_token
            user.token.value = info.value.data.user_access_token
            user.rt_expires.value = info.value.data.rt_expires_at
            user.at_expires.value = info.value.data.at_expires_at
        }
        router.push('/')
    }).catch((e)=>{
        info.value = e.code
        router.push('/')
    })
}
onMounted(()=>{
    GetUserInfo();
})
</script>

<template>
    <div class="larkSSO_result">
        <a-space direction="vertical" align="center">
            <span>回传码: {{ code }}</span>
            <span>{{ info }}</span>
            <a-spin dot v-if="!info"/>
        </a-space>
    </div>
</template>

<style scoped>
.larkSSO_result{
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>