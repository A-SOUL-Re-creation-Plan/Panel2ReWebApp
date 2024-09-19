<template>
    <a-layout class="index" id="vg-index">
        <a-row :gutter="20">
            <a-col id="vg-index_a" :xl="14" :sm="24">
                <ArchiveList/>
            </a-col>
            <a-col id="vg-index_b" :xl="10" :sm="24">
                <ArchiveStatus/>
                <!-- <LarkImgParser/> -->
                 <IntroGeneratorLegacy/>
            </a-col>
        </a-row>
    </a-layout>
</template>
    
<script setup>
import ArchiveList from '@/components/Bilibili/Archives/ArchiveList.vue';
import ArchiveStatus from '@/components/Bilibili/Archives/ArchiveStatus.vue';
// import LarkImgParser from '@/components/Lark/LarkImgParser.vue';
import IntroGeneratorLegacy from '@/components/IntroGeneratorLegacy.vue'
</script>

    
<style>

</style>