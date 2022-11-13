<script setup>
import { isLogin } from "../api";
import { useRouter } from "vue-router";
import { useUserStore } from "../store";

const router = useRouter();
onMounted(() => {
  isLogin(() => {
    if (useUserStore().role !== "judge") {
      router.push("/upload");
    }
  });
});
</script>

<template>
  <div>
    <span>judge</span>
  </div>
</template>

<style lang="scss" scoped>
div {
  span {
    color: rebeccapurple;
  }
}
</style>
