<template>
  <button
    :class="'button-' + styles"
    class="button"
    :disabled="disabled"
    @click="emits('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ButtonStylesType } from "@/types/buttonsType";

type PropType = {
  /** стиль кнопки */
  styles?: ButtonStylesType;
  /** Находится в выключенном состоянии */
  disabled?: boolean;
};

interface EmitType {
  (e: "click"): void;
  (e: "blur"): void;
}

withDefaults(defineProps<PropType>(), {
  styles: ButtonStylesType.Primary,
  disabled: false,
});

const emits = defineEmits<EmitType>();
</script>

<style lang="scss">
@use "@/assets/styles/variables" as *;

.button {
  font-style: normal;
  font-weight: 600;
  padding: 1.7rem 2.4rem;
  border-radius: 0.3rem;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  font-size: 1.6rem;

  &:disabled {
    opacity: 0.5;
    transition: opacity 0.3s;
  }

  &:not([disabled]):hover {
    cursor: pointer;
  }

  &-primary {
    background: $button-primary-bg-color;
    box-shadow: inset 0.1rem 0.1rem 0.3rem rgba(255, 255, 255, 0.3);
    border: none;
    color: $note-background-color;
    transition: box-shadow 0.5s, background 0.5s;
  }

  &-primary,
  &-cancel,
  &-secondary {
    border-radius: 0.9rem;
    padding: 1rem 1.5rem;
  }

  &-primary:not([disabled]):hover {
    background: $button-primary-hover-bg-color;
    box-shadow: inset 0.2rem 0.2rem 0.4rem $button-primary-shadow-color;
  }

  &-primary:not([disabled]):active {
    box-shadow: inset 0.1rem 0.1rem 0.3rem $button-primary-shadow-color;
  }

  &-secondary,
  &-cancel {
    color: $note-background-color;
    transition: box-shadow 0.5s, border 0.5s, background 0.5s;
  }

  &-cancel {
    height: 4.5rem;
    font-size: 1.4rem;
    font-weight: 600;
  }

  &-secondary {
    background: #282446;
    border: 0.1rem solid transparent;
  }

  &-cancel {
    background: $button-cancel-bg-color;
    border: 0.1rem solid $button-cancel-border-color;
  }

  &-secondary:not([disabled]):hover,
  &-cancel:not([disabled]):hover {
    background: $button-cancel-hover-bg-color;
  }

  &-secondary:not([disabled]):active,
  &-cancel:not([disabled]):active {
    background: #282446;
    box-shadow: inset 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.17);
  }
}
</style>
