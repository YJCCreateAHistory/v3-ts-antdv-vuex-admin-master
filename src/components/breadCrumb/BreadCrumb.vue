<template>

    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in list" :key="item.path"
        ><router-link :to="item.path"
          >{{ item.meta.title }}
        </router-link>
        </a-breadcrumb-item>
    </a-breadcrumb>

</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
const router = useRoute();
const list = computed(() => {
  return router.matched;
});
</script>

<style scoped lang="less"></style>
