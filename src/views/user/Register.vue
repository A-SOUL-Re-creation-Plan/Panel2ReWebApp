<template>
    <DoubleLayout_LeftImg>
        <template #content>
            <CenterCard title="注册" subtitle="Panel2Re">
                <template #content v-if="!enable">
                    注册功能不可用。
                </template>
                <template #content v-else>
                    <span>Deprecated</span>
                </template>
            </CenterCard>
        </template>
    </DoubleLayout_LeftImg>
</template>
    
<script setup>
import DoubleLayout_LeftImg from '@/components/DoubleLayout_LeftImg.vue'
import CenterCard from './../../components/CenterCard.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const enable = false
const router = useRouter()
onMounted(()=>{
    router.push('/user/login')
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
    