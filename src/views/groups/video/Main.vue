<template>
    <a-layout id="vg-index">
        <a-row :gutter="20">
            <a-col id="vg-index_a" :span="16">
                <ArchiveList/>
            </a-col>
            <a-col id="vg-index_b" :span="8">
                <ArchiveStatus/>
            </a-col>
        </a-row>
    </a-layout>
</template>
    
<script setup>
import ArchiveList from '@/components/Bilibili/Archives/ArchiveList.vue';
import ArchiveStatus from '@/components/Bilibili/Archives/ArchiveStatus.vue'
</script>

    
<style scoped>

</style>