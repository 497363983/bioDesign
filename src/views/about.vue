<script setup>
import notice from "./notice.vue";
import questions from "./questions.vue";
import bug from "./bug.vue";
import { getJSON } from "@/api";
const questionList = ref([]);
const tab = ref("notice");

async function getQuestions() {
  questionList.value = await getJSON("questions.json");
}
async function tabChange(name) {
  if (name === "questions") {
    await getQuestions();
  }
}
</script>

<template>
  <div style="height: calc(100vh - 100px)">
    <el-tabs
      class="about-tabs"
      tab-position="left"
      style="height: 100%"
      @tab-change="tabChange"
      v-model="tab"
    >
      <el-tab-pane style="height: 100%" label="比赛须知" name="notice">
        <el-scrollbar height="100%">
          <notice></notice>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane  style="height: 100%" label="常见问题" name="questions">
        <el-scrollbar height="100%">
          <questions :questions="questionList"></questions>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane  style="height: 100%" label="Bug反馈" name="bug">
        <el-scrollbar height="100%">
          <bug></bug>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss">
.about-tabs {
  .el-tabs__content {
    height: 100%;
  }
}
</style>
