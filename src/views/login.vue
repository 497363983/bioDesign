<script setup>
import { useUserStore } from "@/store";
import { login, isLogin } from "@/api";
import { useRouter } from "vue-router";

const router = useRouter();

const loginLoading = ref(false);
const loginForm = ref();

const rules = reactive({
  username: [
    {
      required: true,
      message: "学号不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
  ],
});

async function onLogin(formRef) {
  if (!formRef) return;
  loginLoading.value = true;
  formRef.validate(async (valid) => {
    if (valid) {
      login(() => {
        if (
          useUserStore().isAuthenticated &&
          useUserStore().role === "player"
        ) {
          console.log(useUserStore().isAuthenticated, useUserStore().role);
          router.push("/upload");
        } else {
          // router.push("/upload");
        }
        loginLoading.value = false;
      });
    }
  });
}

function registry() {
  router.replace("/register");
}

onMounted(() => {
  isLogin((res) => {
    if (res) {
      router.push("/upload");
    }
  });
});
</script>

<template>
  <div style="min-height: calc(100vh - 100px); position: relative">
    <el-form
      ref="loginForm"
      style="width: 50%; padding: 20px; margin: auto"
      :model="useUserStore()"
      label-position="top"
      :rules="rules"
      status-icon
      :disabled="loginLoading"
    >
      <el-form-item>
        <div style="display: block; width: 100%">
          <h2 style="text-align: center">登录</h2>
        </div>
      </el-form-item>
      <el-form-item label="学号" prop="username">
        <el-input v-model="useUserStore().username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="useUserStore().password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onLogin(loginForm)"
          :loading="loginLoading"
          >登录</el-button
        >
        <el-button type="default" @click="registry">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss"></style>
