<script setup>
import { useUserStore } from "@/store";
</script>

<template>
  <el-descriptions border>
    <el-descriptions-item label="姓名">
      {{ useUserStore().name }}
    </el-descriptions-item>
    <el-descriptions-item label="学号">
      {{ useUserStore().username }}
    </el-descriptions-item>
    <el-descriptions-item label="年级">
      {{ useUserStore().grade }}
    </el-descriptions-item>
    <el-descriptions-item label="学院">
      {{ useUserStore().college }}
    </el-descriptions-item>
    <el-descriptions-item label="队伍ID">
      {{ useUserStore().team ? useUserStore().team : "无" }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style lang="scss" scoped></style>
