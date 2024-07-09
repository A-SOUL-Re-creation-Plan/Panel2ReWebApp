import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const id = ref('')
  const avatar = ref("/avatar/1df27add70b02a21e9aaeac50f15bfe4547510303.jpg");
  const name = ref('Panel2Re')
  const token = ref('')
  const refresh_token = ref('')
  const rt_expires = ref(0)
  const at_expires = ref(0);

  function reset(){
    id.value = '';
    avatar.value = "/avatar/1df27add70b02a21e9aaeac50f15bfe4547510303.jpg";
    name.value = "Panel2Re";
    token.value = "";
    refresh_token.value = "";
    rt_expires.value = "";
    at_expires.value = "";
  }
  return { id, avatar, name, token, refresh_token, rt_expires, at_expires, reset };
});
