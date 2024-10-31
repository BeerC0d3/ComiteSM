<template>
  <!-- <div class="dialog-full-heigth"> -->
  <q-dialog v-model="isShow" class="q-dialog__inner--fullheight" position="bottom" @hide="(value) => SetState(value)">

    <q-card class="custom-dialog-radius card-mt" :style="width">
      <q-card-section style="display: flex;padding: 5px !important;">

        <q-toolbar>
          <q-btn flat dense color="orange" label="Cancelar" v-close-popup />
          <q-space />
          <div class="text-center text-subtitle2">
            <slot name="seccion-title" />
          </div>
          <q-space />
          <slot name="seccion-button-save" />

        </q-toolbar>
      </q-card-section>

      <q-card-section style="max-height: 90%" class="scroll">
        <div class="container-template">
          <slot name="seccion-form" />

        </div>
      </q-card-section>
      <!-- <q-card-actions align="center" class="flex">
        <q-btn unelevated rounded color="orange" class="full-width-50" v-close-popup>Cancelar</q-btn>
        <q-btn unelevated rounded color="primary" class="full-width-50">Guardar</q-btn>

      </q-card-actions> -->

    </q-card>

  </q-dialog>
  <!--
  </div> -->
</template>
<script setup lang="ts">
import { ref, watch, computed, } from 'vue';
import { useModalStore } from 'stores/all';
import { useQuasar } from 'quasar'
const $modalStore = useModalStore();
const $q = useQuasar()


const isShow = ref(false);
const emit = defineEmits(['close']);

const SetState = (evt: any) => {
  $modalStore.HideModal();

};

const width = computed(() => {
  // console.log($q.screen)

  return $q.screen.xl || $q.screen.md || $q.screen.sm
    ? 'width:650px'
    : ''
})

const thumbStyle = ref({
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',

});

const barStyle = ref({
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '9px',

})

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
<style lang="scss">
.dialog-bottom-full-height {
  z-index: 10008;
  height: 100%;

}

.q-dialog__inner--fullheight>div {
  height: 100% !important;
  max-height: 100% !important;

}

.card-mb-auto {
  margin-bottom: auto !important;
}

.card-mt {
  // margin-top: 105px !important;
  top: 105px;
  // margin-bottom: 45px !important;

}

.q-dialog__inner .custom-dialog-radius {
  border-top-left-radius: 25px !important;
  border-top-right-radius: 25px !important;
}
</style>
