<template>
    <a-menu>
        <a-sub-menu key="0">
            <template #icon><IconApps/></template>
            <template #title>Home</template>
            <a-menu-item key="0-1">Home</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="2">
        <template #icon><icon-bug></icon-bug></template>
        <template #title>Navigation 2</template>
        <a-menu-item key="2_0">Beijing</a-menu-item>
        <a-menu-item key="2_1">Shanghai</a-menu-item>
        <a-menu-item key="2_2">Guangzhou</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="3">
        <template #icon><icon-bulb></icon-bulb></template>
        <template #title>Navigation 3</template>
        <a-menu-item key="3_0">Wuhan</a-menu-item>
        <a-menu-item key="3_1">Chengdu</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="4">
        <template #icon><icon-safe></icon-safe></template>
        Navigation 4
      </a-menu-item>
      <a-menu-item key="5">
        <template #icon><icon-fire></icon-fire></template>
        Navigation 5
      </a-menu-item>
    </a-menu>
    
</template>
    
<script setup>

</script>

    
<style scoped>

</style>