<script setup>
import counter from "@/components/counter/index.vue";
import { useConfigStore } from "../store/config";
import { timestamp } from "@/utils";
import { nextTick } from "vue";
import { getConfig } from "@/api";

const canUpload = computed(() => {
  if (!useConfigStore().upload.open) {
    return false;
  } else if (useConfigStore().upload.open === "auto") {
    const start = useConfigStore().upload.start;
    const end = useConfigStore().upload.end;
    const pre = new Date(timestamp.value) - new Date(start);
    const ne = new Date(timestamp.value) - new Date(end);
    return pre >= 0 && ne <= 0;
    // return pre
  } else {
    return true;
  }
});

onMounted(async () => {
  useConfigStore().upload = await getConfig("upload");
  nextTick(() => {
    console.log(canUpload);
    console.log(useConfigStore().upload.open);
  });
});
</script>

<template>
  <div class="time-counter" v-if="!canUpload">
    <div class="counter-wrap text-center">
      <counter :end="useConfigStore().upload.start">
        <template v-slot="{ day, second, hour, minute }">
          <span class="info-text">上传通道预计将于</span>
          {{ day }}天{{ hour }}时{{ minute }}分{{ second }}秒
          <span class="info-text">后开放</span>
        </template>
      </counter>
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
