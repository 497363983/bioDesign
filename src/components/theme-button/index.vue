<script setup>
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <el-button class="theme-button" type="default" text @click="toggleDark()">
    <el-icon v-if="isDark"><Moon /></el-icon>
    <el-icon v-else><Sunny /></el-icon>
  </el-button>
</template>

<style lang="scss" scoped>
.theme-button {
  font-size: 20px;
}
</style>
