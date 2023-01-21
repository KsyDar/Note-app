/**
 * Тип имеющий id и имя
 */
export interface HasIdName {
  /** идентификатор */
  id: string;
  /** заголовок */
  name: string;
}

/**
 * Дело
 */
export interface ToDo extends HasIdName {
  /** статус дела */
  isDone: boolean;
}

/**
 * Заметка
 */
export interface Note extends HasIdName {
  /** список дел */
  todos: ToDo[];
}
