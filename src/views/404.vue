<template>
    <div id="aoa">
        <CenterCard>
            <template #content>
                <b style="font-size: 25px;">你似乎来到了知识的荒原。</b>
            </template>
        </CenterCard>
    </div>
</template>
    
<script setup>
import CenterCard from './../components/CenterCard.vue'

</script>

    
<style scoped>
    #aoa{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
</style>
    