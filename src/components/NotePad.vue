<template>
  <div
    class="note-body"
    tabindex="-1"
    contenteditable="true"
    v-html="visibleNote"
    @focus="focus = true"
    @blur="updateNote"
  ></div>
</template>

<script>
import marked from 'marked'
import {escapeHTML, compileMarkdown} from '../utils/utils.js'

export default {
  name: "NotePad",
  props: ["note"],
  data() {
    return {
      focus: false,
      localNote: this.note.preview
    };
  },
  methods: {
    updateNote(event) {
      this.focus = false;
      this.localNote = event.currentTarget.innerText;
      this.$emit("update-note", (this.note["preview"] = this.localNote));
    }
  },
  computed: {
    visibleNote() {
      if (this.focus) {
        return escapeHTML(this.localNote);
      } else {
        return compileMarkdown(this.localNote);
      }
    }
  },
  watch: {
    note(value) {
      this.localNote = value.preview;
    }
  }
};
</script>

<style>
.note-body {
    position: relative;
    padding: 25px;
    height: 100%;
    white-space: pre;
}

.note-tags {
    position: absolute;
    bottom: 0;
    border: 1px solid red;
}

</style>
