<template>
    <div id="route_container_fs" v-if="route.meta.fs">
        <RouterView/>
    </div>
    <div id="route_container" v-else>
        <RouterView/>
    </div>
</template>
    
<script setup>
    import { RouterView } from "vue-router";
    import { useRoute } from "vue-router";
    const route = useRoute();
</script>

    
<style scoped>
#route_container{
    overflow-x: hidden;
    margin: 15px 15px;
}
#route_container_fs{
    overflow-x: hidden;
    height: 100%;
}
</style>