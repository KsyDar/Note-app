import { defineStore } from "pinia";
import axios from "axios";

import type { Note } from "@/types/notes";

/**
 * Тип хранилища состояний списка заметок
 */
type NotesState = {
  /** список заметок */
  notes: Note[];
};

export const useNotesStore = defineStore("notes", {
  state: (): NotesState => {
    const notes: Note[] = [];
    return {
      notes,
    };
  },

  actions: {
    /** загрузка списка заметок с сервера */
    async getNotes(): Promise<void> {
      try {
        const res = await axios.get("http://localhost:3000/notes");
        this.notes = res.data;
      } catch (err) {
        console.log(err);
      }
    },

    /** добавление заметки */
    async addNote(note: Note) {
      this.notes.push(note);
    },

    /** обновление данных заметки */
    async updateNote(note: Note) {
      try {
        const updateNoteIndex = this.notes.findIndex((el) => el.id === note.id);
        if (updateNoteIndex === -1) return;
        this.notes[updateNoteIndex] = note;
      } catch (err) {
        console.log(err);
      }
    },

    /** удаление заметки */
    async deleteNote(noteId: string): Promise<void> {
      try {
        const deletedNoteIndex = this.notes.findIndex((el) => el.id === noteId);
        if (deletedNoteIndex === -1) return;
        this.notes.splice(deletedNoteIndex, 1);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
