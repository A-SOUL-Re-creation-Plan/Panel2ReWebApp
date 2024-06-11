<template>
    <div class="card">
        <a-space direction="vertical" size="large">
            <div class="card_title_all" v-if="title">
                <div class="card_logo">
                    <Logo height="50px"/>
                </div>
                <div class="card_titles">
                    <div class="card_title">
                        <b>{{ title }}</b>
                    </div>
                    <div class="card_subtitle" v-if="subtitle">
                        {{ subtitle }}
                    </div>
                </div>
            </div>
            <slot name="content"/>
        </a-space>
    </div>
</template>
    
<script setup>
import Logo from '@/components/Logo.vue'
import { defineProps } from 'vue';
const props = defineProps(['title','subtitle']);
const title = props.title;
const subtitle = props.subtitle;
</script>

    
<style scoped>
    .card{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: rgba(252,252,252,1);
        border-radius: 15px;
        padding: 35px 35px;
        margin: auto auto;
        flex-direction: column;
    }
    .card_title_all{
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between
    }
    .card_title{
        font-size: 24px;
        line-height: 32px;
        /* margin-bottom: 10px; */
    }
    .card_subtitle{
        font-size: 16px;
        line-height: 24px;
    }
    .card_titles *{
        text-align: right;
    }
</style>
    