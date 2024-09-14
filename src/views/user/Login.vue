<template>
    <DoubleLayout_LeftImg>
        <template #content>
            <CenterCard title="登录" subtitle="Panel2Re">
                <template #content>
                    <a-form
                        class="login-form"
                        layout="vertical"
                        :style="{width: '30vw'}"
                        :model="login_form"
                        @submit="submit"
                    >
                        <a-form-item
                            field="id"
                            :rules="[{ required: true, message: '需要用户名。' }]"
                            :validate-trigger="['change', 'blur']"
                            label="用户名"                            
                        >
                            <a-input v-model="login_form.id">
                                <template #prefix>
                                    <icon-user />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item
                            field="pwd"
                            :rules="[{ required: true, message: '需要密码。' }]"
                            :validate-trigger="['change', 'blur']"
                            label="密码"
                            allow-clear
                        >
                            <a-input-password v-model="login_form.pwd">
                                <template #prefix>
                                    <icon-lock />
                                </template>
                            </a-input-password>
                        </a-form-item>
                        <a-form-item field="diana_subscribed">
                            <a-checkbox v-model="login_form.diana_subscribed">
                                我已同意 <a href="https://live.bilibili.com/22637261">用户协议</a>。
                            </a-checkbox>
                        </a-form-item>
                        <a-form-item>
                            <a-space fill>
                                <a-button html-type="submit">登录</a-button>
                                <!-- <a-button disabled>使用 飞书SSO 登录</a-button> -->
                                <!-- 缅怀飞书企业版/商业版的不限文件策略 -->
                                <!-- 地主家没余粮了就很难评 -->
                            </a-space>
                        </a-form-item>
                    </a-form>
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
import { reactive } from 'vue'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter()
const data = useUserLegacyStore()
const { id, name, avatar, token, expire_at } = storeToRefs(data)
const login_form = reactive({
    id: '',
    pwd: '',
    diana_subscribed: false,
});
const submit = (content)=>{
    requests.post('/api/user/login_legacy',{data: content.values}).then((resp)=>{
        if(resp.data.code==0){
            id.value = resp.data.data.user_info.id
            name.value = resp.data.data.user_info.username
            avatar.value = resp.data.data.user_info.avatar
            token.value = resp.data.data.token
            expire_at.value = resp.data.data.expire_at
            router.push('/')
        }
    }).catch(err=>{
        console.log(err)
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
</style>
    