<script setup>
import { isLogin, getTeamList, judgeProject } from "../api";
import { useRouter } from "vue-router";
import { useUserStore } from "../store";
import { transHtml } from "../utils";
import { computed, reactive } from "vue";
import pdfViewer from "../components/pdf-viewer/index.vue";
import editor from "../components/editor/index.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const teamList = ref([]);

const judgeForm = reactive({
  team: "",
  score: 0,
  advice: "",
});

const router = useRouter();
const currentTeam = ref({});
const canEdit = ref(false);
const submiting = ref(false);

const tab = ref("projectInfo");

const editable = computed(() => {
  if (canEdit.value) {
    return true;
  }
  if (currentTeam.value.score !== null) {
    return false;
  } else {
    return true;
  }
});

function chooseTeam(team) {
  currentTeam.value = team;
  canEdit.value = false;
  judgeForm.team = team.id;
  judgeForm.score = team.score ?? 0;
  judgeForm.advice = transHtml(team.advice ?? "");
}

function getType(team) {
  return computed(() => {
    if (team.id === currentTeam.value.id) {
      return "primary";
    } else {
      return team.score !== null ? "success" : "default";
    }
  });
}

function submit() {
  ElMessageBox.confirm(
    `确认评定项目${transHtml(currentTeam.value.title).replace(
      "<br>",
      ""
    )} 得分为 ${judgeForm.score} 分？`,
    "提示",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      showClose: false,
      dangerouslyUseHTMLString: true,
    }
  )
    .then(() => {
      submiting.value = true;
      judgeProject(
        judgeForm.team,
        judgeForm.score,
        judgeForm.advice,
        async () => {
          ElMessage({
            type: "success",
            message: "评分成功",
          });
          canEdit.value = true;
          teamList.value = await getTeamList("judge");
          submiting.value = false;
        }
      );
    })
    .catch(() => {});
}

onMounted(() => {
  isLogin(async () => {
    if (["judge", "admin"].includes(useUserStore().role)) {
      teamList.value = await getTeamList("judge");
      currentTeam.value = teamList.value[0];
      console.log(teamList.value);
    } else {
      router.push("/upload");
    }
  });
});
</script>

<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <h2>
            项目列表 {{ teamList.filter((i) => i.score !== null).length }}/{{
              teamList.length
            }}
            <el-progress
              :percentage="
                (teamList.filter((i) => i.score !== null).length /
                  teamList.length) *
                100
              "
            />
          </h2>

          <el-scrollbar>
            <div class="team-list gap-2">
              <template v-for="team of teamList" :key="team.id">
                <el-button
                  :type="getType(team).value"
                  @click="chooseTeam(team)"
                >
                  <span
                    v-html="
                      transHtml(team.title ?? team.id)
                        .replace('<br>', '')
                        .replace('<p></p>', '')
                    "
                  ></span>
                </el-button>
              </template>
            </div>
          </el-scrollbar>
        </el-row>
        <div>
          <el-tabs v-model="tab" stretch>
            <el-tab-pane
              style="height: 100%; width: 100%"
              label="项目信息"
              name="projectInfo"
            >
              <div class="project-info">
                <el-descriptions :column="1" direction="horizontal" border>
                  <el-descriptions-item label="项目标题">
                    <span
                      v-html="
                        transHtml(currentTeam.title ?? '无')
                          .replace('<br>', '')
                          .replace('<p></p>', '')
                      "
                    ></span>
                  </el-descriptions-item>
                  <el-descriptions-item label="项目简介">
                    <span
                      v-html="
                        transHtml(currentTeam.abstract ?? '无')
                          .replace('<br>', '')
                          .replace('<p></p>', '')
                      "
                    ></span>
                  </el-descriptions-item>
                  <el-descriptions-item label="创新之处">
                    <span
                      v-html="
                        transHtml(currentTeam.new ?? '无')
                          .replace('<br>', '')
                          .replace('<p></p>', '')
                      "
                    ></span>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </el-tab-pane>
            <el-tab-pane
              style="height: 100%"
              label="项目论文"
              name="projectPaper"
            >
              <pdfViewer
                :file="`../../pdf/${currentTeam.id}/${currentTeam.paper}.pdf`"
                height="calc(100vh - 100px)"
              />
            </el-tab-pane>
            <el-tab-pane style="height: 100%" label="评分" name="projectScore">
              <el-form :model="judgeForm" :disabled="!editable">
                <el-form-item label="得分(100分)" required>
                  <el-input-number
                    v-model="judgeForm.score"
                    :min="0"
                    :max="100"
                  />
                </el-form-item>
                <el-form-item label="评语">
                  <editor
                    v-model:content="judgeForm.advice"
                    :limit="1000"
                    :editable="editable"
                  />
                </el-form-item>
              </el-form>
              <el-button
                :loading="submiting"
                @click="submit"
                :disabled="!editable"
                type="primary"
                >提交</el-button
              >
              <el-button @click="canEdit = true" type="default"
                >重新评分</el-button
              >
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.team-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  .el-button {
    margin-top: 5px;
    margin-left: 0;
  }
}

.el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
