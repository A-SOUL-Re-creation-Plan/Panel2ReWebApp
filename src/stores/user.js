import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const id = ref('')
  const avatar = ref("/avatar/default.jpg");
  const name = ref('Panel2Re')
  const token = ref('')
  const refresh_token = ref('')
  const rt_expires = ref(0)
  const at_expires = ref(0);

  function reset(){ 
    id.value = '';
    avatar.value = "./avatar/default.jpg";
    name.value = "Panel2Re";
    token.value = "";
    refresh_token.value = "";
    rt_expires.value = "";
    at_expires.value = "";
  }
  return { id, avatar, name, token, refresh_token, rt_expires, at_expires, reset };
},{
  persist: {
    enabled: true
  }
});
