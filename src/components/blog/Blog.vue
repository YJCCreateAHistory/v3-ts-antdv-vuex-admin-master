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
              <a-popconfirm
                title="是否确定删除该博客?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirm"
                @cancel="cancel"
              >
                <a-button type="primary" @click="removeArticle(record.id)"
                  >删除</a-button
                >
              </a-popconfirm>
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
      <a-form-item label="分类名称" name="className">
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
import { onMounted, reactive, ref, shallowRef, watch } from "vue";
import { PostRequest } from "../../api/http";
import type { TableColumnType } from "ant-design-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { CLASSINFO, EL, CREATARTICLE, UPDATEARTICLE } from "./index";
import type { Rule } from "ant-design-vue/es/form";
import Editor from "../Wangeditor.vue";
import { message } from "ant-design-vue";
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
let data = ref<CLASSINFO>([]);
// 拿到数据
const getBlogLoist = () => {
  PostRequest("/blog/list").then((res: EL) => {
    // 使用reactive是数据失去响应式，这里使用ref也不要应使用push方法，使用解构
    data.value = [...res.records];
  });
};
onMounted(() => {
  getBlogLoist();
});
store.commit("getNewData", data);
// 开关状态
const publishFlag = ref<boolean>(false);
const changeState1 = () => {
  publishFlag.value = !publishFlag.value;
  console.log(publishFlag.value);
};
const topFlag = ref<boolean>(false);
const changeState2 = () => {
  topFlag.value = !topFlag.value;
};
const hotFlag = ref<boolean>(false);
const changeState3 = () => {
  hotFlag.value = !hotFlag.value;
};
// 收集信息
const info = ref<CREATARTICLE>({
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
const handleOk = async () => {
  // 等它执行完在执行后面的异步请求
  await PostRequest("/blog/create", info.value);
  createFalg.value = false;
  getBlogLoist();
};
// 监视数据变化
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
  const params: CLASSINFO = {
    id: id,
  };
  // 根据id获取行内数据
  const data = PostRequest("/blog/list", params).then((res: any) => {
    updateinfo.data = res.records[0];
  });
  updateFalg.value = true;
};
const publish = ref<boolean>(false);
const change1 = () => {
  publish.value = !publish.value;
  updateinfo.data.isPublish = publish.value;
  // console.log(updateinfo.data.isPublish);
};
const top = ref<boolean>(false);
const change2 = () => {
  top.value = !top.value;
  updateinfo.data.isTop = top.value;
};
const hot = ref<boolean>(false);
const change3 = () => {
  hot.value = !hot.value;
  updateinfo.data.isHot = hot.value;
};
// 博文内容
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
const handleUpdateArt = async () => {
  updateFalg.value = false;
  await PostRequest("/blog/update", updateinfo.data);
  getBlogLoist();
};
const removeArticle = (id: string) => {
  const params: CLASSINFO = {
    id: id,
  };
  PostRequest("/blog/delete", params);
};
const confirm = () => {
    getBlogLoist();
  // 删除博文
  message.success("删除成功");
};
const cancel = () => {
  message.error("取消删除");
};
</script>
<style scoped lang="less"></style>
