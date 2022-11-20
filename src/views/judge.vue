<script setup>
import { isLogin, getTeamList } from "../api";
import { useRouter } from "vue-router";
import { useUserStore } from "../store";

const router = useRouter();
const teamList = ref([]);
onMounted(async () => {
  isLogin(async () => {
    if (["judge","admin"].includes(useUserStore().role)) {
      router.push("/upload");
      teamList.value = await getTeamList();
      console.log(teamList.value);
    }
  });
});
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
