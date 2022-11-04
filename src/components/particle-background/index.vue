<script setup>
// import { loadFull } from "tsparticles";
import { tsParticles } from "tsparticles-engine";
import { nextTick } from "vue";
import { option } from "./config";

onMounted(() => {
  nextTick(() => {
    tsParticles.init();
    tsParticles.load("bg", option);
  });
});
</script>

<template>
  <div id="bg" style="position: relative"></div>
</template>

<style lang="scss">
#bg {
  position: absolute;
  width: 100%;
  height: 100%;
  //   background: $background;
  canvas {
    display: block;
    position: absolute;
  }
}
</style>
