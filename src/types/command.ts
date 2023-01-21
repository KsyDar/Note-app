/**
 * Тип команды
 */
export interface ICommand<T = any> {
  /** данные до выполнения команды */
  oldData?: T;
  /** данные после выполнения команды */
  newData?: T;

  /** действие - создание заметки */
  execute(): Promise<void>;
  /** отмена действия */
  undo(): Promise<void>;
  /** повторение отмененного действия */
  redo(): Promise<void>;
}
