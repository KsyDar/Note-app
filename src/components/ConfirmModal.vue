<template>
  <div
    v-if="confirmStore.isOpen"
    class="confirm-wrapper"
    :class="{ 'confirm-wrapper--opened': confirmStore.isOpen }"
  >
    <div class="confirm" ref="target">
      <span>Подтвердите действие:</span>
      <span class="confirm__action">{{ confirmStore.text }}</span>
      <div class="confirm__buttons">
        <UIButton @click="confirmStore.confirm()"> Ок </UIButton>
        <UIButton
          @click="confirmStore.reject()"
          :styles="ButtonStylesType.Cancel"
          >Отмена</UIButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useConfirmStore } from "@/stores/confirm";

import { ButtonStylesType } from "@/types/buttonsType";

import UIButton from "./ui/UIButton.vue";

const confirmStore = useConfirmStore();

const target = ref(null);

/**
 * Закрытие диалогового окна при нажатии вне его
 */
onClickOutside(target, () => confirmStore.close());
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
.confirm-wrapper {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background-color: $modal-vrapper-bg-color;

  &--opened {
    display: block;
  }
}
.confirm {
  background-color: $note-background-color;
  width: 40rem;
  height: 20rem;
  margin: auto;
  margin-top: 10rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 5px;
  color: #000;
  font-size: 1.5rem;
  border: solid 2px;

  &__action {
    width: 100%;
    text-align: center;
    font-size: 2rem;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
