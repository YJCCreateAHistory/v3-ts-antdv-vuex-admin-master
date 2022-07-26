<template>
  <a-card style="width: 83vw; margin-left: 1vw">
  <a-breadcrumb :routes="routes">
    <template #itemRender="{ route, params, routes, paths }">
      <span v-if="routes.indexOf(route) === routes.length - 1">{{
        route.breadcrumbName
      }}</span>
      <router-link v-else :to="paths.join('/')">{{
        route.breadcrumbName
      }}</router-link>
    </template>
  </a-breadcrumb></a-card>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import {ROUTE} from "./index"
import getActive from "../../Hooks/getActiveFlag"
const routes = ref<ROUTE[]>([
  {
    path: "home",
    breadcrumbName: "首页",
  },
  {
    path: "home",
    breadcrumbName: "客户端管理",
  },
  {
    path: "",
    breadcrumbName: "友链管理",
  },
]);
let rid = {}
const TEST = getActive(rid)
console.log(TEST);
</script>
