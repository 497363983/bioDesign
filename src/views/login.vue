<script setup>
import { useUserStore } from "@/store";
import { login } from "@/api";
import { useTimestamp, useStorage } from "@vueuse/core";

const timestamp = useTimestamp({ offset: 0 });

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

async function onLogin() {
  const res = await login(
    useUserStore().username,
    useUserStore().password,
    timestamp.value
  );

}
</script>

<template>
  <div style="min-height: calc(100vh - 100px); position: relative">
    <el-form
      style="width: 50%; padding: 20px"
      :model="useUserStore()"
      label-position="top"
      :rules="rules"
      status-icon
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
        <el-button type="primary" @click="onLogin">登录</el-button>
        <el-button type="default">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss"></style>
