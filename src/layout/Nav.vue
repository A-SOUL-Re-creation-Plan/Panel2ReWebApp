<script setup>
    import { ref, onMounted } from 'vue'
    import { storeToRefs } from 'pinia';
    import Logo from '@/components/Logo.vue'
    import { useUserLegacyStore } from '@/stores/user_legacy';
    import { useRouter } from 'vue-router';
    import requests from '@/utils/requests'
    const router = useRouter();
    const user = useUserLegacyStore();
    const isLogin = ref(false);
    const avatarImage = ref(storeToRefs(user).avatar);
    const userName = ref(storeToRefs(user).name);
    const logout = ()=>{
        requests.delete('/api/user/logout_legacy').then(resp=>{
            if(resp.data.code==0){
                user.reset();
                router.push('/user/login')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    onMounted(()=>{
        isLogin.value = user.id!=0
        // console.log("isLogin="+isLogin.value);
    })
</script>

<template>
    <div id="navbar">
        <div id="nav-logo">
            <Logo height="35px"/>
            <span>Panel2Re</span>
        </div>
        <a-layout id="nav-r">
            <a-dropdown trigger="hover">
                <div id="nav-r_info">
                    <a-avatar>
                        <!-- <img src="@/assets/default.jpg" alt="avatar"/> -->
                        <img :src="avatarImage" alt="avatar"/>
                    </a-avatar>
                    <span id="nav-r_uname" style="vertical-align:middle;">{{ userName }}</span>
                </div>
                
                
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
    </div>
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
#nav-r_info > *{
    margin-left: 5px;
    margin-right: 5px;
}
.router-link{
    text-decoration: none;
    color: rgb(0,0,0);
}
@media screen and (max-width: 864px) {
    #nav-r_uname{
        display:none;
    }
}
</style>