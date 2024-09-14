<template>
    <a-layout class="index" id="vg-index">
        <a-row :gutter="20">
            <a-col id="vg-index_a" :span="14">
                <ArchiveList/>
            </a-col>
            <a-col id="vg-index_b" :span="10">
                <ArchiveStatus/>
                <!-- <LarkImgParser/> -->
            </a-col>
        </a-row>
    </a-layout>
</template>
    
<script setup>
import ArchiveList from '@/components/Bilibili/Archives/ArchiveList.vue';
import ArchiveStatus from '@/components/Bilibili/Archives/ArchiveStatus.vue';
// import LarkImgParser from '@/components/Lark/LarkImgParser.vue';
</script>

    
<style>

</style>