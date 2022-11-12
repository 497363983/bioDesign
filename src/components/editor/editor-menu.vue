<script setup>
import { nextTick } from "vue";
import menuItem from "./menuItem.vue";

const props = defineProps({
  editor: Object,
});

const menuList = ref([]);

onMounted(() => {
  nextTick(() => {
    menuList.value = [
      {
        icon: "bold",
        title: "加粗",
        action: () => props.editor.chain().focus().toggleBold().run(),
        isActive: () => props.editor.isActive("bold"),
      },
      {
        icon: "italic",
        title: "斜体",
        action: () => props.editor.chain().focus().toggleItalic().run(),
        isActive: () => props.editor.isActive("italic"),
      },
      {
        icon: "strikethrough",
        title: "删除线",
        action: () => props.editor.chain().focus().toggleStrike().run(),
        isActive: () => props.editor.isActive("strike"),
      },
      {
        icon: "underline",
        title: "下滑线",
        action: () => props.editor.chain().focus().toggleUnderline().run(),
        isActive: () => props.editor.isActive("underline"),
      },
      {
        icon: "mark-pen-line",
        title: "高亮",
        action: () => props.editor.chain().focus().toggleHighlight().run(),
        isActive: () => props.editor.isActive("highlight"),
      },
      {
        icon: "heading",
        title: "标题",
        isActive: () => props.editor.isActive("heading"),
        action: () => {},
        children: [
          {
            icon: "h-1",
            title: "一级标题",
            action: () =>
              props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => props.editor.isActive("heading", { level: 1 }),
          },
          {
            icon: "h-2",
            title: "二级标题",
            action: () =>
              props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => props.editor.isActive("heading", { level: 2 }),
          },
          {
            icon: "h-3",
            title: "三级标题",
            action: () =>
              props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: () => props.editor.isActive("heading", { level: 3 }),
          },
          {
            icon: "h-4",
            title: "四级标题",
            action: () =>
              props.editor.chain().focus().toggleHeading({ level: 4 }).run(),
            isActive: () => props.editor.isActive("heading", { level: 4 }),
          },
          {
            icon: "h-5",
            title: "五级标题",
            action: () =>
              props.editor.chain().focus().toggleHeading({ level: 5 }).run(),
            isActive: () => props.editor.isActive("heading", { level: 5 }),
          },
        ],
      },
      {
        icon: "superscript",
        title: "上标",
        action: () => props.editor.chain().focus().toggleSuperscript().run(),
        isActive: () => props.editor.isActive("superscript"),
      },
      {
        icon: "subscript",
        title: "下标",
        action: () => props.editor.chain().focus().toggleSubscript().run(),
        isActive: () => props.editor.isActive("subscript"),
      },
      {
        icon: "list-unordered",
        title: "无序列表",
        action: () => props.editor.chain().focus().toggleBulletList().run(),
        isActive: () => props.editor.isActive("bulletList"),
      },
      {
        icon: "list-ordered",
        title: "有序列表",
        action: () => props.editor.chain().focus().toggleOrderedList().run(),
        isActive: () => props.editor.isActive("orderedList"),
      },
      {
        icon: "code-view",
        title: "代码",
        action: () => props.editor.chain().focus().toggleCode().run(),
        isActive: () => props.editor.isActive("code"),
      },
      {
        icon: "code-box-line",
        title: "代码块",
        action: () => props.editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => props.editor.isActive("codeBlock"),
      },
      {
        icon: "double-quotes-l",
        title: "引用",
        action: () => props.editor.chain().focus().toggleBlockquote().run(),
        isActive: () => props.editor.isActive("blockquote"),
      },
      {
        icon: "separator",
        title: "分割线",
        action: () => props.editor.chain().focus().setHorizontalRule().run(),
      },
      {
        icon: "text-wrap",
        title: "换行",
        action: () => props.editor.chain().focus().setHardBreak().run(),
      },
      {
        icon: "format-clear",
        title: "清除格式",
        action: () =>
          props.editor.chain().focus().clearNodes().unsetAllMarks().run(),
      },
      {
        icon: "arrow-go-back-line",
        title: "撤销",
        action: () => props.editor.chain().focus().undo().run(),
        disabled: computed(() => !props.editor.can().undo()),
      },
      {
        icon: "arrow-go-forward-line",
        title: "返回",
        action: () => props.editor.chain().focus().redo().run(),
        disabled: computed(() => !props.editor.can().redo()),
      },
    ];
  });
});
</script>

<template>
  <div class="editor-menu">
    <template v-for="(item, index) in menuList" :key="index">
      <menu-item v-bind="item"></menu-item>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
