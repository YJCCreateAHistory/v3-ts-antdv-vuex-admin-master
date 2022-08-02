<template>
  <a-card>
    <a-card style="width: 100; margin-left: 1vw">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>系统管理</a-breadcrumb-item>
        <a-breadcrumb-item>角色管理</a-breadcrumb-item>
      </a-breadcrumb>
    </a-card>
    <br />
    <a-card style="width: 100; height: 100%; margin-left: 1vw">
      <a-input-search placeholder="" style="width: 200px" />
      <br /><br />
    <a-button type="primary">新增</a-button>
      <a-table
        bordered
        style="margin-top: 15px"
        :columns="columns"
        :data-source="data"
        :scroll="{ x: 1500, y: 600 }"
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'do'">
            <div style="display: flex; width: 140px;justify-content: space-between;">
              <a-button type="primary">编辑</a-button>
              <a-button type="primary">删除</a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
  </a-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { TableColumnType } from "ant-design-vue";
import { SOCIALS } from "./index";
import {
  getSocialsList,
  updateSocialsList,
  createSocialsList,
  deleteSocialsList,
} from "./api";
// 渲染表头
const columns: TableColumnType[] = reactive([
  {
    title: "title",
    dataIndex: "title",
  },
  {
    title: "图标",
    dataIndex: "icon",
  },
  {
    title: "颜色",
    dataIndex: "color",
  },
  {
    title: "链接",
    dataIndex: "href",
  },
  {
    title: "创建时间",
    dataIndex: "href",
  },
  {
    title: "操作",
    dataIndex: "do",
  },
]);
const data = ref<SOCIALS>([]);
onMounted(() => {
  getSocialsList().then((res: SOCIALS) => {
    data.value = [...res.records];
  });
});
</script>
<style scoped lang="less"></style>
