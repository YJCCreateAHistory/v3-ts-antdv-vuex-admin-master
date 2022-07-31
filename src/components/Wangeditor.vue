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
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
  <a-button @click="sendMsg" type="primary" style="margin-top:10px">保存</a-button>
</template>
<script lang="ts" setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, defineProps, reactive, defineEmits, toRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

// blog传值
const props = defineProps({
  data:String
});
const mode = ref<string>("default");

// const {content} = toRef()
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
const valueHtml:any = toRef(props, 'data')

interface EmitType {
  (e: "onReceiveMsg", params: string): void
}
const emit = defineEmits<EmitType>();

const sendMsg = () => {
  // 传input值给父组件
  emit("onReceiveMsg", valueHtml);
}

const toolbarConfig = {};
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
</script>
<style scoped lang="less"></style>
