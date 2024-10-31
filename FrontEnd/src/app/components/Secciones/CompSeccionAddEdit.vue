<template>
  <modal-form>
    <template #seccion-button-save>
      <q-btn flat dense color="primary" label="Guardar" @click="onValidation" @reset="reset" />
    </template>
    <template #seccion-title> {{ $modalStore.getId > 0 ? seccionModel.nombre : 'Agregar sección' }} </template>
    <template #seccion-form>

      <q-form class="row q-col-gutter-sm" ref="formSeccion">
        <q-input dense outlined v-model="seccionModel.nombre" label="Nombre sección" lazy-rules
          class="col-lg-12 col-md-6 col-xs-12" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

      </q-form>

      <!-- {{ $modalStore.getId }} -->
    </template>
  </modal-form>
  <modal-message :modal="GetModal().value" @close="Hide()" />
</template>
<script setup lang="ts">
import { ref, inject, onBeforeMount, computed, watch } from 'vue'
import { useModalStore, useCommonStore } from '../../../stores/all';
import { ISeccionProperty } from '../../Models/Secciones/IModel'
import useHookSeccion from '../../hooks/Secciones/HSeccion'
import useModalMessage from '../../../support/handles/handleModal'

const formSeccion = ref<any>(null);
const $modalStore = useModalStore();
const $commonStore = useCommonStore();
const bus = inject<any>('bus');

const isChangeId = computed(() => $modalStore.getId);
watch(
  () => isChangeId.value,
  (newVal) => {
    if (newVal) loadData();
    else reset();
  }
);


const loadData = async () => {
  if ($modalStore.getId > 0) {
    $commonStore.Add_Request();
    await get($modalStore.getId);
    seccionModel.value = seccionResult.value;
  } else reset();


}


const seccionModel = ref<ISeccionProperty>({
  id: 0,
  nombre: '',

});


const { AddUpdate, get, seccionResult } = useHookSeccion();
const { Show, Hide, GetModal } = useModalMessage();

const onValidation = async (evt: any) => {
  formSeccion.value.validate().then(async (success: any) => {
    if (success) {
      try {

        $commonStore.Add_Request();

        await AddUpdate(seccionModel.value).then((response: any) => {
          //console.log(response)
          formSeccion.value.reset();
          formSeccion.value.resetValidation();
          bus.emit('load-seccion');
          reset();
          Show('SUCCESS', 'Exito!', 'La sección se guardó correctamente');
          $modalStore.HideModal();

        });

      } catch (error: any) {
        $commonStore.Remove_Request();
        Show('ERROR', 'Error', error);
      }
    }
  });
};

const reset = () => {
  if ($modalStore.getId == 0 || undefined) {
    seccionModel.value.id = 0;
    seccionModel.value.nombre = '';
  }

};

</script>
