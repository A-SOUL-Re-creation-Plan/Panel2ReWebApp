<template>
  <a-layout>
    <a-layout-header>
      <!-- <Nav v-if="!route.meta.fs"/> -->
      <Nav />
    </a-layout-header>
    <a-layout id="content_frame">
      <a-layout id="content">
        <a-layout-sider v-if="!route.meta.fs && userId != -1">
          <div id="sider">
            <Sider />
            <div id="about">
              <RouterLink to="/about">关于</RouterLink>
            </div>
          </div>
        </a-layout-sider>
        <a-layout-content id="content_c">
          <Container />
        </a-layout-content>
      </a-layout>
      <a-layout-footer>
        <Footer v-if="!route.meta.fs" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import Nav from "@/layout/Nav.vue";
import Container from "@/layout/Container.vue";
import Footer from "@/layout/Footer.vue";
import Sider from "@/layout/Sider.vue";
import { useUserLegacyStore } from "@/stores/user_legacy";
import requests from "@/utils/requests";
const route = useRoute();
const router = useRouter();
const user = useUserLegacyStore();
const userRefs = storeToRefs(user);
const userId = userRefs.id;

onMounted(() => {
  requests
    .get("/user/info")
    .then((_) => {
      user.avatar = _.data.data.face;
      user.id = _.data.data.mid;
      user.name = _.data.data.uname;
    })
    .catch((_) => {
      user.reset();
      router.push("/user/login");
    });
});
</script>

<style>
#content,
#content_c,
#content_frame {
  position: relative;
  overflow-x: hidden;
  scrollbar-width: thin;
}
#sider {
  display: flex;
  justify-items: center;
  flex-direction: column;
  min-height: 100%;
  justify-content: space-between;
}
#content_frame {
  flex: 1;
}
#about {
  width: 100%;
  display: flex;
  bottom: 10px;
  align-items: center;
  flex-direction: column;
}
#about > * {
  color: gray;
  text-decoration: none;
}
</style>
