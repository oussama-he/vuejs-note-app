<template>
  <ul class="note-list">
    <li
      class="note-list-item"
      :class="{active: selected === note.id}"
      v-for="(note, key) in notes"
      :key="key"
      @click="onItemClicked(note)"
    >
      <div class="note-title">
        <span>{{note.title}}</span>
      </div>
      <p class="note-preview">{{note.preview}}</p>
    </li>

    <li class="note-list-item" @click="createNote">
      <div class="note-title">
        <span>
          <i class="fa fa-plus-circle"></i> Note
        </span>
      </div>
      <p class="note-preview">Click here to add new note</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "NoteList",
  props: ["notes"],
  methods: {
    createNote() {
      this.$emit("create-note", { title: "note 4", preview: "...", id: 4 });
    },
    onItemClicked(note) {
      this.selected = note.id;
      this.$emit("select-note", note);
    }
  },
  data() {
    return {
      selected: null
    };
  }
};
</script>

<style>
  .note-list {
    display: block;
    width: 25%;
    background: #f8f9fa;
    padding-left: 0;
    margin-left: 0;
    margin-right: 0;
  }
  
  .note-list a {
    display: block;
    text-decoration: none;
  }
.note-list-item {
    display: block;
    padding: 10px 10px;
    text-align: center;
    font-weight: 500;
  }
  
  .note-list-item:hover,
  .note-list-item.active {
    background: #ecf5fc;
    background: #dfeff3;
    border-radius: 5px;
  }
  .note-preview {
      color: grey;
      margin: 0;
    font-weight: 400;
    font-size: 13px;
  }
  .note-title:hover a,
  .note-title.active a { 
    color: #40a4f4;
    color: #4dabf7;
  }
  .note-list {
    /*! height: 500px; */
    overflow: auto;
  }
</style>
