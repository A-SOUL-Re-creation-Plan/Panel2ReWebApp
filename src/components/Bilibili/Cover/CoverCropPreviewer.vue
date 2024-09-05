<script setup>
import 'vue-cropper/dist/index.css'
import { VueCropper } from "vue-cropper";
import { ref } from 'vue';
const cropper = ref()
const cropper_fN = ref([16,9])
const cropper_img = ref()
const cropper_key = ref(0)
const cropper_updTrigger = ()=>{
    cropperClear()
    let btn = document.getElementById('cropper_upbtn')
    btn.click()
}
const cropperClear = ()=>{
    cropper_img.value = '';
    let btn = document.getElementById('cropper_upbtn');
    btn.value = "";
}
const cropper_modfN = (x,y)=>{
    cropper_fN.value = [x,y]
    cropper_key.value += 1;
}
const handleCoverFile = (event)=>{
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = ()=>{
        cropper_img.value = fileReader.result;
    }
    fileReader.readAsDataURL(file);
}
const cropper_export = ()=>{
    cropper.value.getCropBlob((data)=>{
        let reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onload = (e)=>{
            const a = document.createElement('a');
            a.download = 'result.png';
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    })
}
</script>

<template>
    <a-card title="封面裁剪效果预览/导出">
        <div class="vue-cropper">
            <VueCropper
                :img="cropper_img"
                ref="cropper"
                outputType="png"
                :autoCrop="true"
                :fixed="true"
                :fixedNumber="cropper_fN"
                :infoTrue="true"
                :centerBox="true"
                :high="true"
                :key="cropper_key"
                :full="true"
            />
        </div>
        <div class="vue-cropper_controller">
            <a-button type="primary" @click="cropper_updTrigger">
                <template #icon>
                    <icon-plus />
                </template>
                加载图片
            </a-button>
            <input type="file" id="cropper_upbtn" style="display: none;" @change="handleCoverFile" />
            <a-button @click="cropper_modfN(16,9)">16:9</a-button>
            <a-button @click="cropper_modfN(16,10)">16:10</a-button>
            <a-button @click="cropper_export">保存截取后图片</a-button>
            <a-button type="outline" @click="cropperClear">
                <template #icon>
                    <icon-delete />
                </template>    
                清空
            </a-button>
        </div>
    </a-card>
</template>

<style scoped>
.vue-cropper{
    height: 400px;
}
.vue-cropper_controller > *{
    margin-right: 15px;
    margin-top: 10px;
}
</style>