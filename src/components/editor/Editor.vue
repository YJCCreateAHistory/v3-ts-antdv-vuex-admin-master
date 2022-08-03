<template>
  <a-card style="width: 85;  height: 100%">
  <a-card>
    <BreadCrumb></BreadCrumb>
  </a-card>
    <br />
    <div class="editor">
      <Editor
      ></Editor>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import Editor from "../wangeditor/Wangeditor.vue";
import  BreadCrumb  from "../breadCrumb/BreadCrumb.vue";
</script>

<style scoped lang="less"></style>
