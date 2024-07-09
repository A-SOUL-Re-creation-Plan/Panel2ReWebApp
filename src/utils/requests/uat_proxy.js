import axios from "axios";
import { ref } from "vue"
import { useUserStore } from "@/stores/user";
import { checkUserAccessToken } from "./uat_refresher";
import { storeToRefs } from "pinia";
const user = storeToRefs(useUserStore())
const instance = axios.create()
var data_ = ""
async function get_uat (url, params={}){
  await checkUserAccessToken()
  var headers = {
    "Panel2Re-Authorization": `${user.token.value}`,
  };
  await instance
    .get(url, { params: params, headers: headers })
    .then((resp) => {
      data_ = resp.data;
    })
    .catch((e) => {
      data_ = Promise.reject(e);
    });
  return data_; 
}
async function post_uat (url, payload={}){
  await checkUserAccessToken();
  var headers = {
    "Panel2Re-Authorization": `${user.token.value}`
  }
  await instance
    .post(url, payload, { headers: headers })
    .then((resp) => {
      data_ = resp.data;
    })
    .catch((e) => {
      data_ = Promise.reject(e);
    });
  return data_;
}
export { get_uat, post_uat };
