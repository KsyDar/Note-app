import { defineStore } from "pinia";
import { v4 } from "uuid";
import axios from "axios";

import type { Note } from "@/types/notes";

import { useNotesStore } from "./notes";

/**
 * Тип хранилища состояний заметки
 */
type NoteStore = {
  /** выбранная заметка */
  currentNote: Note;
  /** включен ли режим добавления */
  isAdding: boolean;
};

export const useNoteStore = defineStore("note", {
  state(): NoteStore {
    return {
      currentNote: {
        id: v4(),
        name: "",
        todos: [],
      },
      isAdding: true,
    };
  },
  actions: {
    /**
     * Загрузка данных заметки с сервера
     * @param noteId id заметки
     * @returns заметку
     */
    async getNote(noteId: string) {
      try {
        const result = await axios.get(`http://localhost:3000/notes/${noteId}`);
        return result.data;
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * Установка заметки как выбранной
     * @param note заметка
     */
    setNote(note: Note) {
      this.currentNote = note;
    },
    /**
     * Инициализация изменения заметки
     * @param note заметка
     */
    startEdit(note: Note) {
      this.setNote(note);
      this.isAdding = false;
    },
    /** Инициализация создания заметки */
    startCreate() {
      this.setNote({
        id: v4(),
        name: "",
        todos: [],
      });
      this.isAdding = true;
    },
    /**
     * Удаление заметки
     * @param note заметка
     */
    async deleteNote(note: Note) {
      try {
        await axios.delete(`http://localhost:3000/notes/${note.id}`);
        const notesStore = useNotesStore();
        notesStore.deleteNote(note.id);
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * Создание заметки
     * @param note заметка
     */
    async createNote(note: Note) {
      try {
        await axios.post(`http://localhost:3000/notes/`, note);
        const notesStore = useNotesStore();
        notesStore.addNote(note);
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * Обновление заметки
     * @param note заметка
     */
    async updateNote(note: Note) {
      try {
        await axios.put(`http://localhost:3000/notes/${note.id}`, note);
        const notesStore = useNotesStore();
        notesStore.updateNote(note);
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export type NoteStoreType = ReturnType<typeof useNoteStore>;
