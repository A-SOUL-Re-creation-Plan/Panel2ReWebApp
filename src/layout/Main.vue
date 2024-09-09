<template>
    <a-layout>
        <a-layout-header>
            <Nav v-if="!route.meta.fs"/>
        </a-layout-header>
        <a-layout id="content">
            <a-layout-sider v-if="!route.meta.fs&&!user.id==''">
                <Sider/>
            </a-layout-sider>
            <a-layout-content id="content_c">
                <Container/>
            </a-layout-content>
        </a-layout>
        <a-layout-footer>
            <Footer v-if="!route.meta.fs"/>
        </a-layout-footer>
    </a-layout>
</template>
    
<script setup>
import { useRoute } from "vue-router";
import Nav from '@/layout/Nav.vue'
import Container from '@/layout/Container.vue'
import Footer from "@/layout/Footer.vue"
import Sider from '@/layout/Sider.vue'
import { useUserStore } from "@/stores/user";
const route = useRoute()
const user = useUserStore()
</script>

<style>
#content, #content_c{
    overflow-x: hidden;
    scrollbar-width: thin;
}
</style>
    