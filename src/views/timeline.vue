<script setup>
import counter from "@/components/counter/index.vue";
import { getTimeline } from "@/api";
import { MapLocation, Clock, Check } from "@element-plus/icons-vue";
import { useTimeAgo, useTimestamp } from "@vueuse/core";
const timeline = ref([]);
const loading = ref(true);
function time(t, old = null) {
  let strTime = "";
  if (old) {
    strTime = `<strike>${time(old)}</strike> `;
  }
  if (typeof t === "string") {
    return strTime + t;
  }
  if (typeof t === "object") {
    return strTime + `${t.start} ~ ${t.end}`;
  }
}
const currentTime = useTimestamp({ offset: 0 });
function isHappening(activity) {
  if (typeof activity.time === "string") {
  }
}
onMounted(async () => {
  timeline.value = (await getTimeline()).data;
  console.log(timeline.value)
  loading.value = false;
});
</script>

<template>
  <div  v-loading="loading" style="min-height: calc(100vh - 100px);position:relative;">
    <el-timeline style="min-height: 100%;display: block;" :reverse="true">
      <el-timeline-item
        v-for="(activity, index) in timeline"
        :key="index"
        :timestamp="time(activity.time)"
        placement="top"
        size="large"
        :icon="
          new Date(activity.time.end || activity.time) - new Date(currentTime) >
          0
            ? null
            : Check
        "
        :type="
          new Date(activity.time.end || activity.time) - new Date(currentTime) >
          0
            ? ''
            : 'success'
        "
        hide-timestamp
        center
      >
        <el-card shadow="hover">
          <h3 slot="header">{{ activity.title }}</h3>
          <p class="time">
            <el-icon><Clock /></el-icon>
            <span v-html="time(activity.time, activity.oldTime)"></span>
            (<span>{{
              useTimeAgo(activity.time.end || activity.time).value
            }}</span
            >)
            <el-tag v-if="activity.oldTime" type="warning">时间变化</el-tag>
          </p>
          <p class="place" v-if="activity.place">
            <el-icon><MapLocation /></el-icon>
            {{ activity.place }}
          </p>
          <p class="text-strong" style="font-size: 20px">
            <counter :end="activity.time.end || activity.time">
              <template v-slot="{ day, hour, minute, second }">
                {{ day }}:{{ hour }}:{{ minute }}:{{ second }}
              </template>
            </counter>
          </p>
          <p>
            <el-link
              v-if="activity.link"
              :href="activity.link"
              target="_bank"
              type="primary"
              >点此跳转</el-link
            >
          </p>
          <el-alert
            v-if="activity.hint"
            :title="activity.hint.title"
            :type="activity.hint.type"
            :description="activity.hint.content"
            :closable="false"
            show-icon
          >
          </el-alert>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
