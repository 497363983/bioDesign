<script setup>
import { getResult } from "@/api";
import { ref, onMounted, computed } from "vue";
import { transHtml } from "@/utils";
import { useConfigStore } from "@/store";

const result = ref([]);
const currentProject = ref({});
const showProject = ref(false);

function chooseProject(row) {
  currentProject.value = row;
  showProject.value = true;
}

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
});

defineExpose({
  result,
});
</script>

<template>
  <div class="result-list" style="width: 100%">
    <el-table :data="result" :table-layout="'fixed'" @row-click="chooseProject">
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
      <el-table-column
        header-align="center"
        align="center"
        prop="leader"
        label="负责人" >
      </el-table-column>
      <el-table-column header-align="center" align="center" label="结果">
        <template #default="{ $index }">
          <el-tag effect="plain" :type="rowType($index).value" size="large">{{
            prize($index).value
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="showProject" fullscreen>
    <div>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="项目名称">
          <strong>
            <span
              v-html="
                transHtml(currentProject.title)
                  .replace('<br>', '')
                  .match(/(?<=<p>).*?(?=<\/p>)/g)
              "
            ></span>
          </strong>
        </el-descriptions-item>
        <el-descriptions-item label="负责人">
          {{ currentProject.leader }}
        </el-descriptions-item>
        <el-descriptions-item label="结果">
          <el-tag effect="plain" :type="rowType(result.indexOf(currentProject)).value" size="large">{{
            prize(result.indexOf(currentProject)).value
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="项目简介">
          <span v-html="transHtml(currentProject.abstract)"></span>
        </el-descriptions-item>
        <el-descriptions-item label="创新之处">
          <span v-html="transHtml(currentProject.new)"></span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-dialog>
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
