import axios from "axios";
import { Notification } from '@arco-design/web-vue'
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
    return config;
  }, function (error) {
    networkErrNotification(error.code + "\n" + error.response.data.msg);
    return Promise.reject(error);
  });

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    networkErrNotification(error.code + "\n" + error.response.data.msg);
    return Promise.reject(error);
  });

export default instance