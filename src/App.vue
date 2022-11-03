<script setup>
import themeButton from "@/components/theme-button/index.vue";
import { useWindowSize } from "@vueuse/core";

const header = ref();
const { height } = useWindowSize();
const contentHeight = computed(() => height - 60);
</script>

<template>
  <el-container class="container" style="height: 100%">
    <el-header ref="header" class="header-menu-wrap">
      <el-menu mode="horizontal" :ellipsis="true" router>
        <el-menu-item class="brand">
          <span style="font-size: 20px"><strong>生物创新设计大赛</strong></span>
        </el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="upload">上传通道</el-menu-item>
        <el-menu-item index="timeline">比赛日程</el-menu-item>
        <!-- <li
          class="el-menu-item add-item"
          style="height: var(--el-menu-item-height)"
        >
          user
        </li> -->
        <el-menu-item index="about">关于</el-menu-item>
        <li
          class="el-menu-item add-item"
          style="height: var(--el-menu-item-height)"
        >
          <theme-button />
        </li>
      </el-menu>
    </el-header>
    <el-scrollbar :height="contentHeight">
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer style="background-color: var(--el-bg-color-page)">
          <div></div>
          <div class="text-center">
            ©Content on this site is licensed under a
            <el-link
              style="font-weight: 700; font-size: 17px"
              target="_bank"
              href="https://github.com/497363983/bioDesign/blob/main/LICENSE"
              >MIT</el-link
            >
            license
          </div>
        </el-footer>
      </el-container>
    </el-scrollbar>
  </el-container>
</template>

<style lang="scss" scoped>
.container {
  padding: 0;
  .header-menu-wrap {
    padding: 0;
    .brand {
      text-align: center;
      height: 100%;
      position: relative;
    }
    .add-item {
      &:hover {
        background-color: transparent;
      }
    }
    .flex-grow {
      flex-grow: 1;
    }
  }
}
</style>
