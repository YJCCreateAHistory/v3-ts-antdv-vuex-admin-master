<template>
  <div style="width: 15vw; height: 100vh;">
    <a-menu mode="inline" 
    theme="light" style="height: 100%; width: 15vw">
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
        <!-- 渲染菜单 -->
        <a-menu-item 
        :key="item.id" 
        v-for="(item, id) in menu"
       @click="getMenuDetail(item.id, item.name, item.title)">
        {{
          item.title
        }}</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>系统管理</template>
        <a-menu-item 
        v-for="(its, id) in sys" 
        :key="its.id"
        @click="getSysDetail(its.id, its.name, its.title)">{{its.title}}</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>设置</template>
        <a-menu-item key="12" @click="loginOut">退出登录</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import {
  PieChartOutlined,
  MailOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { MenuType } from "./menu";
import {useStore} from "vuex"
const store = useStore()
// 登出
const router = useRouter();
const loginOut = () => {
  window.sessionStorage.clear();
  router.push({
    name: "Login",
    params: {},
  });
};
// 客户端菜单栏
const menu = reactive<MenuType>([
  {
    id: 1,
    title: "分类管理",
    name:"Classes"
  },
  {
    id: 2,
    title: "友链管理",
    name:"Friend"
  },
  {
    id: 3,
    title: "站点管理",
    name:"Site"
  },
  {
    id: 4,
    title: "评论管理",
    name:"Comment"
  },
  {
    id: 5,
    title: "社交管理",
    name:"Socials"
  },
  {
    id: 6,
    title: "博文管理",
    name:"Blog"
  },
  {
    id: 7,
    title: "音乐管理",
    name:"Music"
  },
  {
    id: 8,
    title: "标签管理",
    name:"Tag"
  },
]);
// 根据id跳转页面
const getMenuDetail = (id:number | string, name:string, title:string)=>{
  // console.log(id,name)
  router.push({
    name:`${name}`,
    params: {id}
  })
  const data = {id, name, title}
store.commit("getMenuDetail", JSON.stringify(data))
}
// 系统菜单栏
const sys = reactive<MenuType>([
  {
    id:9,
    title: "角色管理",
    name:"Role"
  },
  {
    id:10,
    title:"用户管理",
    name:"User"
  }
])
const getSysDetail = (id:number | string, name:string, title:string)=>{
  // console.log(id,name)
  router.push({
    name:`${name}`,
    params: {id}
  })
  const data = {id, name, title}
store.commit("getSysDetail", JSON.stringify(data))
}
// const active = store.state.flag
// console.log(active, 222)
</script>
<style scoped lang="less"></style>
