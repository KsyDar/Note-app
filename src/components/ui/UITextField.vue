<template>
  <label class="text-field">
    <input
      :value="value"
      :placeholder="placeholder"
      class="text-field__input text-field__input--default"
      @change="changeElement"
      @input="onInput"
    />
    <span class="text-field__label text-field__label--default">
      {{ placeholder }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

type PropType = {
  modelValue?: string;
  placeholder: string;
};

interface EmitType {
  (e: "update:modelValue", value: string): void;
  (e: "changed", value: string | null): void;
}

const props = withDefaults(defineProps<PropType>(), {
  modelValue: "",
});
const emit = defineEmits<EmitType>();
const value = ref("");

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  },
  { immediate: true }
);

/** событие при завершении редактирования элемента */
const changeElement = () => {
  emit("changed", value.value);
};

/** событие при изменении элемента */
const onInput = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;
  if (newValue) {
    emit("update:modelValue", newValue);
  }
};
</script>

<style lang="scss">
.text-field {
  position: relative;
  font-weight: 400;
  font-size: 1.2rem;
  margin: 2rem 0;
  color: #888b8e;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;

  &__input {
    font-weight: 500;
    width: 100%;
    color: black;
    outline: none;
    background-color: transparent;
    padding: 1rem 2.7rem 0.7rem 1rem;
    border: 0;
    border-bottom: 0.1rem solid #444959;
    font-size: 1.4rem;

    &.readonly {
      opacity: 0.5;
    }

    &--default {
      &:focus {
        border-bottom: 0.1rem solid #5937ad;
        ~ .text-field__label {
          position: absolute;
          bottom: 100%;
          margin-left: 1rem;
          display: block;
          transition: 0.2s;
          font-size: 1.1rem;
          color: #5937ad;
        }
      }

      &:placeholder-shown ~ .text-field__label {
        font-size: 1.4rem;
        cursor: text;
        bottom: 1rem;
        margin-left: 1rem;
      }
    }

    &::placeholder {
      color: transparent;
      user-select: none;
    }
  }

  &__label {
    font-weight: 500;
    user-select: none;
    line-height: 1;
    transition: 0.2s;

    &--default {
      position: absolute;
      color: #888b8e;
      bottom: 100%;
      margin-left: 1rem;
      display: block;
      font-size: 1.2rem;
    }
  }
}

input:-webkit-autofill {
  -webkit-text-fill-color: #fff;
  box-shadow: 0 0 0 3rem rgb(19, 21, 26) inset !important;
}

input:-webkit-autofill ~ .text-field__label {
  position: absolute;
  bottom: 100%;
  margin-left: 1rem;
  display: block;
  transition: 0.2s;
  font-size: 1.2rem;
}

input:-internal-autofill-selected {
  border: 0;
  border-bottom: 0.1rem solid #444959;
}
</style>
