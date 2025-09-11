import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserLegacyStore = defineStore("user_legacy", () => {
  const id = ref('')
  const avatar = ref("/avatar/default.jpg");
  const name = ref('Default')
  const expire_at = ref(0)

  function reset(){
    id.value = -1;
    avatar.value = "./avatar/default.jpg";
    name.value = "Default";
    expire_at.value = 0;
  }

  return { id, avatar, name, expire_at, reset};
});
