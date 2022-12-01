<script setup>
import { getResult } from "@/api";
import { ref, onMounted, computed } from "vue";
import { transHtml } from "@/utils";
import { useConfigStore } from "@/store";

const result = ref([]);

const rowType = (rowIndex) =>
  computed(() => {
    if (rowIndex <= useConfigStore().result.promotion - 1) {
      return "success";
    } else if (
      rowIndex <=
      useConfigStore().result.promotion + useConfigStore().result.thirdPrize - 1
    ) {
      return "warning";
    } else {
      return "info";
    }
  });

const prize = (rowIndex) =>
  computed(() => {
    if (rowIndex <= useConfigStore().result.promotion - 1) {
      return "晋级";
    } else if (
      rowIndex <=
      useConfigStore().result.promotion + useConfigStore().result.thirdPrize - 1
    ) {
      return "三等奖";
    } else {
      return "鼓励奖";
    }
  });

onMounted(async () => {
  result.value = await getResult();
  console.log(result.value);
});

defineExpose({
  result,
});
</script>

<template>
  <div class="result-list" style="width: 100%">
    <el-table :data="result" :table-layout="'fixed'">
      <el-table-column
        type="index"
        label="排名"
        align="center"
        :index="(i) => i + 1"
        width="200"
      ></el-table-column>
      <el-table-column prop="title" header-align="center" label="项目名称">
        <template #default="{ row }">
          <strong v-if="row.title">
            <span
              v-html="
                transHtml(row.title)
                  .replace('<br>', '')
                  .match(/(?<=<p>).*?(?=<\/p>)/g)
              "
            ></span>
          </strong>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="结果">
        <template #default="{ $index }">
          <el-tag effect="plain" :type="rowType($index).value">{{
            prize($index).value
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss">
.result-list {
  .el-table {
    .el-table__row {
      cursor: pointer;
    }
  }
}
</style>
