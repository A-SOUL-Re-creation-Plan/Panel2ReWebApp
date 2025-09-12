<script setup>
import { onMounted, ref } from "vue";
import requests from "@/utils/requests/index.js";
const unreadCount = ref(100);
const isPMListShow = ref(false);
const isLoading = ref(true);
const setPMListShow = () => {
  isPMListShow.value = !isPMListShow.value;
};
const sessionList = ref([]);
const fetchSessionList = async () => {
  let data = (await requests.get("/bili/pm")).data.data;
  sessionList.value = data;
  isLoading.value = false;
  console.log(data);
};
onMounted(() => {
  fetchSessionList();
});
</script>

<template>
  <div id="pm_icon">
    <a-badge
      :count="unreadCount"
      :dotStyle="{ height: '14px', fontSize: '12px', lineHeight: '14px' }"
      @click="setPMListShow"
    >
      <icon-message size="24" />
    </a-badge>
    <a-drawer
      title="私信"
      :visible="isPMListShow"
      @cancel="isPMListShow = false"
      :footer="false"
      unmountOnClose
      width="30%"
      popup-container="#content"
      :drawer-style="{ zIndex: 999 }"
    >
      <div
        v-if="isLoading"
        :style="{
          display: 'flex',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }"
      >
        <a-spin :size="32" />
      </div>
      <a-list>
        <a-list-item v-for="item of sessionList" :key="item.talker_id">
          <a-list-item-meta
            :title="item.account_info.name"
            :description="
              JSON.parse(item.last_msg.content).title ??
              JSON.parse(item.last_msg.content).content
            "
          >
            <template #avatar>
              <a-avatar shape="circle">
                <img
                  alt="avatar"
                  :src="item.account_info.face"
                  referrerpolicy="no-referrer"
                />
              </a-avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-drawer>
  </div>
</template>

<style scoped>
#pm_icon {
  margin-left: 1rem;
  height: 50%;
  -webkit-app-region: no-drag;
  -webkit-user-select: none;
  user-select: none;
}
</style>
