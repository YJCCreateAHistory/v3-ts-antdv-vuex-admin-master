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
  <br />
  <a-button type="primary" @click="submitNewContent">保存</a-button>
</template>
<script lang="ts" setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  defineProps,
  defineEmits,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { useStore } from "vuex";
import { DATA, ToolbarConfig } from "./index";
import { getBlogContentById } from "./api";

const store = useStore();
const mode = ref<string>("default");
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const toolbarConfig: ToolbarConfig = {};
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
const props = defineProps({
  msg: String,
});
const valueHtml = ref();
let params: DATA = {
  // 接收传进来相应文章的id
  id: props.msg,
};
onMounted(() => {
  // 路由进来后根据路由id拿到博文数据
  getBlogContentById(params).then((res: DATA) => {
    valueHtml.value = res.records[0].content;
  });
});
// 给blog传递文本数据
const emits = defineEmits<{
  (e: "handleChangeCreate", valueHtml: string): void;
  (e: "handleChangeUpdate", valueHtml: string): void;
}>();
const submitNewContent = () => {
  emits("handleChangeCreate", valueHtml.value);
  emits("handleChangeUpdate", valueHtml.value);
};
// 组件退出后要进行销毁，不然再进来还是之前的状态
</script>
<style scoped lang="less"></style>
