<template>
  <li class="todolist-wrapper">
    <div class="todolist-card">
      <div class="todolist__icons">
        <ChangeIcon class="todolist__icon" @click="startEdit" />
        <DeleteIcon class="todolist__icon" @click="startDelete" />
      </div>

      <h2 class="todolist-card__header">{{ note.name }}</h2>
      <div class="line"></div>
      <ul class="todolist">
        <li
          class="todolist__item"
          :class="{ 'todolist__item--done': todo.isDone }"
          v-for="todo in note.todos.slice(0, 3)"
          :key="todo.id"
        >
          <span
            :class="{ 'todolist__item-name--done': todo.isDone }"
            class="todolist__item-name"
            >{{ todo.name }}</span
          >
        </li>
      </ul>
    </div>
  </li>
</template>

<script setup lang="ts">
import router from "@/router";

import { useConfirm } from "@/compositions/useConfirm";
import { useNoteStore } from "@/stores/note";
import { useUndoRedoStore } from "@/stores/undoRedo";
import { DeleteNoteCommand } from "@/commands/deleteNoteCommand";

import type { Note } from "@/types/notes";

import DeleteIcon from "@/assets/icons/delete.svg";
import ChangeIcon from "@/assets/icons/change.svg";

type PropType = {
  /** заметка */
  note: Note;
};

const props = defineProps<PropType>();

const noteStore = useNoteStore();
const undoRedoStore = useUndoRedoStore();

const confirm = useConfirm();

/**
 * Запуск редактирования
 */
const startEdit = () => {
  noteStore.startEdit(props.note);
  router.push({ name: "NoteRedactor" });
};

/**
 * Запуск удаления
 */
const startDelete = () => {
  confirm.open("Удалить заметку ?", () => {
    undoRedoStore.addCommand(new DeleteNoteCommand(props.note));
  });
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.todolist-wrapper {
  @media (min-width: 25rem) {
    width: 50%;
  }

  @media (min-width: 56rem) {
    width: 33.3333%;
  }

  @media (min-width: 70rem) {
    width: 25%;
  }

  width: 100%;

  padding: 1rem;
}
.todolist-card {
  display: flex;
  height: 100%;
  flex-direction: column;
  border: 2px solid $main-border-color;
  background: $note-background-color;
  box-shadow: rgba(0, 0, 0, 0.24) 0 0.3rem 0.8rem;
  border-radius: 0.5rem;
  position: relative;
  padding: 0.5rem;
}
.todolist {
  margin: 0.5rem 0;

  &__icons {
    position: absolute;
    right: 0.5rem;
  }

  &__icon {
    width: 20px;
    height: 20px;

    &:hover {
      cursor: pointer;
    }
  }

  &__item {
    display: flex;
    align-items: center;

    border: 1px solid $main-border-color;
    background: $note-background-color;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
    position: relative;

    &::before {
      left: 0;
      width: 18px;
      height: 100%;
      position: absolute;
      content: "";
      background: $button-cancel-bg-color;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0.5rem;
    }

    &--done::before {
      background: $button-primary-bg-color;
    }

    &-name {
      margin-left: 20px;
      font-size: 1.6rem;
      &--done {
        text-decoration: line-through;
      }
    }
  }
}
</style>
