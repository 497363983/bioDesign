<script setup>
import { useUserStore, useTeamStore } from "@/store";
import { Search } from "@element-plus/icons-vue";
import {
  searching,
  addMember,
  getTeamInformation,
  removeMember,
} from "../../api";

const editable = ref(false);
const searchValue = ref("");
const searchLoading = ref(false);
const users = ref([]);

function remove(row) {
  ElMessageBox.confirm(
    `确认移除成员${row.name}？移除后该成员将从名单中删除。`,
    "提示",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      showClose: false,
    }
  )
    .then(() => {
      removeMember(row.username, () => {
        getTeamInformation(useUserStore().team);
      });
    })
    .catch(() => {
      //   editable.value = false;
    });
}

function onSelect(value) {
  ElMessageBox.confirm(`确认添加${value.name}为成员？`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showClose: false,
  })
    .then(() => {
      addMember([value.username], () => {
        getTeamInformation(useUserStore().team);
      });
      searchValue.value = "";
    })
    .catch(() => {
      searchValue.value = "";
    });
}

function openEditDialog() {
  editable.value = true;
}

async function remoteSearch(query) {
  if (query) {
    searchLoading.value = true;
    users.value = await searching("user", "username", query);
    searchLoading.value = false;
  } else {
    users.value = [];
  }
}

defineExpose({
  openEditDialog,
});

onMounted(() => {
  getTeamInformation(useUserStore().team, () => {
    console.log(useTeamStore());
  });
});
</script>

<template>
  <el-descriptions :column="1" border>
    <el-descriptions-item label="队伍ID">
      {{ useUserStore().team ? useUserStore().team : "无" }}
    </el-descriptions-item>
    <el-descriptions-item style="padding: 0" label="成员">
      <el-table :data="useTeamStore().member" style="width: 100%" height="100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="username" label="学号"></el-table-column>
        <el-table-column prop="college" label="学院"></el-table-column>
        <el-table-column prop="grade" label="年级"></el-table-column>
        <el-table-column label="角色">
          <template #default="{ row }">
            {{ row.username === useTeamStore().leader ? "负责人" : "队员" }}
          </template>
        </el-table-column>
      </el-table>
    </el-descriptions-item>
  </el-descriptions>
  <el-dialog
    v-model="editable"
    title="编辑成员"
    fullscreen
    lock-scroll
    append-to-body
  >
    <div style="height: calc(100vh - 150px)">
      <el-scrollbar height="100%">
        <el-table
          :data="useTeamStore().member"
          style="width: 100%"
          height="100%"
        >
          <el-table-column prop="name" fixed label="姓名"></el-table-column>
          <el-table-column prop="username" label="学号"></el-table-column>
          <el-table-column prop="college" label="学院"></el-table-column>
          <el-table-column prop="grade" label="年级"></el-table-column>
          <el-table-column label="角色">
            <template #default="{ row }">
              {{ row.username === useTeamStore().leader ? "负责人" : "队员" }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="useUserStore().username === useTeamStore().leader"
            fixed="right"
            align="right"
          >
            <template #header>
              <!-- <el-button type="primary">添加成员</el-button> -->
              <el-select
                v-if="useTeamStore().member.length < 4"
                v-model="searchValue"
                placeholder="搜索学号以添加成员"
                remote
                filterable
                :remote-method="remoteSearch"
                :loading="searchLoading"
                value-key="username"
                @change="onSelect"
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
                <el-option
                  v-for="user in users"
                  :key="user.username"
                  :label="user.name"
                  :value="user"
                >
                  <span style="float: left">{{ user.name }}</span>
                  <span
                    style="
                      float: right;
                      color: var(--el-text-color-secondary);
                      font-size: 13px;
                    "
                    >{{ user.username }}</span
                  >
                </el-option>
              </el-select>
            </template>
            <template #default="{ row }">
              <el-button type="primary"> 转移负责人 </el-button>
              <el-button
                type="danger"
                v-if="row.username !== useUserStore().username"
                @click="remove(row)"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
