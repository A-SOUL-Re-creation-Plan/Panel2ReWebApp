<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import Logo from "@/components/Logo.vue";
import { useUserLegacyStore } from "@/stores/user_legacy";
import { useRouter } from "vue-router";
import requests from "@/utils/requests";
import isElectron from "is-electron";
import {
  winStatusCheck,
  closeWindow,
  miniWindow,
  maxWindow,
  unmaxWindow,
} from "@/utils/electron";
import Message from "@/components/Bilibili/Message.vue";
const router = useRouter();
const user = useUserLegacyStore();
const userRefs = storeToRefs(user);
const userId = ref(userRefs.id);
const avatarImage = ref(userRefs.avatar);
const userName = ref(userRefs.name);
const logout = () => {
  user.reset();
  router.push("/user/login");
};
const winStatus = ref(false);
const toggleWindow = () => {
  if (!winStatus.value) {
    maxWindow();
  } else {
    unmaxWindow();
  }
};

onMounted(() => {
  winStatusCheck(winStatus);
});
</script>

<template>
  <div id="navbar">
    <div id="nav-logo">
      <Logo height="35px" />
      <span>Panel2Re</span>
    </div>
    <a-layout id="nav-r">
      <a-dropdown trigger="hover">
        <div id="nav-r_info">
          <a-avatar>
            <!-- <img src="@/assets/default.jpg" alt="avatar"/> -->
            <img
              :src="avatarImage"
              alt="avatar"
              crossorigin="anonymous"
              referrerpolicy="no-referrer"
            />
          </a-avatar>
          <span id="nav-r_uname" style="vertical-align: middle">{{
            userName
          }}</span>
        </div>

        <template #content>
          <a-doption>
            <span @click="logout">切换用户</span>
          </a-doption>
        </template>
      </a-dropdown>
      <Message v-if="userId !== -1" />
    </a-layout>

    <div id="nav_app_op" v-if="isElectron">
      <IconMinus @click="miniWindow" />
      <IconExpand v-if="!winStatus" @click="toggleWindow" />
      <IconShrink v-else @click="toggleWindow" />
      <IconClose @click="closeWindow" />
    </div>
  </div>
</template>

<style scoped>
#navbar {
  display: flex;
  justify-content: space-between;
  /* justify-content: center; */
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgb(var(--gray-3));
  -webkit-app-region: drag;
}
#nav-logo {
  display: flex;
  line-height: 25px;
  justify-content: center;
  align-items: center;
  text-align: center;
}
#nav-logo {
  padding-left: 15px;
}
#nav-logo span {
  padding-left: 15px;
}
#nav-r {
  display: flex;
  flex-direction: row;
  padding-right: 15px;
  align-items: center;
  justify-content: end;
}
#nav-r_info > * {
  margin-left: 5px;
  margin-right: 5px;
  -webkit-app-region: no-drag;
  -webkit-user-select: none;
  user-select: none;
}
#nav_app_op {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  font-size: 20px;
}
#nav_app_op > * {
  margin-right: 15px;
  -webkit-app-region: no-drag;
  -webkit-user-select: none;
  user-select: none;
}
.router-link {
  text-decoration: none;
  color: rgb(0, 0, 0);
}
@media screen and (max-width: 864px) {
  #nav-r_uname {
    display: none;
  }
}
</style>
