import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { Modal } from "@arco-design/web-vue";
const user = storeToRefs(useUserStore())
async function checkUserAccessToken(){
    if (user.rt_expires.value <= Date.parse(new Date()) / 1000) {
      Modal.open({
        title: "令牌过期",
        content: "登录过期，请使用飞书SSO重新授权登录。",
        onOk: () => {
          useUserStore().reset();
          router.push("/user/login");
        },
      });
    } else if (user.at_expires.value <= Date.parse(new Date()) / 1000) {
      instance.get("/api/refresh_uat").then((resp) => {
        if (resp.data.code == 0) {
          user.token.value = resp.data.data.access_token;
          user.refresh_token.value = resp.data.data.refresh_token;
          user.rt_expires.value = resp.data.data.rt_expires_at;
          user.at_expires.value = resp.data.data.at_expires_at;
        }
      });
    }
}

export { checkUserAccessToken }
