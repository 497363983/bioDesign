<script setup>
import editor from "@/components/editor/index.vue";
import { uploadInformation, getTeamInformation } from "../../api";
import { ElMessageBox } from "element-plus";
import { useUserStore, useTeamStore } from "../../store";

defineProps({
  canUpload: {
    type: Boolean,
    default: false,
  },
});

const editable = ref(false);
const canEditInformation = ref(true);

const isChange = ref(false);
const uploadLoading = ref(false);

function onClose(done) {
  if (!isChange.value) {
    done();
  } else {
    ElMessageBox.confirm("更改尚未提交", "提示", {
      confirmButtonText: "提交",
      cancelButtonText: "放弃提交",
      closeOnClickModal: false,
      distinguishCancelAndClose: true,
    })
      .then(() => {
        uploadInformation(() => {
          editable.value = false;
          getTeamInformation(useUserStore().team);
        });
      })
      .catch((action) => {
        if (action === "cancel") {
          editable.value = false;
        }
      });
  }
}

function onUpload() {
  uploadLoading.value = true;
  uploadInformation(
    () => {
      uploadLoading.value = false;
      editable.value = false;
    },
    () => {
      uploadLoading.value = false;
    }
  );
}

function openEditDialog() {
  editable.value = true;
}

defineExpose({
  openEditDialog,
});
</script>

<template>
  <el-descriptions border :column="1">
    <!-- <template #extra>
      <el-button @click="editable = true" :icon="Edit" type="primary"
        >编辑</el-button
      >
    </template> -->
    <el-descriptions-item label="项目名称">
      <span class="ProseMirror" v-html="useTeamStore().title"></span>
    </el-descriptions-item>
    <el-descriptions-item label="项目摘要">
      <span class="ProseMirror" v-html="useTeamStore().abstract"></span>
    </el-descriptions-item>
    <el-descriptions-item label="创新之处">
      <span class="ProseMirror" v-html="useTeamStore().news"></span>
    </el-descriptions-item>
  </el-descriptions>
  <el-dialog
    v-model="editable"
    title="编辑项目信息"
    fullscreen
    lock-scroll
    append-to-body
    :before-close="onClose"
  >
    <div style="height: calc(100vh - 150px)">
      <el-scrollbar height="100%">
        <h2>项目标题</h2>
        <editor
          v-model:content="useTeamStore().title"
          v-model:isChange="isChange"
          :limit="100"
          :editable="canEditInformation"
        />
        <h2>项目摘要</h2>
        <editor
          v-model:content="useTeamStore().abstract"
          v-model:isChange="isChange"
          :editable="canEditInformation"
          :limit="600"
        />
        <h2>创新之处</h2>
        <editor
          v-model:content="useTeamStore().news"
          v-model:isChange="isChange"
          :limit="400"
          :editable="canEditInformation"
        />
      </el-scrollbar>
      <div class="flex" style="margin: 10px">
        <el-button
          @click="onUpload"
          style="width: 20%"
          type="primary"
          round
          size="large"
          :loading="uploadLoading"
          >上传</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
