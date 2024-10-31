<template>
  <q-dialog v-model="isShow" position="bottom" full-width persistent @hide="(value) => SetState(value)">

    <q-card style="width: 650px !important;">
      <div class="text-center">
        <q-btn icon="horizontal_rule" class="full-width" flat dense v-close-popup />
      </div>

      <!-- <q-carection class="row items-center no-wrap"> -->
      <q-card-section class="">
        <div class="container-template">
          <slot name="section-1" />

        </div>

      </q-card-section>
      <q-card-section class="">
        <div class="container-template">
          <slot name="section-2" />

        </div>

      </q-card-section>
    </q-card>

  </q-dialog>
</template>
<script setup lang="ts">
import { ref, watch, computed, } from 'vue';
import { useModalStore } from 'stores/all';

const isShow = ref(false);
const $modalStore = useModalStore();

const SetState = (evt: any) => {
  $modalStore.HideModal();

};

const isShowComputed = computed(() => $modalStore.stateShow);
watch(
  () => isShowComputed.value,
  (newVal) => {
    if (newVal)
      isShow.value = isShowComputed.value;
    else isShow.value = false;

  }
);
</script>
<style scoped>
.q-card {
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
}
</style>
