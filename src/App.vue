<script setup>
import themeButton from "@/components/theme-button/index.vue";
import github from "./components/icons/github.vue";
import { useWindowSize } from "@vueuse/core";
import { isLogin } from "@/api";
import { token, username } from "./utils";
import { useUserStore } from "./store";

const header = ref();
const { height } = useWindowSize();
const contentHeight = computed(() => height - 60);

onMounted(() => {
  if (token.value && username.value) {
    isLogin();
  }
});
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
        <el-menu-item
          v-if="['player', 'admin'].includes(useUserStore().role)"
          index="upload"
          >上传通道</el-menu-item
        >
        <el-menu-item
          v-if="['judge', 'admin'].includes(useUserStore().role)"
          index="judge"
          >评分系统</el-menu-item
        >
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
          <el-button text type="default">
            <a
              style="var(--el-button-text-color) !important"
              href="https://github.com/497363983/bioDesign"
              target="_blank"
            >
              <span
                ><el-icon><github /></el-icon
              ></span>
            </a>
          </el-button>
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
    .add-list {
      display: flex;
      align-items: center;
      height: var(--el-menu-item-height);
      line-height: var(--el-menu-item-height);
      font-size: var(--el-menu-item-font-size);
      color: var(--el-menu-text-color);
      padding: 0 var(--el-menu-base-level-padding);
      list-style: none;
      cursor: pointer;
      position: relative;
      transition: border-color var(--el-transition-duration),
        background-color var(--el-transition-duration),
        color var(--el-transition-duration);
      box-sizing: border-box;
      white-space: nowrap;
    }
    .flex-grow {
      flex-grow: 1;
    }
  }
}
</style>

<style lang="scss">
.el-menu--popup-container {
  .el-button + .el-button {
    margin-left: 0;
  }
}
</style>
