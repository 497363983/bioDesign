<script setup>
const props = defineProps({
  width: {
    type: [String],
    default: "100%",
  },
  height: {
    type: [String],
    default: "calc(100vh - 60px)",
  },
  file: String,
});

const src = computed(
  () => `https://qww123.ltd/bioDesign/lib/web/viewer.html?file=${props.file}`
);
</script>

<template>
  <div class="pdf-viewer" style="height: fit-content;">
    <iframe :style="{width, height}" :src="src" frameborder="0"></iframe>
  </div>
</template>

<style lang="scss" scoped></style>
