<template>
  <a-card style="width: auto; margin-left: 1vw">
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>客户端管理</a-breadcrumb-item>
      <a-breadcrumb-item>分类管理</a-breadcrumb-item>
    </a-breadcrumb>
    <br />
    <a-button type="primary" @click="showCreateClasses">新增分类</a-button>
    <a-table
      bordered
      style="margin-top: 15px; width: 80vw"
      :columns="columns"
      :data-source="data"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'do'">
          <div
            style="display: flex; justify-content: space-around;"
          >
            <a-button
              type="primary"
              @click="handleUpdateClasses(record.id)"
              >编辑</a-button
            >
            <a-button type="primary">删除</a-button>
          </div>
        </template>
      </template>
    </a-table>
  </a-card>
  <a-modal
    v-model:visible="createFlag"
    title="新增分类信息"
    @ok="handleCreateCate"
  >
    <a-form
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
    >
      <a-form-item label="分类名称" name="className">
        <a-input v-model:value="createData.data.className" />
      </a-form-item>
      <a-form-item label="classValue" name="classValue">
        <a-input v-model:value="createData.data.classValue" />
      </a-form-item>
      <a-form-item label="参数" name="query">
        <a-input v-model:value="createData.data.query" />
      </a-form-item>
      <a-form-item label="path" name="path">
        <a-input v-model:value="createData.data.path" />
      </a-form-item>
      <a-form-item name="创建时间" label="createDate">
        <a-date-picker
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          v-model:value="createData.data.insertTime"
        />
      </a-form-item>
      <a-form-item name="更新时间" label="updateDate">
        <a-date-picker
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          v-model:value="createData.data.updateTime"
          disabled
        />
      </a-form-item>
    </a-form>
  </a-modal>
  <a-modal
    v-model:visible="updateFlag"
    title="修改分类信息"
    @ok="handleUpdateCate"
  >
    <a-form
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
    >
      <a-form-item label="分类名称" name="className">
        <a-input v-model:value="updateData.data.className" />
      </a-form-item>
      <a-form-item label="classValue" name="classValue">
        <a-input v-model:value="updateData.data.classValue" />
      </a-form-item>
      <a-form-item label="参数" name="query">
        <a-input v-model:value="updateData.data.query" />
      </a-form-item>
      <a-form-item label="path" name="path">
        <a-input v-model:value="updateData.data.path" />
      </a-form-item>
      <a-form-item name="创建时间" label="createDate">
        <a-date-picker
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          v-model:value="updateData.data.insertTime"
          disabled
        />
      </a-form-item>
      <a-form-item name="更新时间" label="updateDate">
        <a-date-picker
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          v-model:value="updateData.data.updateTime"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { PostRequest } from "../../api/http";
import type { TableColumnType } from "ant-design-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { CLASSINFO, CLASSES, CREATECLASSES } from "./index";

const router = useRouter();

const store = useStore();
const columns: TableColumnType[] = reactive([
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "分类名称",
    dataIndex: "className",
  },
  {
    query: "参数",
    dataIndex: "query",
  },
  {
    title: "classValue",
    dataIndex: "classValue",
  },
  {
    title: "创建时间",
    dataIndex: "insertTime",
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
// 拿到管理员数据
const userData = PostRequest(`/blog/classes`).then((res: any) => {
  res.records.forEach((el: CLASSES, index: string) => {
    data.push(el);
  });
});
// 存放新增分类数据
const createData = reactive<CREATECLASSES>({
  data: {
    id: "",
    className: "",
    classValue: "",
    path: "",
    query: "",
    inertTime: "",
    updateTime: "",
  },
});
// 新增框的标志
const createFlag = ref<boolean>(false);
// 新增数据
const showCreateClasses = () => {
  createFlag.value = !createFlag.value;
};
// 提交数据
const handleCreateCate = () => {
  // 新增数据
  PostRequest("/blog/createClasses", createData.data);
  // 关闭新增框
  createFlag.value = !createFlag.value;
  // 清除框内数据
  for (let key in createData.data) {
    createData.data[key] = "";
  }
};
// 存放修改分类数据
const updateData = reactive<CREATECLASSES>({
  data: {
    id: "",
    className: "",
    classValue: "",
    path: "",
    query: "",
    insertTime: "",
    updateTime: "",
  },
});
// 标志
const updateFlag = ref<boolean>(false);
const handleUpdateClasses = (id: string) => {
  let params = {
    id: id,
  };
  //根据id请求数据
  PostRequest("/blog/classes", params).then((data: any) => {
    console.log(data);
    updateData.data = data.records[0];
  });
  updateFlag.value = !updateFlag.value;
};
// 提交修改后的数据
const handleUpdateCate = () => {
  PostRequest("/blog/updateClasses", updateData.data);
  updateFlag.value = !updateFlag.value;
};
</script>

<style scoped lang="less"></style>
