<template>
    <div id="copyright">
        <span>Panel2Re F:{{ fe_ver }} B:{{ be_ver }} Copyright A-SOUL Recreation Plan 2024</span>
    </div>
</template>
    
<script setup>
import requests from '@/utils/requests'
const baseURL = import.meta.env.VITE_APP_API_BASE;
import { ref, onMounted } from 'vue'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const ver_ = proxy.$p2rv_version
const fe_ver = ref(ver_);
const be_ver = ref('Connecting');
onMounted(()=>{
    requests.get('/api/version',{
        baseURL: baseURL
    }).then(resp=>{
        console.log(resp.data)
        be_ver.value = resp.data
    }).catch(err=>{
        console.log(err)
        be_ver.value = err.code
    })
})
</script>

    
<style scoped>
    #copyright{
        color: rgb(var(--gray-5));
        margin: 10px 10px;
        height: 15px;
        justify-content: center;
        align-content: center;
        font-size: 12px;
        text-align: right;
    }
</style>