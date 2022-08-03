<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      :defaultConfig="editorConfig"
      v-model="valueHtml"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
  <a-button type="primary" style="margin-top:10px" @click="submitContent">保存</a-button>
</template>
<script lang="ts" setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, defineProps, reactive, defineEmits, toRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import {useRoute} from "vue-router"
import { useStore } from "vuex";
import {DATA, ToolbarConfig} from "./index"

const routes = useRoute()
const store = useStore()
const mode = ref<string>("default");
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const toolbarConfig:ToolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
// console.log(routes.params)
const valueHtml = ref()
const data:DATA = store.state.article
// console.log(data)
if(data.id!=="") {
  console.log(data)
  valueHtml.value = data.content
}else {
  valueHtml.value = ""
}
const submitContent = ()=>{
    
}
</script>
<style scoped lang="less"></style>
