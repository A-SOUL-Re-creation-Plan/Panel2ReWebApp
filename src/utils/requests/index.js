import axios from "axios";
import { Notification } from "@arco-design/web-vue";
import { useUserLegacyStore } from "@/stores/user_legacy";
import { storeToRefs } from "pinia";
import { Modal } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import isElectron from "is-electron";

const router = useRouter();

const networkErrNotification = (code) => {
  Notification.error({
    title: "网络请求出错",
    content: code,
    duration: 5000,
  });
};

const baseURL = isElectron ? "resonance://api" : "/api";

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
