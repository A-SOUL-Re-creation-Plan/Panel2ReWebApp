import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const id = ref('')
  const group = ref([])
  const avatar = ref("/avatar/1df27add70b02a21e9aaeac50f15bfe4547510303.jpg");

  const setID = (x)=>{
    id.value = x;
  }
  const setGroup = (x) => {
    group.value = x;
  };
  const setAvatar = (x) => {
    avatar.value = x;
  };

  function reset(){
    id.value = '';
    group.value = [];
    avatar.value = "/avatar/1df27add70b02a21e9aaeac50f15bfe4547510303.jpg";
  }
  return { id, group, avatar, setAvatar, setGroup, setID, reset };
});
