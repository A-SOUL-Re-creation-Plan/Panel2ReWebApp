<template>
    <DoubleLayout_LeftImg>
        <template #content>
            <CenterCard title="注册" subtitle="Panel2Re">
                <template #content v-if="!enable">
                    注册功能不可用，请联系 {{contact}} 进行注册。
                </template>
                <template #content v-else>
                    <a-form
                        class="reg-form"
                        layout="vertical"
                        :model="reg_form"
                        @submit="submit"
                    >
                        <a-form-item
                            field="pwd"
                            :rules="[{ required: true, message: '需要密码。' }]"
                            :validate-trigger="['change', 'blur']"
                            label="密码"
                            allow-clear
                        >
                            <a-input-password v-model="reg_form.pwd">
                                <template #prefix>
                                    <icon-lock />
                                </template>
                            </a-input-password>
                        </a-form-item>
                        <a-form-item
                            field="pwd_again"
                            :rules="[{ required: true, message: '需要密码。' }]"
                            :validate-trigger="['change', 'blur']"
                            label="再次输入密码"
                            allow-clear
                        >
                            <a-input-password v-model="reg_form.pwd_again">
                                <template #prefix>
                                    <icon-lock />
                                </template>
                            </a-input-password>
                        </a-form-item>
                        <a-form-item field="diana_subscribed">
                            <a-checkbox v-model="reg_form.diana_subscribed">
                                我已同意 <a href="https://live.bilibili.com/22637261">用户协议</a>。
                            </a-checkbox>
                        </a-form-item>
                        <a-form-item>
                            <a-space fill>
                                <a-button html-type="submit">注册</a-button>
                                <a-button @click="router.push('/user/login')">拥有账号？前往登录</a-button>
                            </a-space>
                        </a-form-item>
                    </a-form>
                </template>
            </CenterCard>
        </template>
    </DoubleLayout_LeftImg>
</template>
    
<script setup>
import DoubleLayout_LeftImg from '@/components/DoubleLayout_LeftImg.vue'
import CenterCard from './../../components/CenterCard.vue'
import { onMounted, ref, reactive } from 'vue'
import requests from '@/utils/requests'
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const contact = ref("Panel2Re维护团队")
const enable = ref()
const fetchStatus = ()=>{
    requests.get('/user/register_legacy').then(_=>{
        enable.value = true
    }).catch(_=>{
        enable.value = false
    })
}
const reg_form = reactive({
    pwd: '',
    pwd_again: '',
    diana_subscribed: false,
});
const submit = (content)=>{
    requests.post('/user/register_legacy',{data: content.values}).then((resp)=>{
        if(resp.data.code==0){
            Message.info("注册成功")
            router.push('/user/login')
        }
    }).catch(err=>{
        console.log(err)
    })
}
onMounted(()=>{
    fetchStatus()
})
</script>

    
<style scoped>
    .reg-form{
        width: 35vw;
    }
    @media screen and (max-width: 864px) {
        .reg-form{
            width: 70vw;
        }
    }
</style>
    