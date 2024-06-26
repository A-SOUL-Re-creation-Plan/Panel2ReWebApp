<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import requests from '@/utils/requests'
const user = useUserStore()
const route = useRoute()
const router = useRouter()
const code = route.query.code
const info = ref("")
const GetUserInfo = () => {
    requests.get('/api/lark_identity',{params:{'code':code}}).then((resp)=>{
        info.value = resp.data
        if(info.value.code==0){
            user.setID(info.value.data.open_id)
            user.setAvatar(info.value.data.avatar)
            user.setName(info.value.data.name)
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