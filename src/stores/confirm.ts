import type { EmptyFunction } from "@/types/emptyFunction";
import { defineStore } from "pinia";

/**
 * Тип хранилища состояний диалогового окна
 */
type ConfirmState = {
  /** является ли диалоговое окно открытым */
  isOpen: boolean;
  /** текст диалогового окна */
  text: string;
  /** событие "принять" */
  onSuccess: EmptyFunction | null;
  /** событие "отклонить" */
  onReject: EmptyFunction | null;
};

export const useConfirmStore = defineStore("confirm", {
  state(): ConfirmState {
    return {
      isOpen: false,
      text: "",
      onSuccess: null,
      onReject: null,
    };
  },
  actions: {
    /**
     *  открыть диалоговое окна
     * @param text текст диалогового окна
     */
    open(text: string) {
      this.isOpen = true;
      this.text = text;
    },
    /** закрыть диалоговое окна */
    close() {
      this.isOpen = false;
      this.setEvents(null, null);
    },
    /** отклонить */
    reject() {
      if (this.onReject) {
        this.onReject();
      }
      this.close();
    },
    /** принять */
    confirm() {
      if (this.onSuccess) {
        this.onSuccess();
      }
      this.close();
    },

    /**
     *  установить функцию, выполняющуюся на события
     * @param onSuccess callback на событие "принять"
     * @param onReject callback на событие "отклонить"
     */
    setEvents(onSuccess: EmptyFunction | null, onReject: EmptyFunction | null) {
      this.onSuccess = onSuccess;
      this.onReject = onReject;
    },
  },
});
