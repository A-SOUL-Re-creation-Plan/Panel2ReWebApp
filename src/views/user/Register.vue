<template>
    <DoubleLayout_LeftImg>
        <template #content>
            <CenterCard title="注册" subtitle="Panel2Re">
                <template #content>
                    注册功能不可用，请联系 {{contact}} 进行注册。
                </template>
            </CenterCard>
        </template>
    </DoubleLayout_LeftImg>
</template>
    
<script setup>
import DoubleLayout_LeftImg from '@/components/DoubleLayout_LeftImg.vue'
import CenterCard from './../../components/CenterCard.vue'

import { ref } from 'vue'
const contact = ref("Panel2Re维护团队")
</script>

    
<style scoped>
    
</style>
    