<template>
    <a-layout class="index" id="vg-index">
        <a-row :gutter="20">
            <a-col id="vg-index_a" :span="12">
                <CoverCropPreviewer/>
            </a-col>
            <a-col id="vg-index_b" :span="12">
                <a-card title="提醒">
                    <p>当前 B 站一般封面比例为 4:3 / 16:9 混用，所对应的分辨率为 1600x1200 / 1920x1440 以及 1920x1080 。</p>
                    <p>使用 biliup-app 类工具直接修改封面时请使用 4:3 比例的图片进行直传。</p> 
                </a-card>
            </a-col>
        </a-row>
    </a-layout>
</template>
    
<script setup>
import CoverCropPreviewer from '@/components/Bilibili/Cover/CoverCropPreviewer.vue'
</script>

<style scoped>

</style>