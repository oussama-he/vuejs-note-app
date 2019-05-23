<template>
  <div class="content-expand" id="app">
    <div class="topbar">
      <div class="search">
        <input type="text" class="input-search" placeholder="search">
      </div>
      <div class="actions">
        <a href="#">
          <i class="fa fa-plus-circle"></i>
        </a>
        <a href="#">
          <i class="fa fa-info-circle"></i>
        </a>
        <a href="#">
          <i class="fa fa-trash"></i>
        </a>
        <a href="#">
          <i class="fa fa-archive"></i>
        </a>
      </div>
    </div>
    <div class="main">
      <note-list
        :notes="notes"
        @select-note="changeActiveNote"
        @create-note="value => notes.push(value)"
      ></note-list>
      <div class="note-area">
        <note-pad v-if="activeNote" :note="activeNote" @update-note="updateNote"></note-pad>
        <note-pad v-else :note="starterNote"></note-pad>
        <div class="note-tags">
          <h1>Title</h1>
          <p>note</p>
          <ul>
            <li>li 1</li>
            <li>li 2</li>
            <li>li 3</li>
          </ul>
        </div>
      </div>
    </div>
    <footer class="footer">&lt;total bookmarks&gt;</footer>
  </div>
</template>

<script>
import NotePad from "./components/NotePad.vue";
import NoteList from "./components/NoteList.vue";

export default {
  name: "app",
  data() {
    return {
      notes: [
        { title: "Note 1", preview: "note 1...", id: "1" },
        { title: "Note 2", preview: "note 2...", id: "2" },
        { title: "Note 3", preview: "note 3...", id: "3" }
      ],
      activeNote: null,
      starterNote: {
        title: "starter note",
        preview:
          "# VueJS note app \n - to create a note click plus sign in left side \n - click/focus to edit note \n - click off/blur to save note and convert to markdown",
        id: 0
      }
    };
  },
  methods: {
    changeActiveNote(note) {
      this.activeNote = note;
    },
    updateNote(note) {
      this.notes[note.id] = note;
    }
  },
  components: {
    NotePad,
    NoteList
  }
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}
html,
body {
  color: #495057;
  font-family: "Noto Sans JP", sans-serif;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
a {
  color: #495057;
}
.content-expand {
  display: block;
  height: 100vh;
  padding: 10px 10px 0;
  background: #f8f9fa;
}
.topbar {
  display: flex;
  flex-direction: row;
  height: 10%;
}
.search {
  width: 25%;
  padding: 10px;
}
.input-search {
  border-radius: 15px;
  background: #eaecef;
  border: 0px;
  padding: 10px;
  width: 100%;
  /* font-weight: 500; */
  font-size: 16px;
}
.actions {
  padding: 10px;
  margin-left: auto;
  margin-right: 10px;
  vertical-align: middle;
}
.actions a {
  padding: 5px;
}
.main {
  display: flex;
  height: 80%;
  margin-left: -10px;
}
.main .note-area {
  /* height: 500px; */
  /* flex: none; */
  overflow-y: scroll;
  border-radius: 25px;
  background: white;
}
.note-area {
  width: 75%;
}
.footer {
  height: 10%;
  padding: 10px 10px;
  background: #f8f9fa;
}
</style>
