import { useConfirmStore } from "@/stores/confirm";
import type { EmptyFunction } from "@/types/emptyFunction";

/**
 * Функция-расширение для работы с диалоговым окном
 */
export function useConfirm() {
  const confirmStore = useConfirmStore();

  /** открытие диалогового окна */
  const open = (
    /** текст диалогового окна */
    text: string,
    /** функция, выполняющаяся при событии "согласиться" */
    onSuccess?: EmptyFunction,
    /** функция, выполняющаяся при событии "отклонить" */
    onReject?: EmptyFunction
  ) => {
    confirmStore.setEvents(onSuccess || null, onReject || null);
    confirmStore.open(text);
  };

  /** закрытие диалогового окна */
  const close = () => {
    confirmStore.close();
  };

  return {
    open,
    close,
  };
}
