import axios from "axios";
import { ref } from "vue"
import { useUserStore } from "@/stores/user";
import { checkUserAccessToken } from "./uat_refresher";
import { storeToRefs } from "pinia";
const user = storeToRefs(useUserStore())
import requests from './index'
var data_ = ""
var headers = {
  "Panel2Re-Authorization": `${user.token.value}`,
};
async function get_uat (url, params={}){
  var requestAllowed = await checkUserAccessToken();
  if(requestAllowed){
    await requests
      .get(url, { params: params, headers: headers })
      .then((resp) => {
        data_ = resp.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return data_;
}
async function post_uat (url, payload={}){
  var requestAllowed = await checkUserAccessToken();
  if(requestAllowed){
    await requests
      .post(url, payload, { headers: headers })
      .then((resp) => {
        data_ = resp.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return data_;
}
export { get_uat, post_uat };
