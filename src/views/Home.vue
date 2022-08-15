<template>
  <div class="container">
    <Nav></Nav>
    <Menu></Menu>

      <router-view></router-view>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Menu from "../components/menu/Menu.vue";
import Nav from "../components/nav/Nav.vue";
const flag = ref<boolean>(false);
</script>

<style scoped lang="less">
.container {
  background-image: url("./assets/wallhaven-1kv693_1920x1080.png");

}
</style>
