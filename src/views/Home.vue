<template>
  <div style="height: 100%">
    <Nav></Nav>
    <a-card>
      <Menu></Menu>
      <a-card class="card" :bordered="flag">
        <router-view></router-view>
      </a-card>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Menu from "../components/menu/Menu.vue";
import Nav from "../components/nav/Nav.vue";
const flag = ref<boolean>(false);
</script>

<style scoped lang="less">
.homePage {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .card {
    width: 90%;
  }
}
</style>
