<template>
  <a-card style="width: 83vw; margin-left: 1vw">
    <a-breadcrumb >
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>客户端管理</a-breadcrumb-item>
      <a-breadcrumb-item>分类管理</a-breadcrumb-item>
    </a-breadcrumb>
  </a-card>
  <a-table
    bordered
    style="margin-top: 15px; width: 83vw; margin-left: 0.5vw"
    :columns="columns"
    :data-source="data"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'do'">
        <a-button type="primary" style="margin-right: 10px">编辑</a-button>
        <a-button type="primary">删除</a-button>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getBlogClasses } from "../../api/blog";
import { PostRequest } from "../../api/http";
import type { TableColumnType } from "ant-design-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { CLASSINFO, EL, ROUTES } from "./index";

const router = useRouter();

const store = useStore();
const columns: TableColumnType[] = reactive([
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "分类名称",
    dataIndex: "className",
  },
  {
    title: "classValue",
    dataIndex: "classValue",
  },
  {
    title: "创建时间",
    dataIndex: "insertTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
  },
  {
    title: "操作",
    dataIndex: "do",
  },
]);
// 拿到用户数据
let data = reactive<CLASSINFO>([]);
// 拿到管理员数据
const userData = PostRequest(`/blog/classes`).then((res: any) => {
  // console.log(res);
  res.records.forEach((el: EL, index: string) => {
    data.push(el);
  });
});
// console.log(data);

</script>

<style scoped lang="less"></style>
