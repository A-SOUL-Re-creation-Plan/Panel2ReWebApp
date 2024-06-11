<template>
    <a-layout>
        <Nav v-if="!route.meta.fs"/>
        <Container/>
        <Footer v-if="!route.meta.fs"/>
    </a-layout>
</template>
    
<script setup>
import { useRoute } from "vue-router";
import Nav from '@/components/Nav.vue'
import Container from '@/components/Container.vue'
import Footer from "@/components/Footer.vue"
const route = useRoute()
</script>

<style>

</style>
    