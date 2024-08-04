import axios from "axios";
import { Notification } from '@arco-design/web-vue'
const networkErrNotification = (code) => {
    Notification.error({
        title: 'Network Error',
        content: '错误代码: '+code,
        duration: 5000
    })
}
// import.meta.env.VITE_API_MOCKING && import("@/utils/requests/mock");
const instance = axios.create()

instance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    networkErrNotification(error.code);
    return Promise.reject(error);
  });

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    networkErrNotification(error.code);
    return Promise.reject(error);
  });

export default instance