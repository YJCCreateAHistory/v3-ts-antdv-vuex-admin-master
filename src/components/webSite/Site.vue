<template>
  <a-card style="width: 100; height: 100%">
    <a-card>
      <BreadCrumb></BreadCrumb>
    </a-card>

    <br />
    <a-card style="width: auto; height: 80px; line-height: 80px">
      <a-input-search placeholder="input search text" style="width: 200px" />
    </a-card>
      <a-table
        bordered
        style="margin-top: 15px"
        :columns="columns"
        :data-source="data"
        :scroll="{ x: 1500, y: 600 }"
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'do'">
            <a-button type="primary" style="margin-right: 10px">编辑</a-button>
            <a-button type="primary">删除</a-button>
          </template>
        </template>
      </a-table>
  </a-card>
</template>

<script setup lang="ts">
import { ROUTE, SITEINFO, CALLBACK } from "./index";
import { defineComponent, onMounted, ref, nextTick, reactive } from "vue";
import type { TableColumnType } from "ant-design-vue";
import { PostRequest } from "../../api/http";
import BreadCrumb from "../breadCrumb/BreadCrumb.vue";

const columns: TableColumnType[] = reactive([
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "头像",
    dataIndex: "头像",
  },
  {
    title: "slogan",
    dataIndex: "slogan",
  },
  {
    title: "名字",
    dataIndex: "name",
  },
  {
    title: "domain",
    dataIndex: "domain",
  },
  {
    title: "格言",
    dataIndex: "notuec",
  },
  {
    title: "psc",
    dataIndex: "password",
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
const data = reactive<SITEINFO>([
  {
    id: "",
    avatar: "",
    slogan: "",
    name: "",
    domain: "",
    notice: "",
    psc: "",
    insertTime: "",
    updateTime: "",
  },
]);
// 拿到数据
const getSite = PostRequest("/site/info").then((res: CALLBACK) => {
  data[0] = res.records[0];
  console.log(data[0]);
});
</script>

<style scoped lang="less"></style>
