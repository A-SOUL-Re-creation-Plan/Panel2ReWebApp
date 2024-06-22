<template>
    <div id="r_container">
        <RouterView/>
    </div>
</template>
    
<script setup>
    import { RouterView } from "vue-router";
</script>

    
<style scoped>
#r_container {
    height: 100%;
    max-height: calc(100% - 30px);
    overflow-y: auto;
    padding: 15px 15px;
    scrollbar-width: thin;
    scrollbar-color: unset;
}
</style>