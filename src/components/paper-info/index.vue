<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { useUserStore, useTeamStore } from "../../store";
import { token, timestamp, fileMD5 } from "../../utils";
import { ElMessage } from "element-plus";
import pdfViewer from "../pdf-viewer/index.vue";

defineProps({
  canUpload: {
    type: Boolean,
    default: false,
  },
});

async function check(file) {
  if (file.size > 5 * 1024 * 1024) {
    ElMessage({
      type: "error",
      message: "文件大小不能超过5Mb",
    });
    return false;
  }
  if (file.type !== "application/pdf") {
    ElMessage({
      type: "error",
      message: "只能上传pdf文件",
    });
    return false;
  }
  const md5 = await fileMD5(file);
  if (md5 === useTeamStore().paper) {
    ElMessage({
      type: "info",
      message: "文件内容与已上传版本一致",
    });
    return false;
  } else {
    return file;
  }
}

function uploadSuccess(response) {
  // console.log(response);
  if (response.code === 0) {
    ElMessage({
      type: "success",
      message: "文件上传成功",
    });
    useTeamStore().paper = response.data.paper;
  } else {
    ElMessage({
      type: "error",
      message: response.message,
    });
  }
}

function uploadFailure(err, file) {
  ElMessage({
    type: "error",
    message: "文件上传失败",
  });
}
</script>

<template>
  <div>
    <el-upload
      v-if="canUpload"
      action="https://qww123.ltd/bioDesign/api/uploadFile.php"
      :data="{
        username: useUserStore().username,
        id: useUserStore().team,
        token,
        timestamp,
      }"
      drag
      :limit="1"
      :on-success="uploadSuccess"
      :on-error="uploadFailure"
      :before-upload="check"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖动文件至此或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">仅能上传pdf文件，且大小不大于5Mb</div>
      </template>
    </el-upload>
  </div>
  <pdf-viewer
    v-if="useTeamStore().paper"
    :file="`../../pdf/${useUserStore().team}/${useTeamStore().paper}.pdf`"
  />
</template>

<style lang="scss" scoped></style>
