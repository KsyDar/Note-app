import { useNoteStore, type NoteStoreType } from "@/stores/note";
import type { ICommand } from "@/types/command";
import type { Note } from "@/types/notes";
import { getCopyNote } from "@/utils/getCopyNote";

/**
 * Команда создания заметки
 */
export class CreateNoteCommand implements ICommand<Note> {
  newData: Note;
  /** хранилище состояний заметки */
  noteStore: NoteStoreType;

  constructor(data: Note) {
    this.noteStore = useNoteStore();
    this.newData = getCopyNote(data);
  }

  async execute() {
    await this.noteStore.createNote(this.newData);
  }

  async undo() {
    await this.noteStore.deleteNote(this.newData);
  }

  async redo() {
    await this.noteStore.createNote(this.newData);
  }
}
