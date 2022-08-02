<template>
  <a-card style="width: 85;  height: 100%">
  <a-card>
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>客户端管理</a-breadcrumb-item>
      <a-breadcrumb-item>文章内容</a-breadcrumb-item>
    </a-breadcrumb>
  </a-card>
    <br />
    <div class="editor">
      <Editor
        :data="updateinfo.data.content"
        @onReceiveMsg="onReceiveMsg"
      ></Editor>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import Editor from "../Wangeditor.vue";
import { UPDATEARTICLE } from "./index";
import { reactive, ref } from "vue";
const updateinfo = reactive<UPDATEARTICLE>({
  data: {
    id: "",
    classId: "",
    className: "",
    classValue: "",
    isPublish: null,
    title: "",
    summary: "",
    commentsCount: 0,
    viewsCount: 0,
    img: "",
    content: "",
    isTop: null,
    isHot: null,
    pubTime: "",
    createTime: "",
    updateTime: "",
  },
});
// 修改文章数据，这里通过defineEimts拿到数据
const onReceiveMsg = (params: any) => {
  updateinfo.data.content = params.value;
};

</script>

<style scoped lang="less"></style>
