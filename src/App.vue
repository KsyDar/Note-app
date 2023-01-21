<template>
  <div class="wrapper">
    <HeaderPanel></HeaderPanel>
    <router-view></router-view>
  </div>
  <ConfirmModal />
</template>

<script setup lang="ts">
import HeaderPanel from "./components/HeaderPanel.vue";
import ConfirmModal from "./components/ConfirmModal.vue";
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  margin: 2rem auto;
}
</style>
