<template>
  <UIButton class="notelist__button" @click="addNote()">Создать</UIButton>
  <div class="notelist-wrapper" v-if="noteList[0]">
    <h1 v-if="noteList.length === 0">У вас нет ни одной заметки!</h1>
    <ul v-else class="notelist">
      <Note v-for="note in noteList" :key="note.id" :note="note" />
    </ul>
  </div>
  <UILoader v-else />
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useNotesStore } from "../stores/notes";
import { useNoteStore } from "@/stores/note";
import { useUndoRedoStore } from "@/stores/undoRedo";

import { UndoRedoContext } from "@/types/undoRedoContexts";

import Note from "@/components/Note.vue";
import UIButton from "@/components/ui/UIButton.vue";
import UILoader from "../components/ui/UILoader.vue";

const { notes: noteList } = storeToRefs(useNotesStore());
const undoRedoStore = useUndoRedoStore();
const notesStore = useNotesStore();
const noteStore = useNoteStore();
const router = useRouter();

onBeforeMount(() => {
  notesStore.getNotes();
  undoRedoStore.setContext(UndoRedoContext.NotesList);
});

/**
 * Создание новой заметки
 */
const addNote = () => {
  noteStore.startCreate();
  router.push({ name: "NoteRedactor" });
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.notelist-wrapper {
  width: 100%;
}
.notelist {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  &__button {
    margin: 1rem;
  }
}
</style>
