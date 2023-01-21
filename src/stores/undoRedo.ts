import { defineStore } from "pinia";

import type { ICommand } from "@/types/command";
import { UndoRedoContext } from "@/types/undoRedoContexts";

/**
 * Тип истории выполненнных команд
 */
type History = {
  /** хранилище действий для отмены */
  undoStack: Array<ICommand>;
  /** хранилище отмененных действий для повтора */
  redoStack: Array<ICommand>;
};

/**
 * Тип хранилища выполненнных команд
 */
type UndoRedoState = {
  /** список контекстов для хранения истории */
  contexts: Map<string, History>;
  /** текущий контекст */
  currentContext: UndoRedoContext;
};

export const useUndoRedoStore = defineStore("undoRedo", {
  state(): UndoRedoState {
    return {
      contexts: new Map(),
      currentContext: UndoRedoContext.NoteRedactor,
    };
  },
  actions: {
    /**
     * установить контекст. Если контекста не существует, он будет создан
     * @param contextName имя контекста
     */
    setContext(contextName: UndoRedoContext) {
      if (!this.contexts.has(contextName)) {
        this.contexts.set(contextName, {
          redoStack: [],
          undoStack: [],
        });
      }
      this.currentContext = contextName;
    },
    /**
     * очистить историю выбранного контекста
     */
    clear() {
      if (!this.history) {
        throw new Error("Контекст не был создан");
      }
      this.history.redoStack = [];
      this.history.undoStack = [];
    },
    /**
     * добавить команду в историю
     * @param command команда
     * @param context контекст. если не будет передан, добавится в текущий
     */
    async addCommand<T>(command: ICommand<T>, context?: UndoRedoContext) {
      const history = context ? this.contexts.get(context) : this.history;
      if (!history) {
        throw new Error("Контекст не был создан");
      }
      history.undoStack.push(command);
      await command.execute();
      history.redoStack = [];
    },
    /**
     * отменить действие в текущем контексте
     * @returns promise на выполнение команды
     */
    undo() {
      if (!this.history) {
        throw new Error("Контекст не был создан");
      }
      const lastCommand = this.history.undoStack.pop();
      if (lastCommand) {
        this.history.redoStack.push(lastCommand);
        return lastCommand.undo();
      }
    },
    /**
     * повторить отмененное действие в текущем контексте
     * @returns promise на выполнение команды
     */
    redo() {
      if (!this.history) {
        throw new Error("Контекст не был создан");
      }
      const lastCommand = this.history.redoStack.pop();
      if (lastCommand) {
        this.history.undoStack.push(lastCommand);
        return lastCommand.redo();
      }
    },
  },
  getters: {
    /**
     * история в текущем контексте
     */
    history(): History | undefined {
      return this.contexts.get(this.currentContext);
    },
  },
});
