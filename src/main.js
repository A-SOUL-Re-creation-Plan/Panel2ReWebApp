import { createApp } from 'vue'
import pinia from '@/stores'
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";

import "@/assets/fonts.css";

import App from './App.vue'
import router from './router'

const app = createApp(App)

const ver_ = "v0.0.1_canary";
app.config.globalProperties.$p2rv_version = ver_;

app.use(pinia)
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)

app.mount('#app')
