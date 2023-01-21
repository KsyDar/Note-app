<template>
  <UIButton
    class="note-redactor-back-button"
    :styles="ButtonStylesType.Secondary"
    @click="goToNoteList()"
  >
    Назад
  </UIButton>
  <div class="note-redactor-wrapper">
    <div class="note-redactor">
      <UITextField
        type="text"
        placeholder="Заголовок"
        v-model="currentNote.name"
        @changed="editNoteEnd"
      />
      <div class="note-redactor__todolist">
        <ul v-if="currentNote.todos.length !== 0">
          <li
            v-for="todo in currentNote.todos"
            :key="todo.id"
            class="note-redactor__todolist-item"
          >
            <input
              @change="editNoteEnd"
              type="checkbox"
              v-model="todo.isDone"
            />
            <UITextField
              type="text"
              size="100"
              placeholder="Наименование дела"
              v-model="todo.name"
              @change="editNoteEnd"
            />
            <DeleteIcon
              class="note-redactor__todolist-delete-icon"
              @click="deleteToDo(todo.id)"
            />
          </li>
        </ul>
        <h1 v-else>Вы еще не добавили ни одного дела!</h1>
        <UIButton
          class="note-redactor__add-button"
          :styles="ButtonStylesType.Primary"
          @click="addToDo()"
        >
          Добавить
        </UIButton>
      </div>
    </div>
    <div class="note-redactor__buttons">
      <UIButton
        v-if="!noteStore.isAdding"
        :styles="ButtonStylesType.Cancel"
        @click="deleteNote"
        >Удалить</UIButton
      >
      <UIButton
        style="margin-left: auto"
        :styles="ButtonStylesType.Primary"
        @click="save"
        >Сохранить</UIButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ButtonStylesType } from "@/types/buttonsType";
import type { Note, ToDo } from "@/types/notes";

import { v4 } from "uuid";
import { onMounted, ref, watch } from "vue";

import { useConfirm } from "@/compositions/useConfirm";
import { useRouter } from "vue-router";
import { useNoteStore } from "@/stores/note";
import { useUndoRedoStore } from "@/stores/undoRedo";

import { EditNoteCommand } from "@/commands/editNoteCommand";
import { CreateNoteCommand } from "@/commands/createNoteCommand";
import { DeleteNoteCommand } from "@/commands/deleteNoteCommand";
import { UpdateNoteCommand } from "@/commands/updateNoteCommand";

import { UndoRedoContext } from "@/types/undoRedoContexts";
import { getCopyNote } from "@/utils/getCopyNote";

import UITextField from "@/components/ui/UITextField.vue";
import UIButton from "@/components/ui/UIButton.vue";
import DeleteIcon from "@/assets/icons/delete.svg";

const noteStore = useNoteStore();
const undoRedoStore = useUndoRedoStore();
const confirm = useConfirm();
const router = useRouter();

/** выбранная заметка */
const currentNote = ref<Note>({
  id: v4(),
  name: "",
  todos: [],
});

watch(
  () => noteStore.currentNote,
  (value) => {
    if (value) {
      currentNote.value = getCopyNote(value);
    }
  },
  {
    immediate: true,
  }
);

/** вернуться на главную страницу */
const goToNoteList = () => {
  if (undoRedoStore.history?.undoStack.length !== 0) {
    confirm.open(
      "Несохраненные данные будут удалены. Выйти из редактора?",
      () => {
        router.push({ name: "NoteList" });
        undoRedoStore.clear();
      }
    );
  } else {
    router.push({ name: "NoteList" });
  }
};

/** добавить дело */
const addToDo = () => {
  const newToDo: ToDo = {
    id: v4(),
    name: "",
    isDone: false,
  };

  currentNote.value.todos.push(newToDo);
  editNoteEnd();
};

/**
 * удалить дело
 * @param todoId id дела
 */
const deleteToDo = (todoId: string) => {
  const deletedTodo = currentNote.value.todos.findIndex(
    (el) => el.id === todoId
  );
  currentNote.value.todos.splice(deletedTodo, 1);
  editNoteEnd();
};

/** удалить заметку */
const deleteNote = () => {
  confirm.open("Удалить заметку ?", async () => {
    if (currentNote.value.id) {
      await undoRedoStore.addCommand(
        new DeleteNoteCommand(currentNote.value),
        UndoRedoContext.NotesList
      );
      goToNoteList();
    }
  });
};

/** сохранить изменения */
const save = async () => {
  if (noteStore.isAdding) {
    await undoRedoStore.addCommand(
      new CreateNoteCommand(currentNote.value),
      UndoRedoContext.NotesList
    );
  } else {
    await undoRedoStore.addCommand(
      new UpdateNoteCommand(currentNote.value),
      UndoRedoContext.NotesList
    );
  }
  goToNoteList();
};

/** изменение части заметки закончено */
const editNoteEnd = async () => {
  await undoRedoStore.addCommand(new EditNoteCommand(currentNote.value));
};

onMounted(() => {
  undoRedoStore.setContext(UndoRedoContext.NoteRedactor);
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.note-redactor-wrapper {
  width: 80%;
  margin: 0 auto;
  background: $note-background-color;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.note-redactor-back-button {
  margin: 1rem;
}
.note-redactor {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__todolist {
    margin: 1rem 0;
    border: 1px solid $main-border-color;
    background: $note-background-color;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    padding: 0.5rem;
    border-radius: 0.5rem;
    padding: 1rem;
    width: 100%;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    &-delete-icon {
      width: 20px;
      height: 20px;
    }
  }

  &__add-button {
    display: block;
    margin: auto;
  }

  &__buttons {
    display: flex;
  }
}
</style>
