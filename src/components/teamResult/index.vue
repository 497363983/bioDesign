<script setup>
import { useUserStore, useTeamStore, useConfigStore } from "../../store";
import { useRouter } from "vue-router";
import { transHtml, username, token } from "../../utils";
import { onMounted, ref } from "vue";
import { isLogin, getTeamAdvice } from "../../api";

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

onMounted(() => {
  if (username.value && token.value) {
    isLogin(async (res) => {
      if (res) {
        getTeamInformation(useUserStore().team);
        advice.value = await getTeamAdvice();
      }
    });
  }
});
</script>

<template>
  <el-card shadow="hover" style="width: 100%">
    <template #header> 队伍结果 </template>
    <div v-if="!useUserStore().isAuthenticated">
      登录后查看队伍的参赛结果（包含评委评语）<el-button
        type="primary"
        @click="router.push('login')"
        >登录</el-button
      >
    </div>
    <div v-else>
      <el-descriptions>
        <el-descriptions-item label="项目名称">
          <strong>
            <span
              v-html="
                transHtml(useTeamStore().title)
                  .replace('<br>', '')
                  .match(/(?<=<p>).*?(?=<\/p>)/g)
              "
            ></span>
          </strong>
        </el-descriptions-item>
        <el-descriptions-item label="负责人">
          {{
            useTeamStore().member.find(
              (item) => item.username === useTeamStore().leader
            )?.[0]?.name
          }}
        </el-descriptions-item>
        <el-descriptions-item label="结果">
          <el-tag effect="plain" :type="rowType(index).value">{{
            prize(index).value
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="评委评语">
          <span v-if="advice.length === 0">无</span>
          <ul>
            <template v-for="item in advice">
              <li v-html="transHtml(item)"></li>
            </template>
          </ul>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>
