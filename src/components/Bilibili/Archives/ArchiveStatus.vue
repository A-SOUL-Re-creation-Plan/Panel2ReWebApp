<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import archiveStatusStore from '@/stores/bilibili/archive_status'
import ArchiveList from './ArchiveList.vue';
const props = storeToRefs(archiveStatusStore()) 
const pubed = ref(props.pubed)
const not_pubed = ref(props.not_pubed)
const is_pubing = ref(props.is_pubing)
</script>

<template>
    <a-card title="稿件总数" class="bili_archive_status">
        <a-statistic class="bili_archive_counter_status" title="已通过" :value="pubed" animation/>
        <a-statistic class="bili_archive_counter_status" title="未通过" :value="not_pubed" animation/>
        <a-statistic class="bili_archive_counter_status" title="正在处理" :value="is_pubing" animation/>
    </a-card>
</template>

<style>
.bili_archive_status > .arco-card-body{
    display: flex;
    justify-content: space-between;
}
</style>