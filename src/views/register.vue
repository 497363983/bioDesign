<script setup>
import { useUserStore } from "@/store";
import { login } from "@/api";
import { useRouter } from "vue-router";

const router = useRouter();

const colleges = ref([
  "生物工程学院",
  "化学工工程学院",
  "药学院",
  "绿色制药协同中心",
  "环境学院",
  "材料科学与工程学院",
  "食品科学与工程学院",
  "机械工程学院",
  "信息学院",
  "计算机科学与技术学院（软件学院）",
  "土木工程学院",
  "理学院",
  "管理学院",
  "经济学院",
  "教育科学与技术学院（职业技术教育学院）",
  "外国语学院",
  "人文学院",
  "设计与建筑学院",
  "法学院",
  "公共管理学院",
  "马克思主义学院",
  "国际学院",
  "健行学院",
  "创业学院",
  "继续教育学院",
]);

const loginLoading = ref(false);
const loginForm = ref();

const rules = reactive({
  username: [
    {
      required: true,
      message: "学号不能为空",
      trigger: "blur",
    },
    {
      type: "string",
      len: 12,
      message: "请输入12位学号",
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
  re_password: [
    {
      required: true,
      message: "请再次输入密码",
      trigger: "blur",
    },
  ],
  name: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur",
    },
  ],
  grade: [
    {
      required: true,
      message: "请选择年级",
      trigger: "blur",
    },
  ],
  college: [
    {
      required: true,
      message: "请选择学院",
      trigger: "blur",
    },
  ],
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
          <h2 style="text-align: center">注册</h2>
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
      <el-form-item label="再次输入密码" prop="re_password">
        <el-input
          v-model="useUserStore().re_password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="useUserStore().name"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-date-picker v-model="useUserStore().grade" type="year" />
      </el-form-item>
      <el-form-item label="学院" prop="college">
        <el-select v-model="useUserStore().college">
          <el-option
            v-for="(item, index) in colleges"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">注册</el-button>
        <el-button
          type="default"
          @click="router.replace('/login')"
          :loading="loginLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss"></style>
