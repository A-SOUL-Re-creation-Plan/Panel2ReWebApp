<script setup>
import { onMounted, ref } from "vue";
import requests from "@/utils/requests/index.js";
import formatDate_ZeroFill from "@/utils/dateFormatter.js";
const unreadCount = ref(0);
const isPMListShow = ref(false);
const isLoading = ref(true);
const setPMListShow = () => {
  isPMListShow.value = !isPMListShow.value;
  if (isPMListShow.value === true) {
    fetchSessionList();
  }
};
const fetchUnread = async () => {
  let data = (await requests.get("/bili/unread")).data.data;
  unreadCount.value = data.total_count;
};
const sessionList = ref([]);
const fetchSessionList = async () => {
  let data = (await requests.get("/bili/pm")).data.data;
  sessionList.value = data;
  isLoading.value = false;
};
onMounted(() => {
  fetchUnread();
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
      width="45%"
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
      <a-card v-for="item of sessionList">
        <div
          :style="{
            display: 'flex',
            flexDirection: 'row',
          }"
        >
          <a-avatar shape="circle" size="24">
            <img
              alt="avatar"
              :src="item.account_info.face"
              referrerpolicy="no-referrer"
              :style="{ objectFit: 'contain' }"
            />
          </a-avatar>
          <div
            :style="{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '12px',
              flex: 1,
              minWidth: 0,
            }"
          >
            <span
              :style="{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontWeight: 'bold',
                fontSize: '15px',
              }"
            >
              {{ item.account_info.name }}
            </span>
            <span
              :style="{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
                fontSize: '12px',
              }"
            >
              {{
                JSON.parse(item.last_msg.content).title ??
                JSON.parse(item.last_msg.content).content
              }}
            </span>
          </div>
          <div
            :style="{
              display: 'flex',
              flexDirection: 'column',
              flex: '0.5',
              alignItems: 'end',
              justifyContent: 'space-between',
              marginLeft: '8px',
            }"
          >
            <span :style="{ color: '#222', maxLines: 1, fontSize: '13px' }">{{
              formatDate_ZeroFill(new Date(item.session_ts / 1000))
            }}</span>
            <a-badge
              :count="item.unread_count"
              :dot-style="{
                fontSize: '10px',
                height: '16px',
                width: '16px',
                lineHeight: '16px',
              }"
            />
          </div>
        </div>
      </a-card>
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
