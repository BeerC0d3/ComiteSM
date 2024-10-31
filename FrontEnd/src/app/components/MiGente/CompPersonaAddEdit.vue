<template>
  <modal-form>
    <template #seccion-button-save>
      <q-btn flat dense color="primary" label="Guardar" @click="onValidation" @reset="reset" />
    </template>
    <template #seccion-title> Agregar persona</template>
    <template #seccion-form>

      <q-form class="row q-col-gutter-sm" ref="formPersona">
        <q-input dense outlined v-model="personaModel.nombre" label="Nombre" maxlength="100" lazy-rules
          class="col-lg-12 col-md-12 col-xs-12" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

        <q-input dense outlined v-model="personaModel.colonia" label="Colonia" maxlength="100"
          class="col-lg-12 col-md-12 col-xs-12" />

        <q-input dense outlined v-model="personaModel.calle" label="Calle" maxlength="100"
          class="col-lg-8 col-md-6 col-xs-8" />

        <q-input dense outlined v-model="personaModel.numero" label="Número" maxlength="50" lazy-rules
          class="col-lg-4 col-md-6 col-xs-4" />

        <q-input dense outlined v-model="personaModel.latitud" label="Latitud" maxlength="50"
          class="col-lg-5 col-md-5 col-xs-5" />

        <q-input dense outlined v-model="personaModel.longitud" label="Longitud" maxlength="50"
          class="col-lg-5 col-md-5 col-xs-5" />

        <q-btn flat icon="fa-solid fa-location-crosshairs" class="col-lg-2 col-md-2 col-xs-2" color="red" size="1em"
          @click="getGeolocalitation" />


        <q-select dense outlined class="col-lg-12 col-xs-12" v-model="personaModel.seccionId" :options="catSeccion"
          option-label="nombre" option-value="id" label="Sección" emit-value map-options
          :rules="[(val) => !!val || 'Seleccione una sección']" />


      </q-form>
      <div class="map-height">
        <use-map :markers="markers" :isCurrentGeolocatation="true" />
      </div>

    </template>
  </modal-form>
  <modal-message :modal="GetModal().value" @close="Hide()" />
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onMounted, inject, computed, watch } from 'vue'
import { useModalStore, useCommonStore } from '../../../stores/all';
import { IPersonaProperty } from '../../Models/MiGente/IModel'
import { ISeccion, ISeccionProperty } from '../../Models/Secciones/IModel'
import useModalMessage from '../../../support/handles/handleModal'
import useHookSeccion from '../../hooks/Secciones/HSeccion'
import useHookPersona from '../../hooks/MiGente/HPersona'
import useMap from '../Sistema/CompMap.vue'


const formPersona = ref<any>(null);
const $modalStore = useModalStore();
const $commonStore = useCommonStore();
const catSeccion = ref<ISeccionProperty[] | undefined>([]);
const bus = inject<any>('bus');
const markers = ref([]);
const markersAdd = ref<any>([]);

const { Show, Hide, GetModal } = useModalMessage();
const { getByUser, seccionesByUser } = useHookSeccion();
const { AddUpdate } = useHookPersona();

onBeforeMount(async () => {
  await getByUser();
  catSeccion.value = seccionesByUser.value;

});


const personaModel = ref<IPersonaProperty>({
  id: 0,
  seccionId: '',
  nombre: '',
  colonia: '',
  calle: '',
  numero: '',
  latitud: '',
  longitud: ''

});

const onValidation = async (evt: any) => {
  formPersona.value.validate().then(async (success: any) => {
    if (success) {
      try {

        // console.log(personaModel.value)
        $commonStore.Add_Request();

        await AddUpdate(personaModel.value).then((response: any) => {
          //console.log(response)
          formPersona.value.reset();
          formPersona.value.resetValidation();
          bus.emit('load-persona');
          reset();
          Show('SUCCESS', 'Exito!', 'La persona se guardo correctamente');
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

  personaModel.value.id = 0;
  personaModel.value.seccionId = '';
  personaModel.value.nombre = '';
  personaModel.value.colonia = '';
  personaModel.value.calle = '';
  personaModel.value.numero = '';
  personaModel.value.latitud = '';
  personaModel.value.longitud = '';
};

/* checamos si cambio de valor el modal para hacer*/
const isShowComputed = computed(() => $modalStore.stateShow);
watch(
  () => isShowComputed.value,
  (newVal) => {
    if (newVal) {
      if ($modalStore.getId == 0) {
        reset();

      }
    }
  }
);

const getGeolocalitation = () => {
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(setGeolocalitation, errorGeolocatation, {
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 0
    });
  }
};

const setGeolocalitation = (position: any) => {
  personaModel.value.latitud = position.coords.latitude.toString();
  personaModel.value.longitud = position.coords.longitude.toString();
  markersAdd.value = [];
  markers.value = [];

  markersAdd.value.push({
    latitude: position.coords.latitude.toString(),
    longitude: position.coords.longitude.toString()

  });

  //console.log(markersAdd.value)
  markers.value = markersAdd.value;

};

const errorGeolocatation = (error: any) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      Show('ERROR', 'Error Geolocatation', 'User denied the request for Geolocation.');
      break;

    case error.POSITION_UNAVAILABLE:
      Show('ERROR', 'Error Geolocatation', 'Location information is unavailable.');
      break;

    case error.TIMEOUT:
      Show('ERROR', 'Error Geolocatation', 'The request to get user location timed out.');
      break;

    case error.UNKNOWN_ERROR:
      Show('ERROR', 'Error Geolocatation', 'An unknown error occurred.');
      break;
  }

};

</script>
