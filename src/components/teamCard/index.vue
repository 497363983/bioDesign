<script setup>
import { transHtml } from "@/utils";
defineProps({
  ranking: {
    type: Number,
    default: 0,
  },
  team: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <div class="team-card">
    <span>{{ ranking }}</span>
    <span class="project-title" v-html="transHtml(team.title)"></span>
  </div>
</template>

<style lang="scss" scoped></style>
