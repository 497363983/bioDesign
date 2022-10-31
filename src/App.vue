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
      <el-menu mode="horizontal" :ellipsis="false" router>
        <el-menu-item class="brand">
          <span><strong>生物创新设计大赛</strong></span>
        </el-menu-item>
        <div class="flex-grow"></div>
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
        <el-footer></el-footer>
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
      padding: 5px 10px;
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
