<template>
  <div class="homePage">
    <Menu></Menu>
    <div class="card">
       <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "../components/menu/Menu.vue";
import { useStore } from "vuex";
import { reactive } from "vue";
const store = useStore();
const pageInfo = store.state.page
created: () => {
  window.sessionStorage.removeItem("token");
};
</script>

<style scoped lang="less">
.homePage {
  display: flex;
}
</style>
