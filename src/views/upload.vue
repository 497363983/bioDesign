<script setup>
import counter from "@/components/counter/index.vue";
import userInfo from "@/components/user-info/index.vue";
import teamInfo from "@/components/team-info/index.vue";
import projectInfo from "@/components/project-info/index.vue";
import paperInfo from "@/components/paper-info/index.vue";
import { Edit } from "@element-plus/icons-vue";
import { useConfigStore, useTeamStore, useUserStore } from "../store";
import { timestamp } from "@/utils";
import { getConfig, getTeamInformation, createTeam, removeMember } from "@/api";
import { useRouter } from "vue-router";

const router = useRouter();
const projectInfoRef = ref();
const teamInfoRef = ref();

const canUpload = computed(() => {
  if (!useConfigStore().upload.open) {
    return false;
  } else if (useConfigStore().upload.open === "auto") {
    const start = useConfigStore().upload.start;
    const end = useConfigStore().upload.end;
    const pre = new Date(timestamp.value) - new Date(start);
    const ne = new Date(timestamp.value) - new Date(end);
    return pre >= 0 && ne <= 0;
    // return pre
  } else {
    return true;
  }
});

function newTeam() {
  ElMessageBox.confirm(`确认创建一支新队伍？`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showClose: false,
  })
    .then(() => {
      createTeam(() => {
        if (useTeamStore().leader === useUserStore().username) {
          teamInfoRef.value.openEditDialog();
        }
      });
    })
    .catch(() => {
      //   editable.value = false;
    });
}

function leaveTeam() {
  ElMessageBox.confirm(`确认退出当前队伍？`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showClose: false,
    type: "warning",
  })
    .then(() => {
      removeMember(useUserStore().username, () => {});
    })
    .catch(() => {
      //   editable.value = false;
    });
}

onMounted(async () => {
  useConfigStore().upload = await getConfig("upload");
  if (canUpload.value) {
    if (!useUserStore().isAuthenticated) {
      router.replace("/login");
    }
    getTeamInformation(useUserStore().team);
  }
});
</script>

<template>
  <div class="time-counter" v-if="!canUpload && useUserStore().role !== 'test'">
    <div class="counter-wrap text-center">
      <counter :end="useConfigStore().upload.start">
        <template v-slot="{ day, second, hour, minute }">
          <span class="info-text">上传通道预计将于</span>
          {{ day }}天{{ hour }}时{{ minute }}分{{ second }}秒
          <span class="info-text">后开放</span>
        </template>
      </counter>
    </div>
  </div>
  <div v-else>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="18" :offset="3">
            <el-card shadow="hover">
              <template #header>用户信息</template>
              <div>
                <el-scrollbar>
                  <user-info />
                </el-scrollbar>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="18" :offset="3">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>队伍信息</span>
                  <div>
                    <el-button
                      v-if="!useUserStore().team"
                      type="primary"
                      text
                      @click="newTeam"
                      >创建队伍</el-button
                    >
                    <!-- <el-button type="primary" text>加入队伍</el-button> -->
                    <el-button
                      v-if="
                        useUserStore().username === useTeamStore().leader &&
                        useUserStore().username !== ''
                      "
                      type="primary"
                      text
                      @click="teamInfoRef.openEditDialog()"
                      >编辑队伍</el-button
                    >
                    <el-button
                      v-if="useUserStore().team"
                      type="danger"
                      text
                      @click="leaveTeam"
                      >退出队伍</el-button
                    >
                  </div>
                </div>
              </template>
              <div>
                <team-info v-if="useUserStore().team" ref="teamInfoRef" />
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" :offset="3">
            <el-card v-if="useUserStore().team" shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>项目信息</span>
                  <div>
                    <el-button
                      @click="projectInfoRef.openEditDialog()"
                      :icon="Edit"
                      type="primary"
                      text
                      >编辑</el-button
                    >
                  </div>
                </div>
              </template>
              <div>
                <project-info ref="projectInfoRef" />
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" :offset="3">
            <el-card v-if="useUserStore().team" shadow="hover">
              <template #header>项目论文</template>
              <div>
                <paper-info />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.counter-wrap {
  font-size: 45px;
  font-weight: 800;
}
.info-text {
  font-size: 40px;
}

.time-counter {
  height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
