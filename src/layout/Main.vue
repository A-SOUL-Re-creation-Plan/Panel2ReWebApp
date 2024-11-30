<template>
    <a-layout>
        <a-layout-header>
            <!-- <Nav v-if="!route.meta.fs"/> -->
            <Nav/>
        </a-layout-header>
        <a-layout id="content">
            <a-layout-sider v-if="!route.meta.fs&&!user.id==''">
                <div id="sider">
                    <Sider/>
                    <div id="about">
                        <RouterLink to="/about">关于</RouterLink>
                    </div>
                </div>
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
import { useUserLegacyStore } from "@/stores/user_legacy";
const route = useRoute()
const user = useUserLegacyStore()
</script>

<style>
#content, #content_c{
    position: relative;
    overflow-x: hidden;
    scrollbar-width: thin;
}
#sider{
    display: flex;
    justify-items: center;
    flex-direction: column;
    min-height: 100%;
}
#about{
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 10px;
    justify-content: center;
}
#about > a{
    color: gray;
    text-decoration: none;
}
</style>
    