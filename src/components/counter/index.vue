<script setup>
import { useTimestamp } from "@vueuse/core";

const props = defineProps({
  end: {
    type: [String],
  },
});

const timestamp = useTimestamp({ offset: 0 });
const time = computed(() => new Date(props.end) - new Date(timestamp.value));
const diff = computed(() => parseInt(time.value / 1000));
const s = computed(() =>
  parseInt(diff.value % 60)
    .toString()
    .padStart(2, "0")
);
const min = computed(() =>
  parseInt((diff.value % 3600) / 60)
    .toString()
    .padStart(2, "0")
);
const d = computed(() =>
  parseInt(diff.value / 86400)
    .toString()
    .padStart(2, "0")
);
const h = computed(() =>
  (parseInt(diff.value / 3600) - 24 * d.value).toString().padStart(2, "0")
);
</script>

<template>
  <span class="counter">
    <slot :day="d" :hour="h" :minute="min" :second="s"></slot>
  </span>
</template>

<style lang="scss" scoped></style>
