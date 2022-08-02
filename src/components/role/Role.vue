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
      <a-input-search placeholder="input search text" style="width: 200px" />

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
  </a-card>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { TableColumnType } from "ant-design-vue";
import { PostRequest } from "../../api/http";
import { useStore } from "vuex";
import { UserInfo, PromiseThen } from "./index";
const store = useStore();
// 渲染表头
const columns: TableColumnType[] = reactive([
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "用户名称",
    dataIndex: "username",
  },
  {
    title: "密码",
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

// 拿到用户数据
const data = reactive<UserInfo>([
  {
    id: "",
    insertTime: "",
    password: "",
    updateTime: "",
    username: "",
  },
]);
// 拿到管理员数据
const userData = PostRequest(
  `/login?username=${store.state.data.username}&password=${store.state.data.password}`
).then((res: PromiseThen) => {
  data[0] = res.records[0];
});
</script>
<style scoped lang="less"></style>
