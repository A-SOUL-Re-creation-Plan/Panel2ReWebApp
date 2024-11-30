<script setup>
    import { ref, onMounted } from 'vue'
    import { storeToRefs } from 'pinia';
    import Logo from '@/components/Logo.vue'
    import { useUserLegacyStore } from '@/stores/user_legacy';
    import { useRouter } from 'vue-router';
    import requests from '@/utils/requests'
    import isElectron from 'is-electron';
    import { winStatusCheck,closeWindow,miniWindow,maxWindow,unmaxWindow } from '@/utils/electron';
    const router = useRouter();
    const user = useUserLegacyStore();
    const isLogin = ref(storeToRefs(user).is_logged);
    const avatarImage = ref(storeToRefs(user).avatar);
    const userName = ref(storeToRefs(user).name);
    const logout = ()=>{
        requests.delete('/user/logout_legacy').then(resp=>{
            if(resp.data.code==0){
                user.reset();
                router.push('/user/login')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    const winStatus = ref(false);
    const toggleWindow = ()=>{
        if(!winStatus.value){
            maxWindow();
        }else{
            unmaxWindow();
        }
    }
    
    onMounted(()=>{
        winStatusCheck(winStatus)
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
        <div id="nav_app_op" v-if="isElectron">
            <IconMinus @click="miniWindow"/>
            <IconExpand v-if="!winStatus" @click="toggleWindow"/>
            <IconShrink v-else @click="toggleWindow"/>
            <IconClose @click="closeWindow"/>
        </div>
    </div>
</template>

<style scoped>
#navbar{
    display: flex;
    justify-content: space-between;
    /* justify-content: center; */
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgb(var(--gray-3));
    -webkit-app-region: drag;
}
#nav-logo{
    display: flex;
    line-height: 25px;
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
    -webkit-app-region: no-drag;
    -webkit-user-select: none;
}
#nav_app_op{
    display: flex;
    align-items: center;
    /* justify-content: center; */
    height: 100%;
    font-size: 20px;
}
#nav_app_op>*{
    margin-right: 15px;
    -webkit-app-region: no-drag;
    -webkit-user-select: none;
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