import { useNoteStore, type NoteStoreType } from "@/stores/note";
import type { ICommand } from "@/types/command";
import type { Note } from "@/types/notes";
import { getCopyNote } from "@/utils/getCopyNote";

/**
 * Команда обновления заметки
 */
export class UpdateNoteCommand implements ICommand<Note> {
  newData: Note;
  oldData: Note | undefined;
  /** хранилище состояний заметки */
  noteStore: NoteStoreType;

  constructor(data: Note) {
    this.noteStore = useNoteStore();
    if (!this.noteStore.currentNote)
      throw new Error(
        "Невозможно выполнить команду, отсутсвуют данные в noteStore"
      );

    this.newData = getCopyNote(data);
  }

  async execute() {
    const note = await this.noteStore.getNote(this.newData.id);
    this.oldData = note;
    await this.noteStore.updateNote(this.newData);
  }

  async undo() {
    if (!this.oldData) {
      throw new Error(
        "Невозможно отменить действие, не найжены предыдушие данные"
      );
    }
    await this.noteStore.updateNote(this.oldData);
  }

  async redo() {
    await this.noteStore.updateNote(this.newData);
  }
}
