<script setup>
import { useTimestamp } from "@vueuse/core";
import { watchEffect } from "vue";

const props = defineProps({
  end: {
    type: [String],
  },
  endCallback: {
    type: [Function, null],
    default: null,
  },
  dangerPoint: {
    type: Number,
    default: 24 * 60 * 60,
  },
});

const timestamp = useTimestamp({ offset: 0 });
const time = computed(() => new Date(props.end) - new Date(timestamp.value));
const diff = computed(() => parseInt(time.value / 1000));
const s = computed(() => Math.max(parseInt(diff.value % 60), 0));
const min = computed(() => Math.max(parseInt((diff.value % 3600) / 60), 0));
const d = computed(() => Math.max(parseInt(diff.value / 86400), 0));
const h = computed(() =>
  Math.max(parseInt(diff.value / 3600) - 24 * d.value, 0)
);
const isDanger = computed(() => diff.value <= props.dangerPoint);

watchEffect(() => {
  props.endCallback && time.value <= 0 ? endCallback() : null;
});
</script>

<template>
  <span class="counter">
    <slot
      :day="d.toString().padStart(2, '0')"
      :hour="h.toString().padStart(2, '0')"
      :minute="min.toString().padStart(2, '0')"
      :second="s.toString().padStart(2, '0')"
      :isDanger="isDanger"
    ></slot>
  </span>
</template>
