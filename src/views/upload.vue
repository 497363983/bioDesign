<script setup>
import counter from "@/components/counter/index.vue";
import userInfo from "@/components/user-info/index.vue";
import teamInfo from "@/components/team-info/index.vue";
import projectInfo from "@/components/project-info/index.vue";
import paperInfo from "@/components/paper-info/index.vue";
import notice from "./notice.vue";
import { Edit } from "@element-plus/icons-vue";
import { useConfigStore, useTeamStore, useUserStore } from "../store";
import { timestamp, username, token } from "@/utils";
import {
  getConfig,
  createTeam,
  removeMember,
  deleteTeam,
  isLogin,
  getTeamInformation,
} from "@/api";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

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
  } else {
    return true;
  }
});

const showCounter = computed(() => {
  if (useConfigStore().upload.open === "auto") {
    const start = useConfigStore().upload.start;
    const pre = new Date(timestamp.value) - new Date(start);
    return pre < 0;
  } else {
    return false;
  }
});
function newTeam(teamRef) {
  ElMessageBox.confirm(`确认创建一支新队伍？`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showClose: false,
  })
    .then(() => {
      createTeam(() => {
        isLogin(() => {
          getTeamInformation(useUserStore().team);
        });
        if (useTeamStore().leader === useUserStore().username) {
          teamRef.openEditDialog();
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
      removeMember(useUserStore().username, () => {
        isLogin(() => {
          if (useUserStore().team) {
            getTeamInformation(useUserStore().team);
          }
        });
      });
    })
    .catch(() => {
      //   editable.value = false;
    });
}

function removeTeam() {
  ElMessageBox.confirm(`确认解散当前队伍？`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showClose: false,
    type: "warning",
  })
    .then(() => {
      deleteTeam(() => {
        useTeamStore().$reset();
        ElMessage({
          type: "success",
          message: "解散队伍成功",
        });
        isLogin(() => {
          if (useUserStore().team) {
            getTeamInformation(useUserStore().team);
          }
        });
      });
    })
    .catch(() => {
      //   editable.value = false;
    });
}

function logout() {
  useUserStore().$reset();
  useTeamStore().$reset();
  token.value = null;
  username.value = null;
  router.push("/login");
}

onMounted(async () => {
  useConfigStore().upload = await getConfig("upload");
  if (canUpload.value) {
    if (!useUserStore().isAuthenticated) {
      router.push("/login");
    }
  }
});
</script>

<template>
  <div
    class="time-counter"
    style="height: calc(100vh - 160px); font-size: 45px"
    v-if="showCounter"
  >
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
        <div class="time-counter" style="margin: 30px 0">
          <div class="counter-wrap text-center">
            <counter :end="useConfigStore().upload.end">
              <template v-slot="{ day, second, hour, minute, isDanger }">
                <span style="font-size: 20px"
                  >上传通道预计将于
                  <span :class="{ 'text-danger': isDanger }">{{ day }}</span
                  >天<span :class="{ 'text-danger': isDanger }">{{ hour }}</span
                  >时<span :class="{ 'text-danger': isDanger }">{{
                    minute
                  }}</span
                  >分<span :class="{ 'text-danger': isDanger }">{{
                    second
                  }}</span
                  >秒后关闭</span
                >
              </template>
            </counter>
          </div>
        </div>
        <el-row>
          <el-col :span="18" :offset="3" :xs="{ span: 24, offset: 0 }">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>用户信息</span>
                  <div>
                    <el-button type="danger" text @click="logout"
                      >退出登录</el-button
                    >
                  </div>
                </div>
              </template>
              <div>
                <el-scrollbar>
                  <user-info />
                </el-scrollbar>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" :offset="3" :xs="{ span: 24, offset: 0 }">
            <el-card shadow="hover">
              <template #header>
                <span>比赛须知</span>
              </template>
              <div style="height: 500px">
                <el-scrollbar height="100%">
                  <notice />
                </el-scrollbar>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" :offset="3" :xs="{ span: 24, offset: 0 }">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>队伍信息</span>
                  <div v-if="canUpload || useUserStore().role === 'test'">
                    <el-button
                      v-if="
                        !useUserStore().team &&
                        useUserStore().college === '生物工程学院'
                      "
                      type="primary"
                      text
                      @click="newTeam(teamInfoRef)"
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
                      v-if="
                        useUserStore().team &&
                        useUserStore().username !== useTeamStore().leader
                      "
                      type="danger"
                      text
                      @click="leaveTeam"
                      >退出队伍</el-button
                    >
                    <el-button
                      v-if="
                        useUserStore().team &&
                        useUserStore().username === useTeamStore().leader
                      "
                      type="danger"
                      text
                      @click="removeTeam"
                      >解散队伍</el-button
                    >
                  </div>
                </div>
              </template>
              <div>
                <el-scrollbar>
                  <team-info v-if="useUserStore().team" ref="teamInfoRef" />
                </el-scrollbar>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row v-if="useUserStore().team">
          <el-col :span="18" :offset="3" :xs="{ span: 24, offset: 0 }">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>项目信息</span>
                  <div v-if="canUpload || useUserStore().role === 'test'">
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
        <el-row v-if="useUserStore().team">
          <el-col :span="18" :offset="3" :xs="{ span: 24, offset: 0 }">
            <el-card shadow="hover">
              <template #header>项目论文</template>
              <div>
                <paper-info
                  :canUpload="canUpload || useUserStore().role === 'test'"
                />
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
  font-weight: 800;
}
.info-text {
  font-size: 40px;
}

.time-counter {
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
