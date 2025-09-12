<script setup>
const props = defineProps(["data"]);

const data = props.data.modules.module_dynamic.major.opus;

function go(url) {
  window.open(
    "javascript:window.name;",
    '<script>location.replace("' + url + '")<\/script>'
  );
}
</script>

<template>
  <a-card :bordered="false">
    <div class="bili_dynamic_title">
      {{ data.title }}
    </div>
    <div v-for="i in data.pics">
      <img :src="i" referrerPolicy="no-referrer" @click="go(data.url)" />
    </div>
    <template #actions>
      <span @click="go(data.jump_url)"> <IconShareInternal /> 查看全文 </span>
    </template>
    <div v-html="data.summary.text + '...'" @click="go(data.jump_url)"></div>
  </a-card>
</template>

<style>
.bili_dynamic_datetime {
  font-size: 12px;
}
</style>
