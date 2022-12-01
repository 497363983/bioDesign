<script setup>
import { watch } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CharacterCount from "@tiptap/extension-character-count";
import Typography from "@tiptap/extension-typography";
import { lowlight } from "lowlight/lib/core";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import editorMenu from "@/components/editor/editor-menu.vue";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

const props = defineProps({
  content: {
    type: [Object, String],
    default: "",
  },
  limit: {
    type: Number,
    default: 500,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  isChange: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:content", "update:isChange"]);
const editor = useEditor({
  content: props.content,
  extensions: [
    StarterKit.configure({
      codeBlock: false,
    }),
    Superscript,
    Subscript,
    Placeholder.configure({
      placeholder: "在这里输入内容",
    }),
    Highlight,
    Underline,
    CodeBlockLowlight.configure({
      lowlight,
    }),
    CharacterCount.configure({
      limit: props.limit,
    }),
    Typography,
  ],
  onUpdate: ({ editor }) => {
    emits("update:content", editor.getHTML());
    emits("update:isChange", true);
  },
  editable: props.editable,
});

watch(
  () => props.content,
  (newValue) => {
    const isSame = editor.value.getHTML() === newValue;
    if (isSame) {
      return;
    }
    editor.value.commands.setContent(newValue, false);
  }
);

watch(
  () => props.editable,
  (newValue) => {
    editor.value.setOptions({
      editable: newValue ?? false,
    });
  }
);

</script>

<template>
  <div class="editor" v-if="editor" @click="editor.chain().focus().run()">
    <editor-menu :editor="editor"></editor-menu>
    <editor-content :editor="editor" />
    <div
      class="character-count"
      style="text-align: right; padding: 5px; color: #adb5bd"
      v-if="editor"
    >
      {{ editor.storage.characterCount.characters() }} / {{ limit }} 字符
    </div>
  </div>
</template>

<style lang="scss">
html.dark {
  .editor {
    background-color: var(--el-bg-color-overlay);
  }
}
.editor {
  display: flex;
  flex-direction: column;
  max-height: 26rem;
  background-color: #fff;
  border: 3px solid var(--el-border-color);
  border-radius: 0.75rem;

  &-header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 3px solid #0d0d0d;
  }

  &-content {
    padding: 0.7rem 0.5rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}

.ProseMirror {
  p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
  }

  height: 100%;
  padding: 5px;

  &:focus {
    outline: none;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #faf594;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
}
</style>
