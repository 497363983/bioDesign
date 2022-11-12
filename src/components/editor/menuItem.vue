<script setup>
import remixiconUrl from "remixicon/fonts/remixicon.symbol.svg";

const props = defineProps({
  icon: String,
  title: String,
  action: Function,
  children: {
    type: [Object, Array],
    default: null,
  },
  isActive: {
    type: Function,
    default: null,
  },
  disabled: {
    type: [Function, Boolean],
    default: false,
  },
});
</script>

<template>
  <el-popover trigger="hover" :disabled="!children">
    <template #reference>
      <el-button
        class="editor-menu-item"
        @click="action"
        text
        :bg="isActive ? isActive() : false"
        :disabled="disabled"
      >
        <el-tooltip :content="title" placement="top">
          <el-icon>
            <svg>
              <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />
            </svg>
          </el-icon>
        </el-tooltip>
      </el-button>
    </template>
    <template #default>
      <template v-for="(item, index) in children" :key="index">
        <menu-item v-bind="item"></menu-item>
      </template>
    </template>
  </el-popover>
</template>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0;
}
</style>
