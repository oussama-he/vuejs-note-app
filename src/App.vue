<template>
  <div class="content-expand" id="app">
    <div class="topbar">
      <h1><i class="far fa-sticky-note"></i> Note App</h1>
      <div class="actions">
        <a href="#" @click="createNote" title="New Note">
          <i class="fa fa-plus-circle"></i>
        </a>
        <a v-if="activeNote" href="#" title="Info About Note" @click="modalVisible=true">
          <i class="fa fa-info-circle"></i>
        </a>
        <a href="#" v-if="activeNote" @click="deleteNote" title="Delete This Note">
          <i class="fa fa-trash"></i>
        </a>
      </div>
    </div>
    <div class="main">
      <note-list :notes="notes" @select-note="changeActiveNote" @create-note="createNote"></note-list>
      <div class="note-area">
        <note-pad v-if="activeNote" :note="activeNote" @update-note="updateNote"></note-pad>
        <note-pad v-else :note="starterNote"></note-pad>
        <modal title="Info About Note" :visible="modalVisible" @hide-modal="modalVisible=false">
          <div v-if="activeNote">
            <p>
              <i class="fa fa-pencil-alt"></i>
              Word Count: {{countWords(activeNote.noteBody)}}
            </p>
            <p>
              <i class="fa fa-calendar-alt"></i>
              Created At: {{new Date(activeNote.timestamp*1000).toDateString()}}
            </p>
          </div>
        </modal>
      </div>
    </div>
    <footer>
      <div class="footer">
        <p>
          Created by:
          <a href="https://github.com/oussama-he" target="_blank">
            Oussama Heloulou
            <i class="fa fa-external-link-alt"></i>
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import NotePad from "./components/NotePad.vue";
import NoteList from "./components/NoteList.vue";
import Modal from "./components/Modal.vue";
import { getNotes, addNote, updateNote, deleteNote } from "./utils/storage.js";
import { getUnixTimestamp, countWords } from "./utils/utils.js";
export default {
  name: "app",
  data() {
    return {
      notes: getNotes(),
      activeNote: null,
      modalVisible: false,
      starterNote: {
        noteBody:
          "# VueJS note app \n - to create a note click plus sign in left side \n - click/focus to edit note \n - click off/blur to save note and compile to markdown",
        timestamp: 1558686606
      }
    };
  },
  methods: {
    changeActiveNote(note) {
      this.activeNote = note;
    },
    updateNote(note) {
      let index = this.notes.findIndex(
        element => element.timestamp == note.timestamp
      );
      if (index == -1) {
        return;
      } else {
        this.notes[index] = note;
      }
      updateNote(note);
    },
    deleteNote() {
      if (
        this.activeNote !== null &&
        confirm("Are you sure you want to delete this note?")
      ) {
        let index = this.notes.findIndex(
          element => element.timestamp == this.activeNote.timestamp
        );
        this.notes = this.notes.filter((element, _index) => {
          return index != _index;
        });
        deleteNote(this.activeNote);
      }
    },
    createNote() {
      let note = { noteBody: "New note...", timestamp: getUnixTimestamp() };
      this.notes.unshift(note);
      addNote(note);
      this.changeActiveNote(note);
    },
    countWords: countWords
  },
  components: {
    NotePad,
    NoteList,
    Modal
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
  text-decoration: none;
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
  height: 77%;
  margin-left: -10px;
}
.main .note-area {
  overflow-y: scroll;
  border-radius: 25px;
  background: white;
}
.note-area {
  width: 75%;
}
.footer {
  padding: 10px 10px;
  background: #f8f9fa;
  text-align: center;
}
</style>
