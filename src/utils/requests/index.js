import axios from "axios";
import { Notification } from '@arco-design/web-vue'
import { useUserLegacyStore } from "@/stores/user_legacy";
import { storeToRefs } from "pinia";
import { Modal } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

const router = useRouter()

const networkErrNotification = (code) => {
    Notification.error({
        title: '网络请求出错',
        content: code,
        duration: 5000
    })
}
// import.meta.env.VITE_API_MOCKING && import("@/utils/requests/mock");
const instance = axios.create()

instance.interceptors.request.use(function (config) {
    const user = useUserLegacyStore();
    const { token } = storeToRefs(user);
    config.headers["Panel2Re-Authorization"] = token.value;
    return config;
  }, function (error) {
    networkErrNotification(error.code + "\n" + error.response.data.msg);
    return Promise.reject(error);
  });

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    networkErrNotification(error.code + "\n" + error.response.data.msg);
    if (error.response.data.msg === "AUTH_FAILED") {
      Modal.open({
        title: "令牌过期",
        content: "登录过期，请重新登录。",
        onOk: () => {
          useUserLegacyStore().reset();
          window.location.href = '/'
        },
      });
    }
    return Promise.reject(error);
  });

export default instance