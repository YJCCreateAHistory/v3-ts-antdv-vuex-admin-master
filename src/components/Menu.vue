<template>
<div class="card">
  <a-card style="width: 85vw">
      <a-breadcrumb>
        <a-breadcrumb-item><a href="">首页</a></a-breadcrumb-item>
      </a-breadcrumb>
    </a-card>
    <br />
    <br />
</div>
  <div style="width: 100vw" class="container">
    <a-menu
      mode="inline"
      theme="dark"
      style="height: 80vh; width: 10vw;"
    >
      <a-menu-item key="1">
        <template #icon>
          <PieChartOutlined />
        </template>
        <span>首页</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>客户端管理</template>
        <a-menu-item key="2">分类管理</a-menu-item>
        <a-menu-item key="3">友链管理</a-menu-item>
        <a-menu-item key="4">站点管理</a-menu-item>
        <a-menu-item key="5">评论管理</a-menu-item>
        <a-menu-item key="6">社交管理</a-menu-item>
        <a-menu-item key="7">博文管理</a-menu-item>
        <a-menu-item key="8">音乐管理</a-menu-item>
        <a-menu-item key="9">标签管理</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>系统管理</template>
        <a-menu-item key="10">角色管理</a-menu-item>
        <a-menu-item key="11">菜单管理</a-menu-item>
      </a-sub-menu>
    </a-menu>
    <Role></Role>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import Role from "./Role.vue"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";

</script>
<style scoped lang="less">
.container {
  display: flex;
justify-content: space-around;
}
.card {

  margin-left: 12.5%;
}
</style>
