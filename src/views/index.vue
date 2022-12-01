<script setup>
// import particleBackground from "@/components/particle-background/index.vue";
import counter from "@/components/counter/index.vue";
import { useConfigStore, useUserStore } from "../store";
import resultList from "@/components/resultList/index.vue";
import teamResult from "@/components/teamResult/index.vue";
import { onMounted, ref, computed } from "vue";
const resultListRef = ref();
</script>

<template>
  <div style="min-height: calc(100vh - 100px); position: relative">
    <!-- <particleBackground/> -->
    <div class="flex" style="height: 300px">
      <div class="header">第七届生物创新设计大赛</div>
      <!-- <div class="counter-wrap">
        <counter :end="useConfigStore().competition.start">
          <template v-slot="{ day, second, hour, minute }">
            <span class="info-text">将于</span>
            {{ day }}天{{ hour }}时{{ minute }}分{{ second }}秒
            <span class="info-text">后开始</span>
          </template>
        </counter>
      </div> -->
    </div>
    <div class="flex">
      <teamResult :result="resultListRef.result" />
      <resultList v-if="useUserStore().role === 'test'" ref="resultListRef" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  font-size: 50px;
  font-weight: 700;
}
.counter-wrap {
  font-size: 20px;
  font-weight: 700;
}
.info-text {
  font-size: 19px;
}
</style>
