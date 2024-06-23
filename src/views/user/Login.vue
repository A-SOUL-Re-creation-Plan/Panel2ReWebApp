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
                        <a-form-item field="protocol_agreed">
                            <a-checkbox v-model="login_form.protocol_agreed">
                                我已同意 <a href="https://live.bilibili.com/22637261">用户协议</a>。
                            </a-checkbox>
                        </a-form-item>
                        <a-form-item>
                            <a-button html-type="submit">Login</a-button>
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

import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { Message } from '@arco-design/web-vue';
const router = useRouter()
const login_form = reactive({
    id: '',
    pwd: '',
    protocol_agreed: false,
});
const {setID,setGroup,setAvatar} = useUserStore();
const handleSubmit = () => {
    // 临时方案，测试用
    if(!login_form.id||!login_form.pwd){
        return false
    }
    if(!login_form.protocol_agreed){
        Message.info('请同意协议后继续')
        return false
    }
    if(login_form.id==='admin'&&login_form.pwd==='admin'){
        setID("Admin");
        setGroup([0,2,3]);
        setAvatar("/avatar/3E1B26799705F4E3047844E5A441B4E6.jpg");
        router.push('/')
    }else{
        Message.info('用户名或密码错误')
        return false
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
    