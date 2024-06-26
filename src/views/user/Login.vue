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
                        @submit="handleSubmit"
                    >
                        <a-form-item
                            field="id"
                            :rules="[{ required: true, message: '需要用户名。' }]"
                            :validate-trigger="['change', 'blur']"
                            label="用户名"
                            disabled
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
                            disabled
                        >
                            <a-input-password v-model="login_form.pwd">
                                <template #prefix>
                                    <icon-lock />
                                </template>
                            </a-input-password>
                        </a-form-item>
                        <a-form-item field="protocol_agreed">
                            <a-checkbox v-model="login_form.protocol_agreed">
                                我已同意 <a href="https://live.bilibili.com/22637261">用户协议</a>。
                            </a-checkbox>
                        </a-form-item>
                        <a-form-item>
                            <a-space fill>
                                <a-button @click="LarkSSORedirect">使用 飞书SSO 登录</a-button>
                                <a-button html-type="submit" disabled>Login</a-button>
                            </a-space>
                        </a-form-item>
                    </a-form>
                    <!-- {{ login_form }} -->
                </template>
            </CenterCard>
        </template>
    </DoubleLayout_LeftImg>
</template>
    
<script setup>
import CenterCard from '@/components/CenterCard.vue'
import DoubleLayout_LeftImg from '@/components/DoubleLayout_LeftImg.vue';
import requests from '@/utils/requests'
import { reactive } from 'vue'
import { Message } from '@arco-design/web-vue';
const login_form = reactive({
    id: '',
    pwd: '',
    protocol_agreed: false,
});
function LarkSSORedirect (){
    if(!login_form.protocol_agreed){
        Message.error('请同意协议后登录')
    }else{
        requests('/api/lark_auth_uri').then((resp)=>{
            window.open(resp.data.u_auth_uri, '_self')
        }
        ).catch((e)=>{
            console.log(e)
        })
    }
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
    