<template>
  <a-card style="width: 70vw" title="Card title">
    <template #customTab="item">
      <span>
        <home-outlined />
      </span>
    </template>
    <template #extra>
      <a href="#">More</a>
    </template>
  </a-card>
  <br />
  <br />
  <a-card style="width: 70vh">
    <p>article content</p>
    <p>app content</p>
    <p>project content</p>
    <template #tabBarExtraContent>
      <a href="#">More</a>
    </template>
  </a-card>
</template>




<script setup lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue';

</script>
<style scoped lang="less"></style>
