import { useNoteStore, type NoteStoreType } from "@/stores/note";
import type { ICommand } from "@/types/command";
import type { Note } from "@/types/notes";
import { getCopyNote } from "@/utils/getCopyNote";

/**
 * Команда изменения заметки
 */
export class EditNoteCommand implements ICommand<Note> {
  oldData: Note;
  newData: Note;
  /** хранилище состояний заметки */
  noteStore: NoteStoreType;

  constructor(data: Note) {
    this.noteStore = useNoteStore();
    if (!this.noteStore.currentNote)
      throw new Error(
        "Невозможно выполнить команду, отсутсвуют данные в noteStore"
      );

    this.oldData = getCopyNote(this.noteStore.currentNote);
    this.newData = getCopyNote(data);
  }

  async execute() {
    this.noteStore.setNote(this.newData);
  }

  async undo() {
    this.noteStore.setNote(this.oldData);
  }

  async redo() {
    this.noteStore.setNote(this.newData);
  }
}
