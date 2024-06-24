import { defineStore } from "pinia";
import { ref } from "vue";
const archiveStatusStore = defineStore('archive_count', ()=>{
    const pubed = ref(0)
    const not_pubed = ref(0)
    const is_pubing = ref(0)
    return {
        pubed, not_pubed, is_pubing
    }
})
export default archiveStatusStore