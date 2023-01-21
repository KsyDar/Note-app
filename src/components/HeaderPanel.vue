<template>
  <div class="header" v-if="undoRedoStore.history">
    <UIButton
      class="header__button"
      :styles="ButtonStylesType.Secondary"
      :disabled="undoRedoStore.history.undoStack.length === 0"
      @click="undo()"
    >
      <ArrowIcon class="header__icon header__icon--rotate" />
    </UIButton>
    <UIButton
      class="header__button"
      :styles="ButtonStylesType.Secondary"
      :disabled="undoRedoStore.history.redoStack.length === 0"
      @click="redo()"
    >
      <ArrowIcon class="header__icon" />
    </UIButton>
  </div>
</template>

<script setup lang="ts">
import { useUndoRedoStore } from "@/stores/undoRedo";

import { ButtonStylesType } from "@/types/buttonsType";

import UIButton from "./ui/UIButton.vue";
import ArrowIcon from "../assets/icons/arrow.svg";

const undoRedoStore = useUndoRedoStore();
/** отменить действие */
const undo = () => {
  undoRedoStore.undo();
};
/** повторить отмененное действие */
const redo = () => {
  undoRedoStore.redo();
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  &__button {
    & + & {
      margin: 0 1rem;
    }
  }

  &__icon {
    color: #fff;

    &--rotate {
      scale: -1 1;
    }
  }
}
</style>
