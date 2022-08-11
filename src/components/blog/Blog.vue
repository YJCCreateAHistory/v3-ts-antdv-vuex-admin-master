<template>
  <a-card style="width: 100">
    <BreadCrumb></BreadCrumb>
    <br />
    <div>
      <a-button type="primary" @click="showCreateFlag">添加文章</a-button>
    </div>
    <a-table
      bordered
      style="margin-top: 15px; width: auto"
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 1500, y: 600 }"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'do'">
          <div
            style="display: flex; justify-content: space-between; width: 140px"
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
  <a-modal v-model:visible="createFalg" title="新增博客信息" @ok="handleOk">
    <a-form
      name="basic"
      :model="info"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      :rules="rules"
      ref="formRef"
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
      <a-form-item label="主要内容" name="summary">
        <a-input v-model:value="info.summary" />
      </a-form-item>
      <a-form-item label="文章图片" name="img">
        <a-input v-model:value="info.img" />
      </a-form-item>
      <a-form-item label="文章内容" name="content">
        <a-button type="primary" @click="goEditorcontent">文章内容</a-button>
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
      :model="updateinfo.data"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      :rules="rules"
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
      <a-form-item label="主要内容" name="summary">
        <a-input v-model:value="updateinfo.data.summary" />
      </a-form-item>
      <a-form-item label="文章图片" name="img">
        <a-input v-model:value="updateinfo.data.img" />
      </a-form-item>
      <a-form-item label="文章内容" name="content">
        <a-button @click="showCreateContent" type="primary">文章内容</a-button>
      </a-form-item>
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
  <!-- v-if销毁组件 -->
  <a-modal
    v-model:visible="updateContentFalg"
    title='文章详情'
    @ok="submitContent"
    v-if="updateContentFalg"
  >
    <Editor :msg="dd" @handleChangeUpdate="handleChangeUpdate" @handleChangeCreate="handleChangeCreate"> </Editor>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  getBlogList,
  createBlogList,
  updateBlogList,
  deleteBlogList,
} from "./api";
import type { TableColumnType } from "ant-design-vue";
import { useStore } from "vuex";
import { CLASSINFO, EL, CREATARTICLE, UPDATEARTICLE } from "./index";
import { message } from "ant-design-vue";
import BreadCrumb from "../breadCrumb/BreadCrumb.vue";
import Editor from "../wangeditor/Wangeditor.vue";
import type { FormInstance } from "ant-design-vue";
import { computed } from "@vue/reactivity";
const store = useStore();

// 表单校验
const rules: CLASSINFO = {
  className: [
    { required: true, message: "请输入分类名", trigger: "blur" },
    { max: 20, trigger: "change" },
  ],
  classValue: [
    { required: true, message: "不能为空", trigger: "blur" },
    { max: 20, trigger: "change" },
  ],
  title: [
    { required: true, message: "请输入文章题目", trigger: "blur" },
    { max: 20, trigger: "change" },
  ],
  summary: [
    { required: true, message: "请输入文章摘要", trigger: "blur" },
    { max: 20, trigger: "change" },
  ],
  img: [
    { required: true, message: "请输入文章配图", trigger: "blur" },
    { max: 20, trigger: "change" },
  ],
};
const formRef = ref<FormInstance>();
// const vlaues = await formRef.value.validateFields()
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
const getData = () => {
  getBlogList().then((res: any) => {
    data.value = [...res.records];
  });
};
onMounted(() => {
  getData();
});
store.commit("getNewData", data);

const updateContentFalg = ref<boolean>(false); // 表单框标志
// 提交内容关闭弹窗
const submitContent = () => {
  updateContentFalg.value = !updateContentFalg.value;
};
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
// 拿到创建的博文内容
const handleChangeCreate = (val:string)=>{

  info.value.content = val
}
const goEditorcontent = () => {
  updateContentFalg.value = !updateContentFalg.value;

};
// 提交博文
const handleOk = async () => {
  // 等它执行完在执行后面的异步请求
  await createBlogList(info.value);
  createFalg.value = false;
  getData();
  for (let key in info) {
    info[key] = "";
  }
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
// 传给content的id
let dd = ref<string>("");
const showUpdateFalg = async (id: string) => {
  // 请求携带参数
  const params: CLASSINFO = {
    id: id,
  };
  // 根据id获取行内数据
  await getBlogList(params).then((res: any) => {
    updateinfo.data = res.records[0];
  });
  dd.value = updateinfo.data.id;
  updateFalg.value = true;
};
// 获取传过来的新数据
// const publish = ref<boolean>(false);
// const change1 = () => {
//   publish.value = !publish.value;
//   updateinfo.data.isPublish = publish.value;
//   // console.log(updateinfo.data.isPublish);
// };
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
// 富文本编辑器穿传过来的文本
const handleChangeUpdate = (val:string)=>{
  updateinfo.data.content = val
}
// 修改内容弹窗
const showCreateContent = () => {
  updateContentFalg.value = !updateContentFalg.value;
};
// 保存修改的数据
const handleUpdateArt = async () => {
  updateFalg.value = false;
  await updateBlogList(updateinfo.data);
  getData();
};
const removeArticle = (id: string) => {
  const params: CLASSINFO = {
    id: id,
  };
  deleteBlogList(params);
};
const confirm = () => {
  getData();
  // 删除博文
  message.success("删除成功");
};
const cancel = () => {
  message.error("取消删除");
};
// 动态更改信息框标题名
let _headName = ref<string>("")
computed(()=>{
  if(createFalg.value === true) {
    _headName.value = "增加博文"
  }else {
    _headName.value = "修改博文"
  }
})
</script>
<style scoped lang="less">
.a-table {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
