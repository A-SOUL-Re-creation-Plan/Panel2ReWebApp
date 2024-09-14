import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserLegacyStore = defineStore("user_legacy", () => {
  const id = ref('')
  const avatar = ref("/avatar/default.jpg");
  const name = ref('Default')
  const token = ref('')
  const expire_at = ref(0)

  function reset(){
    id.value = '';
    avatar.value = "/avatar/default.jpg";
    name.value = "Default";
    token.value = "";
    expire_at.value = 0;
  }
  return { id, avatar, name, token, expire_at, reset };
});
