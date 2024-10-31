<template>
  <modal-form>
    <template #seccion-button-save>
      <q-btn flat dense color="primary" label="Guardar" @click="onValidation" @reset="reset" />
    </template>
    <template #seccion-title>Cooperacion</template>
    <template #seccion-form>

      <q-form class="row q-col-gutter-sm" ref="formMonto">
        <q-input :type="type" dense outlined v-model="CooperacionPersonaModel.monto" :label="`Monto de ${labelPersona}`"
          lazy-rules @focus="onFocus" @blur="onBlur" class="col-lg-12 col-md-6 col-xs-12"
          :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

      </q-form>
    </template>
  </modal-form>
  <modal-message :modal="GetModal().value" @close="Hide()" />
</template>
<script setup lang="ts">
import { ref, onBeforeMount, computed, watch, inject } from 'vue'
import { useModalStore, useCommonStore } from '../../../stores/all';
import useModalMessage from '../../../support/handles/handleModal'
import useHookPersona from '../../hooks/MiGente/HPersona'
import { IPersonaCooperacionProperty } from '../../Models/MiGente/IModel'

const formMonto = ref<any>(null);
const text = ref('')
const type = ref<any>('text')
const labelPersona = ref<any>('')
const bus = inject<any>('bus');

const $modalStore = useModalStore();
const $commonStore = useCommonStore();
const { Show, Hide, GetModal } = useModalMessage();
const { AddCooperacionPersona, getPersona, persona } = useHookPersona();


const isChangeId = computed(() => $modalStore.getId);
watch(
  () => isChangeId.value,
  (newVal) => {
    if (newVal) {
      loadData();
    }
  }
);


const loadData = async () => {
  if ($modalStore.getId > 0) {
    reset();
    $commonStore.Add_Request();
    await getPersona($modalStore.getId);
    labelPersona.value = persona.value?.nombre;
    //seccionModel.value = seccionResult.value;
  }


}
const CooperacionPersonaModel = ref<IPersonaCooperacionProperty>({
  personaId: 0,
  periodoId: 0,
  monto: ''

});

const onValidation = async (evt: any) => {
  formMonto.value.validate().then(async (success: any) => {
    if (success) {
      try {

        $commonStore.Add_Request();
        CooperacionPersonaModel.value.personaId = $modalStore.getId;
        CooperacionPersonaModel.value.monto = CooperacionPersonaModel.value.monto
          .replace(
            '$',
            ''
          ).replace(',', '');

        await AddCooperacionPersona(CooperacionPersonaModel.value);
        //console.log(response)
        formMonto.value.reset();
        formMonto.value.resetValidation();
        bus.emit('load-cooperacion');
        reset();
        Show('SUCCESS', 'Exito!', 'El monto de ' + labelPersona.value + ' se guardó correctamente');
        $modalStore.HideModal();

      } catch (error: any) {
        $commonStore.Remove_Request();
        Show('ERROR', 'Error', error);
      }
    }
  });
};
const toNumberStr = (monto: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(monto);
};
const onFocus = (evt: any) => {
  evt.target.value = evt.target.value
    .replace('$', '')
    .replace(',', '');
  //console.log(parseInt(evt.target.value));
  if (parseFloat(evt.target.value) == 0) evt.target.value = '';

  type.value = 'number';
  //text.value = evt.target.value
  CooperacionPersonaModel.value.monto = evt.target.value;
  // periodoObject.value.Monto = evt.target.value;
};
const onBlur = (evt: any) => {
  type.value = 'text';
  //console.log(toNumberStr(evt.target.value))
  //periodoObject.value.Monto = toNumberStr(evt.target.value);
  //text.value = toNumberStr(evt.target.value)
  CooperacionPersonaModel.value.monto = toNumberStr(evt.target.value);
};

const reset = () => {
  CooperacionPersonaModel.value.monto = '';
  // if ($modalStore.getId == 0 || undefined) {
  //   // seccionModel.value.id = 0;
  //   // seccionModel.value.nombre = '';
  // }

};


</script>
