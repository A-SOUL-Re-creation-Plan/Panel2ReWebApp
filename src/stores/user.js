import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const id = ref('')
  const avatar = ref("/avatar/1df27add70b02a21e9aaeac50f15bfe4547510303.jpg");
  const name = ref('Panel2Re')

  const setID = (x)=>{
    id.value = x;
  }
  const setAvatar = (x) => {
    avatar.value = x;
  };
  const setName = (x) => {
    name.value = x
  }
  function reset(){
    id.value = '';
    avatar.value = "/avatar/1df27add70b02a21e9aaeac50f15bfe4547510303.jpg";
    name.value = "Panel2Re";
  }
  return { id, avatar, setAvatar, setID, reset };
});
