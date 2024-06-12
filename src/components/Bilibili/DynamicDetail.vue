<script setup>
import dateFormatter from '@/utils/dateFormatter';
const props = defineProps(['content'])
const data = props.content
const dynamic_type = {
    'DYNAMIC_TYPE_WORD': ['动态','WORD'],
    'DYNAMIC_TYPE_AV': ['视频','AV'],
    'DYNAMIC_TYPE_FORWARD': ['转发动态','FORWARD'],
    'DYNAMIC_TYPE_DRAW': ['图文','DRAW'],
    'DYNAMIC_TYPE_ARTICLE': ['专栏','ARTICLE'],
}
const t = dynamic_type[data.type][0]
const c = dynamic_type[data.type][1]
const n = data.modules.module_author.name
const date = dateFormatter(new Date(data.modules.module_author.pub_ts*1000))
</script>

<script>
import ARTICLE from '@/components/Bilibili/DynamicDetails/ARTICLE.vue';
import DRAW from '@/components/Bilibili/DynamicDetails/DRAW.vue';
import FORWARD from '@/components/Bilibili/DynamicDetails/FORWARD.vue';
import WORD from '@/components/Bilibili/DynamicDetails/WORD.vue';
import AV from '@/components/Bilibili/DynamicDetails/AV.vue';
export default{
    components: {
        ARTICLE,DRAW,FORWARD,WORD,AV
    }
}
</script>

<template>
<div class="bili_dynamic_detail">
    <a-card>
        <template #title>
            {{ n }} 发布了 {{ t }}
        </template>
        <template #extra>
            {{date}}
        </template>
        <div class="bili_dynamic_desc">
            <component :is="c" :data="data"/>
        </div>
    </a-card>
</div>
</template>

<style scoped>
    .bili_dynamic_desc {
        /* line-height: 20px; */
        white-space: pre-wrap;
    }
    .bili_dynamic_detail{
        padding-top: 8px;
        padding-bottom: 8px;
    }
</style>