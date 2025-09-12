<script setup>
const props = defineProps(["data"]);

const data = props.data.modules.module_dynamic.major.opus.summary.text;

const dynamic_id = props.data.id_str;
function go(url) {
  window.open(
    "javascript:window.name;",
    '<script>location.replace("' + url + '")<\/script>'
  );
}
</script>

<template>
  <a-card :bordered="false">
    <div
      class="bili_dynamic_normal"
      v-html="data"
      @click="go('https://www.bilibili.com/opus/' + dynamic_id)"
    />
  </a-card>
</template>

<style></style>
