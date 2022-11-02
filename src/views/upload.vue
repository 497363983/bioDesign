<script setup>
import counter from "@/components/counter/index.vue";
import { useCompetitionStore } from "../store/competition";
</script>

<template>
  <div class="time-counter" v-if="!useCompetitionStore().upload.open">
    <div class="counter-wrap text-center">
      <counter end="2022-11-07 23:00:00">
        <template v-slot="{ day, second, hour, minute }">
          <span class="info-text">上传通道预计将于</span>
          {{ day }}天{{ hour }}时{{ minute }}分{{ second }}秒
          <span class="info-text">后开放</span>
        </template>
      </counter>
    </div>
    <div>
      <el-button type="primary">阅读</el-button>
    </div>
  </div>
  <div v-else></div>
</template>

<style lang="scss" scoped>
.counter-wrap {
  font-size: 45px;
  font-weight: 800;
}
.info-text {
  font-size: 40px;
}

.time-counter {
  height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
