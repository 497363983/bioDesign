<script setup>
defineProps({
  questions: {
    type: [Object, Array],
    default: [],
  },
});
</script>

<template>
  <div style="height: 100%">
    <el-collapse>
      <el-collapse-item v-for="(question, index) in questions" :key="index">
        <template #title>
          <strong style="font-size: 20px">{{ question.question }}</strong>
        </template>
        <p v-html="question.answer"></p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
