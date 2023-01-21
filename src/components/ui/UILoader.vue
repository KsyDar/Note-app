<template>
  <span class="loader" :style="styleObject"></span>
</template>

<script setup lang="ts">
import { reactive } from "vue";

type PropType = {
  /** размер элемента */
  size?: number;
};

const props = withDefaults(defineProps<PropType>(), {
  size: 30,
});

const styleObject = reactive({
  width: `${props.size}px`,
  height: `${props.size}px`,
});
</script>

<style lang="scss">
.loader {
  border: 2px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin: 20rem auto;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>