<template>
  <a-card style="width: 83vw; margin-left: 1vw">
    <a-breadcrumb style="margin-bottom: 20px">
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>客户端管理</a-breadcrumb-item>
      <a-breadcrumb-item>博文管理</a-breadcrumb-item>
    </a-breadcrumb>
    <div>
      <a-button type="primary" @click="showModal">添加用户</a-button>
      <a-modal v-model:visible="visible" title="新增博客信息" @ok="handleOk">
        <a-form
          name="basic"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
        >
          <a-form-item label="classId" name="classId">
            <a-input v-model:value="info.classId" />
          </a-form-item>
          <a-form-item label="分类名称" name="classes">
            <a-input v-model:value="info.className" />
          </a-form-item>

          <a-form-item label="classValue" name="classValue">
            <a-input v-model:value="info.classValue" />
          </a-form-item>
          <a-form-item label="文章题目" name="title">
            <a-input v-model:value="info.title" />
          </a-form-item>
          <a-form-item label="是否发布" name="isPublish">
            <a-switch v-model:checked="publishFlag" @change="changeState3" />
          </a-form-item>
          <a-form-item label="主要内容" name="summary">
            <a-input v-model:value="info.summary" />
          </a-form-item>
          <a-form-item label="文章图片" name="img">
            <a-input v-model:value="info.img" />
          </a-form-item>
          <a-form-item label="文章内容" name="content">
            <a-input v-model:value="info.content" />
          </a-form-item>
          <a-form-item label="是否置顶" name="isTop">
            <a-switch v-model:checked="topFlag" @change="changeState1" />
          </a-form-item>
          <a-form-item label="是否热门" name="isHot">
            <a-switch v-model:checked="hotFlag" @change="changeState2" />
          </a-form-item>
          <a-form-item name="发布时间" label="pubDate">
            <a-date-picker
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              v-model:value="info.pubTime"
            />
          </a-form-item>
          <a-form-item name="创建时间" label="createDate">
            <a-date-picker
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              v-model:value="info.createTime"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </a-card>
  <a-table
    bordered
    style="margin-top: 15px; width: 83vw; margin-left: 0.5vw"
    :columns="columns"
    :data-source="data"
    v-model:value="data"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'do'">
        <div
          style="display: flex; justify-content: space-between; width: 150px"
        >
          <a-button type="primary">编辑</a-button>
          <a-button type="primary">删除</a-button>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { PostRequest } from "../../api/http";
import type { TableColumnType } from "ant-design-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { CLASSINFO, EL, CREATARTICLE } from "./index";
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
const router = useRouter();
const store = useStore();
const columns: TableColumnType[] = reactive([
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "classId",
    dataIndex: "classId",
  },
  {
    title: "分类名称",
    dataIndex: "className",
  },
  {
    title: "classValue",
    dataIndex: "classValue",
  },
  {
    title: "浏览次数",
    dataIndex: "viewsCount",
  },
  {
    title: "评论次数",
    dataIndex: "commentCount",
  },
  {
    title: "是否置顶",
    dataIndex: "isTop",
  },
  {
    title: "创建时间",
    dataIndex: "insertTime",
  },
  {
    title: "发布时间",
    dataIndex: "pubTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
  },
  {
    title: "操作",
    dataIndex: "do",
  },
]);
// 拿到用户数据
let data = reactive<CLASSINFO>([]);
// 拿到管理员数据,进入时就拿到数据

const userData = () => {
  PostRequest("/blog/list").then((res: any) => {
    res.records.forEach((el: EL, index: string) => {
      data.push(el);
    });
  });
};
// 渲染前加载数据
created:( userData());
// 是否置顶
let topFlag = ref<boolean>(false);
let publishFlag = ref<boolean>(false);
let hotFlag = ref<boolean>(false);
const changeState1 = () => {
  topFlag.value = !topFlag.value;
};
const changeState3 = () => {
  publishFlag.value = !publishFlag.value;
};
const changeState2 = () => {
  hotFlag.value = !hotFlag.value;
};
// 收集信息
const info = reactive<CREATARTICLE>({
  id: "",
  classId: "",
  className: "",
  classValue: 0,
  title: "",
  isPublish: publishFlag.value,
  summary: "",
  commentsCount: "",
  viewsCount: "",
  img: "",
  content: "",
  isTop: topFlag.value,
  isHot: hotFlag.value,
  pubTime: "",
  createTime: "",
  updateTime: "",
  catetypeId: "",
});
// 增加博文
const visible = ref<boolean>(false); // dialog弹窗
const showModal = () => {
  visible.value = true;
};

const handleOk = async (e: MouseEvent) => {
  visible.value = false
  PostRequest("/blog/create", info)
  for(let key in info){
    info[key] = ""
  }
};
</script>

<style scoped lang="less"></style>
