<template>
    <div id="aoa">
        <a-result status="404" subtitle="你似乎来到了知识的荒原。">
            <template #extra>
                <a-space>
                    <a-button type="primary" @click="go">返回主页</a-button>
                </a-space>
            </template>
        </a-result>
    </div>
</template>
    
<script setup>
// import CenterCard from '@/components/CenterCard.vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const go = ()=>{
    router.push('/')
}
</script>

    
<style scoped>
    #aoa{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto auto;
        width: 100%;
        height: 100vh;
    }
</style>
    