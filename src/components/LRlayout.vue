<template>
    <div id="double_layout">
        <div id="dl-left">
            <!-- <slot name="left"/> -->
        </div>
        <div id="dl-right">
            <slot name="content"/>
        </div>
    </div>
</template>
    
<script setup>

</script>

    
<style scoped>
#double_layout{
    display:flex;
    flex:1;
    flex-direction: row;
    height: 100%;
}
#dl-left{
    width: 40%
}
#dl-left{
    background: url('@/assets/b9cbe91375bd601177fe3df13a6cdb69.png') center center / cover no-repeat;
}
#dl-right{
    width: 60%;
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 5vh 3.5vw;
}
</style>
    