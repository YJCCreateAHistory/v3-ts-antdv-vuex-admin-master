<template>
  <div style="width: 100">
    <a-menu mode="horizontal" theme="dark">
      <a-menu-item key="1">
        <template #icon>
          <PieChartOutlined />
        </template>
        <span>
          {{ data.meta.title }} <router-link :to="data.path"></router-link
        ></span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>{{ clientdata.meta.title }}</template>
        <!-- 渲染菜单 -->
        <a-menu-item
          :key="item.path"
          v-for="(item, index) in menuclient"
          @click="getMenuDetail(item.path, item.name)"
          >{{ item.meta.title }}</a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>{{ systemdata.meta.title }}</template>
        <a-menu-item
          v-for="(its, index) in menusys"
          :key="its.path"
          @click="getSysDetail(its.path, its.name)"
          ><router-link :to="its.path">{{
            its.meta.title
          }}</router-link></a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #icon>
          <setting-outlined />
        </template>
        <template #title>设置</template>
        <a-menu-item key="12" @click="loginOut">退出登录</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import {
  SettingOutlined,
  PieChartOutlined,
  MailOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { MenuType } from "./index";
const store = useStore();
const router = useRouter();
const routes = useRoute();
const menulist: MenuType = computed(() => {
  return routes.matched;
});
const data: MenuType = menulist.value[0];
// console.log(menulist.value[0]);
const {
  children: [clientdata, systemdata],
}: MenuType = menulist.value[0];
// console.log(clientdata, systemdata);
const menuclient: MenuType[] = clientdata.children;
const menusys: MenuType[] = systemdata.children;
const loginOut = () => {
  window.sessionStorage.clear();
  router.push({
    name: "Login",
    params: {},
  });
};
// 根据id跳转页面
const getMenuDetail = (path: string, name: string) => {
  router.push({
    name: `${name}`,
    params: { path },
  });
};
// 系统菜单栏
const getSysDetail = (path: string, name: string) => {
  router.push({
    name: `${name}`,
    params: { path },
  });
};
</script>
<style scoped lang="less"></style>
