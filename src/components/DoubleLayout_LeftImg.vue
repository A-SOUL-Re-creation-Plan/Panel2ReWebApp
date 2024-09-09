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
    background: url('https://s2.loli.net/2023/12/31/zNjOHh7STDdy9wp.png') center no-repeat;
    background-size: cover;
}
#dl-left{
    width: 40%;
}
#dl-right{
    width: 60%;
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 5vh 3.5vw;
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(5px);
}
</style>
    