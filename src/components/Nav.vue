<script setup>
    import { ref, onMounted } from 'vue'
    import { storeToRefs } from 'pinia';
    import Logo from '@/components/Logo.vue'
    import { useUserStore } from '@/stores/user';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const user = useUserStore();
    const isLogin = ref(false);
    const avatarImage = ref(storeToRefs(user).avatar);
    const logout = ()=>{
        user.reset();
        router.push('/user/login')
    }   
    onMounted(()=>{
        isLogin.value = !user.id==''
        // console.log("isLogin="+isLogin.value);
    })
</script>

<template>
    <a-layout-header id="navbar">
        <div id="nav-logo">
            <Logo height="35px"/>
            <span>Panel2Re</span>
        </div>
        <a-layout id="nav-r">
            <a-dropdown trigger="hover">
                <a-avatar>
                    <!-- <img src="@/assets/1df27add70b02a21e9aaeac50f15bfe4547510303.jpg" alt="avatar"/> -->
                    <img :src="avatarImage" alt="avatar"/>
                </a-avatar>
                <template #content v-if="!isLogin">
                    <a-doption>
                        <router-link class="router-link" to="/user/login">登录已有账户</router-link>
                    </a-doption>
                    <a-doption>
                        <router-link class="router-link" to="/user/register">注册 Panel2Re 账户</router-link>
                    </a-doption>
                </template>
                <template #content v-else>
                    <a-doption>
                        <span @click="logout">退出登录</span>
                    </a-doption>
                </template>
            </a-dropdown>
        </a-layout>
    </a-layout-header>
</template>

<style scoped>
#navbar{
    display: flex;
    justify-content: space-between;
    /* justify-content: center; */
    width: 100%;
    height: 55px;
    border-bottom: 1px solid rgb(var(--gray-3));
}
#nav-logo{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
#nav-logo{
    padding-left: 15px;
}
#nav-logo span{
    padding-left: 15px;
}
#nav-r{
    display: flex;
    padding-right: 15px;
    align-items: end;
    justify-content: center;
}
.router-link{
    text-decoration: none;
    color: rgb(0,0,0);
}
</style>