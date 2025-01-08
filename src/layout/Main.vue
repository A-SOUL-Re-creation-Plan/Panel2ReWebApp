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
                        <a href="#" v-if="isElectron()" @click="reloadCookie()">切换Cookie</a>
                        <div style="height: 10px;"></div>
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
import isElectron from "is-electron";
import { reloadCookie } from '@/utils/electron.js'
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
    justify-content: space-between;
}
#about{
    width: 100%;
    display: flex;
    bottom: 10px;
    align-items: center;
    flex-direction: column;
}
#about > *{
    color: gray;
    text-decoration: none;
}
</style>
    