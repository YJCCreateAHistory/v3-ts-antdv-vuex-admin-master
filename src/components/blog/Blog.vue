<template>
  <div>
    <a-card style="width: auto; margin-left: 1vw">
      <a-breadcrumb style="margin-bottom: 20px">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>客户端管理</a-breadcrumb-item>
        <a-breadcrumb-item>博文管理</a-breadcrumb-item>
      </a-breadcrumb>
      <div>
        <a-button type="primary" @click="showCreateFlag">添加文章</a-button>
      </div>
      <a-table
        bordered
        style="margin-top: 15px; width: auto"
        :columns="columns"
        :data-source="data"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'do'">
            <div
              style="
                display: flex;
                justify-content: space-between;
                width: 140px;
              "
            >
              <a-button type="primary" @click="showUpdateFalg(record.id)"
                >编辑</a-button
              >
              <a-button type="primary">删除</a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
    <!-- <a-modal
    v-model:visible="createContent"
    title="添加文章内容"
    @ok="setBlogContent"
    style="width: 1200px"
  >
    <div class="editor">
      defineEmits
      <Editor
        :data="updateinfo.data.content"
        @onReceiveMsg="onReceiveMsg"
      ></Editor>
    </div>
  </a-modal> -->
  </div>
  <a-modal v-model:visible="createFalg" title="新增博客信息" @ok="handleOk">
    <a-form
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
    >
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
        <a-switch :checked="publishFlag" @change="changeState1" />
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
        <a-switch :checked="topFlag" @change="changeState2" />
      </a-form-item>
      <a-form-item label="是否热门" name="isHot">
        <a-switch :checked="hotFlag" @change="changeState3" />
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
  <a-modal
    v-model:visible="updateFalg"
    title="修改文章信息"
    @ok="handleUpdateArt"
  >
    <a-form
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
    >
      <a-form-item label="分类名称" name="classes">
        <a-input v-model:value="updateinfo.data.className" />
      </a-form-item>
      <a-form-item label="classValue" name="classValue">
        <a-input v-model:value="updateinfo.data.classValue" />
      </a-form-item>
      <a-form-item label="文章题目" name="title">
        <a-input v-model:value="updateinfo.data.title" />
      </a-form-item>
      <a-form-item label="是否发布" name="isPublish">
        <a-switch :checked="publish" @change="change1" />
      </a-form-item>
      <a-form-item label="主要内容" name="summary">
        <a-input v-model:value="updateinfo.data.summary" />
      </a-form-item>
      <a-form-item label="文章图片" name="img">
        <a-input v-model:value="updateinfo.data.img" />
      </a-form-item>
      <!-- <a-form-item label="文章内容" name="content">
        <a-button @click="showCreateContent" type="primary" >修改文章内容</a-button>
      </a-form-item> -->
      <a-form-item label="是否置顶" name="isTop">
        <a-switch :checked="top" @change="change2" />
      </a-form-item>
      <a-form-item label="是否热门" name="isHot">
        <a-switch :checked="hot" @change="change3" />
      </a-form-item>
      <a-form-item name="发布时间" label="pubDate">
        <a-date-picker
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          v-model:value="updateinfo.data.pubTime"
          disabled
        />
      </a-form-item>
      <a-form-item name="创建时间" label="createDate">
        <a-date-picker
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          v-model:value="updateinfo.data.insertTime"
          disabled
        />
      </a-form-item>
      <a-form-item name="更新时间" label="updateDate">
        <a-date-picker
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          v-model:value="updateinfo.data.updateTime"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch, shallowRef } from "vue";
import { PostRequest } from "../../api/http";
import type { TableColumnType } from "ant-design-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { CLASSINFO, EL, CREATARTICLE, UPDATEARTICLE } from "./index";
import type { Rule } from "ant-design-vue/es/form";
import type { FormInstance } from "ant-design-vue";
import Editor from "../Wangeditor.vue";
import { computed } from "@vue/reactivity";
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
// 存放用户数据
const data = ref<CLASSINFO>([]);
// 拿到管理员数据
// const resData = PostRequest("/blog/list").then((res: EL) => {
//   // res.records.forEach((el: EL, index: number) => {
//   //   data.push(el);
//   // });
//   // for(let i = 0; i < res.records.length; i++) {
//   //   data.push(res.records[i]);
//   // }
//   data.value = [data.value, ...res.records]
// });
onMounted(() => {
  PostRequest("/blog/list").then((res: EL) => {
    // res.records.forEach((el: EL, index: number) => {
    //   data.push(el);
    // });
    // for(let i = 0; i < res.records.length; i++) {
    //   data.push(res.records[i]);
    // }
    // 数组长度置为0
    data.value.length = 0
    data.value = [data.value, ...res.records];
  });
});
// 开关状态
let publishFlag = ref<boolean>(false);
const changeState1 = () => {
  publishFlag.value = !publishFlag.value;
  console.log(publishFlag.value);
};
let topFlag = ref<boolean>(false);
const changeState2 = () => {
  topFlag.value = !topFlag.value;
};
let hotFlag = ref<boolean>(false);
const changeState3 = () => {
  hotFlag.value = !hotFlag.value;
};
// 收集信息
const info = reactive<CREATARTICLE>({
  id: "",
  classId: "",
  className: "",
  classValue: "",
  title: "",
  isPublish: publishFlag,
  summary: "",
  commentsCount: 0,
  viewsCount: 0,
  img: "",
  content: "",
  isTop: topFlag,
  isHot: hotFlag,
  pubTime: "",
  createTime: "",
  updateTime: "",
});
// 增加
const createFalg = ref<boolean>(false); // dialog弹窗
const showCreateFlag = (e: any) => {
  createFalg.value = true;
};
// 提交博文
const handleOk = async (e: MouseEvent) => {
  createFalg.value = false;
  PostRequest("/blog/create", info);
  getChange.value // 拿到变化的数据渲染
  // console.log(getChange)
};
// 监视数据变化
const getChange = computed(() => {
  PostRequest("/blog/list").then((res: EL) => {
    data.value = [data.value, ...res.records];
  });
});
// 修改博文
const updateFalg = ref<boolean>(false);
// 存放获取的数据
const updateinfo = reactive<UPDATEARTICLE>({
  data: {
    id: "",
    classId: "",
    className: "",
    classValue: "",
    isPublish: null,
    title: "",
    summary: "",
    commentsCount: 0,
    viewsCount: 0,
    img: "",
    content: "",
    isTop: null,
    isHot: null,
    pubTime: "",
    createTime: "",
    updateTime: "",
  },
});
const showUpdateFalg = (id: string) => {
  // 请求携带参数
  const params = {
    id: id,
  };
  // 根据id获取行内数据
  const data = PostRequest("/blog/list", params).then((res: any) => {
    updateinfo.data = res.records[0];
  });
  updateFalg.value = true;
};
let publish = ref<boolean>(false);
const change1 = () => {
  publish.value = !publish.value;
  updateinfo.data.isPublish = publish.value;
  // console.log(updateinfo.data.isPublish);
};
let top = ref<boolean>(false);
const change2 = () => {
  top.value = !top.value;
  updateinfo.data.isTop = top.value;
};
let hot = ref<boolean>(false);
const change3 = () => {
  hot.value = !hot.value;
  updateinfo.data.isHot = hot.value;
};
// // 博文内容
// const createContent = ref<boolean>(false); // dialog弹窗
// const showCreateContent = (e: any) => {
//   createContent.value = true;
// };
// // 修改文章数据，这里通过defineEimts拿到数据
// const onReceiveMsg = (params: any) => {
//   updateinfo.data.content = params.value;
//   // console.log(params.value, 1)
// };
// // console.log(updateinfo.data.content);
// // 提交博文
// const setBlogContent = async (e: MouseEvent) => {
//   createContent.value = false;
//   // PostRequest("/blog/create", info);
// };
// 保存修改的数据
const handleUpdateArt = () => {
  // console.log(updateinfo.data.content);
  updateFalg.value = false;
  PostRequest("/blog/update", updateinfo.data);
};
</script>
<style scoped lang="less"></style>
