import { useUserStore } from "@/stores/user";
import { checkUserAccessToken } from "./uat_refresher";
import { storeToRefs } from "pinia";
const user = storeToRefs(useUserStore())
import requests from './index'
var data_ = ""
function get_uat (url, params={}){
  return new Promise((resolve, reject)=>{
    checkUserAccessToken
      .then(() => {
        var headers = {
          "Panel2Re-Authorization": user.token.value,
        };
        requests
          .get(url, { params: params, headers: headers })
          .then((resp) => {
            resolve(resp)
          })
          .catch((e) => {
            reject(e);
          });
      })
      .catch((e) => {
        console.log(e)
        reject(e)
      });
  })
}
function post_uat (url, payload={}){
  return new Promise((resolve, reject) => {
    checkUserAccessToken
      .then(() => {
        var headers = {
          "Panel2Re-Authorization": user.token.value,
        };
        requests
          .post(url, payload, { headers: headers })
          .then((resp) => {
            resolve(resp);
          })
          .catch((e) => {
            reject(e);
          });
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
}
export { get_uat, post_uat };
