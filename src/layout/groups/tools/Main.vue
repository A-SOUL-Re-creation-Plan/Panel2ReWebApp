<template>
    <div id="tools_layout">
        <a-tabs default-active-key="1" id="tools_tab">
            <a-tab-pane key="1" title="哔哩哔哩 Cookies 获取工具">
                <BiliQRLogin/>
            </a-tab-pane>
            <a-tab-pane key="2" title="TODO">
                TODO
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script setup>
import BiliQRLogin from '@/components/Bilibili/BiliQRLogin.vue';
</script>
<style>
#tools_layout{
    display: flex;
    flex-grow: 1;
    height: 100%;
    flex:1;
}
#tools_layout > *{
    width: 100%;
}
#tools_tab .arco-tabs-pane{
    min-height: 500px;
}
</style>