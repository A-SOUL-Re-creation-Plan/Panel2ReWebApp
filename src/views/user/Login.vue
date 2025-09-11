<template>
    <DoubleLayout_LeftImg>
        <template #content>
            <CenterCard title="登录" subtitle="Panel2Re">
                <template #content>
                    <a-upload
                        draggable
                        :custom-request="uploadCookie"
                        v-on:before-upload="beforeUploadCookie"
                    />
                </template>
            </CenterCard>
        </template>
    </DoubleLayout_LeftImg>
</template>
    
<script setup>
import CenterCard from '@/components/CenterCard.vue'
import DoubleLayout_LeftImg from '@/components/DoubleLayout_LeftImg.vue';
import requests from '@/utils/requests'
import { useUserLegacyStore } from "@/stores/user_legacy"
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter()
const user = useUserLegacyStore()
const userRefs = storeToRefs(user)
const beforeUploadCookie = (e)=>{
    return e.type == "application/json";
}
const uploadCookie = (e)=>{
    const formData = new FormData();
    formData.append('file',e.fileItem.file)
    requests.post('/user/login_cookie',formData,{
        headers: {
            'Content-Type': "multipart/form-data"
        }
    }).then(_=>{
        setTimeout(() => {
            requests.get('/user/info').then((_)=>{
                user.avatar = _.data.data.face;
                user.id = _.data.data.mid;
                user.name = _.data.data.uname;
                e.onSuccess()
                router.push('/')
            })
        }, 300);
    }).catch(_=>{
        e.onError("Failed",_)
    })
}
</script>
    
<style scoped>
    #userboard{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background: whitesmoke;
    }
    .login-form{
        width: 35vw;
    }
    @media screen and (max-width: 864px) {
        .login-form{
            width: 70vw;
        }
    }
</style>
    