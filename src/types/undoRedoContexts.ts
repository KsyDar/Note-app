/**
 * Возможные виды контекста для отмены/повтора действия
 */
export enum UndoRedoContext {
  /** действия происходят в редакторе */
  NoteRedactor = "note-redactor",
  /** действия происходят на главной странице */
  NotesList = "notes-list",
}
