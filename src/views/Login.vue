<script lang="ts" setup>
import { reactive } from "vue";
import { PostRequest } from "../api/http";
import { LoginFormRule } from "../types/login";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
// 登录用户信息规则验证
const form = reactive<LoginFormRule>({
  username: "",
  password: "",
});

// 获取输入信息
const checkAccount = async () => {
  // 请求数据
  const data = await PostRequest(
    `/login?username=${form.username}&password=${form.password}`
  );
  let us;
  let psd;
  if (data.records.length) {
    us = data.records[0].username;
    psd = data.records[0].password;
  }
  if (form.username === us && form.password === psd) {
    router.push({
      name: "Home",
      params: {},
    });
  } else {
    return;
  }
  window.sessionStorage.setItem("token", data.token);
  store.commit("getUserInfo", form);
};
</script>

<template>
  <div class="container">
    <div class="login">
      <h1 class="name">Live is a Fuck'n moive</h1>
      <div class="form">
        <a-form
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 8 }"
          autocomplete="off"
          :model="form"
        >
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="form.username" />
          </a-form-item>

          <a-form-item label="密码" name="password">
            <a-input-password v-model:value="form.password" />
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" @click="checkAccount()">登录</a-button>&nbsp;&nbsp;
            <a-button type="primary">游客登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  //   position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("../assets/wallhaven-1kv693_1920x1080.png");
  background-size: 100%;
  .login {
    .name {
      width: 100%;
      border-bottom: 1px solid #ccc;
      position: absolute;
      left: 50%;
      top:10px;
      padding-bottom: 10px;
      padding-left: 10px;
      transform: translateX(-50%);
    }
    position: absolute;
    width: 800px;
    height: 400px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(89, 89, 89, 0.25);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: rgba(14, 14, 14, 0.19) 0px 6px 15px 0px;
    -webkit-box-shadow: rgba(14, 14, 14, 0.19) 0px 6px 15px 0px;
    border-radius: 36px;
    -webkit-border-radius: 36px;
    color: rgb(128, 128, 128);
    .form {
      position: absolute;
      width: 800px;
      height: 200px;
      top: 150px;
    }
  }
}
</style>
