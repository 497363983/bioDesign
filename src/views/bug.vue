<script setup>
import { Message } from "@element-plus/icons-vue";
</script>

<template>
  <el-container>
    <el-main>
      <h2>Bug反馈</h2>
      <h3>说明：</h3>
      <p>
        本系统为临时开发，今年第一次启用，难免存在一定bug，并且开发者也是浙江大学生物工程学院的大三学生（且仅有一人），精力有限，只能优先修复重大Bug（一些不影响使用的Bug只能随缘）。
      </p>
      <h3>反馈内容：</h3>
      <p>为了使问题的解决能更为高效，请提供如下信息：</p>
      <ol>
        <li>操作系统及其版本，如：windows10 64位操作系统</li>
        <li>
          浏览器及其版本（本系统在开发时，未考虑兼容老版及非主流浏览器，因此建议使用主流浏览器的最新版本，如Edge、Chrome），如：Edge
          107.0.1418.26 (正式版本) (64 位)
        </li>
        <li>
          问题的详细描述（问题描述得越详细准确，越有利于定位问题，最好搭配上截图说明），如：比赛日程界面的倒计时与实际时间不符
        </li>
      </ol>
      <h3>反馈方式：</h3>
      <ol>
        <li>
          邮箱
          <p>
            发送邮件至
            <el-link
              :icon="Message"
              href="mailto:497363953@qq.com"
              type="primary"
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
            >、<el-link
              href="https://cn.vuejs.org/"
              type="primary"
              target="_bank"
              >vue3.2.41</el-link
            >、<el-link
              href="http://element-plus.org/"
              type="primary"
              target="_bank"
              >element-plus2.2.19</el-link
            >、<el-link
              href="https://pinia.web3doc.top/"
              type="primary"
              target="_bank"
              >pinia2.0.23</el-link
            >开发，若有同学有相关开发能力，也欢迎直接在Github上提PR（后端使用PHP开发，暂未托管到Github）
          </p>
        </li>
      </ol>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped></style>
