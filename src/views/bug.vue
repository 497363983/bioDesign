<script setup>
import { Message } from "@element-plus/icons-vue";
</script>

<template>
  <div style="height: 100%">
    <h2>Bug反馈</h2>
    <h3>说明：</h3>
    <p>
      本系统为临时开发，今年第一次启用，难免存在一定bug，并且开发者也是浙江大学生物工程学院的大三学生（且仅有一人），精力有限，只能优先修复重大Bug（一些不影响使用的Bug只能随缘）。
    </p>
    <h3>反馈内容：</h3>
    <p></p>
    <h3>反馈方式：</h3>
    <ol>
      <li>
        邮箱
        <p>
          发送邮件至邮箱
          <el-link :icon="Message" href="mailto:497363953@qq.com" type="primary"
            >497363953@qq.com</el-link
          >
        </p>
      </li>
      <li>
        Github
        <p>
          本项目前端源代码托管在
          <el-link
            href="https://github.com/497363983/bioDesign"
            type="primary"
            target="_bank"
            >Github</el-link
          >，欢迎直接在Github上提<el-link
            href="https://github.com/497363983/bioDesign/issues"
            type="primary"
            target="_bank"
            >issues</el-link
          >。
        </p>
        <p>
          另外，本项目前端使用
          <el-link href="https://cn.vitejs.dev/" type="primary" target="_bank"
            >vite3.2.0</el-link
          >、<el-link href="https://cn.vuejs.org/" type="primary" target="_bank"
            >vue3.2.41</el-link
          >、<el-link
            href="http://element-plus.org/zh-CN/"
            type="primary"
            target="_bank"
            >element-plus</el-link
          >开发，若有同学有相关开发能力，也欢迎直接在Github上提PR（后端使用PHP开发，暂未托管到Github）
        </p>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped></style>
