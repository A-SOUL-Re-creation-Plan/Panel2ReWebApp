<template>
    <LRlayout>
        <template #content>
            <CenterCard title="注册" subtitle="Panel2Re">
                <template #content>
                    注册功能不可用，请联系 {{contact}} 进行注册。
                </template>
            </CenterCard>
        </template>
    </LRlayout>
</template>
    
<script setup>
import LRlayout from '@/components/LRlayout.vue'
import CenterCard from './../../components/CenterCard.vue'

import { ref } from 'vue'
const contact = ref("管理员")
</script>

    
<style scoped>
    
</style>
    