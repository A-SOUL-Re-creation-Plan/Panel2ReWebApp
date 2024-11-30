import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { Modal } from "@arco-design/web-vue";
import router from '@/router'
import requests from '@/utils/requests'
const user = storeToRefs(useUserStore())
const headers = {
  "Panel2Re-RefreshAuthorization": user.refresh_token.value,
};
function onUserAccessTokenExpired(){
  console.log("refresh_token expired");
  Modal.open({
    title: "令牌过期",
    content: "登录过期，请使用飞书SSO重新授权登录。",
    onOk: () => {
      useUserStore().reset();
      router.push("/user/login");
    },
  });
}

const fetchUserAccessToken = ()=>{
  return new Promise((res, rej) => {
    requests
      .get("/lark_refresh_uat", { headers: headers })
      .then((resp) => {
        if (resp.data.code == 0) {
          user.token.value = resp.data.data.access_token;
          user.refresh_token.value = resp.data.data.refresh_token;
          user.rt_expires.value = resp.data.data.rt_expires_at;
          user.at_expires.value = resp.data.data.at_expires_at;
          return res();
        } else {
          return rej(resp.data);
        }
      })
      .catch((e) => {
        onUserAccessTokenExpired();
        return rej(e);
      });
  });
} 

const checkUserAccessToken = () => {
  return new Promise((res, rej) => {
    if (
      user.rt_expires.value <= Date.parse(new Date()) / 1000 ||
      user.refresh_token.value.length <= 3
    ) {
      console.log("rt expired");
      onUserAccessTokenExpired();
      return rej();
    } else if (
      user.at_expires.value <= Date.parse(new Date()) / 1000 ||
      user.token.value.length <= 3
    ) {
      console.log("uat expired");
      let e = fetchUserAccessToken()
      e.then(() => {
        console.log("success");
        return res();
      })
      .catch((e) => {
        console.log(e);
        return rej(e);
      });
    } else {
      console.log("nothing happened");
      return res();
    }
  });
} 

export { checkUserAccessToken };
