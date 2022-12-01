<script setup>
import { useUserStore, useTeamStore, useConfigStore } from "../../store";
import { useRouter } from "vue-router";
import { transHtml, username, token } from "../../utils";
import { onMounted, ref } from "vue";
import { isLogin, getTeamAdvice, getTeamInformation } from "../../api";

const props = defineProps({
  result: {
    type: Object,
    default: [],
  },
});

const index = computed(() => {
  return props.result.indexOf(
    props.result.filter((item) => item.team === useUserStore().team)[0]
  );
});

const router = useRouter();
const advice = ref([]);

const rowType = (rowIndex) =>
  computed(() => {
    if (rowIndex <= useConfigStore().result.promotion - 1) {
      return "success";
    } else if (
      rowIndex <=
      useConfigStore().result.promotion + useConfigStore().result.thirdPrize - 1
    ) {
      return "warning";
    } else {
      return "info";
    }
  });

const prize = (rowIndex) =>
  computed(() => {
    if (rowIndex <= useConfigStore().result.promotion - 1) {
      return "晋级";
    } else if (
      rowIndex <=
      useConfigStore().result.promotion + useConfigStore().result.thirdPrize - 1
    ) {
      return "三等奖";
    } else {
      return "鼓励奖";
    }
  });

function logout() {
  useUserStore().$reset();
  useTeamStore().$reset();
  token.value = null;
  username.value = null;
  router.push("/login");
}

onMounted(() => {
  if (username.value && token.value) {
    isLogin(async (res) => {
      if (res) {
        getTeamInformation(useUserStore().team);
        advice.value = (await getTeamAdvice()).filter((item) => item);
      }
    });
  }
});
</script>

<template>
  <el-card shadow="hover" style="width: 100%">
    <template #header>
      <div class="card-header">
        <span>队伍结果</span>
        <div>
          <el-button type="danger" text @click="logout">退出登录</el-button>
        </div>
      </div>
    </template>
    <div v-if="!useUserStore().isAuthenticated">
      登录后查看队伍的参赛结果（包含评委评语）<el-button
        type="primary"
        @click="router.push('login')"
        >登录</el-button
      >
    </div>
    <div
      v-else-if="
        result.filter((i) => i.team === useUserStore().team).length === 0
      "
    >
      本次比赛您没有参赛队伍
    </div>
    <div v-else>
      <el-descriptions>
        <el-descriptions-item label="项目名称">
          <strong>
            <span
              v-html="
                transHtml(result[index].title)
                  .replace('<br>', '')
                  .match(/(?<=<p>).*?(?=<\/p>)/g)
              "
            ></span>
          </strong>
        </el-descriptions-item>
        <el-descriptions-item label="负责人">
          {{ result[index].leader }}
        </el-descriptions-item>
        <el-descriptions-item label="结果">
          <el-tag effect="plain" :type="rowType(index).value" size="large">{{
            prize(index).value
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="评委评语">
          <span v-if="advice.length === 0">无</span>
          <ul>
            <li v-for="(item, idx) of advice" :key="idx">
              <strong>评委{{ idx + 1 }}</strong>
              <div v-html="transHtml(item)"></div>
            </li>
          </ul>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
