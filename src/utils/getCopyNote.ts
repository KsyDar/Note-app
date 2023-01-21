import type { Note } from "@/types/notes";

/**
 * Функция создания копии заметки
 * @param data заметка
 * @returns копию заметки
 */
export function getCopyNote(data: Note) {
  return {
    id: data.id,
    name: data.name,
    todos: data.todos.map((todo) => ({
      id: todo.id,
      name: todo.name,
      isDone: todo.isDone,
    })),
  };
}
