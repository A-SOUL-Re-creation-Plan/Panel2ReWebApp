import { useUserStore } from "@/stores/user";
import { checkUserAccessToken } from "./uat_refresher";
import { storeToRefs } from "pinia";
const user = storeToRefs(useUserStore())
import requests from './index'
function get_uat (url, params={}){
  return new Promise((resolve, reject)=>{
    let c = checkUserAccessToken()
    c.then(() => {
      console.log('request start')
      let headers = {
        "Panel2Re-Authorization": user.token.value,
      };
      requests
        .get(url, { params: params, headers: headers })
        .then((resp) => {
          return resolve(resp)
        })
        .catch((e) => {
          return reject(e);
        });
    })
    .catch((e) => {
      console.log(e)
      return reject(e);
    });
  })
}
function post_uat (url, payload={}){
  return new Promise((resolve, reject) => {
    let c = checkUserAccessToken();
    c.then(() => {
      let headers = {
        "Panel2Re-Authorization": user.token.value,
      };
      requests
        .post(url, payload, { headers: headers })
        .then((resp) => {
          return resolve(resp);
        })
        .catch((e) => {
          return reject(e);
        });
    }).catch((e) => {
      console.log(e);
      return reject(e);
    });
  });
}
export { get_uat, post_uat };
