<template>
    <a-layout id="r_container">
        <a-layout-sider v-if="!route.meta.fs&&!user.id==''">
            <Sider/>
        </a-layout-sider>
        <a-layout-content>
            <RouterView/>
        </a-layout-content>
    </a-layout>
</template>
    
<script setup>
    import { useRoute, RouterView } from "vue-router";
    import { useUserStore } from "@/stores/user";
    import Sider from '@/components/Sider.vue'
    const route = useRoute()
    const user = useUserStore()
</script>

    
<style scoped>
#r_container {
    display: flex;
    min-height: 100%;
    flex-direction: row;
}
</style>