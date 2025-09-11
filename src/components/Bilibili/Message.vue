<script setup>
import { ref, onMounted } from "vue";
const unreadCount = ref(100);
const isPMListShow = ref(false);
const isLoading = ref(true);
const setPMListShow = () => {
  isPMListShow.value = !isPMListShow.value;
};
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
      <a-list v-else />
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
