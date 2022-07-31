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
    </a-breadcrumb>
  </a-card>
  <br />
  <a-card style="width: 83vw; margin-left: 1vw">
    <a-list
      class="demo-loadmore-list"
      :loading="initLoading"
      item-layout="horizontal"
      :data-source="list"
    >
      <template #loadMore>
        <div
          v-if="!initLoading && !loading"
          :style="{
            textAlign: 'center',
            marginTop: '12px',
            height: '32px',
            lineHeight: '32px',
          }"
        >
          <a-button @click="onLoadMore">loading more</a-button>
        </div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a key="list-loadmore-edit">编辑</a>
            <a key="list-loadmore-more">删除</a>
          </template>
          <a-skeleton avatar :title="false" :loading="!!item.loading" active>
            <a-list-item-meta
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            >
              <template #title>
                {{ item.name.last }}
              </template>
              <template #avatar>
                <a-avatar :src="item.picture.large" />
              </template>
            </a-list-item-meta>
          </a-skeleton>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>
<script lang="ts" setup>
import { ROUTE } from "./index";
import { defineComponent, onMounted, ref, nextTick } from "vue";
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
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const initLoading = ref(true);
const loading = ref(false);
const data = ref([]);
const list = ref([]);
onMounted(() => {
  fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      initLoading.value = false;
      data.value = res.results;
      list.value = res.results;
    });
});

const onLoadMore = () => {
  loading.value = true;
  list.value = data.value.concat(
    [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))
  );
  fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      const newData = data.value.concat(res.results);
      loading.value = false;
      data.value = newData;
      list.value = newData;
      nextTick(() => {
        window.dispatchEvent(new Event("resize"));
      });
    });
};
</script>
